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

//phoenix.message_reader.js [phoenix/s3 lightbar message reader] by tracker1, re-worked a bit ispyhumanfly...

/* p h o e n i x / s 3 _ m e s s a g e _ r e a d e r */

/*****************************************************************************
 welcome to the phoenix/s3 message reader.  this module is totally lightbar 
 driven, and yet takes full advantage of synchronets ability to use renegade
 style message commands.  it can be configured via the lightbar library.
*****************************************************************************/

//load the phoenix/s3 configuration script...
load("../phoenix_s3/config/phoenix.telnet_config.js");

/* s t r i n g _ c u s t o m i z a t i o n */
messageReaderStrings();

/* m e s s a g e _ r e a d e r */

//load the module from the lightbar library...
bbs.lightbar.message_reader();
