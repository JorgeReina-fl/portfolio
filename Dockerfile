FROM nginxinc/nginx-unprivileged:1.29-alpine
USER root
COPY dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
RUN chown -R root:root /etc/nginx /usr/share/nginx/html \
 && chmod -R u=rwX,go=rX /etc/nginx /usr/share/nginx/html
USER 101
EXPOSE 80
