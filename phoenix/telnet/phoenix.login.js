//phoenix.login.js

load("sbbsdefs.js");

// bbs.exec("?../../ui/eternity/eternity.js")

//load the phoenix/s3 configuration script...
load("/euphoria/phoenix/config.js");

//load phoenix/s3 required libraries...
load("/euphoria/phoenix/telnet/phoenix.external.js");
load("/euphoria/phoenix/telnet/phoenix.menu.js");
load("/euphoria/phoenix/telnet/phoenix.lightbar.js");

if(do_no_new_users) {
	bbs.newuser = new Function("return false;");
}
else {
	bbs.newuser = new Function("bbs.phoenix.application();return false;");
}

//log all remote connections to the system [if configured]...
if(do_login_log) {
	bbs.menu.login_log();
}

//disable the system to ascii users [if configured]...
if(do_ascii) {

    if (!(console.autoterm&USER_ANSI)) {
        bbs.ansi_norm("art.phoenix.login_ascii");
        bbs.hangup();
    }
}

//display the login welcome ansi [if configured]...
if(do_welcome_ansi) {

	//if random is true...
	if(do_random_ansi) {
	randomAnsi();

	//other wise...
	}else{
	bbs.ansi_slow("art.phoenix.welcome");
}

//now display a pause prompt...
console.pause();

}

/* m a t r i x _ l o g i n */

//name the matrix login routine...
bbs.phoenix.matrix_login = function () {

//update node status...
bbs.node_action=NODE_LOGON;

//displays the welcome and login ansi...
bbs.ansi_slow("art.phoenix.login_matrix");

//load the lightbar module...
bbs.lightbar.matrix_login();

	switch(cmdkey=console.getkeys("LAGP",K_UPPER)) {
		case 'L':	//enter euphoria...
			bbs.phoenix.user_login();
			break;
		case 'A':	//send application...
			bbs.phoenix.application();
			//system.exec("../exec/newuser.js");
			break;
		case 'G':	//say your scared (logoff)...

					//if random is true...
					if(do_random_ansi) {
					randomAnsi();

					//other wise...
					}else{
					bbs.ansi_slow("art.phoenix.logoff");
					}
					bbs.hangup();
			break;
		case 'P':	//page sysop...
			console.clear();bbs.page_sysop();
			break;
		default:
			break;
	}

//create loop point for the menu...
while(1) bbs.phoenix.matrix_login();

}

/* u s e r _ l o g i n */

//name the user login routine...
bbs.phoenix.user_login = function () {

//logout any existing user...
bbs.logout();

//fixes a glitch with the color scheme on the system password...
bbs.replace_text(176,"\1n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n                               \1nSysPASS:\1n");

//displays unknown user / invalid login information and clears the line...
bbs.replace_text(390,"[4;51Hnk3                 ");
bbs.replace_text(391,"[4;51Hnk3                 \1n[6;55Hnk3              ");

//display login header...
bbs.ansi_norm("art.phoenix.login_user");

//display statistics [if configured]...
if(do_login_statistics) {
	console.gotoxy(21,2);console.print("nk3"+system.name+"");							//your system name...
	console.gotoxy(19,3);console.print("nk3"+client.ip_address+"");						//your cients ip address...
	console.gotoxy(21,5);console.print("nk3"+system.lastuseron+"");						//your last user to logon...
	console.gotoxy(24,7);console.print("nk3"+system.platform+"");						//your server platform...
	console.gotoxy(26,8);console.print("nk3" + (new Date()).formatDate("h24:nn") +"");	//your local server time...
}

//begin the login procedure...
	var logged_in = false;
	var user_name = "";
	var count = 0;
	while (bbs.online && (!logged_in) && (count < 5)) {
		system.node_list[bbs.node_num-1].status = NODE_LOGON; //set status to logging on...
		count++;

		//show login prompt...
		if (system.matchuser("guest")||system.matchuser("anonymous"))
			console.print("[4;51Hnk3");
		else
			console.print("[4;51Hnk3");
		user_name = console.getstr(user_name,25,K_LOWPRIO|K_E71DETECT|K_TAB).toUpperCase();

		if (user_name == "")
			continue;

		if (user_name == "NEW") {
			// system.exec("?newuser.js");
			// break;

			if (bbs.newuser())
				logged_in = true;
			else

		//go back to matrix logon [if configured]...
		if(do_matrix_login) {
			bbs.phoenix.matrix_login();

		//if disabled...
		}else{
			bbs.phoenix.user_login();
		}

			continue;
		}

		//location of the password prompt...
		logged_in = bbs.login(user_name,"[6;55Hnk3");/*remove all colors*/console.print("\1n\1k");
	}

	if (logged_in)
		bbs.logon();
	else
	    //clear the screen and display the logoff message...

					//if random is true...
					if(do_random_ansi) {
					randomAnsi();

					//other wise...
					}else{
					bbs.ansi_slow("art.phoenix.logoff");
					}
					bbs.hangup();

}

/* n e w _ u s e r _ a p p l i c a t i o n */

//name the new user applications routine...
bbs.phoenix.application = function() {

//replace some strings in the text.dat...
bbs.replace_text(338,"[17;29H\1n\1kmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm[17;29H\1n\1k\1heuphoria newuser application...[12;12H\1n\1kmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm[12;12H\1nenter handle: ");
bbs.replace_text(341,"[17;29H\1n\1kmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm[17;29H\1n\1k\1heuphoria newuser application...[12;12H\1n\1kmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm[14;66H\1n015[12;12H\1nenter irc handle: ");
bbs.replace_text(346,"[17;29H\1n\1kmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm[17;29H\1n\1k\1heuphoria newuser application...[12;12H\1n\1kmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm[14;66H\1n025[12;12H\1nenter desired usernote: ");
bbs.replace_text(342,"[17;29H\1n\1kmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm[17;29H\1n\1k\1heuphoria newuser application...[12;12H\1n\1kmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm[14;66H\1n050[12;12H\1nenter your gender\1n [\1n\1h\1kM\1n/\1n\1k\1hF\1n]\1n\1k\1h: ");
bbs.replace_text(499,"[17;29H\1n\1kmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm[14;66H\1n085[12;12H\1n\1kmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm[12;12H\1nforward euphoria messages to netmail...[17;29H\1n")

//display the application welcome ansi...
bbs.ansi_slow("art.phoenix.application_welcome");

//create a slight delay...
console.print("\1.");

//loads the main display ansi...
bbs.ansi_norm("art.phoenix.application");

//global user object, to store information, status set to deleted...
newinfo = {}; //to temporarily store new user info...

//checks for an existing user with the value given...
function checkForUser(info,value) {
	var oUser = new User(0);
	for (var i=1; i<=system.stats.total_users; i++) {
		oUser.number = i;

		if (!(oUser.settings&USER_DELETED)) {
			var info_chk = eval("oUser."+info);
			if (info_chk.replace(/\W/g,"").toLowerCase() == value.replace(/\W/g,"").toLowerCase())
				return true;
		}
	}
	return false;
}

//get the alias/username...
function getAlias() {
	if (!newinfo.alias)
		 newinfo.alias = "";

	while(bbs.online) {
		console.print(bbs.text(338));
		 newinfo.alias = console.getstr( newinfo.alias,null,K_LINE|K_EDIT|K_NOEXASC)
		if ( newinfo.alias == "") {
			if (!console.noyes("[17;29H\1nabort new user creation")) {
				 newinfo.abort = true;
				 return;
			}
		} else if (!newinfo.alias.match(/^[a-z][\w\.\_' -]{1,}$/i))
			console.print("[17;29H\1nquit fucking off!\1n\r\n\r\n");
		else if (checkForUser("alias", newinfo.alias))
			console.print("[17;29H\1na user with that name already exists.\1n\r\n\r\n\1.");
		else
			return;
	}
}

//get the handle...
function getHandle() {
	if (! newinfo.handle)
		 newinfo.handle =  newinfo.alias.substr(0,8);
	var save = false;

	while(bbs.online && !save) {
		console.print(bbs.text(341));
		 newinfo.handle = console.getstr(newinfo.handle,8,K_LINE|K_EDIT|K_NOEXASC)
		if (newinfo.handle == "") {
			if (!console.noyes("[17;29H\1nabort new user creation")) {
				newinfo.abort = true;
				return;
			}
		} else if (!newinfo.handle.match(/^[a-z][\w ]{2,}$/i))
			console.print("[17;29H\1nmust begin with a letter, and contain only letters, numbers and spaces.\1n\r\n\r\n");
		else if (checkForUser("handle",newinfo.handle))
			console.print("[17;29H\1na user with that chat handle already exists.\1n\r\n\r\n");
		else
			save = true;
	}
}

//get the gender...
function getGender() {
	console.print(bbs.text(342))
	newinfo.gender = console.getkeys("MF");
}

//get the usernote...
function getUsernote() {
	if (!newinfo.location)
		newinfo.location = "";

	do {
		console.print(""+bbs.text(346));
		newinfo.location = console.getstr(newinfo.location,16,K_LINE|K_EDIT|K_NOEXASC);

		if (newinfo.location == "") {
			if (!console.noyes("[17;29H\1nabort new user creation")) {
				newinfo.abort = true;
				return;
			}
		} else
			return;
	} while (bbs.online && !newinfo.location);
}

//get the email addie...
function getEmail() {
	if (!newinfo.email)
		newinfo.email = "";

	while (bbs.online) {
		console.print("[17;29H\1n\1kmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm[14;66H\1n065[17;29H\1n\1k\1heuphoria newuser application...[12;12H\1n\1kmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm[12;12H\1nplease enter your netmail address...[17;29H\1n")
		newinfo.email = console.getstr(newinfo.email,45,K_LINE|K_EDIT).toLowerCase();

		if (newinfo.email.match(/^[a-z0-9][\w\.\_-]*@[a-z0-9][\w\.\_-]+\.[a-z]{2,7}$/)) {
			console.print("[17;29H\1n\1kmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm[14;66H\1n075[17;29H\1n\1k\1heuphoria newuser application...[12;12H\1n\1kmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm[12;12H\1nagain please...[17;29H\1n")
			if (console.getstr("",45,K_LINE|K_EDIT).toLowerCase() == newinfo.email) {
				if (system.settings&SYS_FWDTONET)
					newinfo.emailforward = console.yesno("\r\n"+bbs.text(499));
				else
					newinfo.emailforward = false;
				return;
			} else
				console.print("[18;24H\1n> >> \1n\1k\1hemail addresses don't match.\1n\r\n\r\n\1.[18;24H\1n\1kmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
		} else
			console.print("[18;24H\1n> >> \1n\1k\1hplease enter a VALID email address.\r\n\r\n\1.[18;24H\1n\1kmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
	}
}

//save new user information...
function saveNewUser(pwd) {
	var usr = system.new_user(newinfo.alias);
	usr.alias = newinfo.alias;
	usr.handle = newinfo.handle;

        usr.gender = newinfo.gender;
		usr.location = newinfo.location;

		// Make RG the default fall back shell.
		// This is more consistent with how we've already
		// been doing things.

		usr.command_shell = "RENEGADE";


	usr.security.password=pwd;

        usr.netmail = newinfo.email
	if (newinfo.emailforward)
                usr.settings |= USER_NETMAIL;
	else
                usr.settings &= ~USER_NETMAIL;

	//force the use of a certain message editor...
	usr.editor = "" + editor + "";

	//display the setup complete ansi...
	bbs.ansi_slow("art.phoenix.application_complete");
	console.print("[12;28H\1n\1k\1haccount created for #\1n"+ usr.number + " " + usr.alias + "\r\n\1.");
	log("Saved #" + usr.number + " " + usr.alias);
}

//send the password...
function sendPassword(pwd) {
	var mail = new MsgBase("mail");
	if(mail.open!=undefined && mail.open()==false) {
		var err_msg = "!ERROR " + msgbase.last_error;
		console.print(err_msg);
		log(err_msg);
		exit();
	}

	var hdr = {
		from: system.operator + "@" + system.inet_addr,
		from_net_addr:system.operator + "@" + system.inet_addr,
		to:newinfo.alias,
		to_net_addr:newinfo.email,
		subject:"Your password for " + system.name + "!",
		to_net_type:NET_INTERNET
		}

	var msg = "" +
		"Welcome to "+system.name+"!\r\n"+
		"\r\n"+
		"You have received this email because someone logged on as a new user\r\n" +
		"and entered this email address for verification.\r\n" +
		"\r\n" +
		"You now need to reconnect to "+system.name+" and log on using the following:\r\n\r\n"+
		"USERNAME: "+newinfo.alias+"\r\n" +
		"PASSWORD: "+pwd+"\r\n\r\n"+
		"\r\n"+
		"telnet://"+system.inetaddr+"\r\n";

	if (!mail.save_msg(hdr,msg)) {
		var err_msg = "!ERROR " + msgbase.last_error + " saving mail.";
		console.print(err_msg);
		log(err_msg);
		exit();
	}

//send a notice to the sysop...
	hdr = {
		to: system.operator,
		to_ext: '1',
		from: newinfo.alias,
		subject: "New User Information"
		};

	msg = "" +
		"Alias         : "+newinfo.alias+"\r\n" +
		"Chat handle   : "+newinfo.handle+"\r\n" +
		"Usernote      : "+newinfo.location+"\r\n" +
		"Gender        : "+((newinfo.gender=="F")?"Female":"Male")+"\r\n" +
		"Email         : "+newinfo.email+((newinfo.emailforward)?" (forwarded)":"")+"\r\n";
	mail.save_msg(hdr,msg);

	console.print("[12;28H\1n\1kmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm[12;28H\1n\1k\1hpassword sent to \1h\1n"+newinfo.email+"\n\r\n\1.");
	log("Password sent to " + newinfo.alias + " at " + newinfo.email);
}

//display the new user info...
function showInfo() {
	console.print("[12;12H\1n\1kmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm[12;12H\1nreview personal information...");
	console.print("[17;24H\1n\1n> >> handle        \1k\1h: \1n"+newinfo.alias+"\r\n");
	console.print("[18;24H\1n\1n> >> chat handle   \1k\1h: \1n"+newinfo.handle+"\r\n");
	console.print("[19;24H\1n\1n> >> usernote      \1k\1h: \1n"+newinfo.location+"\r\n");
	console.print("[20;24H\1n\1n> >> gender        \1k\1h: \1n"+((newinfo.gender=="F")?"female":"male")+"\r\n");
	console.print("[21;24H\1n\1n> >> email         \1k\1h: \1n"+newinfo.email+((newinfo.emailforward)?" (forwarded)":"")+"\r\n");
	console.print("[14;66H\1n095\r\n");
}

//loads the main application interface...
function main() {
	bbs.user_event(EVENT_NEWUSER);
	system.node_list[bbs.node_num-1].status = NODE_NEWUSER;
	newinfo.saved = false;
	newinfo.abort = false;

	while (bbs.online && !(newinfo.abort||newinfo.saved)) {
		if (!newinfo.abort) getAlias();
		if (!newinfo.abort) getHandle();
		if (!newinfo.abort) getUsernote();
		if (!newinfo.abort) getGender();
		if (!newinfo.abort) getEmail();

		if (newinfo.abort)
		if(do_matrix_login) {
			bbs.phoenix.matrix_login();
		}else{
			bbs.phoenix.user_login();
		}
		else if (newinfo.email) {
			showInfo();

			if (console.yesno("[23;2H\1n\1n:: \1n\1h\1kis this information correct \1n(\1n\1k\1hpassword will be emailed\1n)")) {
				console.print("\1n");
				var passwd = parseInt(Math.random()*1000000000000).toString(36).toUpperCase().substr(0,8);
				saveNewUser(passwd);
				sendPassword(passwd);
				return;
			} else if (!bbs.phoenix.application()) {
			  return;
			}
		}
	}
}

//load the start point for the application...
main();

}

/* s t a r t _ u p */

//start up options configured via phoenix.telnet_config.js...
if(do_matrix_login) {
	bbs.phoenix.matrix_login();
} else {
	bbs.phoenix.user_login();
}
