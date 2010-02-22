/*****************************************************************************  
         _____         _____                            ____     ______
         \    \______ _)    \______  vanguard mods  ___/ __ )____>    /
          \    \    /_\_,    \    /___  ____ _______\_ ____  /  _    /
hx!------\ \  __\  /  _    \  \  /  _/_(   _U  \    _  \        /   / /-------
           /_______   \  ___\_____  L_     )        \  _\     ______\
                 /_______\       \   /  ___,----,______\ \_____\
                                 /_______\
                                           >>> vanguardmoddingcrew.com
                                           
*****************************************************************************/
//open_euphoria 2.0 development!

//phoenix.yesnobar.js [phoenix/s3 yes/no bar] by ispyhumanfly...

/* p h o e n i x / s 3 _ y e s / n o _ b a r */

/*****************************************************************************
 welcome to the phoenix/s3 yes/no lightbar module.  to the best of my
 knowledge this is the first 100% javascript lightbar module ever written for
 synchronet.  hands down, it's more powerful than the traditional baja driven
 yes/no bar.  this script can be modified via the lightbar library.
*****************************************************************************/

//load the phoenix/s3 configuration script...
load("../phoenix_s3/config/phoenix.telnet_config.js");

/* s t r i n g _ c u s t o m i z a t i o n */

bbs.replace_text(560,"\1n\1k---");	//yes... 
bbs.replace_text(661,"\1n\1k---");	//no... 

/* y e s / n o _ q u e s t i o n */

//assign a handler name for lightbar recognition...
var handlerName = 'yesQuestion';

//load the yes/no question from the lightbar library...
yesnoLightbar(handlerName); 
