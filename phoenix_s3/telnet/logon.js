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

//logon.js [phoenix/s3 logon module] by ispyhumanfly... 

/* p h o e n i x / s 3 _ l o g o n _ s e q u e n c e */

/*****************************************************************************
 welcome to the logon module for phoenix/s3. this script was intended to be 
 the most complete logon experiance possible. it includes the optional quick
 logon menu (lightbar driven) with optional pre quick logon welcome ansi, and
 many features to add or remove certain aspects of the overall logon sequence.
 many features within this file can be configured via the config file, and 
 the menu library.
*****************************************************************************/

//definitions by digital man...
load("sbbsdefs.js");

//load the phoenix/s3 configuration script...
load("../phoenix_s3/config/phoenix.telnet_config.js");

//load phoenix/s3 required libraries...
load("../phoenix_s3/telnet/library/phoenix.external_library.js");
load("../phoenix_s3/telnet/library/phoenix.menu_library.js");
load("../phoenix_s3/telnet/library/phoenix.lightbar_library.js");

//log all remote connections to the system [if configured]...
if(do_logon_log) {
	bbs.menu.logon_log();
}

//load default phoenix/s3 values...
bbs.menu.user_defaults();

/* r e m o v e _ o l d _ f i l e s */

//will kill any remnant drop files from a prior session... 
if (file_exists(system.node_dir + "/msginfT")) file_remove(system.node_dir + "/msginf"); 
      if (file_exists(system.node_dir + "/msgtmpT")) file_remove(system.node_dir + "/msgtmp"); 
      if (file_exists(system.node_dir + "/XTRN.DAT")) file_remove(system.node_dir + "/XTRN.DAT"); 
      if (file_exists(system.node_dir + "/CHAIN.TXT")) file_remove(system.node_dir + "/CHAIN.TXT"); 
      if (file_exists(system.node_dir + "/DOOR.SYS")) file_remove(system.node_dir + "/DOOR.SYS"); 
      if (file_exists(system.node_dir + "/DORINFO1.DEF")) file_remove(system.node_dir + "/DORINFO1.DEF"); 
      if (file_exists(system.node_dir + "/DORINFO" + bbs.node_num + ".DEF")) file_remove(system.node_dir + "/DORINFO" + bbs.node_num + ".DEF"); 
      if (file_exists(system.node_dir + "/CALLINFO.BBS")) file_remove(system.node_dir + "/CALLINFO.BBS"); 
      if (file_exists(system.node_dir + "/PCBOARD.SYS")) file_remove(system.node_dir + "/PCBOARD.SYS"); 
      if (file_exists(system.node_dir + "/SFDOORS.DAT")) file_remove(system.node_dir + "/SFDOORS.DAT"); 
      if (file_exists(system.node_dir + "/UTIDOOR.TXT")) file_remove(system.node_dir + "/UTIDOOR.TXT"); 
      if (file_exists(system.node_dir + "/DOORFILE.SR")) file_remove(system.node_dir + "/DOORFILE.SR"); 
      if (file_exists(system.node_dir + "/TRIBBS.SYS")) file_remove(system.node_dir + "/TRIBBS.SYS"); 
      if (file_exists(system.node_dir + "/DOOR32.SYS")) file_remove(system.node_dir + "/DOOR32.SYS");

/* q u i c k  _  l o g o n _ m e n u */

//name the quick logon menus routine...
bbs.phoenix.menu_quick_logon = function() {
		
//update node status... 
system.node_list[bbs.node_num-1].action = NODE_LOGN; 

//display the quick welcome ansi [if configured]...
if(do_quick_welcome) {
	bbs.ansi_slow("art.phoenix.quick_welcome");
	
//now display a pause prompt...
console.pause();
	
}

//display the menu... 
bbs.ansi_norm("art.phoenix.menu_quick_logon");   

//assign a handler name for lightbar display...
var handlerName = 'quickLogonLightbar';

//load the lightbar module...
quickLogonLightbar(handlerName);
    
//commands available for the menu... 
	switch(cmdkey=console.getkeys("YN",K_UPPER)) {
		case 'Y':	//yes i want a quick logon... 
			bbs.phoenix.quick_logon_sequence();
			break;
		case 'N':	//no i want to display the entire logon sequence... 
		    bbs.phoenix.logon_sequence();
			break;  
		default:
			break;			
	}
}

/* q u i c k _ l o g o n _ s e q u e n c e */

//name the quick logon sequence routine...
bbs.phoenix.quick_logon_sequence = function() {

//display your logon ansis' in sequence [if configured]... 
if(do_logon_ansi) {

	//if random is true...
	if(do_random_ansi) {
	randomAnsi();
	
	//other wise...
	}else{
	bbs.ansi_slow("art.phoenix.logon_quick");
}	
	
//now display a pause prompt...
console.pause();
	
}	

//now load phoenix/s3 v1.0a command shell...
load("phoenix.js");

}

/* l o g o n _ s e q u e n c e */

//name the logon sequence routine...
bbs.phoenix.logon_sequence = function() {

//displays the scan header [if configured]...
if(do_sequence_scan) {
	bbs.ansi_norm("art.phoenix.logon_sequence-scan");

//force new message scan of the 'system notices' base...
var center = "                             ";							//center the output... 
var one    = "\1n\1h\1b[\1nloading system plugins\1n\1h\1b]\1n";		//not yet functional... 
var two    = " \1n\1h\1b[\1nverifying ip address\1n\1h\1b]\1n ";		//not yet functional... 
var three  = "   \1n\1h\1b[\1nscanning notices\1n\1h\1b]\1n   ";		//scan the system notices... 
var pause  = "\1,\1,\1,\1,";											//create a slight pause... 

//send the cursor back to column one... 
console.ansi_left(80);

//now display the variables... 
console.putmsg(center + one + pause);console.ansi_left(80);     
console.putmsg(center + two + pause);console.ansi_left(80);   
console.putmsg(center + three + pause);console.ansi_left(80);       

}

//this is so it will automatically go to the system notice... 
bbs.replace_text(67,"\r\n");

//must be set to an active 'system notices' sub or will cause errors...
bbs.scan_posts(""+ notices +"", 2 /* SCAN_NEW */);  

//now return the message scanner back to normal... 
bbs.revert_text(67); 

//display your logon ansis' in sequence [if configured]... 
if(do_logon_ansi) {

	//if random is true...
	if(do_random_ansi) {
	randomAnsi();
	
	//other wise...
	}else{
	bbs.ansi_slow("art.phoenix.logon_sequence-1");
}	
	
//now display a pause prompt...
console.pause();
	
}	

//load the user_stats module [if configured]... 
if(do_user_stats && user.security.exemptions&UFLAG_I) {
	bbs.menu.user_stats();
}	
 
//loads the oneliners module [if configured]...  
if(do_oneliners && user.security.exemptions&UFLAG_J) {
	bbs.menu.oneliners();
}	

//loads the totally shitty last few callers module [if configured]...
if(do_lastcalls && user.security.exemptions&UFLAG_K) {
	bbs.menu.last_few_callers();
}	

//display node status [if configured]...
if(do_node_list && user.security.exemptions&UFLAG_L) {
	bbs.menu.node_list();
}	

//display the ansi gallery [if configured]...
if(do_gallery && user.security.exemptions&UFLAG_G) {
	bbs.menu.ansi_gallery();
	
	//now display a pause prompt...
	console.pause();	
}

//loads phoenix/s3 v1.0a command shell... 
load("phoenix.js");

}

/* s t a r t _ u p */

//start up options configured via phoenix.telnet_config.js...
if(do_quick_logon) {
	bbs.phoenix.menu_quick_logon();

} else {

	bbs.phoenix.logon_sequence();
}	
