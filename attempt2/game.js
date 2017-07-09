var game = new Phaser.Game("100%", "100%", Phaser.AUTO, '', {preload: preload, create:create, update:update});
var godPower = 1;
var clickVal = 1;
var spiritCount = 0;
var god = {};
var spirits = new Phaser.Group(game);
var powerText;
god['first'] = {};
var style = {font: 'bold 3em Times New Roman', fill: '#fff', boundsAlignH: 'center', boundsAlignV:'middle'};

function preload(){
	
	var bmd = game.add.bitmapData(250, 500);
	bmd.ctx.fillStyle = 'grey';
	bmd.ctx.strokeStyle = 'white';
	bmd.ctx.lineWidth = 12;
	bmd.ctx.fillRect(0, 0, 250, 500);
	bmd.ctx.strokeRect(0, 0, 250, 500);
	game.cache.addBitmapData('upgradePanel', bmd);
	
	var buttonImage = game.add.bitmapData(250, 500);
	//buttonImage.ctx.fillStyle = 'white';
	buttonImage.ctx.strokeStyle = 'red';
	buttonImage.ctx.lineWidth = 4;
	//buttonImage.ctx.fillRect(0, 0, 232, 48);
	buttonImage.ctx.strokeRect(0, 12, 232, 48);
	game.cache.addBitmapData('button', buttonImage);
	
	upgradePanel = game.add.image(0, 70, this.game.cache.getBitmapData('upgradePanel'));
	var upgradeButtons = upgradePanel.addChild(this.game.add.group());
	upgradeButtons.position.setTo(8, 8);
	
	game.load.image('musicnote', 'assets/musicnote.png');
	

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
	
	var buttonstyle = {font: '1.5em Times New Roman', fill: '#fff', boundsAlignH: 'center', boundsAlignV:'middle'};
	var button;
	button = game.add.button(10, 70, game.cache.getBitmapData('button'));
	button.icon = button.addChild(game.add.image(4, 20, 'musicnote'));
	button.text = button.addChild(game.add.text(42, 15, 'Bonus: ' , buttonstyle));
	button.details = {cost: 5};
	button.costText = button.addChild(game.add.text(42, 35, 'Cost: ', buttonstyle));
	button.events.onInputDown.add(onUpgradeButtonClick, this); 
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


function onUpgradeButtonClick(button, pointer) {
    if (godPower - button.details.cost >= 0) {
        godPower -= button.details.cost;
        powerText.text = 'Godly Power: ' + godPower;
    }
}

function scaleGodPower(gp){
	return Math.pow(gp, 1/2)*5
}
