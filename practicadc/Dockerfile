FROM node:18 AS node-builder
WORKDIR /app

COPY frontend/ /app

RUN npm install --force
RUN npm run build --configuration=production


FROM nginx:1.17.1-alpine


RUN rm -rf /usr/share/nginx/html/*

COPY --from=node-builder /app/dist/practicadc /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]




