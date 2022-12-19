FROM hoosin/alpine-nginx-nodejs

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

RUN cp -r ./build/* /usr/share/nginx/html

EXPOSE 8080

RUN nginx -t

CMD ["nginx","-g","daemon off;"]