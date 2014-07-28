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

//phoenix.external_library.js [phoenix/s3 external text.dat string changes] by ispyhumanfly... 

/* p h o e n i x / s 3 _ e x t e r n a l _ l i b r a r y */

/*****************************************************************************
 this program includes various 'global' alterations to the synchronet text.dat
 which includes various strings and modules to not only make phoenix/s3 work 
 more effeciently, but give the system administrator more hands on power over 
 phoenix/s3 and synchronet.  it also serves as the central configuration point
 for all of the modules within phoenix/s3 that must be loaded 'externally'
 meaning that these modules must be called directly from the text.dat
*****************************************************************************/

/* m e s s a g e _ r e a d e r */

//load the message reader lightbar into the text.dat [if configured] ...
if(do_message_reader && (!(bbs.sys_status&SS_USERON) || (user.security.exemptions&UFLAG_P))) {
	bbs.replace_text(71,"@EXEC:external/phoenix.message_reader@"); 

//if disabled... 
}else{
	bbs.replace_text(71,"" + messageReader + ""); //put your string here...
}		

//loads the customized message header...
bbs.replace_text(1,"\1n\1k");
bbs.replace_text(2,"\1n\1k");
bbs.replace_text(3,"\1n\1k");
bbs.replace_text(4,"\1n\1k");
bbs.replace_text(5,"\1n\1k");
bbs.replace_text(6,"\1n\1k");
bbs.replace_text(7,"\1n\1k");
bbs.replace_text(8,"\1n\1k");
bbs.replace_text(9,"@NOPAUSE@@CLS@@TYPE:../phoenix_s3/telnet/ansi/art.phoenix.message_reader.ans@@NOPAUSE@");

/* e m a i l _ r e a d e r */

//load the email reader lightbar into the text.dat [if configured]...
if(do_email_reader && (!(bbs.sys_status&SS_USERON) || (user.security.exemptions&UFLAG_P))) {
	bbs.replace_text(49,"@EXEC:external/phoenix.email_reader@"); 

//if disabled...
}else{
	bbs.replace_text(49,"" + emailReader + ""); //put your string here...
}		

/* f i l e _ l i s t i n g */

//load the spylister v3.0 file listing module [if configured]...
if(do_file_lister && (!(bbs.sys_status&SS_USERON) || (user.security.exemptions&UFLAG_Q))) {
	bbs.replace_text(660,"@EXEC:external/phoenix.file_lister@");

//if disabled...
}else{
	bbs.replace_text(660,"" + fileLister + ""); //put your string here...
}	
		
bbs.replace_text(661,"@NOPAUSE@@CLS@@TYPE:../phoenix_s3/telnet/ansi/art.phoenix.file_lister.ans@@NOPAUSE@"); //the header ansi...

/* q u e s t i o n _ l i g h t b a r s */

//loads the yes/no and no/yes javascript lightbar [if configured]... 
if(do_yesno_lightbar && (!(bbs.sys_status&SS_USERON) || (user.security.exemptions&UFLAG_R))) {
	bbs.replace_text(559,"@NOPAUSE@@EXEC:../phoenix_s3/telnet/external/phoenix.yesnobar.js@@NOPAUSE@");	//defaults on yes...
	bbs.replace_text(562,"@NOPAUSE@@EXEC:../phoenix_s3/telnet/external/phoenix.noyesbar.js@@NOPAUSE@");	//defaults on no... 

//if disabled...
}else{
	bbs.replace_text(559,"@NOPAUSE@@EXEC:../phoenix_s3/telnet/external/phoenix.yesno.js@@NOPAUSE@"); //defaults on yes...
	bbs.replace_text(562,"@NOPAUSE@@EXEC:../phoenix_s3/telnet/external/phoenix.noyes.js@@NOPAUSE@"); //defaults on no... 
}

/* p a u s e _ p r o m p t */ 

//load the animated pause prompt module [if configured]...
if(do_animated_pause && (!(bbs.sys_status&SS_USERON) || (user.security.exemptions&UFLAG_O))) {
	bbs.replace_text(563,"@EXEC:../phoenix_s3/telnet/external/phoenix.anipause.js@");

//if disabled...
}else{
	bbs.replace_text(563,"" + pausePrompt + ""); //put your string here...
}		
