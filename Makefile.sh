#!/bin/sh

# Prepare the Environment

export EUPHORIA_INSTALL=`pwd`
export SBBSCTRL=$EUPHORIA_INSTALL/sbbs/ctrl

# Build Synchronet from Source
mkdir -p sbbs; cd sbbs/

wget ftp://vert.synchro.net/Synchronet/sbbs_src.tgz
wget ftp://vert.synchro.net/Synchronet/sbbs_run.tgz
tar -xzf sbbs_src.tgz
tar -xzf sbbs_run.tgz
cd $EUPHORIA_INSTALL/sbbs/src/sbbs3; make RELEASE=1
cd $EUPHORIA_INSTALL/sbbs/src/sbbs3/scfg; make RELEASE=1
cd $EUPHORIA_INSTALL/sbbs//sbj; make
cd $EUPHORIA_INSTALL/sbbs/sbl; make
cd $EUPHORIA_INSTALL/sbbs/exec/

ln -s $EUPHORIA_INSTALL/sbbs/src/sbbs3/gcc.*.exe.release/* .
ln -s $EUPHORIA_INSTALL/sbbs/src/sbbs3/scfg/gcc.*.exe.release/scfg* .
make

cd $EUPHORIA_INSTALL/sbbs/exec/
mv login.js login.js-original
mv logon.js logon.js-original
ln -s $EUPHORIA_INSTALL/phoenix_s3/telnet/login.js $EUPHORIA_INSTALL/sbbs/exec/login.js
ln -s $EUPHORIA_INSTALL/phoenix_s3/telnet/logon.js $EUPHORIA_INSTALL/sbbs/exec/logon.js
ln -s $EUPHORIA_INSTALL/phoenix_s3/telnet/phoenix.js $EUPHORIA_INSTALL/sbbs/exec/phoenix.js

cd $EUPHORIA_INSTALL ; touch euphoria-server ; chmod +x euphoria-server
echo "#!/bin/sh" >> euphoria-server
echo "export SBBSCTRL=$EUPHORIA_INSTALL/sbbs/ctrl" >> euphoria-server
echo "$EUPHORIA_INSTALL/sbbs/exec/sbbs" >> euphoria-server

cd $EUPHORIA_INSTALL/sbbs ; ln -s ../phoenix_s3/ .

mv $EUPHORIA_INSTALL/sbbs/ctrl/sbbs.ini $EUPHORIA_INSTALL/sbbs/ctrl/sbbs.ini-original
ln -s $EUPHORIA_INSTALL/phoenix_s3/config/phoenix.server_config.ini $EUPHORIA_INSTALL/sbbs/ctrl/sbbs.ini 

