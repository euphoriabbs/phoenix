//phoenix.menu.js
load("sbbsdefs.js")

/* p h o e n i x / s 3 _ m e n u _ l i b r a r y */

/*****************************************************************************
 welcome to the phoenix/s3 menu library.  here you will find the most complex
 inter-workings of phoenix/s3. also, this library is home to the majority of
 phoenix's custom object model and is the core of phoenix/s3.  most of the
 commands used within the phoenix command shell can be found pointing to this
 library.  also, the majority of custom strings that are unique to certain
 command's and menu's within the command shell can be altered here.
*****************************************************************************/

//system wide static variables container...
if (!bbs.phoenix)
	bbs.phoenix = {};

if (!bbs.lightbar)
	bbs.lightbar = {};

if (!bbs.menu)
	bbs.menu = {};

if (!bbs.mods.vanguard)
	bbs.mods.vanguard = {};

if (!bbs.mods.vanguard.assault)
	bbs.mods.vanguard.assault = {}

if (!bbs.mods.vanguard.assault.xtrn_sec)
	bbs.mods.vanguard.assault.xtrn_sec = {}

if (!bbs.trace) {

	//used for rendering traceObject data...
	bbs.mods.vanguard.traceLayers = 0;

/* s e t _ u s e r _ d e f a u l t s */

//name the user defaults routine...
bbs.menu.user_defaults = function () {

//disables the 'automatic new file scan' function in new message scans...
user.settings&=~USER_ANFSCAN;

//enable ansi terminal emulation...
user.settings|=USER_ANSI;

//disable newscan on logon...
user.settings&=~USER_ASK_NSCAN;

//disable ask for messages to you on logon...
user.settings&=~USER_ASK_SSCAN;

//enables 'batch file flagging' which is required for spylister...
user.settings|=USER_BATCHFLAG;

//disable spinning cursor at pause prompts...
bbs.node_settings|=NM_NOPAUSESPIN

//force split-screen chat on ANSI users
user.chat_settings|=CHAT_SPLITP;

//no inactivity exemption...
console.status|=CON_NO_INACT;

/* R E N E G A D E */

//expand to RENEGADE color codes... used for user signatures...
system.settings|=SYS_RENEGADE;

//changes the message reply command to renegade/iniquity/obv2 standard...
system.settings|=SYS_RA_EMU;

// force renegade command shell (for fallbacks)
user.command_shell = "RENEGADE";


//add flags required for user logon experience [if configured]...
if(do_user_config_bbs && !user.security.exemptions&UFLAG_A) {

	//give the user this flag so they won't be prompted again...
	user.security.exemptions = UFLAG_A;

	//for user statistics during logon...
	user.security.exemptions = UFLAG_I;

	//for oneliners during logon...
	user.security.exemptions = UFLAG_J;

	//for last few callers during logon...
	user.security.exemptions = UFLAG_K;

	//for node listing during logon...
	user.security.exemptions = UFLAG_L;

	//for ansi gallery during logon...
	user.security.exemptions = UFLAG_G;

	//for light bar prompts display...
	user.security.exemptions = UFLAG_M;

	//for rumors module display...
	user.security.exemptions = UFLAG_N;

	//for animated pause prompts...
	user.security.exemptions = UFLAG_O;

	//for message and email reader lightbars...
	user.security.exemptions = UFLAG_P;

	//for file lister lightbar...
	user.security.exemptions = UFLAG_Q;

	//for yes/no lightbar...
	user.security.exemptions = UFLAG_R;

}

//force update changes active...
system.node_list[bbs.node_num-1].misc|=NODE_UDAT;bbs.nodesync();sleep(100);

}

/* s y n c h r o n e t _ s t r i n g _ r e m o v a l */

//this string replacement gets rid of that nasty 'your time has been reduced' bullshit...
bbs.replace_text(567,"\1n\1k");

//removes the loaded message pointers...
bbs.replace_text(632,"\1n\1k---]");
bbs.replace_text(633,"\1n\1k---]");

/* r a n d o m _ h a n d l i n g */

//name the random handler routine...
bbs.menu.random_handler = function (string,handlerName) {

//now assign an integer to display the input string at random...
random = Math.floor ((Math.random() * string.length))

//and finally, assign a variable to the random string...
text = string[random]

	//switch/case handling to output proper random display...
	switch (handlerName) {

		//random ansi display...
		case 'random_ansi':
			bbs.ansi_slow(text);
			break;

		//ansi gallery...
		case 'ansi_gallery':
			ansiGallery(text);
			break;

		//random rumor display...
		case 'random_rumor':
			console.putmsg(text);
			break;
	}

}

/* d a t e _ h a n d l i n g */

//date handling functions for javascript by tracker1...
Date.prototype.months = Array("January","February","March","April","May","June","July","August","September","October","November","December");
Date.prototype.days = Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
Date.prototype.formatDate = function(strFormat) {

	//h = 24hr time, padded.
	//h24 = 24hr time, not padded
	//hh = 12hr time, padded.
	//h12 = 24hr time, not padded.

	var yyyy = this.getFullYear();
	var yy = (""+yyyy).substr(2,2);
	var month = this.months[this.getMonth()];
	var mmm = month.substr(0,3);
	var mm = this.getMonth() + 1;
	var m = mm;
	var day = this.days[this.getDay()];
	var ddd = day.substr(0,3);
	var dd = this.getDate();
	var d = dd;
	var h = this.getHours();
	var h24 = h;
	var ap = (h24 > 12)?"PM":"AM";
	var h12 = (h24 > 12)?(h24 - 12):h24;
	var nn = this.getMinutes();
	var ss = this.getSeconds();
	var ms = this.getMilliseconds();
	if (h12 == 0) h12 = 12;
	var hh = h12;
	if (mm < 10) mm = "0" + mm;
	if (dd < 10) dd = "0" + dd;
	if (h < 10) h = "0" + h;
	if (hh < 10) hh = "0" + hh;
	if (nn < 10) nn = "0" + nn;
	if (ss < 10) ss = "0" + ss;
	if (ms < 10) ms = "00" + ms;
	else if (ms < 100) ms = "0" + ms;
	tz = this.getTimezoneOffset();
	var gmt;
	if (tz < 0)
		gmt = "GMT-" +  tz / 60;
	else if (tz == 0)
		gmt = "GMT";
	else
		gmt = "GMT+" + tz / 60;
	tz = gmt;

	return strFormat.replace(/yyyy/ig,yyyy).replace(/yy/ig,yy
		).replace(/day/ig,day).replace(/ddd/ig,ddd).replace(/dd/ig,dd).replace(/d$/ig,d).replace(/d([^a-z])/ig,d+"$1"
		).replace(/gmt/ig,gmt).replace(/tz/ig,tz).replace(/ms/ig,ms
		).replace(/h24/ig,h24).replace(/h12/ig,h12).replace(/hh/ig,hh
		).replace(/^h/ig,h).replace(/([^a-z])h/ig,"$1"+h
		).replace(/month/ig,month).replace(/mmm/ig,mmm).replace(/mm/ig,mm).replace(/m$/ig,m).replace(/m([^a-z])/ig,m+"$1"
		).replace(/nn/ig,nn).replace(/ss/ig,ss).replace(/ap/ig,ap);
}

/* b a j a _ m o d u l e - i n c l u d e s */

//name the baja modules routine...
bbs.menu.baja = function(input) {

	// input is written to a temp file in the exec folder, compiled, run, then deleted
	var f = new File(system.exec_dir+"/temp_" + bbs.node_num + ".src")
	if (!f.open("w")) { //should NEVER happen
	    var errmsg = "!ERROR: Unable to write to temp file. (eval_baja:" + strFileName + ")";
	    log(errmsg);
	    console.print(errmsg);
	    return false;
	}else{
		f.write(input + "\r\n");
		f.close();

		if (system.os_version.toLowerCase().indexOf("windows") >= 0)
			bbs.exec("baja /o temp_" + bbs.node_num + ".src",0,system.exec_dir);
		else
			bbs.exec("baja /o temp_" + bbs.node_num + ".src",0,system.exec_dir);

		bbs.exec("*temp_" + bbs.node_num);

		file_remove(system.exec_dir+"/temp_" + bbs.node_num + ".src");
		file_remove(system.exec_dir+"/temp_" + bbs.node_num + ".bin");
	}
	f = null;
}

/* x t r n _ m e n u - i n c l u d e s */

//name the external menu library select list routine...
bbs.mods.vanguard.selectList = function(options,x1,y1,x2,y2,defaultVal) {
	/*********************************************************************
	NOTES:
		ANSI ONLY, not friendly to ascii/plain text clients.
	======================================================================
	CONSTRUCTOR ARGUMENTS:
		options		an associative array of the options to select from;
		x1			left box position on the screen
		y1			top box position on the screen
		x2			right box position on the screen
		y2			bottom box position on the screen
		defaultVal		optional: value of current item from options array
	----------------------------------------------------------------------
	PROPERTIES: (only properties meant to be public are listed here)
		options		same as above
		x1			same as above
		y1			same as above
		x2			same as above
		y2			same as above
		normalText		prefixed to normal/unselected text
		selectedText 	prefixed to selected text
		onchange		function to call when a selection changes, passes ONE
					    argument, the selected option's value
		raised			when choose() is called, the key that raised the
						return will be stored here, default null;
		value			the value of the current selection will be stored here
						if cancelled, will hold the original/default value.
	----------------------------------------------------------------------
	METHODS: (only properties meant to be public listed)
		choose		renders the select box, and returns the selected
					option's value, when one is selected, returns null
					if ctrl-c, or escape are pressed, returns the value
					on enter or tab
	*********************************************************************/

	// CONSTRUCTION
	//bbs.trace.write("selectList","begin constructor");
	try {
		if ((x1 == null) || (x1 == undefined) || (x1 < 1))
			throw("ArgumentError: x1 is invalid");
		if ((x2 == null) || (x2 == undefined) || (x2 < 1))
			throw("ArgumentError: x2 is invalid");
		if ((y1 == null) || (y1 == undefined) || (y1 < 1))
			throw("ArgumentError: y1 is invalid");
		if ((y2 == null) || (y2 == undefined) || (y2 < 1))
			throw("ArgumentError: y2 is invalid");
		if (5 > (x2 - x1))
			throw("ArgumentError: x2 must be at least x1 + 4");
		if (2 > (y2 - y1))
			throw("ArgumentError: y2 must be at least y1 + 1");

		this.padding = "                                                                                ";
		this.options = options;
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;

		this.normalBackground = "\1n\1"+"8";
		this.normalForground = "\1w";
		this.normalHotkey = "\1h\1y";
		this.normalSpacer = "\1h\1k";

		this.selectedBackground = "\1n\1"+"3";
		this.selectedForground = "\1h\1w";
		this.selectedHotkey = "\1h\1y";
		this.selectedSpacer = "\1k";

		//this.normalText = "\1w\1n";
		//this.normalTextHotkey = "\1n\1h\1y";
		//this.selectedText = "\1n\1w\1h\1"+"4";
		//this.selectedTextHotkey = "\1n\1"+"4\1h\1y";

		this.spacer = " - "
		this.showKeys = false;
		this.padText = false;

		this.scrollBarUpOn = "\1n\1h\1w\036";
		this.scrollBarUpOff = "\1n\036";
		this.scrollBarDownOn = "\1n\1h\1w\037";
		this.scrollBarDownOff = "\1n\037";
		this.scrollBarBlock = "\1n\333";
		this.scrollBarBack = "\1n\1h\1k\262";
		this.scrolling = true;
		this.onchange = null;
		this.ontick = null;
		this.raised = null;
		this.defaultVal = defaultVal;
		this.value = defaultVal;
		this.current = 0;
		this.start = 0;
		this.opts = new Array(); // numeric array for internal use
		this.optsVal = new Array(); // numeric array for internal use

		for (var x in this.options) {
			this.opts[this.opts.length] = this.options[x];
			this.optsVal[this.optsVal.length] = x;
		}
	} catch(err) {
		bbs.trace.render(err);
	}
	//bbs.trace.write("selectList","end constructor");

	this.clear = function() {
		//bbs.trace.write("selectList","begin clear()");
		for (var i=this.y1; i<=this.y2; i++) {
			console.ansi_gotoxy(this.x1,i);
			for (var j=x1; j<=x2; j++)
				console.write(" ");
		}
		//bbs.trace.write("selectList","end clear()");
	}

	this.renderScrollBar = function() {
		//bbs.trace.write("selectList","begin renderScrollBar()");

		//show arrow
		console.ansi_gotoxy(this.x2,this.y1);
		if (this.current == 0)
			console.print(this.scrollBarUpOff);
		else
			console.print(this.scrollBarUpOn);


		//show down arrow
		console.ansi_gotoxy(this.x2,this.y2);
		if (this.current == this.opts.length-1)
			console.print(this.scrollBarDownOff);
		else
			console.print(this.scrollBarDownOn);

		//clear between
		for (var y = this.y1+1; y<this.y2; y++) {
			console.ansi_gotoxy(x2,y);
			console.print(this.scrollBarBack);
		}

		//show block - if needed
		if (this.y2 - this.y1 < this.opts.length-1) {
			var h = this.y2 - this.y1 - 2;
			var s = parseInt(h*(this.current+1)/this.opts.length);
			if (s > h-1) s == h-1;
			console.ansi_gotoxy(this.x2,this.y1+1+s);
			console.print(this.scrollBarBlock);
		}

		//bbs.trace.write("selectList","end renderScrollBar()");
	}

	this.getCurrentOption = function() {
		//bbs.trace.write("selectList","begin getCurrentOption()");

		var ret="";
		var i = -1;
		for (x in this.options) {
			i++;
			if (i == this.current)
				ret = x;
		}

		//bbs.trace.write("selectList","end getCurrentOption()");
		return ret;
	}

	this.renderOptions = function() {
		//bbs.trace.write("selectList","begin renderOptions()");

		var x1 = this.x1
		var x2 = this.x2 - 1;
		var y1 = this.y1;
		var y2 = this.y2;
		var w = x2 - x1 + 1;
		var h = y2 - y1 + 1;
		var keyLen = 0;

		if (this.current == 0) {
			this.start = 0;
		} else if (this.current <= this.start) {
			this.start = this.current - 1;
		} else if (this.current == this.opts.length - 1) {
			this.start = this.current - h + 1;
		} else if (this.current > this.start + h - 2) {
			this.start = this.current - h + 2;
		}

		if (this.start < 0)
			this.start = 0;

		for (var i=0; i<this.optsVal.length; i++)
			if (this.optsVal[i].indexOf("spacer") != 0 && this.optsVal[i].length > keyLen)
				keyLen = this.optsVal[i].length;

		console.ansi_gotoxy(x1,y1);

		var optVal;
		var optText;
		var optSpacer;
		for (var i=this.start,j=y1; j<=y2; i++,j++) {
			console.line_counter = 0;
			console.ansi_gotoxy(x1,j);


			if (i >= this.opts.length) {
				print(this.normalBackground + this.normalForground + this.padding.substring(0,w));
			} else {
				if (this.optsVal[i].indexOf("spacer") == 0) {
					optVal = "";
					optSpacer = this.padding.substring(0,w).replace(/ /g,"-");
					optText = "";
			 	} else if (this.showKeys) {
					optVal = this.padding + this.optsVal[i];
					optVal = optVal.substring(optVal.length - keyLen - ((this.padText)?1:0));
					optSpacer = this.spacer;
					optText = (this.opts[i] + this.padding).substring(0,w - keyLen - this.spacer.length - ((this.padText)?2:0)) + ((this.padText)?" ":"");
				} else {
					optVal = ""
					optSpacer = ""
					optText = ((this.padText)?" ":"") + (this.opts[i] + this.padding).substring(0,w - ((this.padText)?2:0)) + ((this.padText)?" ":"");
				}

				if (i == this.current) {
					print(
						this.selectedBackground +
						this.selectedHotkey +
						optVal +
						this.selectedBackground +
						this.selectedSpacer +
						optSpacer +
						this.selectedBackground +
						this.selectedForground +
						optText
					);
				} else {
					print(
						this.normalBackground +
						this.normalHotkey +
						optVal +
						this.normalBackground +
						this.normalSpacer +
						optSpacer +
						this.normalBackground +
						this.normalForground +
						optText
					);

				}
			}
		}

		this.renderScrollBar();

		this.value = this.getCurrentOption();
		if (this.onchange && typeof(this.onchange)=="function") this.onchange(this.value);

		console.ansi_gotoxy(x2+2,y2);

		//bbs.trace.write("selectList","end renderOptions()");
	}

	this.choose = function() {
		var init_passthru=console.ctrlkey_passthru;
		try {
			//bbs.trace.write("selectList","begin choose()");

			console.status &= ~(1<<8); //CON_RAW_IN - no raw input
			console.ctrlkey_passthru=~(0x08000000);
			this.raised = null; //reset raised value

			var ret = null;

			this.clear();
			this.renderOptions();

			var k = "";
			var x1 = this.x1;
			var x2 = this.x2 - 1;
			var y1 = this.y1;
			var y2 = this.y2;
			var w = x2 - x1 + 1;
			var h = y2 - y1 + 1;

			while (bbs.online && ret == null) {
				console.line_counter = 0;

				k = console.inkey();
				if (bbs.sys_status&SS_ABORT) { //ctrl-c
					bbs.sys_status &= ~SS_ABORT;
					k = "\3";
				}
				if (k == "" && ((system.node_list[bbs.node_num-1].misc&NODE_NMSG) != 0)||((system.node_list[bbs.node_num-1].misc&NODE_MSGW) != 0)) {
					this.raised = "";
					ret = "";
				} if (k != "") {
					if (this.onkeypress != null && typeof(this.onkeypress)=="function")
						this.onkeypress(k);

					//console.print(k.charCodeAt(0).toString(8));
					switch (k) {
						case(KEY_UP):
							this.current--;
							if (this.current < 0)
								this.current = this.opts.length - 1;

							while (this.optsVal[this.current].indexOf("spacer") == 0) {
								this.current--;
								if (this.current < 0)
									this.current = this.opts.length - 1;
							}

							this.renderOptions();
							break;
						case(KEY_DOWN):
							this.current++;
							if (this.current >= this.opts.length)
								this.current = 0;
							while (this.optsVal[this.current].indexOf("spacer") == 0) {
								this.current++;
								if (this.current >= this.opts.length)
									this.current = 0;
							}

							this.renderOptions();
							break;
						case "\r":
							ret = this.value;
							break;
						default:
							if (k == "") {
								ret = "";
							} else if (k.charCodeAt(0) < 32) { //raise control key
								this.raised = k;
								ret = "";
							} else {
								var firstMatch = -1; //first matching item
								var matches = 0; //count of matches
								for (var i=0; i<this.optsVal.length; i++) {
									var t = this.optsVal[i];
									if ((t.indexOf("spacer") != 0) && ((t.toLowerCase() == k.toLowerCase()) || (t.substring(0,1).toLowerCase() == k.toLowerCase()))) {
										if (firstMatch == -1) firstMatch = i;
										matches++
									}
								}
								if (firstMatch >= 0) {
									this.current = firstMatch;
									this.renderOptions();
									if (matches == 1)
										ret = this.optsVal[firstMatch];
								}
							}
							break;
					}
				} else if (this.ontick && typeof(this.ontick)=="function") {
					this.ontick();
					console.ansi_gotoxy(this.x2+1,this.y2);
				}
				sleep(10);

			}
			console.ansi_gotoxy(1,this.y2+1);

			//bbs.trace.write("selectList","end choose()");
			console.ctrlkey_passthru=init_passthru;
		} catch(err) {
			ret = "";
			bbs.trace.render(err);
		}
		console.ctrlkey_passthru=init_passthru;
		return ret;
	} // end choose()
} // end bbs.mods.vanguard.selectList

//external section trace object library routine...
bbs.mods.vanguard.traceItem = function(_type,_section,_message) {
		this.type = _type; // "branch", "write", "warn"
		this.section = _section; // "descriptive name"
		this.message = _message; // "message, unless a branch"
		this.trace = null; //traceObject, if a branch

		if (this.type == "branch") {
			//traceItem is a branch, load a trace object to hold children
			this.trace = new bbs.mods.vanguard.traceObject(_section);
			this.trace.enabled = true; //presume enabled, as parent should be.
		}
	}

	bbs.mods.vanguard.traceObject = function(_id) {
		this.id = _id;
		this.padding = "                                                                               ";
		this.enabled = false;
		this.stack = new Array();
		this.closed = false;

		//clear the stack
		this.clear = function() {
			this.stack = new Array();
		}

		//clear/close the traceObject, only if not _root
		this.close = function() {
			this.clear();
			if (this.id != "_root") this.closed = true;
		}

		//create a branched item
		this.branch = function(routine) {
			if (this.enabled && !this.closed) {
				if ((this.stack.length > 0) && (this.stack[this.stack.length-1].type=="branch") && (!this.stack[this.stack.length-1].closed)) {
					this.stack[this.stack.length-1].trace.branch(routine)
				} else {
					this.stack[this.stack.length] = new bbs.mods.vanguard.traceItem("branch",routine,"");
				}
			}
		}

		//merge/close branched traceItem
		this.merge = function() {
			if (this.enabled && !this.closed) {
				if ((this.stack.length > 0) && (this.stack[this.stack.length-1].type=="branch") && (!this.stack[this.stack.length-1].closed)) {
					//last child is an open branch - merge child
					this.stack[this.stack.length-1].trace.merge();
				} else {
					//if this traceObject isn't _root, closes self;
					if (this.id != "_root")
						this.close();
				}
			}
		}

		//adds a warn message to the stack
		this.warn = function(section,message) {
			if (this.enabled && !this.closed) {
				var sec = (message)?section:""; //only set if 2 items are passed
				var msg = (message)?message:section; //uses last param

				if ((this.stack.length > 0) && (this.stack[this.stack.length-1].type=="branch") && (!this.stack[this.stack.length-1].closed)) {
					//if last traceItem in stack is a branch, pass down.
					this.stack[this.stack.length-1].trace.warn(section,message);
				} else {
					//message for this traceObject
					this.stack[this.stack.length] = new bbs.mods.vanguard.traceItem("warn",sec,msg);
				}
			}
		}

		//adds a normal message to the stack, similar to warn
		this.write = function(section,message) {
			if (this.enabled && !this.closed) {
				var sec = (message)?section:"";
				var msg = (message)?message:section;
				if ((this.stack.length > 0) && (this.stack[this.stack.length-1].type=="branch") && (!this.stack[this.stack.length-1].closed)) {
					this.stack[this.stack.length-1].trace.write(section,message);
				} else {
					this.stack[this.stack.length] = new bbs.mods.vanguard.traceItem("write",sec,msg);
				}
			}
		}

		//uses console output if bbs.online, in addition to log output
		this.printLine = function(_line) {
			log(_line);
			if (bbs.online)
				print(_line);
		}

		//render the stack using the print() function...
		this.render = function(_err) {
			//display error description/message/toString if anything to display
			if (_err) {
				if (_err.description) {
					this.printLine("\r\n\r\n\1h\1yAn Error Occured: \1n" + ((_err.number)?_err.number + " ":"") + _err.description + "\r\n");
				} else if (_err.message) {
					this.printLine("\r\n\r\n\1h\1yAn Error Occured: \1n" + ((_err.number)?_err.number + " ":"") + _err.message + "\r\n");
				} else {
					this.printLine("\r\n\r\n\1h\1yAn Error Occured: \1n" + _err.toString() + "\r\n");
				}
			}

			if (!this.enabled) {
				this.printLine("\1n\1y\1hNO STACK TO RENDER: \1ntrace.enabled is false.");
			} else {
				var prespace = "  ";

				if (bbs.mods.vanguard.traceLayers == 0)
					this.printLine("\1n\1y\1hRENDERING TRACE STACK:\1n ");
				else
					prespace = "                                                  ".substring(0,(bbs.mods.vanguard.traceLayers*2) + 2)

				if (this.closed) {
					this.printLine(prespace + "\1h\1n\1c" + this.id + "\1n{<closed>}");
				} else {
					this.printLine(prespace + "\1h\1n\1c" + this.id + "\1n{");

					bbs.mods.vanguard.traceLayers++;
					for (var i=0; i<this.stack.length; i++) {
						switch(this.stack[i].type) {
							case "branch":
								this.stack[i].trace.render();
								break;
							case "warn":
								this.printLine(
									prespace + "  " +
									"\1h\1w  " + (this.stack[i].section + this.padding).substring(0,18) +
									"\1r  " + (this.stack[i].message + this.padding).substring(0,(54 - prespace.length)) +
									"\1n "
								);
								break;
							case "write":
								this.printLine(
									prespace + "  " +
									"\1n\1h\1w  " + (this.stack[i].section + this.padding).substring(0,18) +
									"\1n  " + (this.stack[i].message + this.padding).substring(0,(54 - prespace.length)) +
									"\1n "
								);
								break;
						}
					}
					bbs.mods.vanguard.traceLayers--;

					this.printLine(prespace + "\1n} \1h\1k" + this.id + "\1n");
				}

				if (bbs.mods.vanguard.traceLayers == 0)
					this.printLine("");
			}
		} //end traceObject.render()
	} //end traceObject()


	//create bbs.trace object
	bbs.trace = new bbs.mods.vanguard.traceObject("_root");
}

/* i n f o r m a t i o n _ m e n u - i n c l u d e s */

//string customization for config setup option...
bbs.menu.config_setupOne = function() {

//remove these options from the available toggles list...
bbs.replace_text(478,"");	//expert menu mode...
bbs.replace_text(479,"");   //screen pausing...
bbs.replace_text(481,"");	//spinning cursors...
bbs.replace_text(482,"");   //clear screen between messages...
bbs.replace_text(483,"");	//new message/file scan...
bbs.replace_text(484,"");	//unread messages...
bbs.replace_text(485,"");	//auto new file scan...
bbs.replace_text(487,"");	//batch file flagging...
bbs.replace_text(489,"");	//command shell...
bbs.replace_text(490,"");	//default to quiet mode...
bbs.replace_text(492,"");	//temp/qwk archive type...
bbs.replace_text(480,"");	//hotkeys...

//default settings for...
bbs.replace_text(474,"\1n\1h\1c\\\\ \1n\1h\1kdefault settings for \1n\1h\1c%s\1n\1h\1k... \r\n\r\n")

//display the available toggles...
bbs.replace_text(475,"  \1n\1h\1c>> \1n\1h\1kt\1n\1h\1c_ \1nterminal mode              n:: c%s\r\n");
bbs.replace_text(476,"  \1n\1h\1c>> \1n\1h\1ke\1n\1h\1c_ \1nexternal editor            n:: c%s\r\n");
bbs.replace_text(477,"  \1n\1h\1c>> \1n\1h\1kl\1n\1h\1c_ \1nscreen length              n:: c%s\r\n");
bbs.replace_text(486,"  \1n\1h\1c>> \1n\1h\1kr\1n\1h\1c_ \1nremember current sub       n:: c%s\r\n");
bbs.replace_text(488,"  \1n\1h\1c>> \1n\1h\1km\1n\1h\1c_ \1nforward e-mail to netmail  n:: c%s\r\n");
bbs.replace_text(493,"  \1n\1h\1c>> \1n\1h\1kz\1n\1h\1c_ \1ndefault download protocol  n:: c%s c%s\r\n");
bbs.replace_text(491,"  \1n\1h\1c>> \1n\1h\1kw\1n\1h\1c_ \1nchange password / signature \r\n");

//the option prompt...
bbs.replace_text(494,"\r\n\1n\1h\1c\\\\ \1npage_[\1n\1c1/2\1n] \1n[\1n\1cq\1n]uit [\1n\1center\1n] to continue //\1n\1h\1kcommand\1n\1h\1c_ ");

//clear the console...
console.clear();

//now load the available toggles...
bbs.user_config();

//force update changes active...
system.node_list[bbs.node_num-1].misc|=NODE_UDAT;bbs.nodesync();sleep(100);

}

//name the config menu's routine...
bbs.menu.config_setupTwo = function() {

//update node status...
system.node_list[bbs.node_num-1].action = NODE_DFLT;

//force update changes active...
system.node_list[bbs.node_num-1].misc|=NODE_UDAT;bbs.nodesync();sleep(100);

//re-load the external library for refreshing of external options...
load('../phoenix/telnet/phoenix.external.js');

//clear the console...
console.clear();

//is the user allowed to configure these preferences?
if(do_user_config_bbs) {

//continue with menu options...

//if disabled...
}else{

//clear the screen...
console.clear();

//this menu is disabled...
console.putmsg("\1n\1h\1c\\\\ \1n\1h\1k@SYSOP@ has disabled the use of these options...\r\n");

//feed the line, and display a pause prompt...
console.crlf();console.pause();

//return back the the information menu...
return;

}

//assign variables to the options...
var userStats 	= "  \1n\1h\1c>> \1n\1h\1ku\1n\1h\1c_ \1nuser statistics is         ";
var oneLiners 	= "  \1n\1h\1c>> \1n\1h\1ko\1n\1h\1c_ \1noneliners is               ";
var lastCalls 	= "  \1n\1h\1c>> \1n\1h\1kl\1n\1h\1c_ \1nlast few callers is        ";
var nodeList  	= "  \1n\1h\1c>> \1n\1h\1kn\1n\1h\1c_ \1nnode listing is            ";
var gallery	  	= "  \1n\1h\1c>> \1n\1h\1kg\1n\1h\1c_ \1nansi babe gallery is       ";
var lightBar  	= "  \1n\1h\1c>> \1n\1h\1kp\1n\1h\1c_ \1nlightbar prompts are       ";
var rumors    	= "  \1n\1h\1c>> \1n\1h\1kr\1n\1h\1c_ \1nrumor display is           ";
var anipause  	= "  \1n\1h\1c>> \1n\1h\1ka\1n\1h\1c_ \1nanimated pausing is        ";
var msgLbar	  	= "  \1n\1h\1c>> \1n\1h\1km\1n\1h\1c_ \1nmessage reader lightbar is ";
var fileLbar 	= "  \1n\1h\1c>> \1n\1h\1kf\1n\1h\1c_ \1nfile lister lightbar is    ";
var yesnoLB 	= "  \1n\1h\1c>> \1n\1h\1ky\1n\1h\1c_ \1nyes/no lightbar is         ";

//display the header...
console.putmsg("\1n\1h\1c\\\\ \1n\1h\1kdefault settings for \1n\1h\1c@ALIAS@\1n\1h\1k... \r\n\r\n");

//display the logon experiance header...
console.print("  \1n\1h\1c// \1n\1h\1kconfigure your logon routine...\r\n\r\n");

//display the results...
if(do_user_stats) {
	console.print(userStats + ((user.security.exemptions&UFLAG_I)?'n:: cEnabled ':'n:: cDisabled ') + '\1n\r\n');
	}
if(do_oneliners) {
	console.print(oneLiners + ((user.security.exemptions&UFLAG_J)?'n:: cEnabled ':'n:: cDisabled ') + '\1n\r\n');
	}
if(do_lastcalls) {
	console.print(lastCalls + ((user.security.exemptions&UFLAG_K)?'n:: cEnabled ':'n:: cDisabled ') + '\1n\r\n');
	}
if(do_node_list) {
	console.print(nodeList  + ((user.security.exemptions&UFLAG_L)?'n:: cEnabled ':'n:: cDisabled ') + '\1n\r\n');
	}
if(do_gallery) {
	console.print(gallery   + ((user.security.exemptions&UFLAG_G)?'n:: cEnabled ':'n:: cDisabled ') + '\1n\r\n');
	}

//display the command shell preferences header...
console.print("\r\n  \1n\1h\1c// \1n\1h\1kconfigure your command shell preferences...\r\n\r\n");

if(do_lightbar_prompts) {
	console.print(lightBar  + ((user.security.exemptions&UFLAG_M)?'n:: cEnabled ':'n:: cDisabled ') + '\1n\r\n');
	}
if(do_rumors) {
	console.print(rumors    + ((user.security.exemptions&UFLAG_N)?'n:: cEnabled ':'n:: cDisabled ') + '\1n\r\n');
	}
if(do_animated_pause) {
	console.print(anipause  + ((user.security.exemptions&UFLAG_O)?'n:: cEnabled ':'n:: cDisabled ') + '\1n\r\n');
	}
if(do_message_reader && do_email_reader) {
	console.print(msgLbar  	+ ((user.security.exemptions&UFLAG_P)?'n:: cEnabled ':'n:: cDisabled ') + '\1n\r\n');
	}
if(do_file_lister) {
	console.print(fileLbar  + ((user.security.exemptions&UFLAG_Q)?'n:: cEnabled ':'n:: cDisabled ') + '\1n\r\n');
	}
if(do_yesno_lightbar) {
	console.print(yesnoLB	+ ((user.security.exemptions&UFLAG_R)?'n:: cEnabled ':'n:: cDisabled ') + '\1n\r\n');
	}

//now display a prompt for input...
console.print("\r\n\1n\1h\1c\\\\ \1npage_[\1n\1c2/2\1n] \1n[\1n\1cq\1n]uit [\1n\1center\1n] to continue //\1n\1h\1kcommand\1n\1h\1c_ ");

    //commands available for the menu...
	switch(cmdkey=console.getkeys("UOLGNPRNAMFQY",K_UPPER)) {
		case 'U':	//toggle user statistics in logon...
			user.security.exemptions ^= UFLAG_I;
			break;
		case 'O':	//toggle oneliners in logon...
			user.security.exemptions ^= UFLAG_J;
			break;
		case 'L':	//toggle last few callers in logon...
			user.security.exemptions ^= UFLAG_K;
			break;
		case 'N':	//toggle node status in logon...
			user.security.exemptions ^= UFLAG_L;
			break;
		case 'G':	//toggle ansi gallery during logon...
			user.security.exemptions ^= UFLAG_G;
			break;
		case 'P':	//toggle lightbar prompts...
			user.security.exemptions ^= UFLAG_M;
			break;
		case 'R':	//toggle rumor display...
			user.security.exemptions ^= UFLAG_N;
			break;
		case 'A':	//toggle animated pause prompts...
			user.security.exemptions ^= UFLAG_O;
			break;
		case 'M':	//toggle message and email reader lightbars...
			user.security.exemptions ^= UFLAG_P;
			break;
		case 'F':	//toggle file lister lightbar...
			user.security.exemptions ^= UFLAG_Q;
			break;
		case 'Y':	//toggle yes/no lightbars...
			user.security.exemptions ^= UFLAG_R;
			break;
		case 'Q':	//quit...
			bbs.phoenix.menu_information();
			break;
		default:
			return;
	}

//create loop point for the menu...
while(1) bbs.menu.config_setupTwo();

}

//name the system information routine...
bbs.menu.system_info = function()  {

//now display the ansi file...
bbs.ansi_norm("art.phoenix.system_info");

//create a line feed...
console.crlf();

//now display a pause...
console.pause();

}

//name the system kredits routing...
bbs.menu.system_kredits = function()  {

//now display the ansi...
bbs.ansi_norm("art.phoenix.system_kredits");

//create a line feed...
console.crlf();

//now display a pause...
console.pause();

}

/* m e s s a g e _ m e n u - i n c l u d e s */

//name the read messages routine...
bbs.menu.read_msgs = function() {

//remove the message scanner...
bbs.replace_text(67,"\1n\1k---");

//where you want the cursor located...
console.gotoxy(1,24);console.clearline();

//display the desired output...
console.print('\1nb���h��n� \1n\1nreading messages...');

//create a slight delay...
console.print('\1,\1,\1,\1,');

//now read the messages in the current sub...
bbs.scan_posts(msg_area.grp_list[bbs.curgrp].sub_list[bbs.cursub].code,SCAN_NEW|SCAN_BACK);

}

//name the post messages routine...
bbs.menu.post_msgs = function() {

//remove the lightbar...
console.gotoxy(1,2);console.clearline();

//post to...
bbs.replace_text(597,"[2;1H\1n\1c\1hp\1n\1cost \1n\1c\1ht\1n\1co\1n\1h\1c_ \1n");

// do you mean?
bbs.replace_text(547,"\1_\1n\1b\1hDo you mean %s #%u (\1cY\1bes, \1cN\1bo, or \1cQ\1buit) ? \1n");

//subject...
bbs.replace_text(21,"[2;1H\1n\1c\1hs\1n\1cubject\1n\1c\1h_ \1n");

//aborted...
bbs.replace_text(30,"\1n\1k---");

//posting on statement...
bbs.replace_text(19,"\1nb���h��n� phkosting on \1n%s %s");

//where you want the posting statement located...
console.gotoxy(1,24);console.clearline();

//now post a message...
bbs.post_msg(msg_area.grp_list[bbs.curgrp].sub_list[bbs.cursub].code);

}

//menu specific strings...
bbs.menu.message_strings = function() {

//message scanner...
bbs.replace_text(67,'[24;1H\1nb���h��n� -c%-15.15s yh%-40.40s\1,\1,'); //display the subz scanned...
bbs.replace_text(116,''); //message scan...
bbs.replace_text(117,''); //sub totals...

//post data information for message menu...
bbs.replace_text(33,"\r\n\1nb���h��n� shkaving..."); //saving statement...
bbs.replace_text(34,"\r\n\1nb���h��n� shkaved \1n%lun characters (n%un lines)...n"); //saved statement...
bbs.replace_text(35,"\r\n\1nb���h��n� whkriting index..."); //writing index statement...
bbs.replace_text(37,"\r\n\1nb���h��n� phkosted on \1n%s %s\r\n"); //posted on statement...

}

//name the select subboard routine...
bbs.menu.msg_select_subboard = function() {

//the ansi header file...
bbs.ansi_norm("art.phoenix.message_header-sub");

	//list and select a subboard for the current group...
	var grp_subs = msg_area.grp_list[bbs.curgrp].sub_list;
	for (var i=0; i<grp_subs.length; i++) {
		if (grp_subs[i].can_read) {

			//what the subboard output list will look like...
			console.print("               \1n\1h\1k" + ((i==bbs.cursub)?">>":"  ") + ((i+1)+"   ").substr(0,2) +  "\1k :: \1n\1c" + grp_subs[i].name + "\r\n");
		}
	}

	//display the ansi footer file [if configured]...
	if (do_message_footer) {
		bbs.ansi_noclear("art.phoenix.message_footer-sub");

		//send the cursor to a specific location...
		console.gotoxy(77,6);

	//if disabled...
	}
	else {
		console.print("\r\n\1nprompt:\1n ");	//put your string here...
	}

	//show the current subboard location...
	bbs.cursub = console.getnum(grp_subs.length)-1;
}

//name the select group routine...
bbs.menu.msg_select_group = function() {

//the ansi header file...
bbs.ansi_norm("art.phoenix.message_header-grp");

	//list and select a subboard for the current group...
	var grp_list = msg_area.grp_list;
	for (var i=0; i<grp_list.length; i++)

//what the group output list will look like...
console.print("               \1n\1h\1k" + ((i==bbs.curgrp)?">>":"  ") + ((i+1)+"   ").substr(0,2) +  "\1k :: \1n\1c" + grp_list[i].name + "\r\n");

//display the ansi footer file [if configured]...
if(do_message_footer) {
	bbs.ansi_noclear("art.phoenix.message_footer-grp");

	//send the cursor to a specific location...
	console.gotoxy(77,6);

//if disabled...
}else{
	console.print("\r\n\1nprompt:\1n ");	//put your string here...
}

//show the current subboard location...
bbs.curgrp = console.getnum(grp_list.length)-1;

//now jump to the subboard listings...
bbs.menu.msg_select_subboard();

}

/* f i l e _ m e n u - i n c l u d e s */

//name the list files routine...
bbs.menu.list_files = function() {

//need to re-load the file lister header ansi, cause synchronet fucks up...
bbs.replace_text(661,"@NOPAUSE@@CLS@@TYPE:../phoenix/artwork/art.phoenix.file_lister.ans@@NOPAUSE@");

//removes the empty directory listing string...
bbs.replace_text(169,"\1n\1k---]");

//load the baja string to execute the file listings...
//bbs.menu.baja("setstr *.*" + "\r\n" + "file_list");
//bbs.exec("/srv/phoenix/sbbs/exec/filearea-lb.js");
bbs.list_files(bbs.cursub);
//file_area.lib_list[bbs.curlib].dir_list[bbs.curdir].name;

}

//name the download files routine...
bbs.menu.download_files = function() {

//change some strings...
bbs.replace_text(199,"\r\n\r\n\1n\1r\1h  >> \1n\1h\1kfilespec \1n[\1n\1h\1k*.*\1n]_ ");		//get filespec...
bbs.replace_text(166,"\r\n\1n\1r\1h  >> \1n\1h\1ksearching all areas...\r\n\1,");			//searching directories...
bbs.replace_text(167,"\r\n\1n\1r\1h  >> \1n\1h\1ksearching all groups...\r\n\1,");			//searching libraries...
bbs.replace_text(646,"\r\n\r\n\1n\1r\1h  >> \1n\1h\1kdownload files in batch queue");		//download batch queue...

//below are the file statistics strings...
bbs.replace_text(314,"\r\n\1n\1r\1h  >> \1n\1h\1klibrary          \1n\1r\1h::n (%u) %s");
bbs.replace_text(315,"\r\n\1n\1r\1h  >> \1n\1h\1kdirectory        \1n\1r\1h::n (%u) %s");
bbs.replace_text(316,"\r\n\1n\1r\1h  >> \1n\1h\1kfilename         \1n\1r\1h::n %s");
bbs.replace_text(317,"\r\n\1n\1r\1h  >> \1n\1h\1kfile size        \1n\1r\1h::n %s");
bbs.replace_text(318,"\r\n\1n\1r\1h  >> \1n\1h\1kcredit value     \1n\1r\1h::n %s");
bbs.replace_text(319,"\r\n\1n\1r\1h  >> \1n\1h\1kdescription      \1n\1r\1h::n %s");
bbs.replace_text(320,"\r\n\1n\1r\1h  >> \1n\1h\1kuploaded by      \1n\1r\1h::n %s");
bbs.replace_text(321,"\r\n\1n\1r\1h  >> \1n\1h\1kfile date        \1n\1r\1h::n %s");
bbs.replace_text(322,"\r\n\1n\1r\1h  >> \1n\1h\1kuploaded on      \1n\1r\1h::n %s");
bbs.replace_text(323,"\r\n\1n\1r\1h  >> \1n\1h\1klast downloaded  \1n\1r\1h::n %s");
bbs.replace_text(324,"\r\n\1n\1r\1h  >> \1n\1h\1ktimes downloaded \1n\1r\1h::n %u");
bbs.replace_text(325,"\r\n\1n\1r\1h  >> \1n\1h\1ktime to download \1n\1r\1h::n %s");

//load the ansi header...
bbs.ansi_norm("art.phoenix.downloads");

//load the baja string to execute the download files...
// bbs.menu.baja("\r\n" + "file_download_batch" + "\r\n" + "if_true" + "\r\n" + "goto end" + "\r\n" + "end_if" + "\r\n" + "getfilespec" + "\r\n" + "if_true" + "\r\n" + "file_download" + "\r\n" + "end_if" + "\r\n" + ":end");
bbs.batch_download();

}

//name the view extended file information routine...
bbs.menu.extended_view = function() {

//load the baja string to execute the extended file information...
bbs.menu.baja("getfilespec" + "\r\n" + "if_true" + "\r\n" + "file_list_extended" + "\r\n" + "end_if" + "\r\n");

}

//name the upload files routine...
bbs.menu.upload_files = function() {

//change some strings for the uploads object...
bbs.replace_text(201,"\r\n\r\n\1n\1r\1h  >> \1n%s \1n\1h\1kkilobytes free!");					//kilobytes free...
bbs.replace_text(202,"\r\n\r\n\1n\1r\1h  >> \1n\1h\1kfilename\1n_ ");							//filename...
bbs.replace_text(203,"\r\n\r\n\1n\1r\1h  >> \1nbad filename!");									//badfilename...
bbs.replace_text(206,"\r\n\1n\1r\1h  >> \1n\1h\1kupload \1n%s \1n\1h\1kto \1n%s %s");			//upload to...
bbs.replace_text(220,"\r\n\1n\1r\1h  >> \1n\1h\1kis this a multiple upload");					//multiple uploads...
bbs.replace_text(211,"\r\n\r\n\1n\1r\1h  >> \1n%s \1n\1h\1khas already been uploaded!");		//already uploaded...
bbs.replace_text(225,"\r\n\1n\1r\1h  >> \1n\1h\1kenter a description below...\r\n\1n\1r\1h  >>\1n_ "); //description...
bbs.replace_text(221,"\r\n\1n\1r\1h  >> \1n\1h\1khow many files total\1n_ ");					//how many files...
bbs.replace_text(222,"\r\n\1n\1r\1h  >> \1n\1h\1kwhich file number is this upload\1n_ ");		//which file number...
bbs.replace_text(642,"\1n\1k---]");		//searching for duplicates...
bbs.replace_text(643,"\1n\1k---]");		//searched for duplicates...

//display the ansi header file...
bbs.ansi_norm("art.phoenix.uploads");

//now upload the files to your uploads directory...
bbs.upload_file('UPLOADS');

}

//name the select directory routine...
bbs.menu.file_select_directory = function() {

	    //the ansi header file...
        bbs.ansi_norm("art.phoenix.file_header-dir");

	var lib_dirs = file_area.lib_list[bbs.curlib].dir_list;
	for (var i=0; i<lib_dirs.length; i++)

//what the directory output will look like...
console.print("               \1n\1h\1k" + ((i==bbs.curdir)?">>":"  ") + ((i+1)+"   ").substr(0,2) +  "\1k :: \1b" + lib_dirs[i].name + "\r\n");

//display the ansi footer file [if configured]...
if(do_file_footer) {
	bbs.ansi_noclear("art.phoenix.file_footer-dir");

	//send the cursor to a specific location...
	console.gotoxy(77,7);

//if disabled...
}else{
	console.print("\r\n\1nprompt:\1n ");	//put your string here...

}

//show the current directory location...
bbs.curdir = console.getnum(lib_dirs.length)-1;

}

//name the select library routine...
bbs.menu.file_select_library = function() {

	//the ansi header file...
        bbs.ansi_norm("art.phoenix.file_header-lib");

	var lib_list = file_area.lib_list;
	for (var i=0; i<lib_list.length; i++)
		console.print("               \1n\1h\1k" + ((i==bbs.curlib)?">>":" ") + ((i+1)+"   ").substr(0,2) +  "\1k :: \1b" + lib_list[i].name + "\r\n");

//display the ansi footer file [if configured]...
if(do_file_footer) {
	bbs.ansi_noclear("art.phoenix.file_footer-lib");

	//send the cursor to a specific location...
	console.gotoxy(77,7);

//if disabled...
}else{
	console.print("\r\n\1nprompt:\1n ");	//put your string here...
}

	bbs.curlib = console.getnum(lib_list.length)-1;
	bbs.menu.file_select_directory();
}

/* f i l e _ s e a r c h _ m e n u - i n c l u d e s */

//name the config pointers routine...
bbs.menu.config_pointers = function()  {

//current date and time...
bbs.replace_text(400,"\r\n\1n\1g :: \1n\1bcurrent new-scan date/time\1n\1h\1b_ \1n\1c\1h");

//other strings...
bbs.replace_text(401,"\r\n\1n\1g :: \1n\1byear\1n\1h\1b_ \1n\1h\1c");	//year...
bbs.replace_text(402," \1n\1bmonth\1n\1h\1b_ \1n\1h\1c");				//month...
bbs.replace_text(403," \1n\1bday\1n\1h\1b_ \1n\1h\1c");					//day...
bbs.replace_text(404," \1n\1bhour\1n\1h\1b_ \1n\1h\1c");				//hour...
bbs.replace_text(405," \1n\1bminute\1n\1h\1b_ \1n\1h\1c");				//minute...

//clear the console...
console.clear();

//now run the commands...
bbs.new_file_time = bbs.get_newscantime(bbs.new_file_time);

}

//name the toggle extended info flag routine...
bbs.menu.toggle_extended = function() {

//toggle extended descriptions...
user.settings^=USER_EXTDESC;

//force update changes active...
system.node_list[bbs.node_num-1].misc|=NODE_UDAT;bbs.nodesync();sleep(100);

//clear the console...
console.clear();

//display the results...
console.print('\1n\1g\1h :: \1n\1bextended descriptions are now \1h\1b\1,' + ((user.settings&USER_EXTDESC)?'\1n\1h\1cON\1.':'\1n\1h\1cOFF\1.') + '\1n.\r\n');

}

//name the search file descriptions routine...
bbs.menu.search_descriptions = function()  {

//directory, library or all...
bbs.replace_text(622,"\r\n\r\n\1n\1h\1g :: \1n\1c\1hd\1n\1birectory, \1n\1h\1cl\1n\1bibrary, or \1n\1h\1ca\1n\1bll\1n\1c\1h_ ");

//search extended...
bbs.replace_text(624,"\r\n\1n\1h\1g :: \1n\1bsearch and display extended information");

//string to search for...
bbs.replace_text(76,"\r\n\1n\1h\1g :: \1n\1benter string to search for\1n\1h\1c_ ");

//clear the console...
console.clear();

//display the statement...
console.print("\1n\1h\1g :: \1n\1bsearching extended descriptions...");

//now execute the command...
bbs.scan_dirs(FL_FINDDESC);

}

//name the search file names routine...
bbs.menu.search_names = function()  {

//change some strings...
bbs.replace_text(199,"\r\n\1n\1h\1g :: \1n\1bfilespec \1n[\1n\1h\1c*.*\1n]_ ");		//get filespec...
bbs.replace_text(166,"\r\n\1n\1h\1g :: \1n\1bsearching all areas...\r\n\1,");		//searching directories...
bbs.replace_text(167,"\r\n\1n\1h\1g :: \1n\1bsearching all groups...\r\n\1,");		//searching libraries...

//removes the empty directory listing string...
bbs.replace_text(169,"\1n\1k---]");

//directory, library or all...
bbs.replace_text(622,"\r\n\r\n\1n\1h\1g :: \1n\1c\1hd\1n\1birectory, \1n\1h\1cl\1n\1bibrary, or \1n\1h\1ca\1n\1bll\1n\1c\1h_ ");

//clear the console...
console.clear();

//display the statement...
console.print("\1n\1h\1g :: \1n\1bsearching file names... (broken currently, sorry)");

//execute command...
// bbs.menu.baja('file_find_name'); // baja no workies...



}

/* e m a i l _ m e n u - i n c l u d e s */

//name the find user routine...
bbs.menu.findUser = function(inName) {
	var arrMatches = new Array();

	if ((inName.indexOf("#") == 0)&&(!isNaN(inName.substring(1,inName.length)))) {
			var iUser = parseInt(inName.substring(1,inName.length));
		if ((iUser > 0)&&(iUser <= system.stats.total_users))
			return iUser;
	}

	var iRet = system.matchuser(inName);
	if (iRet == 0) {

		//exact match not found...
		console.print("\r\n\1n\1h\1g /\1nexact match not found\1n\1h\1y...\r\n");
		if (inName.length < 3) {

			//entry to short to search for...
			console.print("\r\n\1n\1h\1g /\1nentry too short to search for\1n\1h\1y...\r\n");
			return 0;
		}else{

			//searching...
			console.print("\r\n\1n\1h\1g /\1nsearching\1n\1h\1y...")
		}

		var oUser = new User(1);
		var sUser = "";
		for (var i=0; i <= system.stats.total_users; i++) {
			if (((system.node_list[bbs.node_num-1].misc&NODE_NMSG) != 0)||((system.node_list[bbs.node_num-1].misc&NODE_MSGW) != 0)) {
				console.print("\r\n");
				sleep(100);
				bbs.nodesync();
				sleep(100);

				//continue searching...
				console.print("\r\n\1n\1h\1g /\1ncontinuing search\1n\1h\1y...")
			}
			if ((i%5) == 0) {
				console.print(".")
			}
			oUser.number = i; //change to next user....

			if (oUser.alias.toLowerCase().indexOf(inName.toLowerCase()) >= 0) {
				arrMatches[arrMatches.length] = i;
				sUser = oUser.alias;
			}else if (oUser.name.toLowerCase().indexOf(inName.toLowerCase()) >= 0) {
				arrMatches[arrMatches.length] = i;
				sUser = oUser.name;
			}else if (oUser.handle.toLowerCase().indexOf(inName.toLowerCase()) >= 0) {
				arrMatches[arrMatches.length] = i;
				sUser = oUser.handle;
			}
		}
		console.print("\r\n");
		if (arrMatches.length < 1) {

			//no matches found...
			console.print("\r\n\1n\1h\1g /\1nno matches found\1n\1h\1y...\r\n");
		} else if (arrMatches.length == 1) {

			//1 match found, use that match...
			console.print("\r\n\1n\1h\1g /\1nmatch found\1n\1h\1y_ \1w"+sUser+"\1n\r\n");
			iRet = arrMatches[0];
		} else {

			//multiple matches, display matches, still returns 0...
			console.print("" +
				"\r\n\1n\1h\1g /\1nmatches found\1n\1h\1y_ " + "\1n" +(arrMatches.length + 1) +
				"\r\n\r\n");
			for (var i=0; i<arrMatches.length; i++) {
				oUser.number = arrMatches[i];
				var s = "                                                                               "
				console.print("" +
					"     \1n\1h\1g" + (oUser.alias + s).substring(0,25) +
					" \1n" + (oUser.handle + s).substring(0,8) +
					"  \1h\1y" + (oUser.name + s).substring(0,35) +
					"\r\n");
			}
			console.print("\r\n");
		}
	}
	return iRet
}

//name the send feedback routine...
bbs.menu.feedback = function()  {

//change some strings in the text.dat ...
bbs.replace_text(18,"\1n\1h\1g /\1nsending e-mail to \1n\1h\1y%s\r\n"); //sending to...
bbs.replace_text(21,"\r\n\1n\1h\1g /\1nsubj\1n\1h\1y_ ");				//subject...
bbs.replace_text(30,"\1n\1k---]");										//aborted...

//clear the console...
console.clear();

//now execute the command...
bbs.email(1,null,null);

}

//name the read email routine...
bbs.menu.read_mail = function()  {

//change afew strings...
bbs.replace_text(46,"\1n\1h\1g /\1nmail waiting\1n\1h\1y...\r\n\r\n");						//mail waiting...
bbs.replace_text(48,"\r\n\1n\1h\1g /\1nstart with number \1n\1h\1y[\1n%lu\1n\1h\1y]\1n_ ");	//start with number...
bbs.replace_text(30,"\1n\1k---]");															//aborted...
bbs.replace_text(45,"\1n\1k---]");															//you have no mail...

//clear the console...
console.clear();

//execute the command...
bbs.read_mail();

}

//name the send email/netmail routine...
bbs.menu.send_mail = function() {

	//will get an email address from the user, and call netmail,
	//or email as appropriate.
	var found = false; //input check
	while (bbs.online && (!found)) {

//change some strings in the text.dat ...
bbs.replace_text(18,"\1n\1h\1g /\1nsending e-mail to \1n\1h\1y%s\r\n"); //sending to...
bbs.replace_text(21,"\r\n\1n\1h\1g /\1nsubj\1n\1h\1y_ ");				//subject...
bbs.replace_text(30,"\1n\1k---]");										//aborted...

//clear the console...
console.clear();

//show input prompt...
console.print("\1n\1h\1g /\1nenter username, or email address\1n\1h\1y...\r\n\1n\1h\1g /\1n\1h\1y_ ");

//get email address...
if (!bbs.menu.input) bbs.menu.input = "";
bbs.menu.input = console.getstr(bbs.menu.input,65,K_EDIT|K_LINE|K_AUTODEL).toLowerCase();

//for bbs email...
var iUser = false;
if (bbs.menu.input == "")

			found = true; //if blank, abort...
		else if (bbs.menu.input.match(/[^@]+@[^@]+/)) //if @ sign, netmail...
			found = true; //internet address...
		else {
			iUser = bbs.menu.findUser(bbs.menu.input); //match user...
			if (iUser >= 1)
				found = true; //user found.
		}
	}

	if (found) {
		console.print("\r\n"); //spacer...
		if (iUser) {
			bbs.email(iUser); //local email...
		}else if(bbs.menu.input.match(/[^@]+@[^@]+/)) {
			bbs.netmail(bbs.menu.input);
		}
	}
}

/* n e w _ f i l e _ s c a n _ m e n u - i n c l u d e s */

//menu specific strings...
bbs.menu.new_file_scan_strings = function() {

//removes the empty directory listing string...
bbs.replace_text(169,"\1n\1k---]");
bbs.replace_text(290,"\1n\1k---]");

//need to re-load the file lister header ansi, cause synchronet fucks up...
bbs.replace_text(661,"@NOPAUSE@@CLS@@TYPE:../phoenix/artwork/art.phoenix.file_lister.ans@@NOPAUSE@");

}

/* n e w _ m e s s a g e _ s c a n _ m e n u - i n c l u d e s */

//menu specific strings...
bbs.menu.new_msg_scan_strings = function() {

//remove the message scanner...
bbs.replace_text(67,"\1n\1k---");

//message scan...
bbs.replace_text(116,'\1n\1k---');

//sub totals...
bbs.replace_text(117,'\1n\1k---');

}

/* l o g i n _ l o g */

//name the telnet login log routine...
bbs.menu.login_log = function() {

//format the time...
var time 	= strftime("%m/%d/%y %H:%M",client.connect_time);

//format the display heading...
var header 	= "//logging remote connection information @ " + time + "...";

//format the listed variables for display...
var ip 		= (client.ip_address + "               ").substring(0,15);
var host 	= (client.host_name + "                                       ").substring(0,40);
var port 	= (client.port + "          ").substring(0,10);
var prot 	= (client.protocol + "          ").substring(0,10);

//now begin writing the file...

	//assign a variable to the data file...
	f = new File("../../logs/telnet.log");

	//create, then open the data file for appending...
	f.open("a");

	//write the data to the file...
	f.writeln(header);f.writeln(ip + host + port + prot);f.writeln(" ");

	//now close out the file...
	f.close();
}

/* l o g o n _ l o g */

//name the telnet logon log routine...
bbs.menu.logon_log = function() {

//format the time...
var time 	= strftime("%m/%d/%y %H:%M",client.connect_time);

//format the display heading...
var header 	= "//logging user connection information @ " + time + "...";

//format the listed variables for display...
var user 	= (client.user_name + "                      ").substring(0,22);
var ip 		= (client.ip_address + "               ").substring(0,15);
var host 	= (client.host_name + "                                       ").substring(0,40);
var port 	= (client.port + "          ").substring(0,10);
var prot 	= (client.protocol + "          ").substring(0,10);

//now begin writing the file...

	//assign a variable to the data file...
	f = new File("../../logs/telnet.log");

	//create, then open the data file for appending...
	f.open("a");

	//write the data to the file...
	f.writeln(header);f.writeln(user + ip + host + port + prot);f.writeln(" ");

	//now close out the file...
	f.close();
}

/* g l o b a l _ o b j e c t s _ & _ f u n c t i o n s _ - i n c l u d e s */

//name the sysop menu strings routine...
bbs.menu.sysop_commands = function() {

//clear the screen...
console.clear();

//system password string...
bbs.replace_text(176,"\1n\1k\1h:\1n: \1n\1h\1ws\1nystem \1n\1h\1wp\1nassword\1n\1h\1k: ");

//enter your +o commands...
console.print("\1n\1k\1h:\1n: \1n\1h\1we\1nnter \1n\1h\1wy\1nour \1n\1h\1w+\1no \1n\1h\1wc\1nommands\1n\1h\1k: ");

//execute +o commands...
bbs.exec('?str_cmds ' + console.getstr(40));

}

//user statistics module...
bbs.menu.user_stats = function() {

//set variables for laston/firston display...
var my_laston  = strftime("%m/%d/%y %H:%M",user.stats.laston_date);
var my_firston = strftime("%m/%d/%y %H:%M",user.stats.firston_date);

//display the logon_stats ansi...
bbs.ansi_norm("art.phoenix.user_stats");

//display statistics...
    console.gotoxy(46,3);console.print("\1n\1n"+client.host_name+"");				//the clients hostname...
    console.gotoxy(65,5);console.print("\1n\1n"+my_laston+"");						//the clients last on date...
    console.gotoxy(65,6);console.print("\1n\1n"+my_firston+"");						//the clients first logon...
    console.gotoxy(65,7);console.print("\1n\1n"+user.stats.total_logons+"");		//the clients total logons...
    console.gotoxy(65,9);console.print("\1n\1n"+user.stats.total_posts+"");			//the clients total posts...
    console.gotoxy(65,10);console.print("\1n\1n"+user.stats.posts_today+"");		//the clients posts today...
    console.gotoxy(65,11);console.print("\1n\1n"+user.stats.total_emails+"");	    //the clients total emails...
    console.gotoxy(65,12);console.print("\1n\1n"+user.stats.mail_waiting+"");		//the clients inbox...
    console.gotoxy(65,14);console.print("\1n\1n"+user.stats.files_uploaded+"");		//the clients total files uploaded...
    console.gotoxy(65,15);console.print("\1n\1n"+user.stats.files_downloaded+"");	//the clients total files downloaded...

//clear the line...
console.gotoxy(79,22);console.crlf();

}

//last few callers module by tracker1, re-worked a bit by ispyhumanfly...
bbs.menu.last_few_callers = function() {

//remove the old lastcalls file from the shared folder [for web use only]...
if (file_exists("../../data/data.phoenix.lastcalls.dat")) file_remove("../../data/data.phoenix.lastcalls.dat");

//display the last few callers ansi, and print the logon list...
bbs.ansi_norm("art.phoenix.last_few_callers");

//clear the counter...
console.line_counter = 0;

//now begin the last few callers module...
var show_count = 5; 			//number of logins to show...
var u = new User(1);			//user object...
var laston_list=new Array(); 	//array to hold recent users...

function UserLogin(user_number, user_laston) {
	this.number = user_number;
	this.logon = user_laston;
}

function sortByLogin(a, b) {
	return a.logon - b.logon;
}

var lastuser;
if(system.lastuser==undefined)
	lastuser=system.stats.total_users;
else
	lastuser=system.lastuser;

for(var i=1; i<=lastuser; i++) {
    u.number = i; //change to current user
    if (
		u.stats.total_logons > 0
		&&
		u.compare_ars("NOT GUEST")
		&&
		((u.settings & USER_DELETED) != USER_DELETED)
    )
    	laston_list[laston_list.length] = new UserLogin(i, u.stats.laston_date);
}

laston_list.sort(sortByLogin);

var start = (laston_list.length > show_count) ? laston_list.length - 1 - show_count : 0;

//create a loop to display the last few callers...
for (var i=start, j=0; i<laston_list.length; i++,j++) {
     u.number = laston_list[i].number; //assign to user in list...

	//where you would like the data located...
	console.ansi_gotoxy(14,17 +j);

	//variable to display the username...
	var username = (u.alias + "                ").substring(0,16);

	//variable to display the usernote...
	var usernote = (u.location + "                      ").substring(0,22);

	//variable to display the connection type...
	var connection = u.connection;

	//variable to create the date and time format...
	var date = strftime("%m/%d/%y %H:%M",u.stats.laston_date);

	//how you want the information displayed via telnet...
	var stringTelnet = "\1n\1h\1c" + username + "\1n\1n" + usernote + "\1n\1n\1c" + date + "\r\n";

	//now create the desired output...
	console.print(stringTelnet);

}

//now send the pause prompt to your desired location...
console.gotoxy(1,23);console.pause();

}

//user listings module...
bbs.menu.user_list = function() {

//load the ansi header...
bbs.ansi_norm("art.phoenix.user_list");

//begin the modules code...
if(system.lastuser==undefined)
	lastuser=system.stats.total_users;
else
	lastuser=system.lastuser;
var u = new User(1);

for(i=1;i<=lastuser;i++) {
	u.number=i;
	if(u.settings&USER_DELETED)
		continue;

	//assign a color for the display...
	var color = "\1n\1h\1k";

	//display the user list...
	printf("          "+color+"",i,lastuser);
	printf("%-23s %-28s %s\r\n"
		,u.alias
		,u.location
		,u.connection
		);
	if(this.bbs!=undefined && bbs.sys_status&SS_ABORT)
		break;
	}

//form a line feed...
console.crlf();

}

//node listings module...
bbs.menu.node_list = function() {

//display the ansi header...
bbs.ansi_norm("art.phoenix.node_list");

//clear the counter back to zero to avoid screen pausing...
console.line_counter = 0;

//now output the node list...
console.gotoxy(33,1);console.putmsg("@NODE1@");
console.gotoxy(36,2);console.putmsg("@NODE2@");
console.gotoxy(39,3);console.putmsg("@NODE3@");
console.gotoxy(44,4);console.putmsg("@NODE4@");
console.gotoxy(50,5);console.putmsg("@NODE5@");

//now display a pause prompt, at your desired location...
console.gotoxy(80,23);console.crlf();console.pause();

}

//oneliners module...
bbs.menu.oneliners = function() {

//set some variables...
var System = eval("s" + "ystem"); //crimson editor autocap's System
var bDone = false; //done with oneliners
var bAnsi = ((user.settings&USER_ANSI) != 0) //user has ansi
var cDelim = String.fromCharCode(255); //data delimiter
var strHeaderFile = "../phoenix/artwork/art.phoenix.menu_oneliner.ans"; //ansi header...
var strDataFile = "../../data/data.phoenix.oneliners.dat"; //data file...

//Formats DateTime for logging "YYYY-MM-DD HH:NN"
function formatDT(inDate) {
	var y = inDate.getYear();
	var m = inDate.getMonth() + 1;
	var d = inDate.getDate();
	var h = inDate.getHours();
	var n = inDate.getMinutes();

	var strRet = "" +
		((y<1900)?(y+1900):y) + "-" +
		((m<10)?"0":"") + m + "-" +
		((d<10)?"0":"") + d + " " +
		((h<10)?"0":"") + h + ":" +
		((n<10)?"0":"") + n;
	return strRet;
}

//use the filesystem to display a file, with a...
function fileShowFast(fname) {
	f = new File(fname);
	if(!f.open("r")) {
		alert("error opening file: " + fname);
		return;
	}

	console.print("\1n");
	console.clear();
	text = f.readAll();
	for (var i=0;i<text.length;i++) {
		console.print(text[i]);
		if (i<text.length-1)
			console.print("\r\n")
		console.line_counter = 0;
	}
	f.close();
}

//oneliner object...
function oneliner(line) {
	var data = line.split(cDelim);
	this.when = data[0];
	this.user = data[1];
	this.text = data[2];
	this.data = line;
}

//retrieve oneliner data from datafile...
function getOneliners(strDataFile) {
	var arrRet = new Array();

	f = new File(strDataFile);
	if(!f.open("r")) {
		alert("error opening file: " + strDatafile);
		return;
	}

	text = f.readAll();
	for (var i=0;i<text.length;i++) {
		var line = text[i];
		if (line.indexOf(cDelim) > 0)
			arrRet[arrRet.length] = new oneliner(line);
	}
	f.close();

	return arrRet;
}

//format used for name placement on the oneliners...
function showOnelinersAnsi(arrIn) {
	console.print("\r\n");
	for (var i=0; i<arrIn.length; i++) {
        var username = (arrIn[i].user)

        var oneliner = arrIn[i].text;
        var column_limit = ((console.screen_columns - username.length) - 17) - 3; // - username.length;


		//where you want the data located...
        console.ansi_gotoxy(17,14+i);

		console.print("" +
			" \1n\1h\1y" + username +
			"  \1n\1w" + oneliner.substring(0,column_limit));
	}
}

//function to display the ansi header...
function showOneliners() {

	//clear screen...
	console.clear();

	//show header file...
	fileShowFast(strHeaderFile);

	var arrOneliners = getOneliners(strDataFile);
	if (bAnsi) {
		showOnelinersAnsi(arrOneliners);
 	}else{
		showOnelinersAscii(arrOneliners);
	}

//assign a handler name for lightbar identifcation...
var handlerName = 'onelinerLightbar';

//the lightbar for the no/yes question...
onelinerLightbar(handlerName);

	//array of options...
	var option = console.getkeys("yn",1);
	var bDone = (option.toUpperCase() != "Y");
	if (!bDone) {
		addOneliner();
	}
}

//function to save the oneliner...
function saveOneliners(arrIn) {
	var first,last;
	first = 0;
	last = arrIn.length;

	//set the ammount of oneliners to display...
	if (arrIn.length >= 10) first=arrIn.length-10;

	var bOpen = false;
	var start = new Date();
	var quit = start.setSeconds(start.getSeconds() + 5);

	f = new File(strDataFile);
	if (!f.open("w")) {
		alert("error opening file: " + strDatafile);
		bDone = true;
		return;
	}
	for (var i=first; i<last; i++) {
		f.writeln(arrIn[i].data);
	}
	f.close();
}

//function to add a oneliner...
function addOneliner() {

   //ansi header for the add oneliner option...
   bbs.ansi_norm("art.phoenix.menu_oneliner-input");

   //where you would like the text to begin...
   console.gotoxy(27,15);

    //the ammount of characters allowed for input...
	var text = console.getstr(50);
	if (text.length > 0) {
		var when = formatDT(new Date());
		var arrOneliners = getOneliners(strDataFile);
		arrOneliners[arrOneliners.length] = new oneliner(when + cDelim + user.alias + cDelim + text);
		saveOneliners(arrOneliners);
	}
	console.line_counter = 0;
}

showOneliners();

}

/* a n s i _ g a l l e r y */

//function to display an ansi, from the gallery at random...
bbs.menu.ansi_gallery = function() {

	//load the files into an array...
	var string = directory('../phoenix/artwork/gallery/*.ans');

	//assign a handler name...
	var handlerName = 'ansi_gallery';

	//now send the array to the random ansi routine for display...
	bbs.menu.random_handler(string,handlerName);

}

//ansi gallery module display...
function ansiGallery (fname) {
	file_base = fname;
	if (file_exists(file_base))
		f = new File(file_base);
	else if (file_exists(file_base) && (((console.autoterm & USER_ANSI) > 1) || (user && (user.number > 0) && ((user.settings&USER_ANSI) > 1))))
		f = new File(file_base);
	else if (file_exists(file_base))
		f = new File(file_base);
	else {

		//the directory has no files...
		console.print("no files in directory...");
		return;
	}
	if(!f.open("r")) {
		console.print("error opening file: " + f.name + "\r\n");
		return;
	}

//remove any old colors...
console.print("\1n\1n");

//clear the counter and the screen...
console.line_counter = 0;console.clear();

	text = f.readAll();
	f.close();
	for (var i=0;i<text.length;i++) {
		console.print(text[i]);
		if (i<text.length-1)
			console.putmsg("\r\n");
		console.line_counter = 0;

		if (text.length > 25)
			sleep(25);

		//allow cancel
		switch (console.inkey().toLowerCase()) {
			case " ":
			case "c":
			case "\1":
			case "q":
			case "x":
				i = text.length;
			default:
				if (bbs.sys_status&SS_ABORT)
					i = text.length;
		}
	}
	if (text.length > 150)
		sleep(300);

	bbs.sys_status &= ~SS_ABORT;
	console.line_counter=23;
}

//rumors module... and rumor display module...
bbs.menu.rumor_input = function() {

//display the ansi file...
bbs.ansi_norm("art.phoenix.rumor_input");

//now send the cursor to a specific location...
console.gotoxy(5,4);

//assign a variable to the input, and recieve the rumor...
var text 	= console.getstr(71);

//assign a color to the output...
var color 	= "\1n\1n";

//set a conditional for the input...
if (text.length > 0) {

	//assign a variable and open the data file...
	f = new File("../../data/data.phoenix.rumors.dat");

	//open the date file for writing...
	f.open("a");

	//write the last few callers to the data folder...
	f.writeln(color + text);

	//now close out the file...
	f.close();

//if no rumor added...
}else{

	//return to main menu...
	return;

	}

}

//now assign a function to display the rumors at random...
bbs.menu.rumor_display = function() {

	//assign a variable and open the data file...
	f = new File("../../data/data.phoenix.rumors.dat");

	//open the date file for writing...
	f.open("r");

	//load the rumors file into an array...
	string = f.readAll();

	//now close out the file...
	f.close();

//assign a handler name...
var handlerName = 'random_rumor';

//reset the console line counter...
console.line_counter = 0;

//send the string to the random handler...
bbs.menu.random_handler(string,handlerName);

}

//display ansis at regular speed, from any location and with @-code support...
bbs.mods.vanguard.ansinorm = function(fname) {

//remove any old colors...
console.print("\1n\1n");

//clear the counter and the screen...
console.line_counter = 0;console.clear();

//output the desired file...
console.putmsg("@TYPE:../phoenix/artwork/" + fname + ".ans@");

}

bbs.ansi_norm = bbs.mods.vanguard.ansinorm;

//display ansis in slow motion, from any location but without @-code support...
bbs.mods.vanguard.ansislow = function(fname) {
	file_base = "../phoenix/artwork/" + fname;
	if (file_exists(file_base))
		f = new File(file_base);
	else if (file_exists(file_base+".ans") && (((console.autoterm & USER_ANSI) > 1) || (user && (user.number > 0) && ((user.settings&USER_ANSI) > 1))))
		f = new File(file_base+".ans");
	else if (file_exists(file_base+".asc"))
		f = new File(file_base+".asc");
	else {
		//console.print(file_base+".ans\r\n")
		console.print("file doesn't exist: ../phoenix/artwork/" + fname + ".???\r\n");
		return;
	}
	if(!f.open("r")) {
		console.print("error opening file: " + f.name + "\r\n");
		return;
	}

//remove any old colors...
console.print("\1n\1n");

//clear the counter and the screen...
console.line_counter = 0;console.clear();

	text = f.readAll();
	f.close();
	for (var i=0;i<text.length;i++) {
		console.print(text[i]);
		if (i<text.length-1)
			console.putmsg("\r\n");
		console.line_counter = 0;

		if (text.length > 25)
			sleep(25);

		//allow cancel
		switch (console.inkey().toLowerCase()) {
			case " ":
			case "c":
			case "\1":
			case "q":
			case "x":
				i = text.length;
			default:
				if (bbs.sys_status&SS_ABORT)
					i = text.length;
		}
	}
	if (text.length > 150)
		sleep(300);

	bbs.sys_status &= ~SS_ABORT;
	console.line_counter=23;
}

bbs.ansi_slow = bbs.mods.vanguard.ansislow;

//display ansis at regular speed, from any location, with @-code support and does not clear the screen...
bbs.mods.vanguard.ansinoclear = function(fname) {

//remove any old colors...
console.print("\1n\1n");

//output the desired file...
console.putmsg("@TYPE:../phoenix/artwork/" + fname + ".ans@");

}

bbs.ansi_noclear = bbs.mods.vanguard.ansinoclear;

//show waiting messages...
bbs.menu.show_messages = function() {

//if any awaiting messages, display them..
	if (((system.node_list[bbs.node_num-1].misc&NODE_NMSG) != 0)||((system.node_list[bbs.node_num-1].misc&NODE_MSGW) != 0)) {
		bbs.menu.redraw = true; //redraw flag
		console.ansi_left(80);
		console.clearline();
		console.print("\1n\r\n");
		while (((system.node_list[bbs.node_num-1].misc&NODE_NMSG) != 0)||((system.node_list[bbs.node_num-1].misc&NODE_MSGW) != 0)) {
			bbs.nodesync();
			sleep(200);
			return;
		}
	}
}

