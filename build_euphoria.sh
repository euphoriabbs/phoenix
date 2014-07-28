#!/bin/sh
wget ftp://vert.synchro.net/Synchronet/sbbs_src.tgz
wget ftp://vert.synchro.net/Synchronet/sbbs_run.tgz
tar -xzf sbbs_src.tgz
tar -xzf sbbs_run.tgz
cd src/sbbs3; make RELEASE=1
cd src/sbbs3/scfg; make RELEASE=1
cd xtrn/sbj; make
cd xtrn/sbl; make
cd exec/
ln -s ../src/sbbs3/gcc.*.exe.release/* .
ln -s ../src/sbbs3/scfg/gcc.*.exe.release/scfg* .
make

