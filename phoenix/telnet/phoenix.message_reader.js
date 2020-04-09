//phoenix.message_reader.js

//load the phoenix/s3 configuration script...
load("/euphoria/phoenix/config.js");

/* s t r i n g _ c u s t o m i z a t i o n */
messageReaderStrings();

/* m e s s a g e _ r e a d e r */

//load the module from the lightbar library...
bbs.lightbar.message_reader();
