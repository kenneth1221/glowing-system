var godpower = 0
var songs = 0
var stars = 0
var spirits = 0
var oldspirits = 0
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

function debugAddSpirits(){
	spirits = spirits+10;
	document.getElementById('spirits').innerHTML = spirits;
}

function prettify(input){
	var output = Math.round(input*1000000)/1000000;
	return output;
}
function manualClick(n){
	godClick(n);
	if (godtype == 'duality'){
		spirits = spirits + 1;
		document.getElementById('spirits').innerHTML = spirits;
	}
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
		document.getElementById('spirits').innerHTML = spirits;;
	}
	var nextCost = Math.floor(10*Math.pow(1.1,songs));
	document.getElementById('songCost').innerHTML = nextCost;
	
};
function documentGetElementById(id, n){
	document.getElementByID(id).innerHTML = n;
}
function makeStar(){
	var starCost = Math.floor(100*Math.pow(1.1, songs));
	if(godpower >= starCost){
		stars = stars + 1;
		godpower = godpower - starCost;
		document.getElementById('stars').innerHTML = stars;
		document.getElementById('godpower').innerHTML = godpower;
		spirits = spirits + 1
		document.getElementById('spirits').innerHTML = spirits;;
	}
	var nextCost = Math.floor(100*Math.pow(1.1,stars));
	document.getElementById('starCost').innerHTML = nextCost;	
}



function changeGodType(newType){
	godtype = newType;
	messageChange(godtype);
	document.getElementById('godtype').innerHTML = godtype;
	var elements = document.getElementsByClassName('godtype')
	for (var i = 0; i < elements.length; i++){
        elements[i].style.display = 'none';
    }
}

function messageChange(newGodtype){
	if(newGodtype == 'duality'){
		document.getElementById('status').innerHTML = 'You are alone, but you are also your own opposite.';
		document.getElementById('spiritName').innerHTML = 'Sub-dualities';
		document.getElementById('worshipName').innerHTML= 'Dance with your Opposite!';
	}
	if(newGodtype == 'pantheon'){
		document.getElementById('status').innerHTML = 'You are one of a grand many.'
		document.getElementById('spiritName').innerHTML = 'Gods';
		document.getElementById('worshipName').innerHTML= 'Govern the Gods!';
	}
	if(newGodtype == 'henotheon'){
		document.getElementById('status').innerHTML = 'King of Kings, Lord of Lords.'
	}
}
function updateStatus(){
	if(spirits >= 666){
		document.getElementById('status').innerHTML = 'Beware the Beast!'
	}		
	else if(spirits >= 1 && godtype === 'single'){
		document.getElementById('status').innerHTML = 'Are you still alone? Or is that second voice a figment of your imagination?'
	}
}
function updateUpgrades(){
	if (godtype === 'single'){
		if (spirits >= 1) {
			document.getElementById('duality').style.display = 'inline-block';
		}
		if (spirits >= 2) {
			document.getElementById('trinity').style.display = 'inline-block';
		}
		if (spirits >= 11){
			document.getElementById('pantheon').style.display = 'inline-block';
		}
	}
	
	if (godtype === 'pantheon'){
		if (godpower > spirits*100){
			document.getElementById('single').style.display = 'inline-block';
		}
		if (spirits > 100){
			document.getElementById('henotheon').style.display = 'inline-block';
		}
	}
	
	if (godtype === 'duality'){
		if (spirits >= 90){
			document.getElementById('animist').style.display = 'inline-block';
		}
		if (spirits >= 1000){
			document.getElementById('single').style.display = 'inline-block';
		}
	}
}

function updateSpiritBonus(){
	if(godtype == 'duality'){
		spiritbonus = spirits;
	}
}

function updateAll(){
	updateStatus();
	updateUpgrades();
	updateSpiritBonus();
}

window.setInterval(function(){
	godClick(songs);
	godClick(3*stars)
	godClick(spiritbonus*spirits);
	updateAll();
	
}, 1000);