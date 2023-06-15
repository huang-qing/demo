微应用部署方案一：

1. 部署在一个站点中,开放一个端口
2. 主应用部署在顶层目录中
3. 为每个子应用作为创建一个子目录，子目录名称与打包声明的`base`名称保持一致
4. 子应用使用vite打包声明`base`路径名称


## https

```
server {
    listen 80;
    server_name dianjiu.co www.dianjiu.co;
    rewrite ^(.*)$ https://$host$1 permanent; #所有的http请求，全部重定向到https中。
}
server {
        listen 443 ssl
        server_name  dianjiu.co www.dianjiu.co; 
        ssl_certificate      /app/ssl/dianjiu_co/dianjiu_co.crt; 
        ssl_certificate_key   /app/ssl/dianjiu_co/dianjiu_co.key; 
        ssl_session_timeout  5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; 
        ssl_ciphers  ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;#按照这个套件配
        ssl_prefer_server_ciphers   on;
        location / {
            root /app/web/dianjiu_co; #前端服务
            index  index.html index.htm;
        }
        location /api {
             ## 重写,转发前，将url中的某些参数进行过滤
             rewrite  ^/api/(.*)$ /$1 break;
             ## 代理转发地址,具体的 host 和 post 自己指定
             proxy_pass http://47.11.59.245:18181;
        }
}
```

+ [nginx安装ssl证书](https://www.cnblogs.com/JaminYe/p/15548522.html)
+ [Ngin bind() to 0.0.0.0:80 failed (10013: An attempt was made to access a socket in a way forbidden](https://blog.csdn.net/u010348546/article/details/124361693)