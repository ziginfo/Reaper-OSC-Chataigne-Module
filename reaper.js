// ========================== VARS ===========================
var banktrCount = local.parameters.bankTracksCount.get();
var fxCount = local.parameters.fxCount.get();
var fxParamCount = local.parameters.fxParamCount.get();
var temp = "/tempo/raw" ;
var fxno ;

var trNumb = ["/track/1/number/str","/track/2/number/str","/track/3/number/str","/track/4/number/str","/track/5/number/str","/track/6/number/str","/track/7/number/str","/track/8/number/str"] ;
var numb;
var selTrack = {
	"trackno"	:	["TrackNo", "s", "/track/number/str", ""],
	"name"	:	["Label", "s", "/track/name", ""],
	"faderlev" : ["Level", "s","/track/volume/str", ""],
	"fadervol" : ["Volume", "f","/track/volume", ""],
	"pan" : ["Pan", "s","/track/pan/str", ""],
	"mute" : ["Mute", "b","/track/mute", ""],
	"solo" : ["Solo", "b","/track/solo", ""],
	"arm" : ["R Arm", "b","/track/recarm", ""],
	
	"master" : ["Master Level", "s","/master/volume/str", ""],
	
	"sendname1" : ["SendName1", "s","/track/send/1/name", ""],
	"sendlevel1" : ["SendLevel1", "f","/track/send/1/volume", ""],
	"sendval1" : ["SendVal1", "s","/track/send/1/volume/str", ""],
	"sendname2" : ["SendName2", "s","/track/send/2/name", ""],
	"sendlevel2" : ["SendLevel2", "f","/track/send/2/volume", ""],
	"sendval2" : ["SendVal2", "s","/track/send/2/volume/str", ""],
	"sendname3" : ["SendName3", "s","/track/send/3/name", ""],
	"sendlevel3" : ["SendLevel3", "f","/track/send/3/volume", ""],
	"sendval3" : ["SendVal3", "s","/track/send/3/volume/str", ""],
	"sendname4" : ["SendName4", "s","/track/send/4/name", ""],
	"sendlevel4" : ["SendLevel4", "f","/track/send/4/volume", ""],
	"sendval4" : ["SendVal4", "s","/track/send/4/volume/str", ""],
	"sendname5" : ["SendName5", "s","/track/send/5/name", ""],
	"sendlevel5" : ["SendLevel5", "f","/track/send/5/volume", ""],
	"sendval5" : ["SendVal5", "s","/track/send/5/volume/str", ""],
	
	"insert1" : ["Insert1", "s","/fx/1/name", ""],
	"insert2" : ["Insert2", "s","/fx/2/name", ""],
	"insert3" : ["Insert3", "s","/fx/3/name", ""],
	"insert4" : ["Insert4", "s","/fx/4/name", ""],
	"insert5" : ["Insert5", "s","/fx/5/name", ""],
	"insert6" : ["Insert6", "s","/fx/6/name", ""],
	"insert7" : ["Insert7", "s","/fx/7/name", ""],
	"insert8" : ["Insert8", "s","/fx/8/name", ""] };
	
var selTrackFull = {
	"trackno"	:	["TrackNo", "s", "/track/number/str", ""],
	"name"	:	["Label", "s", "/track/name", ""],
	"fader" : ["Volume", "s","/track/volume/str", ""],
	"pan" : ["Pan", "s","/track/pan/str", ""],
	"mute" : ["Mute", "b","/track/mute", ""],
	"solo" : ["Solo", "b","/track/solo", ""],
	"arm" : ["R Arm", "b","/track/recarm", ""],
	
	"hpf.on" : ["LoCut on", "b","/4/eqbandbyp/1/1", ""],	
	"hpf.freq" : ["LoCut Freq", "s","/4/hpffrqval", ""],
	"hpf.slope" : ["LoCut Slope", "s","/4/hpfslpval" , ""],

	"loshelf.on" : ["LoShelf on", "b","/4/eqbandbyp/1/2" , ""],
	"loshelf.gain" : ["LoShelf Gain", "s", "/4/loslvgainval", ""],
	"loshelf.freq" : ["LoShelf Freq", "s", "/4/loslvfrqval", ""],	
	"loshelf.q" : ["LoShelf Q", "s", "/4/loslvqval", ""],

	"peak1.on" : ["Peak1 on", "b","/4/eqbandbyp/1/3" , ""],
	"peak1.gain" : ["Peak1 Gain", "s", "/4/logainval", ""],
	"peak1.freq" : ["Peak1 Freq", "s", "/4/lofrqval", ""],	
	"peak1.q" : ["Peak1 Q", "s", "/4/loqval", ""],

	"peak2.on" : ["Peak2 on", "b","/4/eqbandbyp/1/4" , ""],
	"peak2.gain" : ["Peak2 Gain", "s", "/4/lomidgainval", ""],
	"peak2.freq" : ["Peak2 Freq", "s","/4/lomidfrqval", ""],
	"peak2.q" : ["Peak2 Q", "s", "/4/lomidqval", ""],

	"peak3.on" : ["Peak3 on", "b","/4/eqbandbyp/1/5" , ""],
	"peak3.gain" : ["Peak3 Gain", "s", "/4/himidgainval", ""],
	"peak3.freq" : ["Peak3 Freq", "s", "/4/himidfrqval", ""],
	"peak3.q" : ["Peak3 Q", "s", "/4/himidqval", ""],

	"peak4.on" : ["Peak4 on", "b","/4/eqbandbyp/1/6" , ""],
	"peak4.gain" : ["Peak4 Gain", "s", "/4/higainval", ""],
	"peak4.freq" : ["Peak4 Freq", "s", "/4/hifrqval", ""],
	"peak4.q" : ["Peak4 Q", "s", "/4/hiqval", ""],

	"hishelf.on" : ["HiShelf on", "b","/4/eqbandbyp/1/7" , ""],
	"hishelf.gain" : ["HiShelf Gain", "s", "/4/hislvgainval", ""],
	"hishelf.freq" : ["HiShelf Freq", "s", "/4/hislvfrqval", ""],
	"hishelf.q" : ["HiShelf Q", "s", "/4/hislvqval", ""],
	
	"lpf.on" : ["HiCut on", "b","/4/eqbandbyp/1/8" , ""],
	"lpf.freq" : ["HiCut Freq", "s","/4/lpffrqval", ""],
	"lpf.slope" : ["HiCut Slope", "s","/4/lpfslpval", ""],
	
	"eq.master.gain" : ["EQ Master Gain", "s", "/4/eqmstgainval", ""],
	
	"insert1" : ["Insert1", "s","/3/insertname1", ""],
	"insert2" : ["Insert2", "s","/3/insertname2", ""],
	"insert3" : ["Insert3", "s","/3/insertname3", ""],
	"insert4" : ["Insert4", "s","/3/insertname4", ""],
	"insert5" : ["Insert5", "s","/3/insertname5", ""],
	"insert6" : ["Insert6", "s","/3/insertname6", ""],
	"insert7" : ["Insert7", "s","/3/insertname7", ""],
	"insert8" : ["Insert8", "s","/3/insertname8", ""] };


//====================================================================
//						INITIAL FUNCTIONS 
//====================================================================

function init() {
 // script.log("Custom module init");
 
 	temp = local.values.addFloatParameter("Tempo", "", 0);
// 	local.values.addTrigger("Get Tempo", "Get Names from the Console" , false);

/*
//===================== TRACK No CONTAINER ===================		
	trackNo=local.values.addContainer("TrackNo");
		trackNo.setCollapsed(true);
		for (var n = 1; n < banktrCount+1; n++) {
			var trn = trackNo.addStringParameter("Track"+n, "", ""); 
			trn.setAttribute("readonly" ,true);}
			 
//===================== NAMES CONTAINER ===================		
	names=local.values.addContainer("Names");
		names.setCollapsed(true);
		names.addStringParameter("First BankTrack No", "", "");	
		names.addTrigger("Bank back", "Get Names from the Console" , false);		
		names.addTrigger("Bank next", "Get Names from the Console" , false);
		for (var n = 1; n < banktrCount+1; n++) {
			names.addStringParameter("Track"+n, "", ""); }
			
//===================== LEVELS CONTAINER ===================		
	levels=local.values.addContainer("Levels");
		levels.setCollapsed(true);
		levels.addStringParameter("First BankTrack No", "", "");	
		levels.addTrigger("Bank back", "Get Levels from the Console" , false);		
		levels.addTrigger("Bank next", "Get Levels from the Console" , false);
		for (var n = 1; n < banktrCount+1; n++) {
			levels.addFloatParameter("Track"+n, "", 0, 0, 1); }
*/
			
//===================== BANK TRACKS CONTAINER ===================		
	bankTracks=local.values.addContainer("Bank Tracks");
		bankTracks.setCollapsed(true);
		bankTracks.addStringParameter("First BankTrack No", "", "");	
		bankTracks.addTrigger("Bank back", "Get Infos from the Console" , false);		
		bankTracks.addTrigger("Bank next", "Get Infos from the Console" , false);
		for (var n = 1; n < banktrCount+1; n++) {
			var trn = bankTracks.addStringParameter(n+" TrackNo", "", "");
//			trn.setAttribute("readonly" ,true);
			bankTracks.addStringParameter(n+" Name", "", ""); 
			bankTracks.addFloatParameter(n+" Level", "", 0, 0, 1); }
			
			
	//========================== TRACK PARAMETERS CONTAINER ============================	
	seltr = local.values.addContainer("Track Params");
		seltr.setCollapsed(true);
		seltr.addStringParameter("First BankTrack No", "", "");
		seltr.addTrigger("Set Track", "" , false);
		seltr.addIntParameter("Track","Select the Channel Number",1,1) ;
		seltr.addTrigger("Track back", "Get Params from the Console" , false);		
		seltr.addTrigger("Track next", "GetParams from the Console" , false);
		
//		seltr.addIntParameter("Relative Track No","Select the Channel Number",1,1,8) ;
//		seltr.addTrigger("Sync Params", "" , false);
		
		var champs = util.getObjectProperties(selTrack);
		for (var n = 0; n < champs.length; n++) {
			if (selTrack[champs[n]][1] == "f") {
			seltr.addFloatParameter(selTrack[champs[n]][0], "", 0 , 0, 1); }
			else if (selTrack[champs[n]][1] == "b") {
			seltr.addBoolParameter(selTrack[champs[n]][0], "", false); }
			else if (selTrack[champs[n]][1] == "in") {
			seltr.addIntParameter(selTrack[champs[n]][0], "", 0); } 
			else if (selTrack[champs[n]][1] == "s") {
			seltr.addStringParameter(selTrack[champs[n]][0], "", ""); } }
			
	
//==========================SELECT FX AND PARAMS CONTAINER ============================	
	fxparam = local.values.addContainer("Fx Params");
		fxparam.setCollapsed(true);
		fxparam.addStringParameter("First BankTrack No", "", "");
		fxparam.addTrigger("Reset", "" , false);
		var max = local.parameters.fxCount.get() ;
		fxparam.addIntParameter("Track No","Select the Channel Number",1,1) ;
		fxparam.addIntParameter("Fx Number","Select the Fx Number",1,1,12) ;
		fxparam.addTrigger("Sync Params", "" , false);
		fxparam.addStringParameter("Track Number", "", "");
		fxparam.addStringParameter("Track Name", "", "");
		fxparam.addStringParameter("Fx Name", "", "");	
		for (var n = 1; n < fxParamCount + 1; n++) {
			fxparam.addStringParameter(n+" ParamName", "", "");
			fxparam.addFloatParameter(n+" ParamVal", "", 0,0,1); } 
			
//===================== VU-METERS CONTAINER ===================		
	vus=local.values.addContainer("Meters");
		vus.setCollapsed(true);
		vus.addStringParameter("First BankTrack No", "", "");	
		vus.addTrigger("Bank back", "Get Levels from the Console" , false);		
		vus.addTrigger("Bank next", "Get Levels from the Console" , false);
		for (var n = 1; n < banktrCount+1; n++) {
			vus.addFloatParameter("Track "+n+"L", "", 0, 0, 1);
			vus.addFloatParameter("Track "+n+"R", "", 0, 0, 1); }
			
			
}


function moduleParameterChanged(param) {
  script.log(param.name + " parameter changed, new value: " + param.get());
}

//============================================================
//							MODULE VALUE CHANGES
//============================================================

function moduleValueChanged(value) {

	if (value.name == "getTempo"){
  	local.send("/tempo");  }

	if (value.name == "setTrack"){
  	var no=local.values.trackParams.track.get();
  	local.send("/device/track/select/"+no);  }

  	if (value.name == "bankBack"){
  	local.send("/device/track/count" , banktrCount);
 	 local.send("/device/track/bank/-"); }
  	if (value.name == "bankNext"){
  	local.send("/device/track/count" , banktrCount);
 	 local.send("/device/track/bank/+"); }
  
  	if (value.name == "trackBack"){
  	local.send("/device/track/-");  
  	local.send("/reaper/track/follows/device");}
   	if (value.name == "trackNext"){ 
  	local.send("/device/track/+");
  	local.send("/reaper/track/follows/device"); }
  
  	if (value.name == "syncParams"){
  	var no=local.values.fxParams.trackNo.get();
  	var fxno =  local.values.fxParams.fxNumber.get();
  	local.send("/device/fx/select/"+fxno);
  	local.send("/device/track/select/"+no);
  	local.send("/reaper/track/follows/device");  }
 
  	if (value.name == "reset"){ 
  	local.values.fxParams.fxName.set("");
  	local.values.fxParams.trackName.set("");
  	local.values.fxParams.trackNumber.set(""); 
	for (var n = 1; n < fxParamCount+1 ; n++) {	
	var child = n+"ParamName" ;
	local.values.fxParams.getChild(n+"ParamName").set("");
	local.values.fxParams.getChild(n+"ParamVal").set(0);}   } 
  
}


//============================================================
//							OSC EVENTS
//============================================================
function oscEvent(address, args) { 

//=============== TEMPO ==================

	if (address == "/tempo/raw"){
		local.values.tempo.set(args[0]);}

//=============== TRACK NUMBER ARRAY ==================

	numb = [] ;
	for (var n = 0; n < 8; n++) {
		var addr = trNumb[n];
//		var addr = "/track/"+n+"/number/str" ;	
		if (address == addr){
		numb[n] = args[0];	 } }
		
//=============== TRACKNUMBER ==================
	for (var n = 1; n < banktrCount+1; n++) {
//		var addr = trNumb[n-1];	
		var addr = "/track/"+n+"/number/str" ;	
		if (address == addr){
//		local.values.trackNo.getChild("Track"+n ).set(args[0]);
		local.values.bankTracks.getChild(n+"TrackNo").set(args[0]); } }
		if (address == "/track/1/number/str"){
		local.values.bankTracks.firstBankTrackNo.set(args[0]);
		local.values.trackParams.firstBankTrackNo.set(args[0]);
		local.values.fxParams.firstBankTrackNo.set(args[0]);}

//=============== TRACKNAMES ==================
//		local.values.names.firstBankTrackNo.set(numb[0]); 
	for (var n = 1; n < banktrCount+1; n++) {
		var tNumber = numb[n-1] ;
		var addr = "/track/"+n+"/name";	
		if (address == addr){
		var child = "Track"+n ;
//		local.values.names.getChild(child).set(args[0]);
		local.values.bankTracks.getChild(n+"Name").set(args[0]);  } }

//=============== TRACKLEVELS ==================
//		local.values.levels.firstBankTrackNo.set(numb[0]); 
	for (var n = 1; n < banktrCount+1; n++) {
		var addr = "/track/"+n+"/volume";	
		if (address == addr){
		var child = "Track"+n ;
//		local.values.levels.getChild(child).set(args[0]); 
		local.values.bankTracks.getChild(n+"Level").set(args[0]);} }
	
//====================TRACK PARAMETERS ================
	var champs = util.getObjectProperties(selTrack);
	for (var n = 0; n < champs.length; n++) {
	var addr = selTrack[champs[n]][2];
	var child = selTrack[champs[n]][0].split(" ").join("");
	var val = args[0];
	if (address == addr){
	local.values.trackParams.getChild(child).set(val);}  }

	
//====================FX PRAMETERS ================
	var fxno = local.values.fxParams.fxNumber.get() ;
	if (address == "/fx/name")
	{var fxlabel = args[0];
	local.values.fxParams.fxName.set(fxlabel);}
	
	for (var n = 1; n < fxParamCount + 1; n++) {	
//	var addr = "/fx/"+fxno+"/fxparam/"+n+"/value" ;
	var addr = "/fxparam/"+n+"/value" ;
	var val = args[0];
	if (address == addr){
	local.values.fxParams.getChild(n+"ParamVal").set(val);}   }
	
	for (var n = 1; n < fxParamCount + 1; n++) {
//	var addr = "/fx/"+fxno+"/fxparam/"+n+"/name" ;
	var addr = "/fxparam/"+n+"/name" ;
	var val = args[0];
	if (address == addr){
	local.values.fxParams.getChild(n+"ParamName").set(val);}  }
	
	if (address == "/track/name") {
	local.values.fxParams.trackName.set(args[0]);}
	if (address == "/track/number/str") {
	local.values.fxParams.trackNumber.set(args[0]);}
	
//=============== VU METERS ==================
		local.values.meters.firstBankTrackNo.set(numb[0]);
	for (var n = 1; n < banktrCount+1; n++) {
		var addr = "/track/"+n+"/vu/L";	
		if (address == addr){
		var child = "Track"+n+"L" ;
		local.values.meters.getChild(child).set(args[0]);} }
	for (var n = 1; n < banktrCount+1; n++) {
		var addr = "/track/"+n+"/vu/R";	
		if (address == addr){
		var child = "Track"+n+"R" ;
		local.values.meters.getChild(child).set(args[0]);} }

}


// Generic Functions

function master_volume(val)
{
	local.send("/master/volume", val);
}

function volume(no, val)
{
	local.send("/track/"+no+"/volume", val);
	
}

function mute(no)
{
	local.send("/track/"+no+"/mute/toggle");
}

function solo(no, val)
{
	local.send("/track/"+no+"/solo/toggle");
}

function select(no, val)
{
	local.send("/device/track/select/"+no);
	local.send("/reaper/track/follows/device");
}

function solo_reset()
{
	local.send("/soloreset");
}

function play()
{
	local.send("/play");
}

function stop()
{
	local.send("/stop");
}

function cycle()
{
	local.send("/cycle");
}

function rec()
{
	local.send("/rec");
}

function click()
{
	local.send("/click");
}

function rwind()
{
	local.send("/rewind");
}

function forward()
{
	local.send("/forward");
}

function bank_back()
{
	local.send("/device/track/bank/-");
}

function bank_next()
{
	local.send("/device/track/bank/+");
}

function track_back()
{
	local.send("/device/track/-");
	local.send("/reaper/track/follows/device");
}

function track_next()
{
	local.send("/device/track/+");
	local.send("/reaper/track/follows/device");
}


/* next functions :
/3/mInsertEdit/12/1
/3/insertbypass/12/1
*/

