import moment from 'moment';
import Byte2String from '/common/byte2string';

export default class Registry {
  constructor(axios, url, auth = null) {
    this.axios = axios
    this.url = url
    this.auth = {}
    this.credentials = false
    if (auth) {
      this.auth = auth
      this.credentials = true
    }
  }

  _validateStatus(_) { return true }

  async checkLogin() {
    return await this.xhr('get', '/v2/')
  }

  async listImages() {
    return await this.recursiveGet('/v2/_catalog?n=1000', (data) => {
      const images = []
      data.repositories.forEach(image => { images.push(image) })
      return images
    })
  }

  async listImageTags(image) {
    return await this.recursiveGet(`/v2/${image}/tags/list?n=1000`, (data) => {
      const tags = []
      data.tags.forEach(tag => { tags.push(tag) })
      return tags
    })
  }

  async getTagManifests(image, tag) {
    const v1Result = await this.xhr('get', `/v2/${image}/manifests/${tag}`, {
      accept: 'application/vnd.docker.distribution.manifest.v2+json'
    })
    if (v1Result.status !== 200) throw v1Result
    const v2Result = await this.xhr('get', `/v2/${image}/blobs/${v1Result.data.config.digest}`)
    if (v2Result.status !== 200) throw v2Result

    const tagInfo = {image: image, tag: tag, manifests: {v1: v1Result.data, v2: v2Result.data}}
    tagInfo.created = moment(tagInfo.manifests.v2.created)
    tagInfo.createdUtcString = tagInfo.created.utc().format('YYYY-MM-DD HH:mm:ss')
    tagInfo.createdTimestamp = Number(tagInfo.created.format('x'))
    tagInfo.digest = tagInfo.manifests.v1.config.digest
    tagInfo.size = tagInfo.manifests.v1.config.size
    tagInfo.manifests.v1.layers.forEach(layer => { tagInfo.size += layer.size })
    tagInfo.sizeString = Byte2String.binByte(tagInfo.size)
    return tagInfo
  }

  async deleteTag(image, digest) {
    const result = await this.xhr('delete', `/v2/${image}/manifests/${digest}`)
    if ((result.status > 200) ) throw result
    return result.data
  }

  async recursiveGet(url, handler, headers = {}, params = {}, basicAuth = false) {
    let result = []
    while (true) {
      if (!url) { return result }
      const res = await this.request('get', url, headers, params, basicAuth)
      if (res.status !== 200) {
        throw res
      }
      result = result.concat(handler(res.data))
      if (!res.headers['link']) { return result }
      url = /<(?<url>([-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]))>; rel="next"/.exec(res.headers['link'])?.groups.url
    }
  }

  async xhr(method, path, headers = {}, params = {}, basicAuth = false) {
    if (process.client) {
      try {
        const res = await this.request(method, path, headers, params, basicAuth)
        res.message = `HTTP ${res.status}`
        return res
      } catch {
        return {status: 0, message: "Unable to connect to server"}
      }
    }
  }

  async request(method, path, headers = {}, params = {}, basicAuth = false) {
    const config = {
      method: method,
      baseURL: this.url,
      url: path,
      headers: headers,
      params: params,
      validateStatus: this._validateStatus
    }
    config.headers['cache-control'] = 'no-cache'
    config.headers['pragma'] = 'no-cache'
    config.headers['expires'] = '0'

    if (basicAuth) {
      config.auth = this.auth
      config.credentials = this.credentials
    }
    const res = await this.axios.request(config)

    if (((res.status === 401) || (res.status === 403)) && (config.headers['authorization']) || (config.headers['Authorization']) || basicAuth) {
      return res
    }

    if ((res.status === 401) && this.credentials) {
      if (res.headers['www-authenticate'].startsWith('Basic')) {
        return await this.request(method, path, headers, {}, true)
      }

      if (res.headers['www-authenticate'].startsWith('Bearer')) {
        headers['authorization'] = "Bearer " + (await this.getAccessToken(res.headers['www-authenticate'])).data.access_token
        return await this.request(method, path, headers)
      }

      return res
    }

    return res
  }

  async getAccessToken(authenticateHeader) {
    const headerRegex = /Bearer realm="(?<realm>[^"]+)",service="(?<service>[^"]+)"(,scope="(?<scope>[^"]+)")?/
    const headerMatch = headerRegex.exec(authenticateHeader).groups
    const authData = {
      grant_type: 'refresh_token',
      service: headerMatch.service,
    }
    if (headerMatch.scope) {
      authData.scope = headerMatch.scope
    }
    return await this.request('post', headerMatch.realm, {}, authData, true)
  }
}
