FROM node:18.16.0 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts -g --silent

RUN npm i react-router-dom
RUN npm i react-query
RUN npm i @tanstack/react-query
# RUN npm i -g npm

RUN npm install lodash
RUN npm i --save lodash
RUN npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
RUN npm install @mui/x-date-pickers
RUN npm i dayjs
RUN npm install @azure/storage-blob
RUN npm install react-dotenv

RUN npm install stylis stylis-plugin-rtl
RUN npm install jss-rtl

COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY /nginx/default.conf /etc/nginx/conf.d/
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
