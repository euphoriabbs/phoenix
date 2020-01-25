//phoenix.file_lister.js

//load the phoenix/s3 configuration script...
load("../phoenix/config.js");

/* s t r i n g _ c u s t o m i z a t i o n */

//additional strings to match the file lister...
bbs.replace_text(197,"\r\1nfilename\1c,\1n specs\1c,\1n or flags \1n\1c[\1n\1h\1knone\1n\1c]\1n\1c: ");
bbs.replace_text(198,"\r\1nbatch download queue is full!");

/* f i l e _ l i s t e r */

//load the strings from config file [if configured]...
fileListerLightbar();


//load the module from the lightbar library...
bbs.lightbar.file_lister();

