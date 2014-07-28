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

//phoenix.file_lister.js (phoenix/s3 file lister module) by ispyhumanfly...

/* p h o e n i x / s 3 _ f i l e _ l i s t e r */

/*****************************************************************************
 welcome to the file lister module for phoenix/s3. hands down this is the most
 full-featured file lister available for synchronet.  it includes the ability 
 to do all sysop related maintenance, is lightbar driven and includes the 
 optional file lister header for even more customization.  this module can be
 configured very easily within the lightbar library. 
*****************************************************************************/

/* s t r i n g _ c u s t o m i z a t i o n */

//additional strings to match the file lister... 
bbs.replace_text(197,"n\r6°±²Û Û0Þ \1nfilename\1c,\1n specs\1c,\1n or flags \1n\1c[\1n\1h\1knone\1n\1c]\1n\1c: ");
bbs.replace_text(198,"n\r6°±²Û Û0Þ \1nbatch download queue is full!");

/* f i l e _ l i s t e r */

//load the strings from config file [if configured]...
fileListerLightbar();
