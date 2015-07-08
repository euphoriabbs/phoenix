#!/bin/sh

export EUPHORIA_VERSION=3.0.0

## Environment Setup

	export EUPHORIA_HOME=`pwd`
	export SBBSCTRL=$EUPHORIA_HOME/sbbs/ctrl

## Download, Compile & Install Synchronet

	mkdir sbbs; cd sbbs/

	wget ftp://vert.synchro.net/Synchronet/sbbs_src.tgz
	wget ftp://vert.synchro.net/Synchronet/sbbs_run.tgz
	tar -xvf sbbs_src.tgz
	tar -xvf sbbs_run.tgz

	cd $EUPHORIA_HOME/sbbs/src/sbbs3; make RELEASE=1
	cd $EUPHORIA_HOME/sbbs/src/sbbs3/scfg; make RELEASE=1
	cd $EUPHORIA_HOME/sbbs/sbj; make
	cd $EUPHORIA_HOME/sbbs/sbl; make
	cd $EUPHORIA_HOME/sbbs/exec/

	ln -s $EUPHORIA_HOME/sbbs/src/sbbs3/gcc.*.exe.release/* .
	ln -s $EUPHORIA_HOME/sbbs/src/sbbs3/scfg/gcc.*.exe.release/scfg* .
	make

## Integrate Synchronet w/ Euphoria

	### Core Integration
	
	cd $EUPHORIA_HOME
	cp sbbs/ctrl/sbbs.ini sbbs/ctrl/sbbs-original.ini	
	ln -s $EUPHORIA_HOME/sbbs/ctrl/sbbs.ini euphoria-sbbs.ini
	ln -s $EUPHORIA_HOME/sbbs/data/ .
	ln -s $EUPHORIA_HOME/sbbs/data/logs .

	### Integrate Synchronet w/ phoenix_s3

		cd $EUPHORIA_HOME/sbbs/exec/
		mv login.js login.js-original
		mv logon.js logon.js-original
		ln -s $EUPHORIA_HOME/ui/phoenix_s3/telnet/phoenix.login.js $EUPHORIA_HOME/sbbs/exec/login.js
		ln -s $EUPHORIA_HOME/ui/phoenix_s3/telnet/phoenix.logon.js $EUPHORIA_HOME/sbbs/exec/logon.js
		ln -s $EUPHORIA_HOME/ui/phoenix_s3/telnet/phoenix.shell.js $EUPHORIA_HOME/sbbs/exec/phoenix.shell.js

		cd $EUPHORIA_HOME/sbbs/text/
		mv answer.wip answer.wip-original
		mv answer.asc answer.asc-original

		#cd $EUPHORIA_HOME/sbbs/ ; rm -rf src/
		#rm exec/*.src ; rm exec/*.bin

	### Make 'euphoria-sbbs' Command

		cd $EUPHORIA_HOME ; touch euphoria-sbbs ; chmod +x euphoria-sbbs
		echo "#!/bin/sh" >> euphoria-sbbs
		echo "\nEuphoria $EUPHORIA_VERSION 'sbbs' Generated.\n"
		echo "export SBBSCTRL=$EUPHORIA_HOME/sbbs/ctrl" >> euphoria-sbbs
		echo "$EUPHORIA_HOME/sbbs/exec/sbbs" >> euphoria-sbbs
		echo "exit 0" >> euphoria-sbbs

	### Make 'euphoria-scfg' Command

		cd $EUPHORIA_HOME ; touch euphoria-scfg ; chmod +x euphoria-scfg
		echo "#!/bin/sh" >> euphoria-scfg
		echo "\nEuphoria $EUPHORIA_VERSION 'scfg' Generated.\n"
		echo "export SBBSCTRL=$EUPHORIA_HOME/sbbs/ctrl" >> euphoria-scfg
		echo "$EUPHORIA_HOME/sbbs/exec/scfg" >> euphoria-scfg
		echo "exit 0" >> euphoria-scfg

	### Make 'euphoria-jsexec' Command

		cd $EUPHORIA_HOME ; touch euphoria-jsexec ; chmod +x euphoria-jsexec
		echo "#!/bin/sh" >> euphoria-jsexec
		echo "\nEuphoria $EUPHORIA_VERSION 'jsexec' Generated.\n"
		echo "export SBBSCTRL=$EUPHORIA_HOME/sbbs/ctrl" >> euphoria-jsexec
		echo "$EUPHORIA_HOME/sbbs/exec/jsexec" >> euphoria-jsexec
		echo "exit 0" >> euphoria-jsexec

exit 0

