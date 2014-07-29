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

# Integrate Phoenix_s3
cd $EUPHORIA_INSTALL/sbbs/exec/

mv login.js login.js.original
ln -s $EUPHORIA_INSTALL/phoenix_s3/telnet/login.js login.js

mv logon.js logon.js.original
ln -s $EUPHORIA_INSTALL/phoenix_s3/telnet/logon.js logon.js
ln -s $EUPHORIA_INSTALL/phoenix_s3/telnet/phoenix.js phoenix.js

# Create Euphoria Daemon

cd $EUPHORIA_INSTALL ; touch euphoria.sh ; chmod +x euphoria.sh
echo "#!/bin/sh" >> euphoria.sh
echo "export SBBSCTRL=$EUPHORIA_INSTALL/sbbs/ctrl" >> euphoria.sh
echo "$EUPHORIA_INSTALL/sbbs/exec/sbbs" >> euphoria.sh

# Easy Synchronet Configuration
ln -s $EUPHORIA_INSTALL/sbbs/ctrl/sbbs.ini $EUPHORIA_INSTALL/phoenix_s3/config/phoenix.sbbs_config.ini

 


