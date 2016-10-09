# longo docker image dockerfile
# $ docker build -t longo:0.0.1 .

From node:6.7

MAINTAINER HJ.Park <hyunjun19@gmail.com>

LABEL version="0.0.1"

USER root

ENV APP_HOME /data/app

ADD ./longo-app/ $APP_HOME/

WORKDIR $APP_HOME

RUN npm install -g pm2
RUN npm install

CMD ["npm", "start"]
