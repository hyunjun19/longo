# longo
log to mongodb
로그를 몽고디비에 넣고 조회하는 시스템

log -> HTTP -> longo -> mongodb

# docker

[docker hub](https://hub.docker.com/r/hyunjun19/longo/tags/)

```
$ docker pull hyunjun19/longo:0.0.1
$ docker run -d -p 10390:10390 --name longo -e LONGO_PHASE="prod" hyunjun19/longo:0.0.1
```
