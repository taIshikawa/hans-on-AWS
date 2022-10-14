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
### laravelのenvを;変更する
