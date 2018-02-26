//phoenix.shell.js

//create a variable for command keys...
var cmdkey;

/* m a i n _ m e n u */

//name the phoenix main menus routine...
bbs.phoenix.menu_main = function() {

//update node status...
system.node_list[bbs.node_num-1].action = NODE_MAIN;

//display the menu...
bbs.ansi_norm("art.phoenix.menu_main");

//display the random rumor [if configured]...
if(do_rumors && user.security.exemptions&UFLAG_N) {

	//where you would like the rumor located...
	console.gotoxy(rumorMain_column,rumorMain_line);console.print(rumorMain_string);

	//display the rumor...
	bbs.menu.rumor_display();

}

//load the lightbar prompt module [if configured]...
if(do_lightbar_prompts && user.security.exemptions&UFLAG_M) {

	//launch the lightbar setup from the config file...
	mainLightbarPrompt();

//if disabled...
} else {

	//put your x,y instructions here...
	console.gotoxy(promptMain_column,promptMain_line);
}

    //commands available for the menu...
	switch(cmdkey=console.getkeys("MFECXIORWPGQ;@#$%-",K_UPPER)) {
		case 'M':	//message menu...
			if (do_lightbar_prompts  && user.security.exemptions&UFLAG_M) {
					bbs.phoenix.menu_new_msg_scan();
			} else {
					bbs.phoenix.menu_message();
			}
			break;
		case 'F':	//file menu...
			if (do_lightbar_prompts  && user.security.exemptions&UFLAG_M) {
				bbs.phoenix.menu_new_file_scan();
			} else {
				bbs.phoenix.menu_file();
			}
			break;
		case 'E':	//email menu...
			bbs.phoenix.menu_email();
			break;
		case 'C':	//chat menu...
			bbs.exec("?irc -a localhost 6667 #euphoria");
			break;
		case 'X':	//xtrn menu...
			if(do_lightbar_prompts && user.security.exemptions&UFLAG_M) {
				bbs.phoenix.xtrn_sec();
			} else {
				bbs.xtrn_sec();
			}
			break;
		case 'I':	//system information menu...
			bbs.phoenix.menu_information();
			break;
		case 'O':	//oneliners...
			bbs.menu.oneliners();
			break;
		case 'R':	//rumors...

					//if rumors are disabled...
					if(do_rumors && user.security.exemptions&UFLAG_N) {

					//then send to rumor input...
					bbs.menu.rumor_input();
					}
			break;
		case 'W':	//who's online...
			console.gotoxy(1,22);bbs.menu.node_list();
			break;
		case 'P':	//page sysop...
			console.clear();bbs.page_sysop();
			break;
		case 'G' || '/G':	//log off...

				//Confirm user would like to log off...

				//if random is true...
				if(do_random_ansi) {
					randomAnsi();

				//other wise...
				}else{
					bbs.ansi_slow("art.phoenix.logoff");
				}
				bbs.hangup();

			break;
		case ';':	//sysop commands...
		    bbs.menu.sysop_commands();
			break;

        //global jump points for the lightbar prompt...
		case '@':	//main menu...
			bbs.phoenix.menu_main();
			break;
		case '#':	//message menu...
			bbs.phoenix.menu_new_msg_scan();
			break;
		case '$':	//file menu...
			bbs.phoenix.menu_new_file_scan();
			break;
		case '%':	//chat menu...
			bbs.exec("?irc -a localhost 6667 #euphoria");
			break;
		case '-':	//information...
			bbs.phoenix.menu_information();
			break;
		default:
			break;
	}

//create loop point for the menu...
while(1) bbs.phoenix.menu_main();

}

/* i n f o r m a t i o n _ m e n u */

//name the phoenix information menus routine...
bbs.phoenix.menu_information = function() {

//update node status...
system.node_list[bbs.node_num-1].action = NODE_DFLT;

//display the menu...
bbs.ansi_norm("art.phoenix.menu_information");

//load the lightbar module [if configured]...
if(do_lightbar_prompts && user.security.exemptions&UFLAG_M) {

	//launch the lightbar setup from the config file...
	infoLightbarPrompt();

//if disabled...
} else {

	//put your x,y instructions here...
	console.gotoxy(promptInfo_column,promptInfo_line);
}

    //commands available for the menu...
	switch(cmdkey=console.getkeys("SKULCYBQ;@#$%-",K_UPPER)) {
		case 'S':	//system information...
			 bbs.menu.system_info();
			break;
		case 'K':	//credits to euphoria...
			 bbs.menu.system_kredits();
			break;
		case 'U':	//user listings...
			bbs.menu.user_list();console.pause();
			break;
		case 'L':	//last few callers...
			bbs.menu.last_few_callers();
			break;
		case 'C':	//configure setup...
			bbs.menu.config_setupOne();bbs.menu.config_setupTwo();
			break;
		case 'Y':	//your stats...
			bbs.menu.user_stats();console.pause();
			break;
		case 'B':	//bbs list...

			break;
		case 'Q':	//quit...
			bbs.phoenix.menu_main();
			break;

        //global jump points for the lightbar prompt...
		case '@':	//main menu...
			bbs.phoenix.menu_main();
			break;
		case '#':	//message menu...
			bbs.phoenix.menu_new_msg_scan();
			break;
		case '$':	//file menu...
			bbs.phoenix.menu_new_file_scan();
			break;
		case '%':	//chat menu...
			bbs.exec("?irc -a localhost 6667 #euphoria");
			break;
		case '-':	//information...
			bbs.phoenix.menu_information();
			break;
		default:
			break;

	}

//create loop point for the menu...
while(1) bbs.phoenix.menu_information();

}

/* x t r n _ m e n u */

//name the xtrn menus routine...
bbs.phoenix.xtrn_sec = function() {

//update node status...
bbs.node_action=NODE_XTRN;

//begin select list settings...
bbs.mods.vanguard.assault.xtrn_sec.select_options = {};
bbs.mods.vanguard.assault.xtrn_sec.select_options.x1 = 46;
bbs.mods.vanguard.assault.xtrn_sec.select_options.y1 = 13;
bbs.mods.vanguard.assault.xtrn_sec.select_options.x2 = 79;
bbs.mods.vanguard.assault.xtrn_sec.select_options.y2 = 21;

//begin initialize...
bbs.mods.vanguard.assault.xtrn_sec.options = {}
bbs.mods.vanguard.assault.xtrn_sec.options.mainExit = false;

//method to load the ansi display...
bbs.mods.vanguard.assault.xtrn_sec.loadAnsi = function() {
	bbs.mods.vanguard.assault.xtrn_sec.options.reloadAnsi = false;
	console.line_counter = 0;
	console.clear();
	bbs.mods.vanguard.ansislow("art.phoenix.menu_xtrn_sec");
	console.line_counter = 0;
}

//handle raised/control characters...
bbs.mods.vanguard.assault.xtrn_sec.ctrl_handler = function(k) {
	//display awaiting messages
	if (k == "" && ((system.node_list[bbs.node_num-1].misc&NODE_NMSG) != 0)||((system.node_list[bbs.node_num-1].misc&NODE_MSGW) != 0)) {
		console.line_counter = 0;
		console.print("\1"+"0\1n\1l\1cIncomming Messsage(s) \r\n\1h\1k---\1n\r\n");
		sleep(500); //sleep before to let any messages finish.
		while (((system.node_list[bbs.node_num-1].misc&NODE_NMSG) != 0)||((system.node_list[bbs.node_num-1].misc&NODE_MSGW) != 0)) {
			bbs.nodesync();
			sleep(1000); //longer wait after message (sometimes multiple msgs from logon/off).
		}
		console.print("\1h\1k---\1n\r\n");

		bbs.sys_status &= ~SS_ABORT;
		while (console.inkey() != "") {/*do nothing - clear buffer*/};
		console.pause();
		bbs.mods.vanguard.assault.xtrn_sec.options.reloadAnsi = true;
	} else if (k.charCodeAt(0) < 32) {
		console.line_counter = 0;
		console.clear();
		console.line_counter = 0;

		if (k.toString().length) {
			switch(k.charCodeAt(0)) {
				case 26: //ctrl-z - unfiltered input - ignore
					break;
				case 3: //ctrl-c
				case 27: //escape
					bbs.mods.vanguard.assault.xtrn_sec.options.mainExit = true;
					break;
				case 11: //ctrl-k - hotkey listing
				case 20: //ctrl-t - time listing
					console.handle_ctrlkey(k,0); // for now
					console.pause();
					break;
				default:
					console.handle_ctrlkey(k,0); // for now
					break;
			}
		}

		bbs.mods.vanguard.assault.xtrn_sec.options.reloadAnsi = true;
	}
}

//returns a sub selection...
bbs.mods.vanguard.assault.xtrn_sec.runProgram = function(current_group) {
	var iCount = 0;
	var iCurrent = 0;
	var options = new Array();
	var _group = xtrn_area.sec_list[current_group]
	var x;
	options[""] = "(back)";

	//populate list based on _group...
	if (_group) {
		for (x in _group.prog_list) {
			if (user.compare_ars(_group.prog_list[x].ars)) {
				options[x] = _group.prog_list[x].name;
			}
		}
	}

	var sl = new bbs.mods.vanguard.selectList(options,bbs.mods.vanguard.assault.xtrn_sec.select_options.x1,bbs.mods.vanguard.assault.xtrn_sec.select_options.y1+3,bbs.mods.vanguard.assault.xtrn_sec.select_options.x2,bbs.mods.vanguard.assault.xtrn_sec.select_options.y2);
	sl.padText = true;
	sl.current = 0;

	bbs.mods.vanguard.assault.xtrn_sec.options.reloadAnsi = true;

	while (bbs.online && !bbs.mods.vanguard.assault.xtrn_sec.options.mainExit) {
		if (bbs.mods.vanguard.assault.xtrn_sec.options.reloadAnsi == true) {
			bbs.mods.vanguard.assault.xtrn_sec.loadAnsi();
			console.gotoxy(bbs.mods.vanguard.assault.xtrn_sec.select_options.x1,bbs.mods.vanguard.assault.xtrn_sec.select_options.y1);
			print("\1n\1"+"6\1k" + ("section - \1b" + _group.name + sl.padding).substring(0,bbs.mods.vanguard.assault.xtrn_sec.select_options.x2 - bbs.mods.vanguard.assault.xtrn_sec.select_options.x1+2));
			console.gotoxy(bbs.mods.vanguard.assault.xtrn_sec.select_options.x1,bbs.mods.vanguard.assault.xtrn_sec.select_options.y1+1);
			print("\1n\1"+"6\1k" + ("select a module." + sl.padding).substring(0,bbs.mods.vanguard.assault.xtrn_sec.select_options.x2 - bbs.mods.vanguard.assault.xtrn_sec.select_options.x1));
			console.gotoxy(bbs.mods.vanguard.assault.xtrn_sec.select_options.x1,bbs.mods.vanguard.assault.xtrn_sec.select_options.y1+2);
			print("\1n" + sl.padding.replace(/ /g,"-").substring(0,bbs.mods.vanguard.assault.xtrn_sec.select_options.x2 - bbs.mods.vanguard.assault.xtrn_sec.select_options.x1));
		}

		var k = sl.choose();
		if (sl.raised != null) {
			bbs.mods.vanguard.assault.xtrn_sec.ctrl_handler(sl.raised);
		} else if (k == "") {
			return;
		} else {
			bbs.exec_xtrn(_group.prog_list[k].code);
			if (console.line_count)
				console.pause();
			bbs.mods.vanguard.assault.xtrn_sec.options.reloadAnsi = true;
		}
	}
}

bbs.mods.vanguard.assault.xtrn_sec.getgrp = function(current_group) {
	var iCount = 0;
	var iCurrent = 0;
	var options = new Array();
	options[""] = "(back)";
	var x;
	for (x in xtrn_area.sec_list) {
		if (user.compare_ars(xtrn_area.sec_list[x])) {
			iCount++;
			options[x] = xtrn_area.sec_list[x].name;
			if (x == current_group)
				iCurrent = iCount;
		}
	}
	if (!iCount) {
		console.line_count = 0;
		console.clear();
		console.print("\1n\1h\1rWarning:\1n \r\nYou do not have access to any external sections\r\n");
		console.pause();
		return "";
	}

	var sl = new bbs.mods.vanguard.selectList(options,bbs.mods.vanguard.assault.xtrn_sec.select_options.x1,bbs.mods.vanguard.assault.xtrn_sec.select_options.y1+2,bbs.mods.vanguard.assault.xtrn_sec.select_options.x2,bbs.mods.vanguard.assault.xtrn_sec.select_options.y2);
	sl.current = iCurrent;
	sl.padText = true;
	sl.showKeys = false;

	bbs.mods.vanguard.assault.xtrn_sec.options.reloadAnsi = true;
	while (bbs.online && !bbs.mods.vanguard.assault.xtrn_sec.options.mainExit) {
		if (bbs.mods.vanguard.assault.xtrn_sec.options.reloadAnsi == true) {
			bbs.mods.vanguard.assault.xtrn_sec.loadAnsi();
			console.gotoxy(bbs.mods.vanguard.assault.xtrn_sec.select_options.x1,bbs.mods.vanguard.assault.xtrn_sec.select_options.y1);
			print("\1n\1"+"6\1k" + ("select a section."+sl.padding).substring(0,bbs.mods.vanguard.assault.xtrn_sec.select_options.x2 - bbs.mods.vanguard.assault.xtrn_sec.select_options.x1));
			console.gotoxy(bbs.mods.vanguard.assault.xtrn_sec.select_options.x1,bbs.mods.vanguard.assault.xtrn_sec.select_options.y1+1);
			print("\1n" + sl.padding.replace(/ /g,"-").substring(0,bbs.mods.vanguard.assault.xtrn_sec.select_options.x2 - bbs.mods.vanguard.assault.xtrn_sec.select_options.x1));
		}

		var k = sl.choose();
		if (sl.raised != null)
			bbs.mods.vanguard.assault.xtrn_sec.ctrl_handler(sl.raised);
		else if (k == "")
			return "";
		else
			return k;
	}
	bbs.mods.vanguard.assault.xtrn_sec.options.mainExit = false;
	return "";
}

//xtrn_sec starting point...
bbs.mods.vanguard.assault.xtrn_sec.main = function() {
	try {
		system.node_list[bbs.node_num-1].action = NODE_XTRN;

		//bbs.trace.write("vanguard.assault.xtrn_sec","begin main()");
		if (console.line_counter)
			console.pause();

		console.status &= ~CON_RAW_IN; // no raw input
		var exit_menu = false;

		bbs.mods.vanguard.assault.xtrn_sec.options.mainExit = false;
		bbs.mods.vanguard.assault.xtrn_sec.options.reloadAnsi = true;
		var current_group = "";
		while (bbs.online && !bbs.mods.vanguard.assault.xtrn_sec.options.mainExit) {
			var k = bbs.mods.vanguard.assault.xtrn_sec.getgrp(current_group);
			if (!k || k == "") {
				bbs.mods.vanguard.assault.xtrn_sec.options.mainExit = true;
			} else if (xtrn_area.sec_list[k]) {
				print("\1n ");
				current_group = k;
				bbs.mods.vanguard.assault.xtrn_sec.runProgram(k);
				bbs.mods.vanguard.assault.xtrn_sec.options.mainExit = false; //only drop from runProgram to grouplist
				bbs.mods.vanguard.assault.xtrn_sec.options.reloadAnsi = true;
			}
		}

	//bbs.trace.write("vanguard.assault.xtrn_sec","end main()");
	} catch(err) {
		bbs.trace.render(err);
	}
	console.line_counter = 0;
	console.clear();

/* Begin trace/debug settings ************************************************/
if (bbs.mods.vanguard.assault.xtrn_sec.debug) {
	if (bbs.mods.vanguard.assault.xtrn_sec.firstTrace) {

	}

}
/* End trace/debug settings **************************************************/

}

//begin the menu...
bbs.mods.vanguard.assault.xtrn_sec.main();

}

/* m e s s a g e _ m e n u */

//name the phoenix message menus routine...
bbs.phoenix.menu_message = function() {

//load the menu specific strings...
bbs.menu.message_strings();

//update node status...
system.node_list[bbs.node_num-1].action = NODE_RMSG;

//display the menu...
bbs.ansi_norm("art.phoenix.menu_message");

//display the random rumor [if configured]...
if(do_rumors && user.security.exemptions&UFLAG_N) {

	//where you would like the rumor located...
	console.gotoxy(rumorMessage_column,rumorMessage_line);console.print(rumorMessage_string);

	//display the rumor...
	bbs.menu.rumor_display();

}

//load the lightbar prompt [if configured]...
if(do_lightbar_prompts && user.security.exemptions&UFLAG_M) {

	//launch the lightbar setup from the config file...
	messageLightbarPrompt();

//if disabled...
} else {

	//put your x,y instructions here...
	console.gotoxy(promptMessage_column,promptMessage_line);
}

//commands available for the menu...
	switch(cmdkey=console.getkeys("AGRPONSC@;Q[]<>#$%-",K_UPPER)) {
		case '[':	//previous message sub...
			bbs.lastsub=bbs.cursub;bbs.cursub--;if (bbs.lastsub == bbs.cursub) bbs.cursub = msg_area.grp_list[bbs.curgrp].sub_list.length-1
			break;
		case ']':	//next message sub...
			bbs.lastsub=bbs.cursub;bbs.cursub++;if (bbs.lastsub == bbs.cursub) bbs.cursub = 0
			break;
		case '<':	//previous message group...
			bbs.lastgrp=bbs.curgrp;bbs.curgrp--;if (bbs.lastgrp == bbs.curgrp) bbs.curgrp = msg_area.grp_list.length-1
			break;
		case '>':	//next message group...
			bbs.lastgrp=bbs.curgrp;bbs.curgrp++;if (bbs.lastgrp == bbs.curgrp) bbs.curgrp = 0
			break;
		case 'A':	//check area listings...
			bbs.menu.msg_select_subboard();
			break;
		case 'G':	//check group listings...
			bbs.menu.msg_select_group();
			break;
		case 'R':	//read messages...
			bbs.menu.read_msgs();
			break;
		case 'P':	//post a message...
		 	bbs.menu.post_msgs();
			break;
		case 'O':	//offline mail...
			// console.gotoxy(1,24); //where you want the cursor located...
			// console.print("\1n\1g\1h<\1neuphoria\1n\1g\1h> \1n\1h\1k::\1n dude, wake up, and realize that it's 2006!\1.");
			bbs.qwk_sec();
			break;
		case 'N':	//new message scan...
			bbs.scan_subs(SCAN_NEW, true);
			break;
		case 'S':	//scan messages menu...
			bbs.phoenix.menu_message_scan();
			break;
		case 'C':	//configure message scan menu...
			bbs.phoenix.menu_message_config_scan();
			break;
		case 'Q':	//quit to main...
		        bbs.phoenix.menu_main();
			break;

		case ';':	//sysop commands...
		    bbs.menu.sysop_commands();
			break;

        //global jump points for the lightbar prompt...
		case '@':	//main menu...
			bbs.phoenix.menu_main();
			break;
		case '#':	//message menu...
			bbs.phoenix.menu_new_msg_scan();
			break;
		case '$':	//file menu...
			bbs.phoenix.menu_new_file_scan();
			break;
		case '%':	//chat menu...
			bbs.exec("?irc -a localhost 6667 #euphoria");
			break;
		case '-':	//information...
			bbs.phoenix.menu_information();
			break;
		default:
			break;
	}

//create loop point for the menu...
while(1) bbs.phoenix.menu_message();

}

/* m e s s a g e _ s c a n _ m e n u */

//name the phoenix message scan menus routine...
bbs.phoenix.menu_message_scan = function() {

//update node status...
system.node_list[bbs.node_num-1].action = NODE_DFLT;

//display the menu...
bbs.ansi_norm("art.phoenix.menu_message_scan");

//load the lightbar module [if configured]...
if(do_lightbar_prompts && user.security.exemptions&UFLAG_M) {

	//launch the lightbar setup from the config file...
	msgScanMenuLightbarPrompt();

//if disabled...
} else {

	//put your x,y instructions here...
	console.gotoxy(promptMsgScanMenu_column,promptMsgScanMenu_line);
}

    //commands available for the menu...
	switch(cmdkey=console.getkeys("NYTCQ;@#$%-",K_UPPER)) {
		case 'N':   //new scan messages...
			console.clear();bbs.scan_subs(SCAN_NEW);
			break;
		case 'Y':	//your messages...
			console.clear();bbs.scan_subs(SCAN_TOYOU);
			break;
		case 'T':	//search text...
			console.clear();bbs.scan_subs(SCAN_FIND);
			break;
		case 'C':	//configure newscan...
			bbs.phoenix.menu_message_config_scan();
			break;
		case 'Q':	//quit...
			bbs.phoenix.menu_message();
			break;

        //global jump points for the lightbar prompt...
		case '@':	//main menu...
			bbs.phoenix.menu_main();
			break;
		case '#':	//message menu...
			bbs.phoenix.menu_new_msg_scan();
			break;
		case '$':	//file menu...
			bbs.phoenix.menu_new_file_scan();
			break;
		case '%':	//chat menu...
			bbs.exec("?irc -a localhost 6667 #euphoria");
			break;
		case '-':	//information...
			bbs.phoenix.menu_information();
			break;
		default:
			break;
	}

//create loop point for the menu...
while(1) bbs.phoenix.menu_message_scan();

}

/* m e s s a g e _ c o n f i g _ s c a n _ m e n u */

//name the phoenix message config scan menus routine...
bbs.phoenix.menu_message_config_scan = function() {

//update node status...
system.node_list[bbs.node_num-1].action = NODE_DFLT;

//display the menu...
bbs.ansi_slow("art.phoenix.menu_message_config_scan");

//load the lightbar module [if configured]...
if(do_lightbar_prompts && user.security.exemptions&UFLAG_M) {

	//launch the lightbar setup from the config file...
	msgConfigScanMenuLightbarPrompt();

//if disabled...
} else {

	//put your x,y instructions here...
	console.gotoxy(promptMsgConfigMenu_column,promptMsgConfigMenu_line);
}

    //commands available for the menu...
	switch(cmdkey=console.getkeys("SYCIQ;@#$%-",K_UPPER)) {
		case 'S':	//scan configuration...
			console.clear();bbs.cfg_msg_scan();
			break;
		case 'Y':	//your message scan configuration...
			console.clear();bbs.cfg_msg_scan(SCAN_TOYOU);
			break;
		case 'C':	//config message pointers...
			console.clear();bbs.cfg_msg_ptrs();
			break;
		case 'I':	//reinit point defaults...
			console.clear();bbs.reinit_msg_ptrs();
			break;
		case 'Q':	//quit...
			bbs.phoenix.menu_message();
			break;

        //global jump points for the lightbar prompt...
		case '@':	//main menu...
			bbs.phoenix.menu_main();
			break;
		case '#':	//message menu...
			bbs.phoenix.menu_new_msg_scan();
			break;
		case '$':	//file menu...
			bbs.phoenix.menu_new_file_scan();
			break;
		case '%':	//chat menu...
			bbs.exec("?irc -a localhost 6667 #euphoria");
			break;
		case '-':	//information...
			bbs.phoenix.menu_information();
			break;
		default:
			break;
	}

//create loop point for the menu...
while(1) bbs.phoenix.menu_message_config_scan();

}

/* f i l e _ m e n u */

//name the phoenix file menus routine...
bbs.phoenix.menu_file = function() {

//update node status...
system.node_list[bbs.node_num-1].action = NODE_XFER;

//display the menu...
bbs.ansi_norm("art.phoenix.menu_file");

//display the random rumor [if configured]...
if(do_rumors && user.security.exemptions&UFLAG_N) {

	//where you would like the rumor located...
	console.gotoxy(rumorFile_column,rumorFile_line);console.print(rumorFile_string);

	//display the rumor...
	bbs.menu.rumor_display();

}

//load the lightbar prompt module [if configured]...
if(do_lightbar_prompts && user.security.exemptions&UFLAG_M) {

	//launch the lightbar setup from the config file...
	fileLightbarPrompt();

//if disabled...
} else {

	//put your x,y instructions here...
	console.gotoxy(promptFile_column,promptFile_line);
}

    //commands available for the menu...
	switch(cmdkey=console.getkeys("[]<>AGTLNUDXBSQ;@#$%-",K_UPPER)) {
		case '[':	//previous file library...
			bbs.lastlib=bbs.curlib;bbs.curlib--;if (bbs.lastlib == bbs.curlib) bbs.curlib = file_area.lib_list.length-1
			break;
		case ']':	//next file library...
			bbs.lastlib=bbs.curlib;bbs.curlib++;if (bbs.lastlib == bbs.curlib) bbs.curlib = 0
			break;
		case '<':	//previous file directory...
			bbs.lastdir=bbs.curdir;bbs.curdir--;if (bbs.lastdir == bbs.curdir) bbs.curdir = file_area.lib_list[bbs.curlib].dir_list.length-1
			break;
		case '>':	//next file directory...
			bbs.lastdir=bbs.curdir;bbs.curdir++;if (bbs.lastdir == bbs.curdir) bbs.curdir = 0
			break;
		case 'A':	//check directory listings...
			bbs.menu.file_select_directory();
			break;
		case 'G':	//check library listings...
			bbs.menu.file_select_library();
			break;
		case 'T':	//temporary directory...
			bbs.temp_xfer();
			break;
		case 'L':	//list files in current directory...
			//bbs.menu.list_files();
			bbs.exec_xtrn("LBFILES"); //load("filearea-lb.js");
			break;
		case 'N':	//new file scan...
			bbs.scan_dirs(SCAN_NEW, true);
			break;
		case 'U':	//upload files...
			bbs.menu.upload_files();
			break;
		case 'D':	//download files...
		    bbs.menu.download_files();
			break;
		case 'X':	//archive contents...
		    bbs.list_files(bbs.curdir,FL_VIEW);
			break;
		case 'B':	//batch transfers menu...
		    bbs.batch_menu();
			break;
		case 'S':	//search files...
		    bbs.phoenix.menu_file_search();
			break;
		case 'Q':	//quit to main...
		    bbs.phoenix.menu_main();
			break;
		case ';':	//sysop commands...
		    bbs.menu.sysop_commands();
			break;

        //global jump points for the lightbar prompt...
		case '@':	//main menu...
			bbs.phoenix.menu_main();
			break;
		case '#':	//message menu...
			bbs.phoenix.menu_new_msg_scan();
			break;
		case '$':	//file menu...
			bbs.phoenix.menu_new_file_scan();
			break;
		case '%':	//chat menu...
			bbs.exec("?irc -a localhost 6667 #euphoria");
			break;
		case '-':	//information...
			bbs.phoenix.menu_information();
			break;
		default:
			break;
	}

//create loop point for the menu...
while(1) bbs.phoenix.menu_file();

}

/* f i l e _ s e a r c h _ m e n u */

//name the phoenix file menus routine...
bbs.phoenix.menu_file_search = function() {

//update node status...
system.node_list[bbs.node_num-1].action = NODE_DFLT;

//display the menu...
bbs.ansi_norm("art.phoenix.menu_file_search");

//load the lightbar prompt module [if configured]...
if(do_lightbar_prompts && user.security.exemptions&UFLAG_M) {

	//launch the lightbar setup from the config file...
	fileSearchMenuLightbarPrompt();

//if disabled...
} else {

	//put your x,y instructions here...
	console.gotoxy(promptFileSearch_column,promptFileSearch_line);
}

    //commands available for the menu...
	switch(cmdkey=console.getkeys("PEDFQ;@#$%-",K_UPPER)) {
		case 'P':	//configure file pointers...
		    bbs.menu.config_pointers();
			break;
		case 'E':	//toggle extended descriptions...
		    bbs.menu.toggle_extended();
			break;
		case 'D':	//search file descriptions...
			bbs.menu.search_descriptions();
			break;
		case 'F':	//search file names...
			bbs.menu.search_names();
			break;
		case 'Q':	//quit...
			bbs.phoenix.menu_file();
			break;

        //global jump points for the lightbar prompt...
		case '@':	//main menu...
			bbs.phoenix.menu_main();
			break;
		case '#':	//message menu...
			bbs.phoenix.menu_new_msg_scan();
			break;
		case '$':	//file menu...
			bbs.phoenix.menu_new_file_scan();
			break;
		case '%':	//chat menu...
			bbs.exec("?irc -a localhost 6667 #euphoria");
			break;
		case '-':	//information...
			bbs.phoenix.menu_information();
			break;
		default:
			break;
	}

//create loop point for the menu...
while(1) bbs.phoenix.menu_file_search();

}

/* e m a i l _ m e n u */

//name the phoenix file menus routine...
bbs.phoenix.menu_email = function() {

//update node status...
system.node_list[bbs.node_num-1].action = NODE_RMAL;

//display the menu...
bbs.ansi_norm("art.phoenix.menu_email");

//load the lightbar prompt module [if configured]...
if(do_lightbar_prompts && user.security.exemptions&UFLAG_M) {

	//launch the lightbar setup from the config file...
	emailLightbarPrompt();

//if disabled...
} else {

	//put your x,y instructions here...
	console.gotoxy(promptEmail_column,promptEmail_line);
}

    //commands available for the menu...
	switch(cmdkey=console.getkeys("RSFQ;@#$%-",K_UPPER)) {
		case 'R':	//read your email...
		    bbs.menu.read_mail();
			break;
		case 'S':	//send mail...
		    bbs.menu.send_mail();
			break;
		case 'F':	//send feed back to sysop...
			bbs.menu.feedback();
			break;
		case 'Q':	//quit...
			bbs.phoenix.menu_main();
			break;

        //global jump points for the lightbar prompt...
		case '@':	//main menu...
			bbs.phoenix.menu_main();
			break;
		case '#':	//message menu...
			bbs.phoenix.menu_new_msg_scan();
			break;
		case '$':	//file menu...
			bbs.phoenix.menu_new_file_scan();
			break;
		case '%':	//chat menu...
			bbs.exec("?irc -a localhost 6667 #euphoria");
			break;
		case '-':	//information...
			bbs.phoenix.menu_information();
			break;
		default:
			break;
	}

//create loop point for the menu...
while(1) bbs.phoenix.menu_email();

}

/* n e w _ m e s s a g e s _ s c a n _ m e n u */

//name the phoenix information menus routine...
bbs.phoenix.menu_new_msg_scan = function() {

//load menu specific strings...
bbs.menu.new_msg_scan_strings();

//display the ansi file...
bbs.ansi_norm("art.phoenix.menu_new_msg_scan");

//load the lightbar module [if configured]...
if(do_lightbar_prompts_newscan) {
	bbs.lightbar.menu_new_msg_scan();

//if disabled...
} else {
	console.gotoxy(1,1); //put your x,y instructions here...
}

	switch(cmdkey=console.getkeys("NAGMQ",K_UPPER)) {
		case 'N':	//conduct a new message scan...
			bbs.scan_subs(SCAN_NEW, true);
			break;
		case 'A':	//check message areas in current group...
			bbs.menu.msg_select_subboard();bbs.phoenix.menu_message();
			break;
		case 'G':	//check message groups...
			bbs.menu.msg_select_group();bbs.phoenix.menu_message();
			break;
		case 'M': //quit to message menu...
			bbs.phoenix.menu_message();
			break;
		case 'Q': //quit to main...
			bbs.phoenix.menu_main();
			break;
		default:
			break;
	}

//create loop point for the menu...
while(1) bbs.phoenix.menu_new_msg_scan();

}

/* n e w _ f i l e s _ s c a n _ m e n u */

//name the phoenix information menus routine...
bbs.phoenix.menu_new_file_scan = function() {

//load menu specific strings...
bbs.menu.new_file_scan_strings();

//display the ansi file...
bbs.ansi_norm("art.phoenix.menu_new_file_scan");

//load the lightbar module [if configured]...
if(do_lightbar_prompts_newscan) {
	bbs.lightbar.menu_new_file_scan();

//if disabled...
} else {
	console.gotoxy(1,1); //put your x,y instructions here...
}

	switch(cmdkey=console.getkeys("NAGFQ",K_UPPER)) {
		case 'N':	//conduct a new file scan...
			bbs.scan_dirs(SCAN_NEW, true);  // would like to show "no new files"
			break;
		case 'A':	//check file areas in current group...
			bbs.menu.file_select_directory();bbs.phoenix.menu_file();
			break;
		case 'G':	//check file groups...
			bbs.menu.file_select_library();bbs.phoenix.menu_file();
			break;
		case 'F': //quit to file menu...
			bbs.phoenix.menu_file();
			break;
		case 'Q': //quit to main...
			bbs.phoenix.menu_main();
			break;
		default:
			break;
	}

//create loop point for the menu...
while(1) bbs.phoenix.menu_new_file_scan();

}

/* p h o e n i x / s 3 _ s t a r t _ u p _ & _ c r a s h _ p o i n t */

//default menu...
while(1) bbs.phoenix.menu_main();

