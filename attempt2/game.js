var game = new Phaser.Game("100%", "100%", Phaser.AUTO, '', {preload: preload, create:create, update:update});
	game.config.forceSetTimeOut = true;
var godPower = 0;
var powerPerSec = 0;
var clickVal = 1;
var god = {
	type: 'Monad (One God)',
};
var powerText;
god['first'] = {};
var style = {font: 'bold 3em Times New Roman', fill: '#fff', boundsAlignH: 'center', boundsAlignV:'middle'};
var spirits={
	count: 0,
	bonus: 1,
}
function save(){
	var save = {
		godPower: godPower,
		powerPerSec: powerPerSec,
		clickVal: clickVal,
		spiritcount:spirits.count,
		spiritbonus: spirits.bonus,
		godType: god.type,
	}
	localStorage.setItem("save", JSON.stringify(save));
}

function load(){
	var savegame = JSON.parse(localStorage.getItem("save"));
	if(typeof savegame.godPower !== "undefined") godPower = savegame.godPower;
	if(typeof savegame.powerPerSec !== "undefined") powerPerSec = savegame.powerPerSec;
	if(typeof savegame.clickVal !== "undefined") clickVal = savegame.clickVal;
	if(typeof savegame.spiritcount !== "undefined") spirits.count = savegame.spiritcount;
	if(typeof savegame.spiritbonus !== "undefined") spirits.bonus = savegame.spiritbonus;
	if(typeof savegame.godType !== "undefined") god.type = savegame.godtype;
	
}

function preload(){
	this.stage.disableVisibilityChange = true;
	var bmd = game.add.bitmapData(250, 500);
	bmd.ctx.fillStyle = 'grey';
	bmd.ctx.strokeStyle = 'white';
	bmd.ctx.lineWidth = 12;
	bmd.ctx.fillRect(0, 0, 250, 500);
	bmd.ctx.strokeRect(0, 0, 250, 500);
	game.cache.addBitmapData('upgradePanel', bmd);
	
	var buttonImage = game.add.bitmapData(250, 500);
	buttonImage.ctx.fillStyle = 'white';
	buttonImage.ctx.strokeStyle = 'red';
	buttonImage.ctx.lineWidth = 4;
	buttonImage.ctx.fillRect(0, 12, '10em', 48);
	buttonImage.ctx.strokeRect(0, 12, '10em', 48);
	game.cache.addBitmapData('button', buttonImage);
	

	
	game.load.image('musicnote', 'assets/musicnote.png');
	game.load.image('star', 'assets/star.png')

}

function create(){
	god.first = new Phaser.Circle(game.world.centerX, game.world.centerY, scaleGodPower(godPower));
	game.inputEnabled = true;
	powerText = game.add.text(0,0, 'Godly Power', style)
	powerText.setTextBounds(0,0,game.width,100);
	spiritText = game.add.text(0,40, 'Spirits', style)
	spiritText.setTextBounds(0,0,game.width,100);
	PPSText = game.add.text(0,80, 'DPS', style)
	PPSText.setTextBounds(0,0,game.width,100);
	
	var bg = game.add.sprite(0,0);
    bg.fixedToCamera = true;
    bg.scale.setTo(game.width, game.height);
	bg.inputEnabled = true;
	bg.input.priorityID = 0;
	bg.events.onInputDown.add(click)
	
	upgradePanel = game.add.image(0, 50, this.game.cache.getBitmapData('upgradePanel'));
	var upgradeButtons = upgradePanel.addChild(this.game.add.group());
	upgradeButtons.position.setTo(8, 8);
	
	var buttonstyle = {font: '1.5em Times New Roman', fill: '#fff', boundsAlignH: 'center', boundsAlignV:'middle'};
	var button;
	upgradeButtonsData.forEach(function(buttonData,index){
		button = game.add.button(10, (50*index), game.cache.getBitmapData('button'));
		button.icon = button.addChild(game.add.image(4, 20, buttonData.icon));
		button.text = button.addChild(game.add.text(42, 15, buttonData.name + ': ' + buttonData.count , buttonstyle));
		button.details = buttonData;
		button.text.costText = button.addChild(game.add.text(42, 35, 'Cost: ' + buttonData.cost, buttonstyle));
		button.events.onInputDown.add(onUpgradeButtonClick, this); 
		
		upgradeButtons.addChild(button);
	})
	timer = game.time.create(false);
	timer.loop(100, updateAll, this);
	timer.start();
	
	 
}

function prettify(input){
	var output = Math.round(input*1000000000)/1000000000;
	return output;
}

function updateAll(){
	godPower += powerPerSec/10;
	godPower = prettify(godPower + spirits.bonus * spirits.count/5);
	updateVisual();
	}

function updateVisual(){
	newRad = scaleGodPower(godPower);
	if(newRad<=100){
		god.first.radius = newRad;
	}
}
	
function update(){
	game.debug.geom(god.first, 'ffffff')
	powerText.text = "Godly Power: " + godPower;
	spiritText.text = "Spirits: " + spirits.count;
	PPSText.text = "DPS: " + powerPerSec;
	game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
}


function click(){
	godClick(clickVal);
	updateVisual();
}

function godClick(n){
	godPower += n;
}


function onUpgradeButtonClick(button, pointer) {
    if (godPower - button.details.cost >= 0) {
        godPower -= button.details.cost;
        powerText.text = 'Godly Power: ' + godPower;
		button.details.count++;
		button.details.purchaseHandler.call(this,button,this);
		button.text.text = button.details.name + ': ' + button.details.count
		button.details.cost = costIncrease(button.details.base, button.details.count);
		button.text.costText.text = 'Cost: ' + button.details.cost;
		updateVisual();
    }
}

function scaleGodPower(gp){
	return Math.pow(gp, 1/2)*5
}

function costIncrease(base, count){
	return Math.floor(base*Math.pow(1.1,count));
}

var upgradeButtonsData = [
{icon: 'musicnote', name: 'Song of Creation', count: 0, cost:10, base:10, purchaseHandler: function(button){
	powerPerSec += 1;
	if(button.details.count%10 == 0){
		spirits.count += 1;
	}
}},
{icon: 'star', name: 'Heavenly Star', count: 0, cost:100, base:100, purchaseHandler: function(button){
	spirits.count += 1;
}}
]

