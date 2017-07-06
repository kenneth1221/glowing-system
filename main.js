var godpower = 0
var songs = 0
var spirits = 0
var godtype = 'single'
var spiritbonus = 1


function save(){
	var save = {
		godpower: godpower,
		songs: songs,
		spirits: spirits
	}	
	localStorage.setItem("save", JSON.stringify(save));
}
function load(){
	var savegame = JSON.parse(localStorage.getItem("save"));
	if(typeof savegame.godpower !== "undefined") godpower = savegame.godpower;
	if(typeof savegame.songs !== "undefined") songs = savegame.songs;
	if(typeof savegame.spirits !== "undefined") spirits = savegame.spirits;
}

function prettify(input){
	var output = Math.round(input*1000000)/1000000;
	return output;
}

function godClick(n){
	godpower = godpower + n;	
	document.getElementById('godpower').innerHTML = godpower;
};

function makeSong(){
	var songCost = Math.floor(10*Math.pow(1.1, songs));
	if(godpower >= songCost){
		songs = songs + 1;
		godpower = godpower - songCost;
		document.getElementById('songs').innerHTML = songs;
		document.getElementById('godpower').innerHTML = godpower;
	}
	if(songs/10 >= spirits+1){
		spirits = spirits + 1
		document.getElementById('spirits').innerHTML = spirits;
		companyCheck();
	}
	var nextCost = Math.floor(10*Math.pow(1.1,songs));
	document.getElementById('songCost').innerHTML = nextCost;
	
};

function updateUpgrades(){
	if (godtype == 'single'){
		if (spirits >= 1) {
			document.getElementById('duality').style.display = 'inline'
		}
		if (spirits >= 2) {

		}
		if (spirits >= 11){
			
		}
	else if (godtype == 'pantheon'){
		
	}
	else if (godtype == 'duality'){
		
	}
}
}

function companyCheck(){
	if(spirits >= 666){
		document.getElementById('status').innerHTML = 'Beware the Beast!'
	}		
	else if(spirits >= 1){
		document.getElementById('status').innerHTML = 'Are you still alone? Or is that second voice a figment of your imagination?'
	}
}


window.setInterval(function(){
	godClick(songs);
	godClick(spiritbonus*spirits);
	updateUpgrades();
}, 1000);