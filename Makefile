#!/bin/sh

## Setup

export EUPHORIA_HOME=`pwd`
export SBBSCTRL=$EUPHORIA_HOME/.system/ctrl

## Download, Compile & Install Synchronet

mkdir -p .system; cd .system/

wget ftp://vert.synchro.net/Synchronet/sbbs_src.tgz
wget ftp://vert.synchro.net/Synchronet/sbbs_run.tgz
tar -xzf sbbs_src.tgz
tar -xzf sbbs_run.tgz
cd $EUPHORIA_HOME/.system/src/sbbs3; make RELEASE=1
cd $EUPHORIA_HOME/.system/src/sbbs3/scfg; make RELEASE=1
cd $EUPHORIA_HOME/.system/sbj; make
cd $EUPHORIA_HOME/.system/sbl; make
cd $EUPHORIA_HOME/.system/exec/

ln -s $EUPHORIA_HOME/.system/src/sbbs3/gcc.*.exe.release/* .
ln -s $EUPHORIA_HOME/.system/src/sbbs3/scfg/gcc.*.exe.release/scfg* .
make

## Make Euphoria Specific Changes

cd $EUPHORIA_HOME/.system/exec/
mv login.js login.js-original
mv logon.js logon.js-original
ln -s $EUPHORIA_HOME/layouts/phoenix_s3/telnet/phoenix.login.js $EUPHORIA_HOME/.system/exec/login.js
ln -s $EUPHORIA_HOME/layouts/phoenix_s3/telnet/phoenix.logon.js $EUPHORIA_HOME/.system/exec/logon.js
ln -s $EUPHORIA_HOME/layouts/phoenix_s3/telnet/phoenix.shell.js $EUPHORIA_HOME/.system/exec/phoenix.shell.js
cd $EUPHORIA_HOME/.system/text/
mv answer.wip answer.wip-original
mv answer.asc answer.asc-original

## Make 'euphoria-server' Command

cd $EUPHORIA_HOME ; touch euphoria-server ; chmod +x euphoria-server
echo "#!/bin/sh" >> euphoria-server
echo "export SBBSCTRL=$EUPHORIA_HOME/.system/ctrl" >> euphoria-server
echo "$EUPHORIA_HOME/.system/exec/sbbs" >> euphoria-server
echo "exit 0" >> euphoria-server

## Make 'euphoria-config' Command

cd $EUPHORIA_HOME ; touch euphoria-config ; chmod +x euphoria-config
echo "#!/bin/sh" >> euphoria-config
echo "export SBBSCTRL=$EUPHORIA_HOME/.system/ctrl" >> euphoria-config
echo "$EUPHORIA_HOME/.system/exec/scfg" >> euphoria-config
echo "exit 0" >> euphoria-config

mv $EUPHORIA_HOME/.system/ctrl/sbbs.ini $EUPHORIA_HOME/.system/ctrl/sbbs.ini-original
ln -s $EUPHORIA_HOME/system.ini $EUPHORIA_HOME/.system/ctrl/sbbs.ini 

exit 0
