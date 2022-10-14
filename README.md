# hans-on-AWS

### ローカル環境構築手順
cd config
docker-compose up -d 
docker-compose exec php bash 
必要があれば、composer 
php artisan migrate
exit

docker-compose exec server bash 
- systemctl start nginx
- systemctl enable nginx
- systemctl status nginx
- exit

http://localhost:8080


## 本番環境開発手順

これをやる。MYSQLはインストールしない
https://brainlog.jp/server/aws/post-3246/#outline__2

### laravelデプロイ
ローカルからスタート
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_rsa
ssh-add ~/.ssh/{キーペア}
ssh -A ec2-user@{ec2のip}
git pull

cd ~
git clone git@github.com:taIshikawa/hans-on-AWS.git
sudo cp -fpr hans-on-AWS/api/* /var/www/

### RDS作成







# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 4096;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;


    server {
        listen 80;
        server_name _;
        root /var/www/public;

        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-XSS-Protection "1; mode=block";
        add_header X-Content-Type-Options "nosniff";

        index index.php;

        charset utf-8;

        location / {
            try_files $uri $uri/ /index.php?$query_string;
        }

        location = /favicon.ico { access_log off; log_not_found off; }
        location = /robots.txt  { access_log off; log_not_found off; }

        error_page 404 /index.php;

        location ~ \.php$ {
            fastcgi_pass unix:/var/run/php-fpm/php-fpm.sock;
            fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
            include fastcgi_params;
        }

        location ~ /\.(?!well-known).* {
            deny all;
        }
    }
}