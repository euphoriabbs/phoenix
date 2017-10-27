//phoenix.external.js

/* m e s s a g e _ r e a d e r */

//load the message reader lightbar into the text.dat [if configured] ...
if(do_message_reader && (!(bbs.sys_status&SS_USERON) || (user.security.exemptions&UFLAG_P))) {
	bbs.replace_text(71,"@EXEC:../../ui/phoenix_s3/telnet/phoenix.message_reader.js@");

//if disabled...
}else{
	bbs.replace_text(71, "" + messageReader + ""); //put your string here...
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
bbs.replace_text(9,"@NOPAUSE@@CLS@@TYPE:../../ui/phoenix_s3/artwork/art.phoenix.message_reader.ans@@NOPAUSE@");

/* e m a i l _ r e a d e r */

//load the email reader lightbar into the text.dat [if configured]...
if(do_email_reader && (!(bbs.sys_status&SS_USERON) || (user.security.exemptions&UFLAG_P))) {
	bbs.replace_text(49,"@EXEC:../../ui/phoenix_s3/telnet/phoenix.email_reader.js@");

//if disabled...
}else{
	bbs.replace_text(49,"" + emailReader + ""); //put your string here...
}

/* f i l e _ l i s t i n g */

//load the spylister v3.0 file listing module [if configured]...
if(do_file_lister && (!(bbs.sys_status&SS_USERON) || (user.security.exemptions&UFLAG_Q))) {
	bbs.replace_text(660,"@EXEC:../../ui/phoenix_s3/telnet/phoenix.file_lister.js@");

//if disabled...
}else{
	bbs.replace_text(660,"" + fileLister + ""); //put your string here...
}

bbs.replace_text(661,"@NOPAUSE@@CLS@@TYPE:../../ui/phoenix_s3/artwork/art.phoenix.file_lister.ans@@NOPAUSE@"); //the header ansi...

/* q u e s t i o n _ l i g h t b a r s */

//loads the yes/no and no/yes javascript lightbar [if configured]...
if(do_yesno_lightbar && (!(bbs.sys_status&SS_USERON) || (user.security.exemptions&UFLAG_R))) {
	bbs.replace_text(559,"@NOPAUSE@@EXEC:../../ui/phoenix_s3/telnet/phoenix.yesnobar.js@@NOPAUSE@");	//defaults on yes...
	bbs.replace_text(562,"@NOPAUSE@@EXEC:../../ui/phoenix_s3/telnet/phoenix.noyesbar.js@@NOPAUSE@");	//defaults on no...

//if disabled...
}else{
	bbs.replace_text(559,"@NOPAUSE@@EXEC:../../ui/phoenix_s3/telnet/phoenix.yesno.js@@NOPAUSE@"); //defaults on yes...
	bbs.replace_text(562,"@NOPAUSE@@EXEC:../../ui/phoenix_s3/telnet/phoenix.noyes.js@@NOPAUSE@"); //defaults on no...
}

/* p a u s e _ p r o m p t */

//load the animated pause prompt module [if configured]...
if(do_animated_pause && (!(bbs.sys_status&SS_USERON) || (user.security.exemptions&UFLAG_O))) {
	bbs.replace_text(563,"@EXEC:../../ui/phoenix_s3/telnet/phoenix.anipause.js@");

//if disabled...
}else{
	bbs.replace_text(563,"" + pausePrompt + ""); //put your string here...
}
