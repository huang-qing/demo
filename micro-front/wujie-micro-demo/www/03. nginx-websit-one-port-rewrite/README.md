微应用部署方案：

1. 部署在多个站点中
2. 主应用在main文件夹中，有独立的端口
3. 子应用在module文件夹中，有独立的端口
4. 主应用配置反向代理到子应用ip

经验证：子应用内部的静态资源访问的路径不正确 ！


多应用多个端口，主应用配置多个子应用路径转发到相应的子应用端口上
1. 子应用可以单独访问
2. 每有一个新增子应用时，每次都要新增一个子应用端口和转发

子应用内部的静态资源访问的路径不正确 ！

```
http{
    # main
    server {
        listen       80;
        location / {
            try_files $uri $uri/ /index.html;
            root   /usr/share/nginx/main;
            index  index.html index.htm;
        }
        
        location /module/pms {
           try_files $uri $uri/ /index.html;
           proxy_pass http://127.0.0.1:8081;        
        }
        
        location /module/oms {
            try_files $uri $uri/ /index.html;
            proxy_pass http://127.0.0.1:8082;         
        }
    }
    
    # pms
    server {
        listen       8081;
        location / {
            try_files $uri $uri/ /index.html;
            root   /usr/share/nginx/pms;
            index  index.html index.htm;
        }
    }
    
    # oms
    server {
        listen       8082;
        location / {
            try_files $uri $uri/ /index.html;
            root   /usr/share/nginx/oms;
            index  index.html index.htm;
        }
    }
}
```