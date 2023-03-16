# Nginx Reverse Proxy with Docker

A simple `nginx` proxy using `nodejs` and `redis` for tracking the number of visits to a page.

## Directory and File structure

The below directory structure with corresponding configuration files will be used

```bash
λ ls -R
docker-compose.yml nginx              web1               web2

./nginx:
Dockerfile nginx.conf

./web1:
Dockerfile   index.js     package.json

./web2:
Dockerfile   index.js     package.json
```

Each of the `nodejs` instances run on port `8081` and the `nginx` instance runs on default port `80`.

The configuration may be fired using the `docker-compose` as below:

```bash
λ docker-compose up --build
[+] Building 0.8s (23/23) FINISHED
 => [visits-web2 internal] load build definition from Dockerfile                                    0.0s
 => => transferring dockerfile: 31B                                                                 0.0s
 => [visits-web1 internal] load build definition from Dockerfile                                    0.0s
 => => transferring dockerfile: 31B                                                                 0.0s
 => [visits-nginx internal] load build definition from Dockerfile                                   0.0s
 => => transferring dockerfile: 32B                                                                 0.0s
 => [visits-web2 internal] load .dockerignore                                                       0.0s
 => => transferring context: 2B                                                                     0.0s
 => [visits-web1 internal] load .dockerignore                                                       0.0s
 => => transferring context: 2B                                                                     0.0s
 => [visits-nginx internal] load .dockerignore                                                      0.0s
 => => transferring context: 2B                                                                     0.0s
 => [visits-web1 internal] load metadata for docker.io/library/node:alpine                          0.6s
 => [visits-nginx internal] load metadata for docker.io/library/nginx:latest                        0.5s
 => [visits-web2 1/5] FROM docker.io/library/node:alpine@sha256:d3a3d691797cef0b70e361788a2aeb9dd7  0.0s
 => => resolve docker.io/library/node:alpine@sha256:d3a3d691797cef0b70e361788a2aeb9dd7925112996719  0.0s
 => [visits-web1 internal] load build context                                                       0.0s
 => => transferring context: 91B                                                                    0.0s
 => [visits-web2 internal] load build context                                                       0.0s
 => => transferring context: 91B                                                                    0.0s
 => CACHED [visits-web1 2/5] WORKDIR /app                                                           0.0s
 => CACHED [visits-web2 3/5] COPY package.json .                                                    0.0s
 => CACHED [visits-web2 4/5] RUN npm install                                                        0.0s
 => CACHED [visits-web2 5/5] COPY . .                                                               0.0s
 => CACHED [visits-web1 3/5] COPY package.json .                                                    0.0s
 => CACHED [visits-web1 4/5] RUN npm install                                                        0.0s
 => CACHED [visits-web1 5/5] COPY . .                                                               0.0s
 => [visits-nginx] exporting to image                                                               0.0s
 => => exporting layers                                                                             0.0s
 => => writing image sha256:25a7189c1968bfcdc3d41d958d0188a8cb1c24fee4c3aab05690dcae071d3cb9        0.0s
 => => naming to docker.io/library/visits-web2                                                      0.0s
 => => writing image sha256:96b48ce31a0e1bb2ca9008517e5ff8f0c019c5e15ad01d89cb1f4ff380ed5ebc        0.0s
 => => naming to docker.io/library/visits-web1                                                      0.0s
 => => writing image sha256:77c96eb46ee5ccd1b030ec3fc94edcdd4c8378098717673ca384458478033ef8        0.0s
 => => naming to docker.io/library/visits-nginx                                                     0.0s
 => [visits-nginx 1/3] FROM docker.io/library/nginx@sha256:aa0afebbb3cfa473099a62c4b32e9b3fb73ed23  0.0s
 => [visits-nginx internal] load build context                                                      0.0s
 => => transferring context: 32B                                                                    0.0s
 => CACHED [visits-nginx 2/3] RUN rm /etc/nginx/conf.d/default.conf                                 0.0s
 => CACHED [visits-nginx 3/3] COPY nginx.conf /etc/nginx/conf.d/default.conf                        0.0s
[+] Running 0/0
 ⠋ Network visits_default  Creating                                                                 0.0s
WARN[0001] Found orphan containers ([visits-node-app1-1 visits-node-app2-1]) for this project. If you rem[+] Running 5/5 this service in your compose file, you can run this command with the --remove-orphans fla ⠿ Network visits_default           Created                                                         0.0s
 ⠿ Container visits-redis-server-1  Created                                                         0.1s
 ⠿ Container visits-web1-1          Created                                                         0.1s
 ⠿ Container visits-web2-1          Created                                                         0.1s
 ⠿ Container visits-nginx-1         Created                                                         0.0s
Attaching to visits-nginx-1, visits-redis-server-1, visits-web1-1, visits-web2-1
visits-redis-server-1  | 1:C 16 Mar 2023 15:18:09.542 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
visits-redis-server-1  | 1:C 16 Mar 2023 15:18:09.542 # Redis version=7.0.9, bits=64, commit=00000000, modified=0, pid=1, just started
visits-redis-server-1  | 1:C 16 Mar 2023 15:18:09.542 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
visits-redis-server-1  | 1:M 16 Mar 2023 15:18:09.543 * monotonic clock: POSIX clock_gettime
visits-redis-server-1  | 1:M 16 Mar 2023 15:18:09.543 * Running mode=standalone, port=6379.
visits-redis-server-1  | 1:M 16 Mar 2023 15:18:09.543 # Server initialized
visits-redis-server-1  | 1:M 16 Mar 2023 15:18:09.546 * Ready to accept connections
visits-nginx-1         | /docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
visits-nginx-1         | /docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
visits-nginx-1         | /docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
visits-nginx-1         | 10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
visits-nginx-1         | 10-listen-on-ipv6-by-default.sh: info: /etc/nginx/conf.d/default.conf differs from the packaged version
visits-nginx-1         | /docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
visits-nginx-1         | /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
visits-nginx-1         | /docker-entrypoint.sh: Configuration complete; ready for start up
visits-nginx-1         | 2023/03/16 15:18:09 [notice] 1#1: using the "epoll" event method
visits-nginx-1         | 2023/03/16 15:18:09 [notice] 1#1: nginx/1.23.3
visits-nginx-1         | 2023/03/16 15:18:09 [notice] 1#1: built by gcc 10.2.1 20210110 (Debian 10.2.1-6)
visits-nginx-1         | 2023/03/16 15:18:09 [notice] 1#1: OS: Linux 5.15.49-linuxkit
visits-nginx-1         | 2023/03/16 15:18:09 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1048576:1048576
visits-nginx-1         | 2023/03/16 15:18:09 [notice] 1#1: start worker processes
visits-nginx-1         | 2023/03/16 15:18:09 [notice] 1#1: start worker process 28
visits-nginx-1         | 2023/03/16 15:18:09 [notice] 1#1: start worker process 29
visits-nginx-1         | 2023/03/16 15:18:09 [notice] 1#1: start worker process 30
visits-nginx-1         | 2023/03/16 15:18:09 [notice] 1#1: start worker process 31
visits-nginx-1         | 2023/03/16 15:18:09 [notice] 1#1: start worker process 32
visits-web2-1          |
visits-web2-1          | > web2_visits@1.0.0 start
visits-web2-1          | > node index.js
visits-web2-1          |
visits-web1-1          |
visits-web1-1          | > web1_visits@1.0.0 start
visits-web1-1          | > node index.js
visits-web1-1          |
visits-web1-1          | web1: Connecting to the Redis...
visits-web1-1          | web1: Listening over 8080
visits-web2-1          | web2: Connecting to the Redis...
visits-web2-1          | web2: Listening over 8080
```

The service may be accessed using `browser` or `curl` as below:

```shell
λ curl http://localhost:80
{"message":"(web1) Number of visits is 1"}

λ curl -v http://localhost:80
*   Trying 127.0.0.1:80...
* Connected to localhost (127.0.0.1) port 80 (#0)
> GET / HTTP/1.1
> Host: localhost
> User-Agent: curl/7.85.0
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Server: nginx/1.23.3
< Date: Thu, 16 Mar 2023 15:27:22 GMT
< Content-Type: application/json; charset=utf-8
< Content-Length: 42
< Connection: keep-alive
< X-Powered-By: Express
< ETag: W/"2a-ilUgkp+Izo5zAp6BW80uq6VKr2Q"
<
* Connection #0 to host localhost left intact
{"message":"(web1) Number of visits is 2"}
```

## Status

```bash
λ docker-compose ps
NAME                    IMAGE               COMMAND                  SERVICE             CREATED             STATUS              PORTS
visits-nginx-1          visits-nginx        "/docker-entrypoint.…"   nginx               10 minutes ago      Up 10 minutes       0.0.0.0:80->80/tcp
visits-redis-server-1   redis               "docker-entrypoint.s…"   redis-server        10 minutes ago      Up 10 minutes       0.0.0.0:6379->6379/tcp
visits-web1-1           visits-web1         "docker-entrypoint.s…"   web1                10 minutes ago      Up 10 minutes       0.0.0.0:8081->8080/tcp
visits-web2-1           visits-web2         "docker-entrypoint.s…"   web2                10 minutes ago      Up 10 minutes       0.0.0.0:8082->8080/tcp
```

## Shutdown

```bash
λ docker-compose down
[+] Running 5/4
 ⠿ Container visits-redis-server-1  Removed                                                         0.3s
 ⠿ Container visits-nginx-1         Removed                                                         0.2s
 ⠿ Container visits-web2-1          Removed                                                         0.8s
 ⠿ Container visits-web1-1          Removed                                                         0.7s
 ⠿ Network visits_default           Removed                                                         0.1s
```
