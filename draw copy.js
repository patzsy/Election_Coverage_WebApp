/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Main helper function//
getElectorate = function (electorate_name) {
    var elec_data = electionData;
    for (var i = 0; i < elec_data.length; i++){
        if (elec_data[i].division === electorate_name){
            return elec_data[i];
        }
    }
}

//Adding a electorate data and generate related card and updating the bar chart and pie chart
addCard = function(electorate_name, x, y, width, height) {
	var data = getElectorate(electorate_name);
	if(cardList.length < 7 && dupCheck(data) == 0) {
		cardList.push(data);
		makeCard(electorate_name);
		canvasBar.makeBar(cardList, data.candidates_voting[0].partyid, x, y, width+90, height+60);
		canvasPie.makePie(cardList, x, y, width+90, height+60);
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Sub helper function//
//scroll bar
Raphael("canvasCard_container",0 ,-10, function(){
    var style = document.getElementById("canvasCard_container").style;
    style.width="420px";
    style.height="650px";
    style.overflow="auto";
});

//Translating party ID to party name
var party_static = {
	'ALP ':'Australian Labor Party',

	'LP  ': 'Liberal Party',

	'LNP ': 'Liberal National Party',

	'NP  ':  'The Nationals',

	'CLP ':  'Country Liberal Party',

	'GRN ': 'The Greens',

	'KAP ':  "Katter's Australian Party",

	'PUP ':  'Palmer United Party',
 
};

//Translating party name to party ID
var party_static1 = {
	'Australian Labor Party': 'ALP ',

	'Liberal Party': 'LP  ',

	'Liberal National Party': 'LNP ',

	'The Nationals':  'NP  ',

	'Country Liberal Party': 'CLP ',

	'The Greens': 'GRN ',

	"Katter's Australian Party": 'KAP ',

	'Palmer United Party': 'PUP ',

};

//check if the card has been added
dupCheck = function(data) {
	i = 0;
	while(i < cardList.length) {
		if(data.division == cardList[i].division) {
			return 1;
		}
		i++;
	}
	return 0;
}

capitaliseFirstLetter = function(string){
		return string.charAt(0).toUpperCase() + string.slice(1);
}

function map_color(partyID){
	if (partyID == "ALP"){ 
		return '#B25D5A'; 
	} else if( partyID == "LP"){
		return '#4D4E8F'; 
	}else if ( partyID == "GRN"){
		return '#00CC66';
	}else if ( partyID == "LNP"){
		return '#47A3FF'; 
	}else if ( partyID == "NP"){
		return '#008800'; 
	}else if (partyID == "KATTER"){
		return '#A57B57'; 
	} else {
		return '#d56f0b';
	}
}
	
cardBg1Colour = function(string,partyID){
	if (partyID == "ALP"){ 
		return string.attr({fill: '#d72e1b'}); 
	} else if( partyID == "LP"){
		return string.attr({fill: '#008aff'}); 
	}else if ( partyID == "GRN"){
		return string.attr({fill: '#4cd944'});
	}else if ( partyID == "LNP"){
		return string.attr({fill: '#19a2b8'}); 
	}else if ( partyID == "NP"){
		return string.attr({fill: '#b4a029'}); 
	} else {
		return string.attr({fill: '#d56f0b'});
	}
	
}

cardBg2Colour = function(string,partyID){
	if (partyID == "ALP"){ 
		return string.attr({fill: '#f55f7b'}); //FF6C87
	} else if( partyID == "LP"){
		return string.attr({fill: '#00a8ff'}); //FF6C87
	}else if ( partyID == "GRN"){
		return string.attr({fill: '#a1ffae'});
	}else if ( partyID == "LNP"){
		return string.attr({fill: '#2bc0d9'}); 
	}else if ( partyID == "NP"){
		return string.attr({fill: '#dfbf00'}); 
	} else {
		return string.attr({fill: '#ff9d48'});
	}
	
}

cardBg3Colour =function(string,partyID){
	if (partyID == "ALP"){ 
		return string.attr({fill: '#FFC9DB'}); //FF6C87
	} else if( partyID == "LP"){
		return string.attr({fill: '#7FBFFF'}); //FF6C87
	}else if ( partyID == "GRN"){
		return string.attr({fill: '#a1ffae'});
	}else if ( partyID == "LNP"){
		return string.attr({fill: '#17d0f3'}); 
	} else if ( partyID == "NP"){
		return string.attr({fill: '#f3d73f'}); 
	} else {
		return string.attr({fill: '#ffba88'});
	}
	
}

cardTextColour =function(string,partyID){
	if (partyID == "ALP"){ 
		return string.attr({"font-family": "arial", "font-size": 11*Math.sqrt((width/500)*(height/330)),fill: "#640f05"}); 
	} else if( partyID == "LP"){
		return string.attr({"font-family": "arial", "font-size": 11*Math.sqrt((width/500)*(height/330)),fill: "#2228bb"}); 
	}else if ( partyID == "GRN"){
		return string.attr({"font-family": "arial", "font-size": 11*Math.sqrt((width/500)*(height/330)),fill: "#0d5e09"});
	}else if ( partyID == "LNP"){
		return string.attr({"font-family": "arial", "font-size": 11*Math.sqrt((width/500)*(height/330)),fill: "#0f464f"});
	}else if ( partyID == "NP"){
		return string.attr({"font-family": "arial", "font-size": 11*Math.sqrt((width/500)*(height/330)),fill: "#433900"});
		
	} else {
		return string.attr({"font-family": "arial", "font-size": 11*Math.sqrt((width/500)*(height/330)),fill: "#672c00"});
	}
}

cardLogo = function(party){
	//Loading the logo picture depending on the winner
	if(party == "ALP") {
		return "logo/LOGO_ALP.png";
	} else if(party == "LP") {
		return "logo/LOGO_Liberal_Party.png";
	} else if(party == "LNP") {
		return "logo/LOGO_LNP.png";
	} else if(party == "NP") {
		return "logo/LOGO_The_Nationals.png";
	} else if(party == "CLP") {
		return "logo/LOGO_CountryLiberals.png";
	} else if(party == "GRN") {
		return "logo/LOGO_Greens.png";
	} else if(party == "KAP") {
		return "logo/LOGO_KatterAustraliaParty.png";
	} else if(party == "PUP") {
		return "logo/LOGO_PalmerUnitedParty.png";
	} else {
		return "";
	}
}

barBg1Colour = function(party){
	var color = "#000000";
	
	if (party == "ALP "){ 
		color = "#d72e1b";
	} else if( party == "LP  "){
		color = "#008aff"; 
	}else if ( party == "GRN "){
		color = "#229407";
	}else if ( party == "LNP "){
		color =  "#19a2b8"; 
	}else if (party == "NP  ") {
		return '#b4a029';
	} else {
		color =  "#d56f0b";
	}
	return color; 
}

pieColour =function(party){
	if (party == "Liberal Party"){ 
		return '#008aff' ;  
	}else if (party == "Australian Labor Party" ) {
		return '#d72e1b' ; 
	}else if (party == "The Greens" ) {
		return '#229407' ;  
	}else if (party == "Liberal National Party" ) {
		return '#19a2b8' ; 
	}else if (party == "The Nationals" ) {
		return '#b4a029';
	}else {
		return '#d56f0b' ;
	}
 }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Main Drawing Function//
Raphael.fn.makeMap = function (xMap,yMap, x, y, width, height){
	var map_data = map_data_json;
	this.setStart();
    for (var i = map_data.length - 1; i >= 0; i--) {
        var state = map_data[i].state;
        var electorate_name = map_data[i].electorate;
        var path_value = map_data[i].path;
        var color = map_color(division_wining_party[electorate_name]);
        var current_electorate = this.path(path_value).attr({fill: color});
        current_electorate.data("state", state);
        current_electorate.data("electorate", electorate_name);
        current_electorate.dblclick(function() {
		   addCard(this.data("electorate"), x, y, width, height);
        });
    };
    var map_set = this.setFinish();

    var container = this.rect(300, 900, 400, 50).attr({fill : '#00CC66', "fill-opacity": 1});
    var labour = this.rect(300,900,((90*400)/150),50).attr({fill : '#B25D5A', "fill-opacity": 1});
    var liberal = this.rect(300+((90*400)/150),900,((55*400)/150),50).attr({fill : '#4D4E8F', "fill-opacity": 1});
	
    var reset = this.rect(200,580,60,30).attr({fill : 'black'});
    reset.click(function() {
            for (var i = map_set.length - 1; i >= 0; i--) {
                var color = map_color(division_wining_party[map_set[i].data("electorate")]);
                map_set[i].attr({fill: color, "fill-opacity": 0.7});
            };
        });

    var labour = this.rect(200,520,60,30).attr({fill : '#B25D5A'});
    labour.click(function() {
            var swing_color = labour_swing;
            for (var i = map_set.length - 1; i >= 0; i--) {
                var opacity = swing_color[map_set[i].data("electorate")]/50;
                map_set[i].attr({fill: '#B25D5A', "fill-opacity" : opacity});
            };
        });
    var liberal = this.rect(200,550,60,30).attr({fill : '#4D4E8F'});
    liberal.click(function() {
            var swing_color = coaltion_swing;
            for (var i = map_set.length - 1; i >= 0; i--) {
                var opacity = (swing_color[map_set[i].data("electorate")]-15)/50;
                map_set[i].attr({fill: '#4D4E8F', "fill-opacity" : opacity});
            };
        });   
}

//Generate a card which shows the election result of specific electorate
makeCard = function(electorate_name) {
	var data = getElectorate(electorate_name);
	var x = 0;
	var y = 0;
	var width = 400;
	var height = 264;
	var canvas = new Raphael(document.getElementById("canvasCard_container"),width,height);
	cardRpList.push(canvas);
 	var border = canvas.rect(x, y, width, height,15);
 	border.attr({fill:"#e6e6e6",stroke:"#606060",opacity:"0.8","stroke-width": 3});
	var divisionVal = data.division;
	var divisionText = canvas.text((20*width/500)+x,(30*height/330)+y, divisionVal+" Results");
	divisionText.attr({"font-family": "Arial Black","text-anchor":"start","font-size": 20*Math.sqrt((width/500)*(height/330))});
	
	var stateVal = data.state;
	var stateText = canvas.text((20*width/500)+x,(60*height/330)+y, stateVal);
	stateText.attr({"font-family": "Verdana","text-anchor":"start","font-size": 16*Math.sqrt((width/500)*(height/330))});
	
	var dateText = canvas.text((20*width/500)+x,(90*height/330)+y, "Updated on:\n"+Date());
	dateText.attr({"font-family": "Times New Roman","text-anchor":"start", "font-size": 12*Math.sqrt((width/500)*(height/330))});
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	i = 0;
	var firstVal = data.candidates_voting[i].party;
	var firstIDVal = data.candidates_voting[i].partyid.replace(/\s+/g, '');
	var firstNameVal = data.candidates_voting[i].name+" "+capitaliseFirstLetter((data.candidates_voting[i].surname).toLowerCase());
	var firstNumVal = data.candidates_voting[i].totalvotes;
	var firstPerVal = data.candidates_voting[i].votepercentage.replace(/\s+/g, '');

	i++;
	var secondVal = data.candidates_voting[i].party;
	var secondIDVal = data.candidates_voting[i].partyid.replace(/\s+/g, '');
	var secondNameVal = data.candidates_voting[i].name+" "+capitaliseFirstLetter((data.candidates_voting[i].surname).toLowerCase());
	var secondNumVal = data.candidates_voting[i].totalvotes;
	var secondPerVal = data.candidates_voting[i].votepercentage.replace(/\s+/g, '');

	i++;
	var thirdVal = data.candidates_voting[i].party;
	var thirdIDVal = data.candidates_voting[i].partyid.replace(/\s+/g, '');
	var thirdNameVal = data.candidates_voting[i].name+" "+capitaliseFirstLetter((data.candidates_voting[i].surname).toLowerCase());
	var thirdNumVal = data.candidates_voting[i].totalvotes;
	var thirdPerVal = data.candidates_voting[i].votepercentage.replace(/\s+/g, '');

	i++;
	var otherNumVal = 0;
	var otherPerVal = 0;
	while(i < (data.candidates_voting).length) {
		otherNumVal = otherNumVal + data.candidates_voting[i].totalvotes;
		otherPerVal = otherPerVal + parseFloat(data.candidates_voting[i].votepercentage.replace(/\s+/g, ''));
		i++;
	}

	//Comparison bar between first and seconder position party	
	var firstcomp = canvas.rect((20*width/500)+x, (140*height/330)+y, (firstNumVal*450/(firstNumVal+secondNumVal))*width/500, 35*height/330); 
	var firstcompPer = canvas.text((20*width/500)+x, (130*height/330)+y, Math.round(firstNumVal*100/(firstNumVal+secondNumVal)).toFixed(2)+"%");
	var firstcompName = canvas.text((20*width/500)+x, (120*height/330)+y, firstNameVal);
	cardBg1Colour(firstcomp,firstIDVal);
	cardTextColour(firstcompPer,firstIDVal);
	cardTextColour(firstcompName,firstIDVal);
	firstcompName.attr({"text-anchor":"start","font-family": "Tahoma", "font-size": 13*Math.sqrt((width/500)*(height/330))});
	firstcompPer.attr({"text-anchor":"start","font-family": "Tahoma", "font-size": 12*Math.sqrt((width/500)*(height/330))});	
	
	var secondcomp = canvas.rect(((20+firstNumVal*450/(firstNumVal+secondNumVal))*width/500)+x, (140*height/330)+y, (secondNumVal*450/(firstNumVal+secondNumVal))*width/500, 35*height/330);
	var secondcompPer = canvas.text((470*width/500)+x, (130*height/330)+y, Math.round(secondNumVal*100/(firstNumVal+secondNumVal)).toFixed(2)+"%");
	var secondcompName = canvas.text((470*width/500)+x, (120*height/330)+y, secondNameVal);
	cardBg1Colour(secondcomp,secondIDVal);
	cardTextColour(secondcompPer,secondIDVal);
	cardTextColour(secondcompName,secondIDVal);
	secondcompName.attr({"text-anchor":"end","font-family": "Tahoma", "font-size": 13*Math.sqrt((width/500)*(height/330))});
	secondcompPer.attr({"text-anchor":"end","font-family": "Tahoma", "font-size": 12*Math.sqrt((width/500)*(height/330))});	
	
	
	//first
	var first = canvas.rect((20*width/500)+x, (190*height/330)+y, 190*width/500, 25*height/330);
	var firsttext1 = canvas.text((115*width/500)+x,(205*height/330)+y, firstVal);
	cardBg1Colour(first,firstIDVal);
	cardTextColour(firsttext1,firstIDVal);
	
	
	var firstName = canvas.rect((215*width/500)+x, (190*height/330)+y, 145*width/500, 25*height/330);
	var firsttext2 = canvas.text((285*width/500)+x,(205*height/330)+y, firstNameVal);
	cardBg2Colour(firstName,firstIDVal);
	cardTextColour(firsttext2,firstIDVal);

	var firstNum = canvas.rect((365*width/500)+x, (190*height/330)+y, 50*width/500, 25*height/330);
	var firsttext3 = canvas.text((390*width/500)+x,(205*height/330)+y, firstNumVal);
	cardBg3Colour(firstNum,firstIDVal);
	cardTextColour(firsttext3,firstIDVal);
	
	var firstPer = canvas.rect((420*width/500)+x, (190*height/330)+y, 50*width/500, 25*height/330);
	
	
	//second
	var second = canvas.rect((20*width/500)+x, (220*height/330)+y, 190*width/500, 25*height/330);
	var secondtext1 = canvas.text((115*width/500)+x,(235*height/330)+y, secondVal);
	cardBg1Colour(second,secondIDVal);
	cardTextColour(secondtext1,secondIDVal);

	var secondName = canvas.rect((215*width/500)+x, (220*height/330)+y, 145*width/500, 25*height/330);
	var secondtext2 = canvas.text((285*width/500)+x,(235*height/330)+y, secondNameVal);
	cardBg2Colour(secondName,secondIDVal);
	cardTextColour(secondtext2,secondIDVal);
	
	var secondNum = canvas.rect((365*width/500)+x, (220*height/330)+y, 50*width/500, 25*height/330);
	var secondtext3 = canvas.text((390*width/500)+x,(235*height/330)+y, secondNumVal);
	cardBg3Colour(secondNum,secondIDVal);
	cardTextColour(secondtext3,secondIDVal);
	
	var secondPer = canvas.rect((420*width/500)+x, (220*height/330)+y, 50*width/500, 25*height/330);
	 
	//third
	var third = canvas.rect((20*width/500)+x, (250*height/330)+y,190*width/500, 25*height/330);
	var thirdtext1 = canvas.text((115*width/500)+x,(265*height/330)+y, thirdVal);
	cardBg1Colour(third,thirdIDVal);
	cardTextColour(thirdtext1,thirdIDVal);
	
	var thirdName = canvas.rect((215*width/500)+x, (250*height/330)+y, 145*width/500, 25*height/330);
	var thirdtext2 = canvas.text((285*width/500)+x,(265*height/330)+y, thirdNameVal);
	cardBg2Colour(thirdName,thirdIDVal);
	cardTextColour(thirdtext2,thirdIDVal);
	
	var thirdNum = canvas.rect((365*width/500)+x, (250*height/330)+y, 50*width/500, 25*height/330);
	var thirdtext3 = canvas.text((390*width/500)+x,(265*height/330)+y, thirdNumVal);
	cardBg3Colour(thirdNum,thirdIDVal);
	cardTextColour(thirdtext3,thirdIDVal);

	var thirdPer = canvas.rect((420*width/500)+x, (250*height/330)+y, 50*width/500, 25*height/330);
	
	//other party
	var other = canvas.rect((20*width/500)+x, (280*height/330)+y, 190*width/500, 25*height/330);
	var othertext1 = canvas.text((115*width/500)+x,(295*height/330)+y, "Others");
	
	other.attr({fill: '#666d66'});
	othertext1.attr({"font-family": "arial", "font-size": 11*Math.sqrt((width/500)*(height/330)),fill: "#000"});
	
	var otherName = canvas.rect((215*width/500)+x, (280*height/330)+y, 145*width/500, 25*height/330);
	otherName.attr({fill: '#99a499'});
	var otherNum = canvas.rect((365*width/500)+x, (280*height/330)+y, 50*width/500, 25*height/330);
	
	var othertext2 = canvas.text((390*width/500)+x,(295*height/330)+y, otherNumVal);
	otherNum.attr({fill: '#c6d4c6'});
	othertext2.attr({"font-family": "arial", "font-size": 11*Math.sqrt((width/500)*(height/330)),fill: "#000"});
	
	var otherPer = canvas.rect((420*width/500)+x, (280*height/330)+y, 50*width/500, 25*height/330);
	
	
	
	//Percentage filling, saved for the last
	var firsttext4 = canvas.text((445*width/500)+x,(205*height/330)+y, firstPerVal+"%");
	cardBg3Colour(firstPer,firstIDVal);
	cardTextColour(firsttext4,firstIDVal);
	
	var secondtext4 = canvas.text((445*width/500)+x,(235*height/330)+y, secondPerVal+"%");
	cardBg3Colour(secondPer,secondIDVal);
	cardTextColour(secondtext4,secondIDVal);
	
	var thirdtext4 = canvas.text((445*width/500)+x,(265*height/330)+y, thirdPerVal+"%");
	cardBg3Colour(thirdPer,thirdIDVal);
	cardTextColour(thirdtext4,thirdIDVal);
	
	var othertext3 = canvas.text((445*width/500)+x,(295*height/330)+y, otherPerVal.toFixed(2)+"%");
	otherPer.attr({fill: '#c6d4c6'});
	othertext3.attr({"font-family": "arial", "font-size": 11*Math.sqrt((width/500)*(height/330)),fill: "#000"});
		
	var partylogo = canvas.image(cardLogo(firstIDVal), (380*width/500)+x,(10*height/330)+y, 100*width/500, 90*height/330);
	border.dblclick(function (){
		i = 0;
		while (i < cardList.length) {
			if(cardList[i].division == data.division) {
				break;
			} else {
				i++;
			}
		}
		if(cardList.length > 1) {
			cardList.splice(i, 1);
			cardRpList.splice(i, 1);
		} else {
			
			cardList.length = 0;
			cardRpList.length = 0;
			canvas.remove();
			canvasBar.clear();
			canvasPie.clear();


		}
		canvasBar.makeBar(cardList, cardList[0].candidates_voting[0].partyid, x, y, width+90, height+60);
		canvasPie.makePie(cardList, x, y, width+90, height+60);
		canvas.remove();
	})
}

Raphael.fn.makeBar = function(data, party, x, y, width, height){

	this.clear();
	
	var border = this.rect(x, y, width, height,15);
	var plural = " electorate";
	if(data.length > 1) {
		plural = " electorates";
		plurallegend = "Electorates";
	
	} else{

		plurallegend = "Electorate";
	}

	this.label(width/2, 20, "Total votes of "+party_static[party]+" in "+data.length+plural);
	this.label(50, 20, plurallegend);
	this.label(width-50, 20, "Party/Total");

	i = 0;
	var num = new Array();
	var vote = new Array();
	var name = new Array();
	var divSum = new Array();
	var totalSum = 0;
	while (i < (data).length) {
		num[i] = 0;
		vote[i] = 0;
		name[i] = data[i].division;
		divSum[i] = 0;
		j = 0;
		while (j < (data[i].candidates_voting).length) {
			divSum[i] = divSum[i] + data[i].candidates_voting[j].totalvotes;
			if(data[i].candidates_voting[j].partyid == party) {
				num[i] = parseFloat(data[i].candidates_voting[j].votepercentage.replace(/\s+/g, ''));
				totalSum = totalSum + num[i];
				vote[i] = data[i].candidates_voting[j].totalvotes;
				name[i] = data[i].division;
			}
			j++;
		}
		i++;
	}
	
	//////////////////////////////////////////////////////////

	fin = function () {
		this.flag = this.popup(this.bar.x, this.bar.y, (Math.round(this.bar.value*100/totalSum) + "%") || "0").insertBefore(this);
	}
	fout = function () {
		this.flag.animate({opacity: 0},300, function () {this.remove();});
	}
	
	k = 0;
	dist = 260 / num.length;
	while(k < num.length) {
		this.label((45*(width/500))+x, ((65+dist*k)*(height/330))+y, name[k]);	
		this.flag((400*(width/500))+x, ((65+dist*k)*(height/330))+y, vote[k]+"/"+divSum[k], 0);
		k++;
	}
	//colours need to be passed in based on different parties
	var result = barBg1Colour(party);
	var barChart = this.hbarchart((95*(width/500))+x, (45*(height/330))+y, 280*width/500, 270*height/330, 
	[num], { colors: [result] }).hover(fin, fout);	
}

Raphael.fn.makePie = function(data, x, y, width, height){
    
	//electorates name need to be passed in based on different parties
	
	this.clear();
	var border2 = this.rect(x, y, width, height,15);
	var plural = " electorate";
	if(data.length > 1) {
		plural = " electorates";
	}
	this.label(width/2, 20, "Percentage vote comparison in "+data.length+plural);
	//////////////////////////////////////////////////////////
	//All this passed parameter is hardcoded, we need to agree for a way to pass it first
	var sum = new Object();
	otherSum = 0; //All party which is not mentioned in pieParty
	var pieParty = new Object({
		"Australian Labor Party": "ALP ", 
		"Liberal Party" : "LP  ", 
		"The Greens" : "GRN ", 
		"Liberal National Party" : "LNP ",
		"Palmer United Party": "PUP ", 
		"The Nationals": "NP  ",
		"Country Liberal Party": "CLP ",
		"Katter\'s Australian Party": "KAP "
		});
		
	i=0;
	while (i < data.length) {
		j=0;
		while (j < (data[i].candidates_voting).length) {
			otherSum = otherSum + parseFloat(data[i].candidates_voting[j].votepercentage.replace(/\s+/g, ''));
			j++;
		}
		i++;
	}
	for (var party in pieParty) {
		sum[party] = 0;
		i=0;
		while (i < data.length) {
			j=0;
			while (j < (data[i].candidates_voting).length) {
				if (data[i].candidates_voting[j].partyid == pieParty[party]) {
					sum[party] = sum[party] + parseFloat(data[i].candidates_voting[j].votepercentage.replace(/\s+/g, ''));
					otherSum = otherSum - parseFloat(data[i].candidates_voting[j].votepercentage.replace(/\s+/g, ''));
				}
				j++;
			}
			i++;
		}
	}
	
	var sortedSum = [];
	for (var party in sum) {
		sortedSum.push([party, sum[party]]);
	}
	sortedSum.sort(function(b, a) {return a[1] - b[1]});
	i = 3;
	while (i < sortedSum.length) {
		otherSum = otherSum + sortedSum[i][1];
		i++;
	}
	//////////////////////////////////////////////////////////
		
    var items = [
         { value: sortedSum[0][1], color: pieColour(sortedSum[0][0]), title: '%%.%% - '+sortedSum[0][0] },//#d72e1b'
         { value: sortedSum[1][1], color: pieColour(sortedSum[1][0]), title: '%%.%% - '+sortedSum[1][0] },
         { value: sortedSum[2][1], color: pieColour(sortedSum[2][0]), title: '%%.%% - '+sortedSum[2][0] },
		 { value: otherSum, color: '#93948C', title: '%%.%% - Others' }
     ];
		
    items = _.sortBy(items, function(item){ return -item.value; }); // sort by descending

     var pieChart = this.piechart((350*width/500)+x, (195*height/330)+y, 115, _.pluck(items, "value"), {
         colors: _.pluck(items, "color"),
         legend: _.pluck(items, "title"),
         legendpos: 'west'
     });
	 
	 pieChart.hover(function () {
	 		this.sector.stop();
	 		this.sector.scale(1.1, 1.1, this.cx, this.cy);

	 		if (this.label) {
	 			this.label[0].stop();
	 			this.label[0].attr({ r: 7.5 });
	 			this.label[1].attr({ "font-weight": 800 });
	 		}
	 	}, function () {
	 		this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 400, "bounce");

	 		if (this.label) {
	 			this.label[0].animate({ r: 4 }, 300, "bounce");
	 			this.label[1].attr({ "font-weight": 400 });
	 		}
	 	});

 	var clickSomeSlice = function () {
		var tmpName = this.label[1].attrs.text.replace(/\d+/g,'');
		var Name = tmpName.match(/(\w+\s*)+/g);
		
		for (var k in party_static1) {
		    if (Name != "Others" && party_static1.hasOwnProperty(k) && Name == k ) {
				canvasBar.clear(); 
				canvasBar.makeBar(data,party_static1[k], x, y, width, height);
		    }
		}
		
 	}
	
	for(var index_i=0;index_i < pieChart.covers.items.length;index_i++){
	    pieChart.covers.items[index_i].click(clickSomeSlice);			
	}
		 
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////