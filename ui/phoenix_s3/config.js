//config.js

/* r a n d o m _ a n s i _ d i s p l a y */

/******************************************************
 below are boolean variables for the above mentioned
 section.  these variables can only be set to true or
 false.  for more indepth modification of phoenix/s3
 you will need to edit the source code.
******************************************************/

//use the random long ansi generator?
do_random_ansi = true;

//if random ansi's are enabled, assign a function to handle random ansis...
function randomAnsi () {

    //load the ansi's into an array...
    var string = new Array(
                            "art.phoenix.welcome",
                            "art.phoenix.logoff",
                            "art.phoenix.logon_quick",
                            "art.phoenix.logon_sequence-1",
                            "art.phoenix.logon_sequence-2");

    //assign a handler name...
    var handlerName = 'random_ansi';

    //now send the array to the random ansi routine for display...
    bbs.menu.random_handler(string,handlerName);

}

/* l o g i n _ o p t i o n s - c o n f i g */

/******************************************************
 below are boolean variables for the above mentioned
 section.  these variables can only be set to true or
 false.  for more indepth modification of phoenix/s3
 you will need to edit the source code.
******************************************************/

//disable your system to ascii users?
do_ascii = true;

//log all remote connections?
do_login_log = true;

//display the welcome ansi?
do_welcome_ansi = true;

//use the matrix login?
do_matrix_login = true;

//display login statistics on user login?
do_login_statistics = true;

//name the default message editor...
var editor = "SLYICE";

/* l o g o n _ o p t i o n s - c o n f i g */

/******************************************************
 below are boolean variables for the above mentioned
 section.  these variables can only be set to true or
 false.  for more indepth modification of phoenix/s3
 you will need to edit the source code.
******************************************************/

//log all user logons?
do_logon_log = true;

//use the quick logon feature?
do_quick_logon = true;

//if enabled, send these strings to the lightbar library...
function quickLogonLightbar (handlerName) {

    //assign an array to the strings...
    var string = new Array();

    //where you would like the lightbar located...
    string.column_lightbar = "58";
    string.line_lightbar   = "20";

    //create a list of lightbar options w/ strings...
    string.yes	= "\1n\1h\1r[\1nY\1n\1h\1k.\1n\1h\1bn\1n\1h\1r]\1n";
    string.no	= "\1n\1h\1r[\1n\1b\1hy\1n\1h\1k.\1nN\1n\1h\1r]\1n";

    //now send the strings to the lightbar...
    bbs.lightbar.yesno(string,handlerName);

}

//display the quick logon welcome ansi?
do_quick_welcome = false;

//display the scan header text animation sequence?
do_sequence_scan = false;

//display the ansi logon sequence?
do_logon_ansi = true;

//display the user statistics?
do_user_stats = false;

//display the oneliners?
do_oneliners = true;

//if enabled, send these strings to the lightbar library...
function onelinerLightbar (handlerName) {

    //assign an array to the strings...
    var string = new Array();

    //where you would like the lightbar located...
    string.column_lightbar = "43";
    string.line_lightbar   = "12";

    //create a list of lightbar options w/ strings...
    string.yes	= "\1n\1h\1c[\1n\1h\1wY \1ne s\1n\1c]  \1nn \1n\1h\1ko ";
    string.no	= " \1ny \1n\1h\1ke s  \1n\1h\1c[\1n\1h\1wN \1no\1n\1c]";

    //now send the strings to the lightbar...
    bbs.lightbar.yesno(string,handlerName);

}

//display the last few callers?
do_lastcalls = true;

//display the node listings?
do_node_list = false;

//display the ansi gallery?
do_gallery = false;

//name the system notices sub id to be scanned for new system notices...
var notices = "notices";

/* e x t e r n a l _ m o d u l e s - c o n f i g */

/******************************************************
 below are boolean variables for the above mentioned
 section.  these variables can only be set to true or
 false.  for more indepth modification of phoenix/s3
 you will need to edit the source code.
******************************************************/

//use the animated pause prompt?
do_animated_pause = true;

//if disabled... enter your desired string here...
var pausePrompt = "\1n\1h\1c[\1n\1h\1kpause\1n\1h\1c]\1n";

//use the message reader lightbar?
do_message_reader = true;

//if disabled... enter your desired string here...
var messageReader = "\1nrﬁﬁ›h±ﬁn˛ rhkeadingn y<<hw@SMB_CURMSG@\1yof\1n\1h\1w@SMB_MSGS@y>>kw ::y <n?-hhkelpny>hk y;n";

//function to create custom strings for message/email readers...
function messageReaderStrings () {

    //make the according strings match the lightbar reader [even if disabled]...
    bbs.replace_text(33,"\r\n\1nrﬁﬁ›h±ﬁn˛ shkaving..."); //saving statement...
    bbs.replace_text(34,"\r\n\1nrﬁﬁ›h±ﬁn˛ shkaved \1n%lun characters (n%un lines)...n"); //saved statement...
    bbs.replace_text(35,"\r\n\1nrﬁﬁ›h±ﬁn˛ whkriting index..."); //writing index statement...
    bbs.replace_text(37,"\r\n\1nrﬁﬁ›h±ﬁn˛ phkosted on \1n%s %s\r\n"); //posted on statement...
    bbs.replace_text(11,"\r\n\1nrﬁﬁ›h±ﬁn˛ phkost on \1n%s %s"); //post on question...
    bbs.replace_text(19,"\r\n\1nrﬁﬁ›h±ﬁn˛ phkosting on \1n%s %s"); //posting on statement...
    bbs.replace_text(597,"\r\n\r\n\1nrﬁﬁ›h±ﬁn˛ phkost to: "); //post to...
    bbs.replace_text(21,"\r\n\1nrﬁﬁ›h±ﬁn˛ shkubject...\r\n\1nrﬁﬁ›h±ﬁn˛ "); //subject...
    bbs.replace_text(30,"\r\n\1nrﬁﬁ›h±ﬁn˛ ahkborted...\r\n\1n\1k"); //aborted...
    bbs.replace_text(56,"\r\n\1nrﬁﬁ›h±ﬁn˛ fhkorward mail to\1n\1h\1y: ");	//forward mail to...

    //string changes for the help menu and additional commands...
    bbs.replace_text(48,"\r\n\1nrﬁﬁ›h±ﬁn˛ shn\1k\1htart with number \1n\1y\1h<<w%lu\1ny>> \1n\1y\1h; w"); //start with # string...
    bbs.replace_text(76,"\r\n\1nrﬁﬁ›h±ﬁn˛ s\1n\1h\1ktring to search for \1n\1y\1h; \1h\1w"); //string to search for...
    bbs.replace_text(625,"\r\n\1nrﬁﬁ›h±ﬁn˛ d\1n\1k\1hisplay subjects only "); //display subjects only question...
    bbs.replace_text(70,"\r\n\1nrﬁﬁ›h±ﬁn˛ \1np\1n\1h\1kost \1n\1h\1w:: \1n\1y<<\1n\1h\1w%un\1y\1h>> <<h\1n\1w\1h%un\1y>> h\1w%lun/h\1w%lu\r\n"); //continuous read prompt...
    bbs.replace_text(620,"\r\n\1nrﬁﬁ›h±ﬁn˛ \1nr\1n\1h\1kemove sub from newscan list"); //bypass subboard from newscan question....
    bbs.replace_text(10,"\r\n\1nrﬁﬁ›h±ﬁn˛ \1ne\1n\1h\1kmail username or number \1n\1h\1y; \1n"); //reply via email option...
    bbs.replace_text(432,"\r\n\1nrﬁﬁ›h±ﬁn˛ \1nn\1h\1ketmail  \1n\1h\1y; \1nh%s\r\n");  //netmail info...
    bbs.replace_text(499,"\r\n\1nrﬁﬁ›h±ﬁn˛ \1nf\1n\1h\1korward to netmail account"); //forward mail question...
    bbs.replace_text(62,"\r\n\1nrﬁﬁ›h±ﬁn˛ \1ns\1n\1h\1kending netmail to \1n%s\r\n\1nrﬁﬁ›h±ﬁn˛ \1nf\1h\1krom \1n%s\r\n"); //sending netmail info...
    bbs.replace_text(18,"\r\n\1nrﬁﬁ›h±ﬁn˛ \1ns\1n\1h\1kending email to \1n%s\r\n"); //sending email statement...

    //make the from, subject, to ... listing headers and format match the reader...
    bbs.replace_text(65,"_\r\nnh      f\1n\1h\1krom\1n...                \1nt\1n\1h\1ko\1n...                    \1ns\1n\1h\1kubject\1n...\r\nn"); //list header...
    bbs.replace_text(66,"wh%4d ny %-22.22s %-22.22s h%cny\1h %.25s\r\n"); //list format...

}

//use the email reader lightbar?
do_email_reader = true;

//if disabled... enter your desired string here...
var emailReader = "\1nrﬁﬁ›h±ﬁn˛ rhkeadingn y<<hw@SMB_CURMSG@\1yof\1n\1h\1w@SMB_MSGS@y>>kw ::y <n?-hhkelpny>hk y;n";

//use the file lister lightbar?
do_file_lister = true;

//if enabled, send these strings to the lightbar library...
function fileListerLightbar () {

    //assign an array to the strings...
    var string = new Array();

    //create a list of lightbar options w/ strings...
    string.optionOne	= "n\r6∞±≤€ €0ﬁ cNwexthb kprev flag view skip quit nﬁhk˛n nk6 @LIB@ nk6+ nk6@DIR@nk6>n";
    string.optionTwo	= "n\r6∞±≤€ €0ﬁ hknext ncPwrevhk flag view skip quit nﬁhk˛n nk6 goto nk6previous nk6displaynk6>n";
    string.optionThree	= "n\r6∞±≤€ €0ﬁ hknext prev ncFwlaghk view skip quit nﬁhk˛n nk6 flag nk6files nk6for nk6download nk6laternk6>n";
    string.optionFour	= "n\r6∞±≤€ €0ﬁ hknext prev flag ncVwiewhk skip quit nﬁhk˛n nk6 view nk6contents nk6of nk6a nk6filenk6>n";
    string.optionFive	= "n\r6∞±≤€ €0ﬁ hknext prev flag view ncSwkiphk quit nﬁhk˛n nk6 skip nk6ahead nk6to nk6next nk6directorynk6>n";
    string.optionSix	= "n\r6∞±≤€ €0ﬁ hknext prev flag view skip ncQwuithk nﬁhk˛n nk6 quit nk6back nk6to nk6file nk6menunk6>n";

    //now send the strings to the lightbar...
    bbs.lightbar.file_lister(string);

}

//if disabled... enter your desired string here...
var fileLister = "n\r6∞±≤€ €0ﬁ hknext prev flag view skip quit nﬁhk˛n nk6 @LIB@ nk6+ nk6@DIR@nk6>n";

//use the yes/no and no/yes lightbars?
do_yesno_lightbar = true;

//if enabled, send these strings to the lightbar library...
function yesnoLightbar (handlerName) {

    //assign an array to the strings...
    var string = new Array();

    //create a list of lightbar options w/ strings...
    string.yes	= "\1n\1h\1k<\1n\1g\1h[\1n\1h\1wy e s\1n\1g\1h]\1n\1h\1k>  \1nn \1n\1h\1ko  ";
    string.no	= "  \1ny \1n\1h\1ke s  \1n\1h\1k<\1n\1g\1h[\1n\1h\1wn o\1n\1g\1h]\1n\1h\1k>";

    //now send the strings to the lightbar...
    bbs.lightbar.yesnoquestion(string,handlerName);

}

//if disabled, send these strings to the lightbar library...
function yesno (handlerName) {

    //assign an array to the strings...
    var string = new Array();

    //create a list of lightbar options w/ strings...
    string.yes	= "\1n[\1n\1h\1kY/n\1n]\1n";
    string.no	= "\1n[\1n\1h\1ky/N\1n]\1n";

    //now send the strings to the lightbar...
    bbs.lightbar.yesnoquestion(string,handlerName);

}

/* p h o e n i x / s 3 - c o n f i g */

/******************************************************
 below are boolean variables for the above mentioned
 section.  these variables can only be set to true or
 false.  for more indepth modification of phoenix/s3
 you will need to edit the source code.
******************************************************/

//use the lightbar prompt navigation?
do_lightbar_prompts = true;

//use the lightbars for the new scan modules?
do_lightbar_prompts_newscan = true;

//allow the user to configure his/her bbs experiance?
do_user_config_bbs = true;

//use the rumors module?
do_rumors = true;

//display the message base/group footer ansi?
do_message_footer = true;

//display the file base/group footer ansi?
do_file_footer = true;

//m a i n   m e n u . . .

/******************************************************
 below are options for configuring the above mentioned
 menu.  all strings required for modification of this
 menu are located below.  for more indepth modification
 of phoenix/s3 you will need to edit the source code.
******************************************************/

//lightbar prompt configuration...
function mainLightbarPrompt () {

    //assign an array to hold the string variables...
    string = new Array();

    //where you would like the lightbar located...
    string.column_lightbar = "46";
    string.line_lightbar   = "22";

    //where you want the cursor to blink [ie. command prompt: ]...
    string.column_cursor = "66";
    string.line_cursor   = "19";

    //how you want it centered...
    string.center = "";

    //create a list of lightbar options w/ strings...
    string.optionOne     = "\1n\1n\1r\1h[\1n\1h\1wmain\1n\1h\1r]\1n message  file  chat  logoff ";
    string.optionTwo     = "\1n\1n main \1n\1n\1r\1h[\1n\1h\1wmessage\1n\1h\1r]\1n file  chat  logoff ";
    string.optionThree   = "\1n\1n main  message \1n\1n\1r\1h[\1n\1h\1wfile\1n\1h\1r]\1n chat  logoff ";
    string.optionFour    = "\1n\1n main  message  file \1n\1n\1r\1h[\1n\1h\1wchat\1n\1h\1r]\1n logoff ";
    string.optionFive    = "\1n\1n main  message  file  chat \1n\1n\1r\1h[\1n\1h\1wlogoff\1n\1h\1r]\1n";

    //now launch the prompt [if enabled]...
    bbs.lightbar.prompt(string);

}

//if lightbar prompts disabled, send the cursor to this location...
var promptMain_column = "66";
var promptMain_line   = "19";

//if rumors enabled, send to this location...
var rumorMain_column = "1";
var rumorMain_line   = "24";

//if rumors enabled, set the desired starter string...
var rumorMain_string = " \1n\1h\1r\\\1n\1r\\\1n\1h\1k.. ";

//m e s s a g e   m e n u . . .

/******************************************************
 below are options for configuring the above mentioned
 menu.  all strings required for modification of this
 menu are located below.  for more indepth modification
 of phoenix/s3 you will need to edit the source code.
******************************************************/

//lightbar prompt configuration...
function messageLightbarPrompt () {

    //assign an array to hold the string variables...
    string = new Array();

    //where you would like the lightbar located...
    string.column_lightbar = "3";
    string.line_lightbar   = "2";

    //where you want the cursor to blink [ie. command prompt: ]...
    string.column_cursor = "68";
    string.line_cursor   = "17";

    //indentation required for proper centering.
    string.center = "        ";

    //create a list of lightbar options w/ strings...
    string.optionOne     = "\1n\1n\1c[\1n\1h\1wm\1n a i n\1n\1c]\1n  \1n\1b\1hm \1n\1be s s a g e   \1n\1b\1hf \1n\1bi l e   \1n\1b\1hc \1n\1bh a t   \1n\1b\1hl \1n\1bo g o f f  ";
    string.optionTwo     = "\1n\1b\1h m \1n\1ba i n  \1n\1c[\1n\1h\1wm\1n e s s a g e\1n\1c]\1n  \1n\1b\1hf \1n\1bi l e   \1n\1b\1hc \1n\1bh a t   \1n\1b\1hl \1n\1bo g o f f  ";
    string.optionThree   = "\1n\1b\1h m \1n\1ba i n   \1n\1b\1hm \1n\1be s s a g e  \1n\1c[\1n\1h\1wf\1n i l e\1n\1c]\1n  \1n\1b\1hc \1n\1bh a t   \1n\1b\1hl \1n\1bo g o f f  ";
    string.optionFour    = "\1n\1b\1h m \1n\1ba i n   \1n\1b\1hm \1n\1be s s a g e   \1n\1b\1hf \1n\1bi l e  \1n\1c[\1n\1h\1wc\1n h a t\1n\1c]\1n  \1n\1b\1hl \1n\1bo g o f f  ";
    string.optionFive    = "\1n\1b\1h m \1n\1ba i n   \1n\1b\1hm \1n\1be s s a g e   \1n\1b\1hf \1n\1bi l e   \1n\1b\1hc \1n\1bh a t  \1n\1c[\1n\1h\1wl\1n o g o f f\1n\1c]\1n ";

    //now launch the prompt [if enabled]...
    bbs.lightbar.prompt(string);

}

//if lightbar prompts disabled, send the cursor to this location...
var promptMessage_column = "68";
var promptMessage_line   = "17";

//if rumors enabled, send to this location...
var rumorMessage_column = "1";
var rumorMessage_line   = "24";

//if rumors enabled, set the desired starter string...
var rumorMessage_string = " \1n\1h\1b\\\1n\1b\\\1n\1h\1k.. ";

//f i l e   m e n u . . .

/******************************************************
 below are options for configuring the above mentioned
 menu.  all strings required for modification of this
 menu are located below.  for more indepth modification
 of phoenix/s3 you will need to edit the source code.
******************************************************/

//lightbar prompt configuration...
function fileLightbarPrompt () {

    //assign an array to hold the string variables...
    string = new Array();

    //where you would like the lightbar located...
    string.column_lightbar = "43";
    string.line_lightbar   = "4";

    //where you want the cursor to blink [ie. command prompt: ]...
    string.column_cursor = "59";
    string.line_cursor   = "21";

    //how you want it centered...
    string.center = "  ";

    //create a list of lightbar options w/ strings...
    string.optionOne     = "\1n\1h\1bm\1n\1bain \1n\1h\1kmessage file chat logoff ";
    string.optionTwo     = "\1n\1h\1kmain \1n\1h\1bm\1n\1bessage \1n\1h\1kfile chat logoff ";
    string.optionThree   = "\1n\1h\1kmain message \1n\1h\1bf\1n\1bile \1n\1h\1kchat logoff ";
    string.optionFour    = "\1n\1h\1kmain message file \1n\1h\1bc\1n\1bhat \1n\1h\1klogoff ";
    string.optionFive    = "\1n\1h\1kmain message file chat \1n\1h\1bl\1n\1bogoff ";

    //now launch the prompt [if enabled]...
    bbs.lightbar.prompt(string);

}

//if lightbar prompts disabled, send the cursor to this location...
var promptFile_column = "59";
var promptFile_line   = "21";

//if rumors enabled, send to this location...
var rumorFile_column = "1";
var rumorFile_line   = "24";

//if rumors enabled, set the desired starter string...
var rumorFile_string = " \1n\1h\1w\\\1n\\\1n\1h\1k.. ";

//e m a i l   m e n u . . .

/******************************************************
 below are options for configuring the above mentioned
 menu.  all strings required for modification of this
 menu are located below.  for more indepth modification
 of phoenix/s3 you will need to edit the source code.
******************************************************/

//lightbar prompt configuration...
function emailLightbarPrompt () {

    //assign an array to hold the string variables...
    string = new Array();

    //where you would like the lightbar located...
    string.column_lightbar = "25";
    string.line_lightbar   = "1";

    //where you want the cursor to blink [ie. command prompt: ]...
    string.column_cursor = "1";
    string.line_cursor   = "1";

    //how you want it centered...
    string.center = " ";

    //create a list of lightbar options w/ strings...
    string.optionOne     = "\1n\1h\1g/\1ymain\1n  message  file  chat  logoff \1n\1h\1g!\1n \1n\1h\1ycommand\1nLine\1n\1h\1g_ ";
    string.optionTwo     = " main \1n\1h\1g/\1ymessage\1n  file  chat  logoff \1n\1h\1g!\1n \1n\1h\1ycommand\1nLine\1n\1h\1g_ ";
    string.optionThree   = " main  message \1n\1h\1g/\1yfile\1n  chat  logoff \1n\1h\1g!\1n \1n\1h\1ycommand\1nLine\1n\1h\1g_ ";
    string.optionFour    = " main  message  file \1n\1h\1g/\1ychat\1n  logoff \1n\1h\1g!\1n \1n\1h\1ycommand\1nLine\1n\1h\1g_ ";
    string.optionFive    = " main  message  file  chat \1n\1h\1g/\1ylogoff\1n \1n\1h\1g!\1n \1n\1h\1ycommand\1nLine\1n\1h\1g_ ";

    //now launch the prompt [if enabled]...
    bbs.lightbar.prompt(string);

}

//if lightbar prompts disabled, send the cursor to this location...
var promptEmail_column = "1";
var promptEmail_line   = "1";

//i n f o r m a t i o n   m e n u . . .

/******************************************************
 below are options for configuring the above mentioned
 menu.  all strings required for modification of this
 menu are located below.  for more indepth modification
 of phoenix/s3 you will need to edit the source code.
******************************************************/

//lightbar prompt configuration...
function infoLightbarPrompt () {

    //assign an array to hold the string variables...
    string = new Array();

    //where you would like the lightbar located...
    string.column_lightbar = "1";
    string.line_lightbar   = "1";

    //where you want the cursor to blink [ie. command prompt: ]...
    string.column_cursor = "19";
    string.line_cursor   = "22";

    //how you want it centered...
    string.center = "           ";

    //create a list of lightbar options w/ strings...
    string.optionOne     = "\1n\1c\1h[\1nmain\1h\1c]\1n\1h\1k message  file  chat  logoff ";
    string.optionTwo     = "\1n\1h\1k main \1n\1c\1h[\1nmessage\1h\1c]\1n\1h\1k file  chat  logoff ";
    string.optionThree   = "\1n\1h\1k main  message \1n\1c\1h[\1nfile\1h\1c]\1n\1h\1k chat  logoff ";
    string.optionFour    = "\1n\1h\1k main  message  file \1n\1c\1h[\1nchat\1h\1c]\1n\1h\1k logoff ";
    string.optionFive    = "\1n\1h\1k main  message  file  chat \1n\1c\1h[\1nlogoff\1h\1c]\1n";

    //now launch the prompt [if enabled]...
    bbs.lightbar.prompt(string);

}

//if lightbar prompts disabled, send the cursor to this location...
var promptInfo_column = "19";
var promptInfo_line   = "22";

//m e s s a g e   s c a n   m e n u . . .

/******************************************************
 below are options for configuring the above mentioned
 menu.  all strings required for modification of this
 menu are located below.  for more indepth modification
 of phoenix/s3 you will need to edit the source code.
******************************************************/

//lightbar prompt configuration...
function msgScanMenuLightbarPrompt () {

    //assign an array to hold the string variables...
    string = new Array();

    //where you would like the lightbar located...
    string.column_lightbar = "1";
    string.line_lightbar   = "1";

    //where you want the cursor to blink [ie. command prompt: ]...
    string.column_cursor = "1";
    string.line_cursor   = "1";

    //how you want it centered...
    string.center = "                ";

    //create a list of lightbar options w/ strings...
    string.optionOne     = "\1n\1h\1g[\1n\1h\1bmain\1n\1g\1h/\1n \1bmessage  file  chat  logoff \1h\1b.\1n \1n\1ccommand\1h_ ";
    string.optionTwo     = " main \1n\1h\1g[\1n\1h\1bmessage\1n\1g\1h/\1n \1bfile  chat  logoff \1h\1b.\1n \1n\1ccommand\1h_ ";
    string.optionThree   = " main  message \1n\1h\1g[\1n\1h\1bfile\1n\1g\1h/\1n \1bchat  logoff \1h\1b.\1n \1n\1ccommand\1h_ ";
    string.optionFour    = " main  message  file \1n\1h\1g[\1n\1h\1bchat\1n\1g\1h/\1n \1blogoff \1h\1b.\1n \1n\1ccommand\1h_ ";
    string.optionFive    = "\1n main  message  file  chat \1n\1h\1g[\1n\1h\1blogoff\1n\1g\1h/\1n\1h\1b.\1n \1n\1ccommand\1h_ ";

    //now launch the prompt [if enabled]...
    bbs.lightbar.prompt(string);
}

//if lightbar prompts disabled, send the cursor to this location...
var promptMsgScanMenu_column = "1";
var promptMsgScanMenu_line   = "1";

//m e s s a g e   s c a n   c o n f i g   m e n u . . .

/******************************************************
 below are options for configuring the above mentioned
 menu.  all strings required for modification of this
 menu are located below.  for more indepth modification
 of phoenix/s3 you will need to edit the source code.
******************************************************/

//lightbar prompt configuration...
function msgConfigScanMenuLightbarPrompt () {

    //assign an array to hold the string variables...
    string = new Array();

    //where you would like the lightbar located...
    string.column_lightbar = "1";
    string.line_lightbar   = "1";

    //where you want the cursor to blink [ie. command prompt: ]...
    string.column_cursor = "1";
    string.line_cursor   = "1";

    //how you want it centered...
    string.center = "                ";

    //create a list of lightbar options w/ strings...
    string.optionOne     = "\1n\1h\1g[\1n\1h\1bmain\1n\1g\1h/\1n \1bmessage  file  chat  logoff \1h\1b.\1n \1n\1ccommand\1h_ ";
    string.optionTwo     = " main \1n\1h\1g[\1n\1h\1bmessage\1n\1g\1h/\1n \1bfile  chat  logoff \1h\1b.\1n \1n\1ccommand\1h_ ";
    string.optionThree   = " main  message \1n\1h\1g[\1n\1h\1bfile\1n\1g\1h/\1n \1bchat  logoff \1h\1b.\1n \1n\1ccommand\1h_ ";
    string.optionFour    = " main  message  file \1n\1h\1g[\1n\1h\1bchat\1n\1g\1h/\1n \1blogoff \1h\1b.\1n \1n\1ccommand\1h_ ";
    string.optionFive    = "\1n main  message  file  chat \1n\1h\1g[\1n\1h\1blogoff\1n\1g\1h/\1n\1h\1b.\1n \1n\1ccommand\1h_ ";

    //now launch the prompt [if enabled]...
    bbs.lightbar.prompt(string);

}

//if lightbar prompts disabled, send the cursor to this location...
var promptMsgConfigMenu_column = "1";
var promptMsgConfigMenu_line   = "1";

//f i l e   s e a r c h   m e n u . . .

/******************************************************
 below are options for configuring the above mentioned
 menu.  all strings required for modification of this
 menu are located below.  for more indepth modification
 of phoenix/s3 you will need to edit the source code.
******************************************************/

//lightbar prompt configuration...
function fileSearchMenuLightbarPrompt () {

    //assign an array to hold the string variables...
    string = new Array();

    //where you would like the lightbar located...
    string.column_lightbar = "1";
    string.line_lightbar   = "11";

    //where you want the cursor to blink [ie. command prompt: ]...
    string.column_cursor = "1";
    string.line_cursor   = "1";

    //how you want it centered...
    string.center = "        ";

    //create a list of lightbar options w/ strings...
    string.optionOne     = "\1n\1h\1g[\1n\1h\1bmain\1n\1g\1h/\1n \1bmessage  file  chat  logoff \1h\1b .\1n \\\ . search _ menu :: \1n\1ccommand\1h_ ";
    string.optionTwo     = " main \1n\1h\1g[\1n\1h\1bmessage\1n\1g\1h/\1n \1bfile  chat  logoff \1h\1b .\1n \\\ . search _ menu :: \1n\1ccommand\1h_ ";
    string.optionThree   = " main  message \1n\1h\1g[\1n\1h\1bfile\1n\1g\1h/\1n \1bchat  logoff \1h\1b .\1n \\\ . search _ menu :: \1n\1ccommand\1h_ ";
    string.optionFour    = " main  message  file \1n\1h\1g[\1n\1h\1bchat\1n\1g\1h/\1n \1blogoff \1h\1b .\1n \\\ . search _ menu :: \1n\1ccommand\1h_ ";
    string.optionFive    = "\1n main  message  file  chat \1n\1h\1g[\1n\1h\1blogoff\1n\1g\1h/\1n\1h\1b .\1n \\\ . search _ menu :: \1n\1ccommand\1h_ ";

    //now launch the prompt [if enabled]...
    bbs.lightbar.prompt(string);

}

//if lightbar prompts disabled, send the cursor to this location...
var promptFileSearch_column = "1";
var promptFileSearch_line   = "1";
