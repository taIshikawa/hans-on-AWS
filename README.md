# hans-on-AWS

### 環境構築手順
- cd config
- docker-compose up -d 
- docker-compose exec php bash 
- 必要があれば、composer 
- exit

docker-compose exec server bash 
- systemctl start nginx
- systemctl enable nginx
- systemctl status nginx
- exit

http://localhost:8080