
FROM ubuntu:latest as Euphoria
LABEL name="euphoria"
LABEL version="latest"

WORKDIR /euphoria/sbbs
ENV SBBSCTRL=/euphoria/sbbs/ctrl

RUN DEBIAN_FRONTEND=noninteractive apt-get update \
    && apt-get -y install build-essential python ruby wget \
    && apt-get -y install libncurses5-dev libc6-dev libc-dev g++ libnspr4-dev git cvs dosemu \
    && apt-get -y install pkg-config libzip-dev libsdl-kitchensink-dev zip unzip apt-utils \
    && apt-get -y install libmozjs-38-dev libmozjs-52-dev libcap2-dev lrzsz vim nodejs npm \ 
    && wget http://cvs.synchro.net/cgi-bin/viewcvs.cgi/*checkout*/install/terminfo \
    && wget http://cvs.synchro.net/cgi-bin/viewcvs.cgi/*checkout*/install/termcap \
    && tic terminfo && cat termcap >> /etc/termcap \
    && wget 'http://cvs.synchro.net/cgi-bin/viewcvs.cgi/*checkout*/install/GNUmakefile' \
    && make install SYMLINK=1 USE_DOSEMU=1 \
    && apt-get -y autoremove

WORKDIR /euphoria
COPY . .

RUN cd /euphoria/sbbs/exec/ \
    && mv login.js login.js-original \
    && mv logon.js logon.js-original \
    && cd /euphoria/sbbs/text/ \
    && mv answer.msg answer.msg-original ; touch answer.msg \
    && rm -rf /euphoria/sbbs/web/root \
    && ln -s /euphoria/phoenix/web/root /euphoria/sbbs/web/root \
    && ln -s /euphoria/phoenix/telnet/phoenix.login.js /euphoria/sbbs/exec/login.js \
    && ln -s /euphoria/phoenix/telnet/phoenix.logon.js /euphoria/sbbs/exec/logon.js \
    && ln -s /euphoria/phoenix/telnet/phoenix.shell.js /euphoria/sbbs/exec/phoenix.shell.js 

VOLUME .:/euphoria

# Start Euphoria
EXPOSE 22
EXPOSE 23
EXPOSE 80
EXPOSE 443

CMD ["/euphoria/sbbs/exec/sbbs"]
