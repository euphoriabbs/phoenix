# euphoriabbs

A Modern Bulletin Board System Built on Synchronet.

# Download & Install
	./Build

# Directory Structure

	root@euphoriabbs:/srv/phoenix# ls -alh

	drwxr-xr-x  5 root root 4.0K Feb 24 07:03 .
	drwxr-xr-x  4 root root 4.0K Feb 25 06:28 ..
	drwxr-xr-x  8 root root 4.0K Feb 26 15:15 .git
	-rw-r--r--  1 root root   77 Feb 16 01:53 .gitignore
	-rwxr-xr-x  1 root root 3.7K Feb 24 20:14 Build
	-rw-r--r--  1 root root 1.2K Feb 24 06:58 README.md
	lrwxrwxrwx  1 root root   23 Feb 16 02:18 data
	-rwxr-xr-x  1 root root   88 Feb 23 18:53 euphoria-allusers
	-rwxr-xr-x  1 root root   86 Feb 16 02:18 euphoria-jsexec
	-rwxr-xr-x  1 root root   88 Feb 23 18:45 euphoria-makeuser
	-rwxr-xr-x  1 root root   84 Feb 24 02:20 euphoria-node
	-rwxr-xr-x  1 root root   84 Feb 16 02:18 euphoria-sbbs
	lrwxrwxrwx  1 root root   31 Feb 16 02:18 euphoria-sbbs.ini
	-rwxr-xr-x  1 root root   84 Feb 16 02:18 euphoria-scfg
	lrwxrwxrwx  1 root root   27 Feb 16 02:18 logs
	drwxr-xr-x 17 root root 4.0K Feb 16 02:22 sbbs
	drwxr-xr-x  3 root root 4.0K Feb 16 01:52 ui

	root@euphoriabbs:/srv/phoenix#

# Post Installation Setup Notes
A few things I've ran into with recent builds of SBBS that are worth checking into on a first installation of Euphoria.
* Synchronet now supports user avatars. Super cool, but the default setup for SBBS as of January 2018 has this feature ran as a new user event. You will need to disable this in SCFG prior to allowing users to create accounts.
* Because the phoenix shell uses SBBS user exemptions to toggle various command shell features, you will need to add A-Z exemptions to the default user exemptions. This is configured in SCFG->System->New User Values.
* Euphoria doesn't require real first and last names. I don't have this as a question in the new user application. You will want to disable the requirement of real user names in SCFG->System->New User Values->Question Toggles->New User Questions.

# Operating Systems
Linux

# Issues
https://github.com/euphoriabbs/phoenix/issues

# Copyright
MIT
