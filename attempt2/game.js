var game = new Phaser.Game("100%", "100%", Phaser.AUTO, '', {preload: preload, create:create, update:update});
var godPower = 1;
var clickVal = 1;
var spiritCount = 0;
var god = {};
var spirits = {};
var powerText;
god['first'] = {};
var style = {font: 'bold 4em Times New Roman', fill: '#fff', boundsAlignH: 'center', boundsAlignV:'middle'};
function preload(){
	
}

function create(){
	god.first = new Phaser.Circle(game.world.centerX, game.world.centerY, scaleGodPower(godPower));
	game.inputEnabled = true;
	powerText = game.add.text(0,0, "test", style)
	powerText.setTextBounds(0,0,game.width,100);
	
	var bg = game.add.sprite(0,0);
    bg.fixedToCamera = true;
    bg.scale.setTo(game.width, game.height);
	bg.inputEnabled = true;
	bg.input.prirityID = 0;
	bg.events.onInputDown.add(click)
}

function update(){
	game.debug.geom(god.first, 'ffffff')
	powerText.text = "Godly Power: " + godPower;
}


function click(){
	godClick(clickVal);
	newRad = scaleGodPower(godPower);
	if(newRad<=300){
		god.first.radius = newRad;
	}
}
function godClick(n){
	godPower += n;
}

function scaleGodPower(gp){
	return Math.pow(gp, 1/2)*5
}