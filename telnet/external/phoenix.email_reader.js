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

//phoenix.email_reader.js [phoenix/s3 lightbar email reader] by tracker1, re-worked a bit ispyhumanfly...

/* p h o e n i x / s 3 _ e m a i l _ r e a d e r */

/*****************************************************************************
 welcome to the email reader module for phoenix/s3. this module is lightbar 
 driven, but also takes advantage of synchronets ability to enable renegade
 style message functions.  it can be easily configured within the lightbar 
 library.
*****************************************************************************/

/* s t r i n g _ c u s t o m i z a t i o n */
messageReaderStrings();

/* m e s s a g e _ r e a d e r */

//load the module from the lightbar library...
bbs.lightbar.email_reader();
