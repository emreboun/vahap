GNU nano 7.2 /etc/nginx/sites-available/nextjs  
server {
server_name gmvahap.com www.gmvahap.com;
location / {
proxy_pass http://localhost:3000;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_cache_bypass $http_upgrade;
}

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/gmvahap.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/gmvahap.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
if ($host = www.gmvahap.com) {
        return 301 https://$host$request_uri;
} # managed by Certbot

    if ($host = gmvahap.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

listen 80;
server_name gmvahap.com www.gmvahap.com;
return 404; # managed by Certbot

}
