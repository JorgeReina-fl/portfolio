FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.29-alpine
USER root
COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
RUN chown -R root:root /etc/nginx /usr/share/nginx/html \
 && chmod -R u=rwX,go=rX /etc/nginx /usr/share/nginx/html
USER 101
EXPOSE 80
