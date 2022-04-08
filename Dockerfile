FROM node:16-alpine
COPY src /app
RUN cd /app && \
	npm i && \
	npm run build
WORKDIR /app
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]

