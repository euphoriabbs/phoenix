//phoenix.lightbar.js

//create variables for the ansi keys... 
var KEY_UP    = String.fromCharCode(0x1e);
var KEY_DOWN  = String.fromCharCode(0x0a);
var KEY_RIGHT = String.fromCharCode(0x06);
var KEY_LEFT  = String.fromCharCode(0x1d);
var KEY_HOME  = String.fromCharCode(0x02);
var KEY_END   = String.fromCharCode(0x05);
var KEY_BACK  = String.fromCharCode(0x08);
var KEY_DEL   = String.fromCharCode(0x7F);

/* l i g h t b a r _ p r o m p t  - e n g i n e */

//name the message lightbar prompts routine...
bbs.lightbar.prompt = function(string) {

//reset the console line counter back to zero...
console.line_counter = 0;	

//tell the lightbar where you want it to be located, and save the current cursor position...
console.gotoxy(string.column_lightbar,string.line_lightbar);console.ansi_save();   
 
	//array of menu text lines...   
	var options = new Array();     
 	options[0] =  string.center + string.optionOne 
	options[1] =  string.center + string.optionTwo 
	options[2] =  string.center + string.optionThree 
	options[3] =  string.center + string.optionFour 
	options[4] =  string.center + string.optionFive 
	
	//array of the commands to return...
	var values = new Array();
	values[0] = "@"; 
	values[1] = "#";
	values[2] = "$";
	values[3] = "%"; 
	values[4] = "-"; 
	
	//variables to hold the menu position and return value...
	var current = 0;
	var last = 4;
	var ret = "";
	
	//reset ctrl-c/abort...
	if (bbs.sys_status&SS_ABORT) bbs.sys_status &= ~SS_ABORT;
	 
	//begin menu input...
	while (bbs.online && (ret=="")) {
	
	//show waiting messages, if any...
	bbs.menu.show_messages(); 
	
	//release cpu time...
	sleep(20);
	
		//main order for the module... 
		if (current != last) { 
			
			//load the saved cursor position... 
			console.ansi_restore(); 
			
			//now display the current option...
			console.putmsg(options[current]);
			
			//output the new cursor position (ie, command: )...  
			console.gotoxy(string.column_cursor,string.line_cursor);
			last=current;
		}
		
		//get an input waiting
		var c = console.inkey(); 
		
		//if no input
		if (c == "") {
			//if ctrl-c pressed
			if (bbs.sys_status&SS_ABORT) {
				//abort reading
				bbs.sys_status &= ~SS_ABORT;
				ret = "Q";
			}
			
			//sleep 1/10th of a second, to release cpu time...
			sleep(100);
		
			//otherwise if there is input...
			}else{
			
			//determine the key pressed...
			switch (c) {
				//if left or up key...
				case (KEY_LEFT):
				case (KEY_UP):
					current--; //decrease the current menu option
					
					//if outside of range
					if (current < 0)
						//set to end of range
						current = options.length-1;
					break;
				//if right or down key pressed
				case (KEY_RIGHT):
				case (KEY_DOWN):
					current++; //increase the current menu option
					
					//if outside of range
					if (current >= options.length)
						current = 0;  //set to beginning of range...
					break;
				//if cr or lf
				case "\r":
				case "\n":
					//return the currently selected option
					ret = values[current];
					break;
				//check other input (other menu commands)... 
				default:
					//if a number
					if (!isNaN(c)) {
					//if a sysop
					} else if (user.security.level >= 90) {
						//if a sysop...
						if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ;@#$%-".indexOf(c.toUpperCase()) >= 0)
							ret = c.toUpperCase();
					}else{
						//if not a sysop... 
						if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%-".indexOf(c.toUpperCase()) >= 0)
							ret = c.toUpperCase();
					}
					break;
			}
		}
	}
	
 	//unget selected command key/option to the input buffer
	console.ungetstr(ret);
}

/* y e s / n o - l i g h t b a r - e n g i n e */

//name the yes/no lightbars routine...
bbs.lightbar.yesno = function(string,handlerName) {

//if the yes/no bar is for oneliners or quick logon...
if (handlerName == 'quickLogonLightbar' || 'onelinerLightbar') {

	//where do you want the lightbar located?... 
	console.gotoxy(string.column_lightbar,string.line_lightbar);

	}

//save the current cursor position...
console.ansi_save();   

//create a list of strings... 
var yes   = string.yes
var no    = string.no
 	
	//if handlerName is for quick logon or oneliners...
	if (handlerName == 'quickLogonLightbar' || 'onelinerLightbar') {

	//array of menu text lines...   
	var options = new Array();     	
 	options[0] = no   
	options[1] = yes    
	
	//array of the commands to return...
	var values = new Array();
	values[0] = "N";
	values[1] = "Y";
	
	}
	
	//variables to hold the menu position and return value...
	var current = 0;
	var last = 1;
	var ret = "";
	
	//reset ctrl-c/abort...
	if (bbs.sys_status&SS_ABORT) bbs.sys_status &= ~SS_ABORT;
	 
	//begin menu input...
	while (bbs.online && (ret=="")) {
	
	//show waiting messages, if any...
	bbs.menu.show_messages(); 
	
	//release cpu time...
	sleep(10);

		//main order for the module... 
		if (current != last) { 
			console.ansi_restore(); 
			console.putmsg(options[current]);
			
			//if the handler name is as stated below...
			if (handlerName == 'quickLogonLightbar' || 'onelinerLightbar') {
			
			//attempt to hide the cursor...
			console.gotoxy(1,1);  
			
			}
			
			last=current;
		}
		
		//get an input waiting...
		var c = console.inkey(); 
		
		//if no input
		if (c == "") {
			//if ctrl-c pressed
			if (bbs.sys_status&SS_ABORT) {
				//abort reading
				bbs.sys_status &= ~SS_ABORT;
				ret = "Q";
			}
			//sleep 1/10th of a second, to release cpu time...
			sleep(100);
		//otherwise if there is input...
		}else{
			//determine the key pressed...
			switch (c) {
				//if left or up key...
				case (KEY_LEFT):
				case (KEY_UP):
					current--; //decrease the current menu option
					
					//if outside of range
					if (current < 0)
						//set to end of range
						current = options.length-1;
					break;
				//if right or down key pressed
				case (KEY_RIGHT):
				case (KEY_DOWN):
					current++; //increase the current menu option
					
					//if outside of range
					if (current >= options.length)
						current = 0;  //set to beginning of range...
					break;
				//if cr or lf
				case "\r":
				case "\n":
					//return the currently selected option
					ret = values[current];
					break;

				//check other input
				default:
					//if a number
					if (!isNaN(c)) {
						//get numeric input, within the max messages in the area.
						ret = inputNumber(c,bbs.smb_msgs);
					
					//if a sysop
					} else if (user.security.level >= 90) {
					
						//check for valid input
						if ("YN".indexOf(c.toUpperCase()) >= 0)
							ret = c.toUpperCase();
					}else{
					
						//check for valid input
						if ("YN".indexOf(c.toUpperCase()) >= 0)
							ret = c.toUpperCase();
					}
					break;

			}
		}
	}
	
 	//unget selected command key/option to the input buffer
	console.ungetstr(ret);	
}

/* y e s / n o - q u e s t i o n _ l i g h t b a r - e n g i n e */

//name the yes/no lightbars routine...
bbs.lightbar.yesnoquestion = function(string,handlerName) {

	//assign a variable to the question... 
	var question = console.question + "?" + " ";  

	//present the question... 
	console.putmsg(question);
	
//save the current cursor position...
console.ansi_save();   

//create a list of strings... 
var yes   = string.yes
var no    = string.no
 	
	//if the handlerName is 'yes'...
	if (handlerName == 'yesQuestion') {

	//array of menu text lines...   
	var options = new Array();     
	 	options[0] = yes   
		options[1] = no 
	
	//array of the commands to return...
	var values = new Array();
		values[0] = "Y";
		values[1] = "N";	
	}

	//if the handlerName is 'no'...
	if (handlerName == 'noQuestion') {

	//array of menu text lines...   
	var options = new Array();     
	 	options[0] = no
		options[1] = yes
	
	//array of the commands to return...
	var values = new Array();
		values[0] = "N";
		values[1] = "Y";	
	}

	//if the handlerName is 'no' [DISABLED LB]...
	if (handlerName == 'noNOLBQuestion') {

	//array of menu text lines...   
	var options = new Array();     
	 	options[0] = no
		options[1] = no
	
	//array of the commands to return...
	var values = new Array();
		values[0] = "N";
		values[1] = "N";	
	}

	//if the handlerName is 'yes' [DISABLED LB]...
	if (handlerName == 'yesNOLBQuestion') {

	//array of menu text lines...   
	var options = new Array();     
	 	options[0] = yes
		options[1] = yes
	
	//array of the commands to return...
	var values = new Array();
		values[0] = "Y";
		values[1] = "Y";	
	}
		
	//variables to hold the menu position and return value...
	var current = 0;
	var last = 1;
	var ret = "";
	
	//reset ctrl-c/abort...
	if (bbs.sys_status&SS_ABORT) bbs.sys_status &= ~SS_ABORT;
	 
	//begin menu input...
	while (bbs.online && (ret=="")) {
	
	//show waiting messages, if any...
	bbs.menu.show_messages(); 
	
	//release cpu time...
	sleep(10);

		//main order for the module... 
		if (current != last) { 
			console.ansi_restore(); 
			console.putmsg(options[current]);
						last=current;
		}
		
		//get an input waiting...
		var c = console.inkey(); 
		
		//if no input
		if (c == "") {
			//if ctrl-c pressed
			if (bbs.sys_status&SS_ABORT) {
				//abort reading
				bbs.sys_status &= ~SS_ABORT;
				ret = "Q";
			}
			//sleep 1/10th of a second, to release cpu time...
			sleep(100);
		//otherwise if there is input...
		}else{
			//determine the key pressed...
			switch (c) {
				//if left or up key...
				case (KEY_LEFT):
				case (KEY_UP):
					current--; //decrease the current menu option
					
					//if outside of range
					if (current < 0)
						//set to end of range
						current = options.length-1;
					break;
				//if right or down key pressed
				case (KEY_RIGHT):
				case (KEY_DOWN):
					current++; //increase the current menu option
					
					//if outside of range
					if (current >= options.length)
						current = 0;  //set to beginning of range...
					break;
				//if cr or lf
				case "\r":
				case "\n":
					//return the currently selected option
					ret = values[current];
					break;

				//check other input
				default:
					//if a number
					if (!isNaN(c)) {
						//get numeric input, within the max messages in the area.
						ret = inputNumber(c,bbs.smb_msgs);
					
					//if a sysop
					} else if (user.security.level >= 90) {
					
						//check for valid input
						if ("YN".indexOf(c.toUpperCase()) >= 0)
							ret = c.toUpperCase();
					}else{
					
						//check for valid input
						if ("YN".indexOf(c.toUpperCase()) >= 0)
							ret = c.toUpperCase();
					}
					break;

			}
		}
	}
	
 	//unget selected command key/option to the input buffer
	console.ungetstr(ret);	
}

/* f i l e _ l i s t e r - l i g h t b a r */

//name the file lister modules routine...
bbs.lightbar.file_lister = function(string) {
	
//main function to run the spylister module...
function main() {

	//array of menu text lines
	var options = new Array();
	options[0] = string.optionOne
	options[1] = string.optionTwo 
	options[2] = string.optionThree 
	options[3] = string.optionFour 
	options[4] = string.optionFive
	options[5] = string.optionSix 
	
	//array of the commands to return...
	var values = new Array();
	values[0] = "N";
	values[1] = "P";
	values[2] = "B";
	values[3] = "V";
	values[4] = "S";
	values[5] = "Q";
	
	//variables to hold the menu position and return value...
	var current = 0;
	var last = 5;
	var ret = "";
	
	//reset ctrl-c/abort...
	if (bbs.sys_status&SS_ABORT) bbs.sys_status &= ~SS_ABORT;
	
	//begin menu input...
	while (bbs.online && (ret=="")) {
	bbs.menu.show_messages(); //show waiting messages, if any.
	
	//release cpu time...
	sleep(20);

		//main order for the module... 
		if (current != last) {
			console.ansi_left(80);
			console.clearline();
			console.putmsg(options[current]);
			last=current;
		}
		
		//get an input waiting
		var c = console.inkey();
		
		//if no input
		if (c == "") {
			//if ctrl-c pressed
			if (bbs.sys_status&SS_ABORT) {
				//abort reading
				bbs.sys_status &= ~SS_ABORT;
				ret = "Q";
			}
			//sleep 1/10th of a second, to release cpu time
			sleep(100);
		//otherwise if there is input
		}else{
			//determin the key pressed
			switch (c) {
				//if left or up key
				case (KEY_LEFT):
				case (KEY_UP):
					current--; //decrease the current menu option
					
					//if outside of range
					if (current < 0)
						//set to end of range
						current = options.length-1;
					break;
				//if right or down key pressed
				case (KEY_RIGHT):
				case (KEY_DOWN):
					current++; //increase the current menu option
					
					//if outside of range
					if (current >= options.length)
						current = 0;  //set to beginning of range
					break;
				//if cr or lf
				case "\r":
				case "\n":
					//return the currently selected option
					ret = values[current];
					break;
				//check other input
				default:
					//if a number
					if (!isNaN(c)) {
					//if a sysop
					} else if (user.security.level >= 90) {
						//check for valid input
						if ("?BVESPQDM".indexOf(c.toUpperCase()) >= 0)
							ret = c.toUpperCase();
					}else{
						//check for valid input
						if ("?BVESPQ".indexOf(c.toUpperCase()) >= 0)
							ret = c.toUpperCase();
					}
					break;
			}
		}
	}
	
	//if cold-key input append a cr
	if ((user.settings&USER_COLDKEYS)&&(ret.indexOf("\r") < 0)) {
		ret += "\r";
	}
	
	//unget selected command key/option to the input buffer
	console.ungetstr(ret);
	
}

main();

}
	
/* n e w _ m e s s a g e _ s c a n _ m e n u - l i g h t b a r */

//name the new message scan menu lightbar routine... 
bbs.lightbar.menu_new_msg_scan = function() {

//save the cursor position where it lands...
console.crlf();console.ansi_save();   

//assign a variable to center the output... 
var center = "     "; 

//create a list of strings to be centered... 
var stringOne   = "\1n::\1n\1r\1h// \1n\1g\1h[\1n\1h\1wnew messages\1n\1g\1h] \1n\1h\1wc\1nheck \1n\1h\1wa\1nreas  \1n\1h\1wc\1nheck \1n\1h\1wg\1nroups  \1n\1h\1wt\1no \1n\1h\1wm\1nessage \1n\1h\1wm\1nenu  \1n\1r\1h\\\\\1n::\1n\1k";  
var stringTwo   = "\1n::\1n\1r\1h//  \1n\1h\1wn\1new \1n\1h\1wm\1nessages \1n\1g\1h[\1n\1h\1wcheck areas\1n\1g\1h] \1n\1h\1wc\1nheck \1n\1h\1wg\1nroups  \1n\1h\1wt\1no \1n\1h\1wm\1nessage \1n\1h\1wm\1nenu  \1n\1r\1h\\\\\1n::\1n\1k";  
var stringThree = "\1n::\1n\1r\1h//  \1n\1h\1wn\1new \1n\1h\1wm\1nessages  \1n\1h\1wc\1nheck \1n\1h\1wa\1nreas \1n\1g\1h[\1n\1h\1wcheck groups\1n\1g\1h] \1n\1h\1wt\1no \1n\1h\1wm\1nessage \1n\1h\1wm\1nenu  \1n\1r\1h\\\\\1n::\1n\1k"; 
var stringFour  = "\1n::\1n\1r\1h//  \1n\1h\1wn\1new \1n\1h\1wm\1nessages  \1n\1h\1wc\1nheck \1n\1h\1wa\1nreas  \1n\1h\1wc\1nheck \1n\1h\1wg\1nroups \1n\1g\1h[\1n\1h\1wto message menu\1n\1g\1h] \1n\1r\1h\\\\\1n::\1n\1k"; 

	//array of menu text lines...   
	var options = new Array();     
	options[0] = "\r" + center + "" + stringOne + "";      
	options[1] = "\r" + center + "" + stringTwo + "";      
	options[2] = "\r" + center + "" + stringThree + "";      
	options[3] = "\r" + center + "" + stringFour + "";    
	
	//array of the commands to return...
	var values = new Array(); 
	values[0] = "N";
	values[1] = "A";
	values[2] = "G"; 
	values[3] = "M"; 
	
	//variables to hold the menu position and return value...
	var current = 0;
	var last = 3;
	var ret = "";
	
	//reset ctrl-c/abort
	if (bbs.sys_status&SS_ABORT) bbs.sys_status &= ~SS_ABORT;
	
	//print devider line...
	console.print("\r\n")
	
	//begin menu input...
	while (bbs.online && (ret=="")) {
	bbs.menu.show_messages(); //show waiting messages, if any.
	
	//release cpu time...
	sleep(10);

		//main order for the module... 
		if (current != last) {
			console.ansi_restore();
			console.putmsg(options[current]);
			console.gotoxy(1,1); 	//try and hide the cursor...
			last=current;
		}
		
		//get an input waiting...
		var c = console.inkey();
		
		//if no input...
		if (c == "") {
			//if ctrl-c pressed...
			if (bbs.sys_status&SS_ABORT) {
				//abort reading...
				bbs.sys_status &= ~SS_ABORT;
				ret = "Q";
			}
			//sleep 1/10th of a second, to release cpu time...
			sleep(100);
		//otherwise if there is input...
		}else{
			//determin the key pressed
			switch (c) {
				//if left or up key
				case (KEY_LEFT):
				case (KEY_UP):
					current--; //decrease the current menu option
					
					//if outside of range
					if (current < 0)
						//set to end of range
						current = options.length-1;
					break;
				//if right or down key pressed
				case (KEY_RIGHT):
				case (KEY_DOWN):
					current++; //increase the current menu option
					
					//if outside of range
					if (current >= options.length)
						current = 0;  //set to beginning of range
					break;
				//if cr or lf
				case "\r":
				case "\n":
					//return the currently selected option
					ret = values[current];
					break;
				//check other input
				default:
					//if a number
					if (!isNaN(c)) {
					
					//if a sysop...
					} else if (user.security.level >= 90) {
						//check for valid input
						if ("NAGMQ".indexOf(c.toUpperCase()) >= 0)
							ret = c.toUpperCase();
					}else{
						//if not a sysop...
						if ("NAGMQ".indexOf(c.toUpperCase()) >= 0)
							ret = c.toUpperCase();
					}
					break;
			}
		}
	}
	
 	//unget selected command key/option to the input buffer
	console.ungetstr(ret);	
}

/* n e w _ f i l e _ s c a n _ m e n u - l i g h t b a r */

//name the new file scan menu lightbar routine... 
bbs.lightbar.menu_new_file_scan = function() {

//create a list of strings to be centered... 
var stringOne   = "\1n\1h\1c[\1n\1h\1bscan new\1n\1h\1c]\1n";  
var stringTwo   = "\1n\1h\1c[\1n\1h\1bcheck areas\1n\1h\1c]\1n";  
var stringThree = "\1n\1h\1c[\1n\1h\1bcheck groups\1n\1h\1c]\1n"; 
var stringFour  = "\1n\1h\1c[\1n\1h\1bgo to files\1n\1h\1c]\1n"; 
 
	//array of menu text lines...   
	var options = new Array();     
	options[0] = "[9;57H"  + stringOne
	options[1] = "[10;55H" + stringTwo
	options[2] = "[11;57H" + stringThree
	options[3] = "[12;59H" + stringFour
	
	//array of the commands to return...
	var values = new Array(); 
	values[0] = "N";
	values[1] = "A";
	values[2] = "G"; 
	values[3] = "F"; 
	
	//variables to hold the menu position and return value...
	var current = 0;
	var last = 3;
	var ret = "";
	
	//reset ctrl-c/abort
	if (bbs.sys_status&SS_ABORT) bbs.sys_status &= ~SS_ABORT;
		
	//begin menu input...
	while (bbs.online && (ret=="")) {
	bbs.menu.show_messages(); //show waiting messages, if any.
	
	//release cpu time...
	sleep(10);

		//main order for the module... 
		if (current != last) {

//remove all options so you can display a new one...                       
console.print("[9;57H\1n\1kmmmmmmmmmmmmm[10;55H\1n\1kmmmmmmmmmmmmm[11;57H\1n\1kmmmmmmmmmmmmmm[12;59H\1n\1kmmmmmmmmmmmmm");   

//now display the un-highlighted options...
console.print("[9;58H\1n\1h\1kscan new[10;56H\1n\1h\1kcheck areas[11;58H\1n\1h\1kcheck groups[12;60H\1n\1h\1kgo to files");

			console.putmsg(options[current]);
			console.gotoxy(1,1); 	//try and hide the cursor...
			last=current;
		}
		
		//get an input waiting...
		var c = console.inkey();
		
		//if no input...
		if (c == "") {
			//if ctrl-c pressed...
			if (bbs.sys_status&SS_ABORT) {
				//abort reading...
				bbs.sys_status &= ~SS_ABORT;
				ret = "Q";
			}
			//sleep 1/10th of a second, to release cpu time...
			sleep(100);
		//otherwise if there is input...
		}else{
			//determin the key pressed
			switch (c) {
				//if left or up key
				case (KEY_LEFT):
				case (KEY_UP):
					current--; //decrease the current menu option
					
					//if outside of range
					if (current < 0)
						//set to end of range
						current = options.length-1;
					break;
				//if right or down key pressed
				case (KEY_RIGHT):
				case (KEY_DOWN):
					current++; //increase the current menu option
					
					//if outside of range
					if (current >= options.length)
						current = 0;  //set to beginning of range
					break;
				//if cr or lf
				case "\r":
				case "\n":
					//return the currently selected option
					ret = values[current];
					break;
				//check other input
				default:
					//if a number
					if (!isNaN(c)) {
					
					//if a sysop...
					} else if (user.security.level >= 90) {
						//check for valid input
						if ("NAGFQ".indexOf(c.toUpperCase()) >= 0)
							ret = c.toUpperCase();
					}else{
						//if not a sysop...
						if ("NAGFQ".indexOf(c.toUpperCase()) >= 0)
							ret = c.toUpperCase();
					}
					break;
			}
		}
	}
	
 	//unget selected command key/option to the input buffer
	console.ungetstr(ret);	
}

/* m a t r i x _ l o g i n - l i g h t b a r */

//name the matrix login lightbar routine... 
bbs.lightbar.matrix_login = function() {

//save the current cursor position...
console.crlf();console.ansi_save();   

//assign a variable to center the output... 
var center = "           "; 
 
//create a list of strings to be centered... 
var stringOne   = " \1n\1r\1h[\1n\1h\1wenter\1n\1r\1h]\1n s\1n\1h\1kend \1na\1n\1h\1kpplication  \1np\1n\1h\1kage \1ns\1n\1h\1kysop\1n  s\1n\1h\1kay \1ny\1n\1h\1kou're \1ns\1n\1h\1kcared ";  
var stringTwo   = "  e\1n\1h\1knter \1n\1r\1h[\1n\1h\1wsend application\1n\1r\1h]\1n p\1n\1h\1kage \1ns\1n\1h\1kysop\1n  s\1n\1h\1kay \1ny\1n\1h\1kou're \1ns\1n\1h\1kcared "; 
var stringThree = "  e\1n\1h\1knter  \1ns\1n\1h\1kend \1na\1n\1h\1kpplication \1n\1r\1h[\1n\1h\1wpage sysop\1n\1r\1h]\1n s\1n\1h\1kay \1ny\1n\1h\1kou're \1ns\1n\1h\1kcared "; 
var stringFour  = "  e\1n\1h\1knter  \1ns\1n\1h\1kend \1na\1n\1h\1kpplication  \1np\1n\1h\1kage \1ns\1n\1h\1kysop\1n \1n\1r\1h[\1n\1h\1wsay you're scared\1n\1r\1h]\1n ";  
 
	//array of menu text lines...   
	var options = new Array();     
	options[0] = "\r" + center + "" + stringOne + "";      
	options[1] = "\r" + center + "" + stringTwo + "";      
	options[2] = "\r" + center + "" + stringThree + "";      
	options[3] = "\r" + center + "" + stringFour + "";       
	
	//array of the commands to return...
	var values = new Array();
	values[0] = "L";
	values[1] = "A";
	values[2] = "P"; 
	values[3] = "G";
	
	//variables to hold the menu position and return value...
	var current = 0;
	var last = 3;
	var ret = "";
	
	//reset ctrl-c/abort...
	if (bbs.sys_status&SS_ABORT) bbs.sys_status &= ~SS_ABORT;
	
	//print devider line...
 	console.print("\r\n")
	
	//begin menu input...
	while (bbs.online && (ret=="")) {
	bbs.menu.show_messages(); //show waiting messages, if any.
	
	//release cpu time...
	sleep(10);

		//main order for the module... 
		if (current != last) {
			console.ansi_restore(); //restore the saved location... 
			console.putmsg(options[current]); //display the lightbar...
			console.gotoxy(1,1); //move the cursor to a hidden location...
			last=current;
		}
		
		//get an input waiting
		var c = console.inkey();
		
		//if no input
		if (c == "") {
			//if ctrl-c pressed
			if (bbs.sys_status&SS_ABORT) {
				//abort reading
				bbs.sys_status &= ~SS_ABORT;
				ret = "Q";
			}
			//sleep 1/10th of a second, to release cpu time
			sleep(100);
		//otherwise if there is input
		}else{
			//determin the key pressed
			switch (c) {
				//if left or up key
				case (KEY_LEFT):
				case (KEY_UP):
					current--; //decrease the current menu option
					
					//if outside of range
					if (current < 0)
						//set to end of range
						current = options.length-1;
					break;
				//if right or down key pressed
				case (KEY_RIGHT):
				case (KEY_DOWN):
					current++; //increase the current menu option
					
					//if outside of range
					if (current >= options.length)
						current = 0;  //set to beginning of range
					break;
				//if cr or lf
				case "\r":
				case "\n":
					//return the currently selected option
					ret = values[current];
					break;
			}
		}
	}
	
 	//unget selected command key/option to the input buffer
	console.ungetstr(ret);
}

/* m e s s a g e _ r e a d e r - l i g h t b a r */

//name the message readers lightbar routine...
bbs.lightbar.message_reader = function() {

//function for number values...
function inputNumber(inNumber,iMax) {
	var bDone = false;
	var sRet = "" + inNumber;
	
	console.print(inNumber);
	while (bbs.online && (!bDone)) {
		if ((sRet.length >= iMax.toString().length)||((sRet.length == iMax.toString().length-1)&&(parseInt(sRet.substr(0,1)) > parseInt(iMax.toString().substr(0,1))))) {
			console.ansi_left(sRet.length);
			console.print("                                             ".substr(0,sRet.length));
			console.ansi_left(sRet.length);
			return "" + sRet;
		}

		var c = console.getkey();
		
		if (c == "") {
			sleep(200);
		}else{
			switch (c.toString()) {
				case KEY_BACK:
				case KEY_DEL:
					//cut the length of the string.
					sRet = sRet.substr(0,sRet.length-1);
					
					console.ansi_left(1);
					console.print(" ");
					console.ansi_left(1);
					if (sRet.length <= 0)
						bDone = true;
					break;
				case "0":
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9":
					sRet += "" + c;
					console.print(c);
					break;
				case "\r":
				case "\n":
					bDone = true;
					break;
			}
		}
	}
	
	if (sRet != "") {
		console.ansi_left(sRet.length);
		console.print("                                             ".substr(0,sRet.length));
		console.ansi_left(sRet.length);
		console.print("returning: "+sRet+"\r\n");
		console.pause();
		return sRet + "\r";
	} else {
		return "";
	}
}

//main function to run the message_reader...
function main() {

	//array of menu text lines...
	var options = new Array();
	options[0] = "\1nrÞÞÝh±Þnþ rhkeadingn y<<hw@SMB_CURMSG@\1yof\1n\1h\1w@SMB_MSGS@y>>kw ::kúÞnk7prevh0Þ next w kreply w kpost w kquit w ::k w y<n?-hhkelpny>hk y;n";
	options[1] = "\1nrÞÞÝh±Þnþ rhkeadingn y<<hw@SMB_CURMSG@\1yof\1n\1h\1w@SMB_MSGS@y>>kw ::k w kprevúÞnk7nexth0Þw kreply w kpost w kquit w ::k w y<n?-hhkelpny>hk y;n";
	options[2] = "\1nrÞÞÝh±Þnþ rhkeadingn y<<hw@SMB_CURMSG@\1yof\1n\1h\1w@SMB_MSGS@y>>kw ::k w kprev w knextúÞnk7replyh0Þw kpost w kquit w ::k w y<n?-hhkelpny>hk y;n";
	options[3] = "\1nrÞÞÝh±Þnþ rhkeadingn y<<hw@SMB_CURMSG@\1yof\1n\1h\1w@SMB_MSGS@y>>kw ::k w kprev w knext w kreplyúÞnk7posth0Þw kquit w ::k w y<n?-hhkelpny>hk y;n";
	options[4] = "\1nrÞÞÝh±Þnþ rhkeadingn y<<hw@SMB_CURMSG@\1yof\1n\1h\1w@SMB_MSGS@y>>kw ::k w kprev w knext w kreply w kpostúÞnk7quith0Þw ::k w y<n?-hhkelpny>hk y;n";
			
	//array of the commands to return...
	var values = new Array();
	values[0] = "-";
	values[1] = "\r";
	values[2] = (system.settings&SYS_RA_EMU)?"R":"A";
	values[3] = "P";
	values[4] = "Q";
	
	//variables to hold the menu position and return value...
	var current = 1;
	var last = 0;
	var ret = "";
	
	//reset ctrl-c/abort...
	if (bbs.sys_status&SS_ABORT) bbs.sys_status &= ~SS_ABORT;
	
	//print devider line...
	console.print("\1"+"0\1k--\r\n")
	
	//begin menu input...
	while (bbs.online && (ret=="")) {
	bbs.menu.show_messages(); //show waiting messages, if any.
	
	//release cpu time...
	sleep(10);

		//main order for the module... 
		if (current != last) {
			console.ansi_left(80);
			console.clearline();
			console.putmsg(options[current]);
			last=current;
		}
		
		//get an input waiting...
		var c = console.inkey();
		
		//if no input...
		if (c == "") {
			//if ctrl-c pressed...
			if (bbs.sys_status&SS_ABORT) {
				//abort reading
				bbs.sys_status &= ~SS_ABORT;
				ret = "Q";
			}
			//sleep 1/10th of a second, to release cpu time...
			sleep(100);
		//otherwise if there is input...
		}else{
			//determine the key pressed...
			switch (c) {
				//if left or up key...
				case (KEY_LEFT):
				case (KEY_UP):
					current--; //decrease the current menu option...
					
					//if outside of range...
					if (current < 0)
						//set to end of range...
						current = options.length-1;
					break;
					
				//if right or down key pressed
				case (KEY_RIGHT):
				case (KEY_DOWN):
					current++; //increase the current menu option
					
					//if outside of range
					if (current >= options.length)
						current = 0;  //set to beginning of range
					break;
				
				//if cr or lf
				case "\r":
				case "\n":
					//return the currently selected option
					ret = values[current];
					break;
				
				//check other input
				default:
					//if a number
					if (!isNaN(c)) {
						//get numeric input, within the max messages in the area.
						ret = inputNumber(c,bbs.smb_msgs);
					//if a sysop
					} else if (user.security.level >= 90) {
						//check for valid input
						if ("?-CAPDRM<>{}[]BIQYFLTO".indexOf(c.toUpperCase()) >= 0)
							ret = c.toUpperCase();
					}else{
						//check for valid input
						if ("?-CAPDRM<>{}[]BIQYFLT".indexOf(c.toUpperCase()) >= 0)
							ret = c.toUpperCase();
					}
					break;
			}
		}
	}
	
	//if cold-key input append a cr...
	if ((user.settings&USER_COLDKEYS)&&(ret.indexOf("\r") < 0)) {
		ret += "\r";
	}
	
	//unget selected command key/option to the input buffer...
	console.ungetstr(ret);
	
}

//show current Message Group and Sub
console.putmsg("\1nrÞÞÝh±Þnþ y[hw@SMB_GROUP@y] k:w: @SMB_SUB@\1n");
main();

}

/* e m a i l _ r e a d e r - l i g h t b a r */

//name the email readers lightbar routine...
bbs.lightbar.email_reader = function() {
	
//function for number values...
function inputNumber(inNumber,iMax) {
	var bDone = false;
	var sRet = "" + inNumber;
	
	console.print(inNumber);
	while (bbs.online && (!bDone)) {
		if ((sRet.length >= iMax.toString().length)||((sRet.length == iMax.toString().length-1)&&(parseInt(sRet.substr(0,1)) > parseInt(iMax.toString().substr(0,1))))) {
			console.ansi_left(sRet.length);
			console.print("                                             ".substr(0,sRet.length));
			console.ansi_left(sRet.length);
			return "" + sRet;
		}

		var c = console.getkey();
		
		if (c == "") {
			sleep(200);
		}else{
			switch (c.toString()) {
				case KEY_BACK:
				case KEY_DEL:
					//cut the length of the string.
					sRet = sRet.substr(0,sRet.length-1);
					
					console.ansi_left(1);
					console.print(" ");
					console.ansi_left(1);
					if (sRet.length <= 0)
						bDone = true;
					break;
				case "0":
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9":
					sRet += "" + c;
					console.print(c);
					break;
				case "\r":
				case "\n":
					bDone = true;
					break;
			}
		}
	}
	
	if (sRet != "") {
		console.ansi_left(sRet.length);
		console.print("                                             ".substr(0,sRet.length));
		console.ansi_left(sRet.length);
		console.print("returning: "+sRet+"\r\n");
		console.pause();
		return sRet + "\r";
	} else {
		return "";
	}
}

//main function to run the email_reader...
function main() {

	//array of menu text lines...
	var options = new Array();
	options[0] = "\1nrÞÞÝh±Þnþ rhkeadingn y<<hw@SMB_CURMSG@\1yof\1n\1h\1w@SMB_MSGS@y>>kw ::kúÞnk7prevh0Þ next w kreply w kforward w kquit w ::k w y<n?-hhkelpny>hk y;n";
	options[1] = "\1nrÞÞÝh±Þnþ rhkeadingn y<<hw@SMB_CURMSG@\1yof\1n\1h\1w@SMB_MSGS@y>>kw ::k w kprevúÞnk7nexth0Þw kreply w kforward w kquit w ::k w y<n?-hhkelpny>hk y;n";
	options[2] = "\1nrÞÞÝh±Þnþ rhkeadingn y<<hw@SMB_CURMSG@\1yof\1n\1h\1w@SMB_MSGS@y>>kw ::k w kprev w knextúÞnk7replyh0Þw kforward w kquit w ::k w y<n?-hhkelpny>hk y;n";
	options[3] = "\1nrÞÞÝh±Þnþ rhkeadingn y<<hw@SMB_CURMSG@\1yof\1n\1h\1w@SMB_MSGS@y>>kw ::k w kprev w knext w kreplyúÞnk7forwardh0Þw kquit w ::k w y<n?-hhkelpny>hk y;n";
	options[4] = "\1nrÞÞÝh±Þnþ rhkeadingn y<<hw@SMB_CURMSG@\1yof\1n\1h\1w@SMB_MSGS@y>>kw ::k w kprev w knext w kreply w kforwardúÞnk7quith0Þw ::k w y<n?-hhkelpny>hk y;n";
	
	//array of the commands to return...
	var values = new Array();
	values[0] = "-";
	values[1] = "\r";
	values[2] = (system.settings&SYS_RA_EMU)?"R":"A";
	values[3] = "F";
	values[4] = "Q";
	
	//variables to hold the menu position and return value...
	var current = 1;
	var last = 0;
	var ret = "";
	
	//reset ctrl-c/abort...
	if (bbs.sys_status&SS_ABORT) bbs.sys_status &= ~SS_ABORT;
	
	//print devider line...
	console.print("\1"+"0\1k--\r\n")
	
	//begin menu input...
	while (bbs.online && (ret=="")) {
	bbs.menu.show_messages(); //show waiting messages, if any.
	
	//release cpu time...
	sleep(10);

		//main order for the module... 
		if (current != last) {
			console.ansi_left(80);
			console.clearline();
			console.putmsg(options[current]);
			last=current;
		}
		
		//get an input waiting...
		var c = console.inkey();
		
		//if no input...
		if (c == "") {
			//if ctrl-c pressed...
			if (bbs.sys_status&SS_ABORT) {
				//abort reading
				bbs.sys_status &= ~SS_ABORT;
				ret = "Q";
			}
			//sleep 1/10th of a second, to release cpu time...
			sleep(100);
		//otherwise if there is input...
		}else{
			//determine the key pressed...
			switch (c) {
				//if left or up key...
				case (KEY_LEFT):
				case (KEY_UP):
					current--; //decrease the current menu option...
					
					//if outside of range...
					if (current < 0)
						//set to end of range...
						current = options.length-1;
					break;
					
				//if right or down key pressed
				case (KEY_RIGHT):
				case (KEY_DOWN):
					current++; //increase the current menu option
					
					//if outside of range
					if (current >= options.length)
						current = 0;  //set to beginning of range
					break;
				
				//if cr or lf
				case "\r":
				case "\n":

					//return the currently selected option
					ret = values[current];
					break;
				
				//check other input
				default:

					//if a number
					if (!isNaN(c)) {

						//get numeric input, within the max messages in the area.
						ret = inputNumber(c,bbs.smb_msgs);

					//if a sysop
					} else if (user.security.level >= 90) {
						//check for valid input
						if ("?-LANRFQDSCUP".indexOf(c.toUpperCase()) >= 0)
							ret = c.toUpperCase();
					}else{
						//check for valid input
						if ("?-LANRFQD".indexOf(c.toUpperCase()) >= 0)
							ret = c.toUpperCase();
					}
					break;
			}
		}
	}
	
	//if cold-key input append a cr...
	if ((user.settings&USER_COLDKEYS)&&(ret.indexOf("\r") < 0)) {
		ret += "\r";
	}
	
	//unget selected command key/option to the input buffer...
	console.ungetstr(ret);
	
}

main();

}

/* a n i m a t e d _ p a u s e _ p r o m p t - l i g h t b a r */

//name the animated pause prompts routine...
bbs.lightbar.anipause = function() {

var bAnsi = ((console.autoterm&USER_ANSI) != 0)
if ((bbs.sys_status&SS_USERON) != 0) {
	bAnsi = ((user.settings&USER_ANSI) != 0)
}
if (!bbs.menu)
	bbs.menu = {};

//Loads the string into an array for animation. :)
function loadPrompts(inStr) {
	var arr = new Array();
	
	var strCenter = "                                        ".substr(0,35-parseInt(inStr.length/2));

	arr[0] = "\r" + strCenter + "\1h\1w::\1n\1c " + inStr + " \1h\1k::\1n "
	
	for (var i=-1; i<=inStr.length; i++) {
		var strAdd = "\r" + strCenter + "\1h\1k:: ";
		
		if (i > 1)
			strAdd += "\1n\1c" + inStr.substr(0,i-1);
		
		if (i > 0)
			if (inStr.substr(i-1,1) == " ")
				strAdd += "\1h\1k-";
			else
				strAdd += "\1h\1k" + inStr.substr(i-1,1);
			
		if ((i >= 0)&&(i<inStr.length))
			if (inStr.substr(i,1) == " ")
				strAdd += "\1h\1n-";
			else
				strAdd += "\1h\1n" + inStr.substr(i,1)
		
		if (i < inStr.length-1)
			if (inStr.substr(i+1,1) == " ")
				strAdd += "\1h\1k-";
			else
				strAdd += "\1h\1k" + inStr.substr(i+1,1);
			
		if (i < inStr.length-2)
			strAdd += "\1n\1c" + inStr.substr(i+2);
		
		strAdd += " \1h\1k::\1n ";
		arr[arr.length] = strAdd;
	}
	
	arr[arr.length] = "\r" + strCenter + "\1h\1k::\1n\1c " + inStr + " \1h\1w::\1n "
	return arr;
}

function pausePrompt(str) {
	//no pause in chat
	switch (system.node_list[bbs.node_num-1].action) {
		case (NODE_LCHT):
		case (NODE_MCHT):
		case (NODE_GCHT):
		case (NODE_PCHT):
		case (NODE_PAGE):
			//User in Chat, no pause.
			return "\r";
			break;
	}
	
	var sRet = ""; //return value
	var arrPrompts = loadPrompts(str); //Ansi Prompt(s)
	var iCurrent = 0; //current instance
	var bForward = true;
	
	console.ansi_left(80);
	console.clearline();
	while(bbs.online && bbs.menu.paused && (sRet == "")) {
		bbs.menu.show_messages(); //show waiting messages, if any.
		sleep(150);

		//Display the current prompt		
		console.ansi_left(80);
		console.print(arrPrompts[iCurrent]);
		if (bForward) {
			iCurrent++;
			if (iCurrent == arrPrompts.length-1) bForward = false;
		} else {
			iCurrent--;
			if (iCurrent == 0) bForward = true;
		}
		
		//Get any waiting input.
		sRet = console.inkey();
		if (bbs.sys_status&SS_ABORT) {
			bbs.sys_status &= ~SS_ABORT;
			sRet = "\3";
		}
	}
	
	bbs.menu.paused = false;
	bbs.menu.redraw = true;
	console.ansi_left(80);
	console.clearline();
	console.print("\1h\1n\r");
	return sRet;
}

//Checks online status, shouldn't be run. :)
function main() {
	if (!bbs.online) return;
	
	//clear input buffer first.
	while (console.inkey() != "") {
		//do nothing	
	};

	//clear abort tag
	bbs.sys_status &= ~SS_ABORT;
	
	if (bbs.menu.paused) {
		console.ansi_left(80);
		console.clearline();
		console.ansi_up();
		console.ungetstr("\r");
	} else {
		bbs.menu.paused = true;
		if (bAnsi) {

			//Ansi User	
			var sRet = pausePrompt("f u k i t");
			if (sRet != "") {
				sleep(10)
				while (console.inkey() != "") {};
				console.ungetstr(sRet);
				sleep(10);
			}else{
				console.ungetstr("\r");
			}
		} else {
			console.print("\1h\1n\r:: f u k i t ::"); //Ascii User, display default prompt.
			sleep(100);
		}
		bbs.menu.paused = false;
		bbs.menu.redraw = true;
	}
}

main();
bbs.menu.paused = false;
bbs.menu.redraw = true;

}

