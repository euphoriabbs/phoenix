//phoenix.noyesbar.js

//load the phoenix/s3 configuration script...
load("../../layouts/phoenix_s3/config.js");

/* s t r i n g _ c u s t o m i z a t i o n */

bbs.replace_text(560,"\1n\1k---");	//yes... 
bbs.replace_text(661,"\1n\1k---");	//no... 

/* n o / y e s _ q u e s t i o n */

//assign a handler name for lightbar recognition...
var handlerName = 'noQuestion';

//load the no/yes question from the lightbar library...
yesnoLightbar(handlerName);
