FROM node:10-slim

# add project to build
COPY src /root/api/src
COPY package.json /root/api/package.json
COPY newrelic.js /root/api/newrelic.js
WORKDIR /root/api

RUN npm install

ENV PORT 4242

EXPOSE 4242

CMD ["npm", "start"]
