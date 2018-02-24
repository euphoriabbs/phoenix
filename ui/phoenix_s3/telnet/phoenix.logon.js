//phoenix.logon.js

load("sbbsdefs.js");

//load the phoenix/s3 configuration script...
load("../../ui/phoenix_s3/config.js");

//load phoenix/s3 required libraries...
load("../../ui/phoenix_s3/telnet/phoenix.external.js");
load("../../ui/phoenix_s3/telnet/phoenix.menu.js");
load("../../ui/phoenix_s3/telnet/phoenix.lightbar.js");

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

load("phoenix.shell.js");

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

	//now display a pause prompt...
	console.pause();
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

// Check for unread messages for a given user number. Thanks, echicken!
var checkUnread = function(un) {
 var unread = false;
 var mb = new MsgBase('mail');
 mb.open();
 for(var m = mb.first_msg; m <= mb.last_msg; m++) {
  var i = mb.get_msg_index(m);
  if(i === null || i.to != un || i.attr&MSG_READ)
   continue;
  unread = true;
  break;
 }
 mb.close();
 return unread;
}

// Would you like to read it?
if(checkUnread(user.number))
    if (console.yesno("\n\1n\1n :: \1n\1h\1kYou have mail. Would you like to read it now? ")) {
    bbs.menu.read_mail();
}

load("phoenix.shell.js");

}

/* s t a r t _ u p */

//start up options configured via phoenix.config.js...
if(do_quick_logon) {
	bbs.phoenix.menu_quick_logon();

} else {

	bbs.phoenix.logon_sequence();
}
