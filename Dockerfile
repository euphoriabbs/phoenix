
FROM ubuntu:latest as Synchronet
LABEL name="synchronet"
LABEL version="latest"

WORKDIR /sbbs
ENV SBBSCTRL=/sbbs/ctrl

RUN DEBIAN_FRONTEND=noninteractive apt-get update \
    && apt-get -y install build-essential python ruby wget \
    && apt-get -y install libncurses5-dev libc6-dev libc-dev g++ libnspr4-dev git cvs dosemu \
    && apt-get -y install pkg-config libzip-dev libsdl-kitchensink-dev zip unzip apt-utils \
    && apt-get -y install libmozjs-38-dev libmozjs-52-dev libcap2-dev libcap2-bin sudo lrzsz vim nodejs npm \ 
    && wget http://cvs.synchro.net/cgi-bin/viewcvs.cgi/*checkout*/install/terminfo \
    && wget http://cvs.synchro.net/cgi-bin/viewcvs.cgi/*checkout*/install/termcap \
    && tic terminfo && cat termcap >> /etc/termcap \
    && wget 'http://cvs.synchro.net/cgi-bin/viewcvs.cgi/*checkout*/install/GNUmakefile' \
    && make install SYMLINK=1 USE_DOSEMU=1 \
    && apt-get -y autoremove

FROM Synchronet as Euphoria

WORKDIR /euphoria
COPY . .

RUN cd /sbbs/exec/ \
    && mv login.js login.js-original \
    && mv logon.js logon.js-original \
    && cd /sbbs/text/ \
    && mv answer.msg answer.msg-original ; touch answer.msg \
    && rm -rf /sbbs/web/root \
    && ln -s /euphoria/phoenix/web/root /sbbs/web/root \
    && ln -s /euphoria/phoenix/telnet/phoenix.login.js /sbbs/exec/login.js \
    && ln -s /euphoria/phoenix/telnet/phoenix.logon.js /sbbs/exec/logon.js \
    && ln -s /euphoria/phoenix/telnet/phoenix.shell.js /sbbs/exec/phoenix.shell.js 

VOLUME .:/euphoria

# Start Euphoria
EXPOSE 22
EXPOSE 23
EXPOSE 80
EXPOSE 443

CMD ["/sbbs/exec/sbbs"]
