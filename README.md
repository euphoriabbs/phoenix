# euphoriabbs

A Modern Bulletin Board System Built on Synchronet.

# Download & Install
	./Build

# Configure
	./euphoria-scfg
and...
	vim euphoria-sbbs.ini
# Server Start
	./euphoria-sbbs

# Post Installation Setup Notes
A few things I've ran into with recent builds of SBBS that are worth checking into on a first installation of Euphoria.
* Synchronet now supports user avatars. Super cool, but the default setup for SBBS as of January 2018 has this feature ran as a new user event. You will need to disable this in SCFG prior to allowing users to create accounts.
* Because the phoenix shell uses SBBS user exemptions to toggle various command shell features, you will need to add A-Z exemptions to the default user exemptions. This is configured in SCFG->System->New User Values.
* Euphoria doesn't require real first and last names. I don't have this as a question in the new user application. You will want to disable the requirement of real user names in SCFG->System->New User Values->Question Toggles->New User Questions.

# Operating Systems
Linux

# Issues
https://github.com/euphoriabbs/euphoria_s3/issues

# Copyright
We've yet to figure out which license to go with. But it will be open source, of course.




