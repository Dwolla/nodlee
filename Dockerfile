FROM ubuntu:groovy-20210614

RUN apt-get -y update
RUN apt-get -y install nodejs
RUN apt-get -y install npm

ADD . /src

RUN cd /src; npm install

EXPOSE 3003

CMD ["nodejs", "/src/app.js"]
