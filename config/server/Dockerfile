FROM centos:7

# hostとdockerの日付合わせ
RUN /bin/cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

# CentOS 8 ではdnfコマンドがyumに代行する。
RUN yum update -y

# epel リポジトリをinstall
RUN yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm

# nginxのinstall
RUN yum -y install \ 
    nginx \
    logrotate

# ./default.confをコンテナにコピー（default.confにphpのコンテナを指定して、このコンテナとphpのコンテナを接続させる）
COPY ./nginx/conf/default.conf /etc/nginx/conf.d/default.conf

# ログローテ設定
COPY ./nginx/logrotate/nginx /etc/logrotate.d/nginx

# ログローテ設定の権限変更
RUN chmod 644 /etc/logrotate.d/nginx

CMD ["nginx", "-g", "daemon off;"]
