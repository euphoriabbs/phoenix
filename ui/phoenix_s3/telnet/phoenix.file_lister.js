//phoenix.file_lister.js

load("../../ui/phoenix_s3/config.js");
// load("../../ui/phoenix_s3/telnet/phoenix.menu.js");

/* s t r i n g _ c u s t o m i z a t i o n */

//additional strings to match the file lister...
bbs.replace_text(197,"n\r6���� �0� \1nfilename\1c,\1n specs\1c,\1n or flags \1n\1c[\1n\1h\1knone\1n\1c]\1n\1c: ");
bbs.replace_text(198,"n\r6���� �0� \1nbatch download queue is full!");

/* f i l e _ l i s t e r */

//load the strings from config file [if configured]...
fileListerLightbar();


//load the module from the lightbar library...
bbs.lightbar.file_lister();
//bbs.exec("/srv/phoenix/sbbs/exec/filelister-lb.js");

