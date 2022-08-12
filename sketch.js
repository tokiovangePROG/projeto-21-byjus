var END = 0;
var PLAY = 1;
var RESET = 2;

var gameState = PLAY;

var mario, marioImg, marioGameOver, marioGameOverImg;
var coin, coinImg, coinG, poY;
var backGround, backGroundImg;
var backOver, backOverImg;
var groundImg, groundInvisible;
var resetButton, resetButtonImg;

var cascoImg, casco, cascoG;
var bowser, bowserImg, bowserG;

var jump = -24;
var score = 0;

var musicPlay = true;

function preload(){
marioImg = loadImage("11700.gif");
marioGameOverImg = loadImage("gameOverMario.png");

backGroundImg = loadImage("back.jpeg");
backOverImg = loadImage("gameoverScreen.jpeg");

cascoImg = loadImage("casco.gif");
bowserImg = loadImage("bowser.gif");
coinImg = loadImage("coin.gif");

resetButtonImg = loadImage("1142347.png");
gameOverAudio = loadSound("gameover.mp3");
shortJump = loadSound("pulo.mp3");
longJump = loadSound("yeahoo.mp3");
music = loadSound("music.mp3");
coinAudio = loadSound("coin.mp3");
}

function setup() {
createCanvas(1000,500);

mario = createSprite(100,400,30,50);
mario.addImage(marioImg);
mario.scale = 0.5;
mario.depth = 2;

marioGameOver = createSprite(100,400,30,50);
marioGameOver.addImage(marioGameOverImg);
marioGameOver.scale = 0.5;
marioGameOver.visible = false;

backGround = createSprite(-1000,243,1000,500);
backGround.addImage(backGroundImg);
backGround.scale = 1.3;
backGround.depth = 1;
backGround.velocityX = -7;

backOver = createSprite(500,250,1000,500);
backOver.addImage(backOverImg)
backOver.visible = false;
backOver.scale = 0.95;

resetButton = createSprite(500,300,50,50);
resetButton.addImage(resetButtonImg);
resetButton.scale = 0.1;
resetButton.visible = false;

groundInvisible = createSprite(200,470,500,10);
groundInvisible.visible = false;

cascoG = createGroup();
bowserG = createGroup();
coinG = createGroup();
}

function draw() {
  background("indigo");
  if(gameState === PLAY){
// tela de fundo
  if(backGround.x < -285 ){
    backGround.x = 750;
}
// chão
mario.collide(groundInvisible);

// gravidade
mario.velocityY = mario.velocityY + 2;

// controles
if(keyDown("space") && mario.y > 390){
 mario.velocityY = jump;
 if(jump === -31){
  longJump.play();
  }
  if(jump === -24){
    shortJump.play();
}

}

if(musicPlay === true){
  music.play();
  musicPlay = false;
}


// contagem de spawn
if(frameCount%150 === 0){
  var rond = Math.round(random(1,4));
  if(rond === 1 || 2){
    spawnCasco();
  }
  if(rond === 3){
    spawnBowser();
  }
  if(rond === 4){
    spawnCasco();
  }
}
if(frameCount%150 === 0){
  spawnCoin();
  poY = Math.round(random(200,380));
}
// se está tocando em algo
if(cascoG.isTouching(mario)){
  gameState = END;
  gameOverAudio.play();
}
if(bowserG.isTouching(mario)){
  gameState = END;
  gameOverAudio.play();
}
if(coinG.isTouching(mario)){
  score = score + 1;
  coinG.destroyEach();
  coinAudio.play();
}
}

else if(gameState === END){
  mario.velocityY = 0;
  backGround.velocityX = 0;
  bowserG.destroyEach();
  cascoG.destroyEach();
  coinG.destroyEach();

  resetButton.visible = true;
  backOver.visible = true;

  if(mousePressedOver(resetButton)){
    restartFase();
    musicPlay = true;
  }
  music.stop();
}
mario.setCollider("circle", 30,40,70);
drawSprites();

textSize(30);
fill("white");
  stroke("black");
  strokeWeight(3);
  textFont("Impact");
  text("moedas: "+score, 15,30);
}

function spawnCasco(){
  casco = createSprite(1100,440,50,20);
  casco.addImage(cascoImg);
  casco.velocityX = -12;
  casco.scale = 0.3;
  casco.lifetime = 400;
  jump = -24;
  cascoG.add(casco);
  casco.setCollider("circle", 20,20,100);
}

function spawnBowser(){
  bowser = createSprite(1200,400,100,40);
  bowser.addImage(bowserImg);
  bowser.velocityX = -7;
  bowser.lifetime = 400;
  bowser.scale = 0.37;
  jump = -31;
  bowserG.add(bowser);
  bowser.setCollider("circle", 20,20,130);
}

function spawnCoin(){
  coin = createSprite(1100,poY,50,50);
  coin.addImage(coinImg);
  coin.scale = 0.2;
  coin.velocityX = -7;
  coin.lifetime = 350;
  coinG.add(coin);
  coin.setCollider("circle", 20,20,110);
}

function restartFase(){
resetButton.visible = false;
backOver.visible = false;

backGround.velocityX = -7;
score = 0;

gameState = PLAY;
music.play();
}

