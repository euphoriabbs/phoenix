#!/bin/sh

## Setup

export EUPHORIA_HOME=`pwd`
export SBBSCTRL=$EUPHORIA_HOME/.sbbs/ctrl

## Download, Compile & Install Synchronet

mkdir -p .euphoria; cd .euphoria/

wget ftp://vert.synchro.net/Synchronet/sbbs_src.tgz
wget ftp://vert.synchro.net/Synchronet/sbbs_run.tgz
tar -xzf sbbs_src.tgz
tar -xzf sbbs_run.tgz
cd $EUPHORIA_HOME/.euphoria/src/sbbs3; make RELEASE=1
cd $EUPHORIA_HOME/.euphoria/src/sbbs3/scfg; make RELEASE=1
cd $EUPHORIA_HOME/.euphoria/sbj; make
cd $EUPHORIA_HOME/.euphoria/sbl; make
cd $EUPHORIA_HOME/.euphoria/exec/

ln -s $EUPHORIA_HOME/.euphoria/src/sbbs3/gcc.*.exe.release/* .
ln -s $EUPHORIA_HOME/.euphoria/src/sbbs3/scfg/gcc.*.exe.release/scfg* .
make

## Make Euphoria Specific Changes

cd $EUPHORIA_HOME/.euphoria/exec/
mv login.js login.js-original
mv logon.js logon.js-original
ln -s $EUPHORIA_HOME/layouts/phoenix_s3/telnet/phoenix.login.js $EUPHORIA_HOME/.euphoria/exec/login.js
ln -s $EUPHORIA_HOME/layouts/phoenix_s3/telnet/phoenix.logon.js $EUPHORIA_HOME/.euphoria/exec/logon.js
ln -s $EUPHORIA_HOME/layouts/phoenix_s3/telnet/phoenix.shell.js $EUPHORIA_HOME/.euphoria/exec/phoenix.shell.js

## Remove Unwanted Text Files

cd $EUPHORIA_HOME/.euphoria/text/
mv answer.wip answer.wip-original
mv answer.asc answer.asc-original

## Make 'euphoria-server' Command

cd $EUPHORIA_HOME ; touch euphoria-server ; chmod +x euphoria-server
echo "#!/bin/sh" >> euphoria-server
echo "export SBBSCTRL=$EUPHORIA_HOME/.euphoria/ctrl" >> euphoria-server
echo "$EUPHORIA_HOME/.euphoria/exec/sbbs" >> euphoria-server
echo "exit 0" >> euphoria-server

## Make 'euphoria-config' Command

cd $EUPHORIA_HOME ; touch euphoria-config ; chmod +x euphoria-config
echo "#!/bin/sh" >> euphoria-config
echo "export SBBSCTRL=$EUPHORIA_HOME/.euphoria/ctrl" >> euphoria-config
echo "$EUPHORIA_HOME/.euphoria/exec/scfg" >> euphoria-config
echo "exit 0" >> euphoria-config

mv $EUPHORIA_HOME/.euphoria/ctrl/sbbs.ini $EUPHORIA_HOME/.euphoria/ctrl/sbbs.ini-original
ln -s $EUPHORIA_HOME/euphoria.ini $EUPHORIA_HOME/.euphoria/ctrl/sbbs.ini 

cd $EUPHORIA_HOME
mkdir data/ tmp/ logs/

exit 0
