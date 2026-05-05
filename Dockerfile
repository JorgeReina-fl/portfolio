FROM nginx:alpine
COPY dist /usr/share/nginx/html
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ { root /usr/share/nginx/html; expires 1y; add_header Cache-Control "public, immutable"; } }' > /etc/nginx/conf.d/default.conf
EXPOSE 80
