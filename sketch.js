var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bgimage, bgsprite;
var boy,boyani, boystop;
var corona, coronai,coronaG;
var ground;
var life1, life2, life3, lifeImg;
var mask,maski;
var score=0;
var count=0;
var blackH;
var points;
var reseti;
var vaci,vac;
var co=0;

function preload(){
bgimage=loadImage("bg.jpg");

boyani=loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png","boy5.png");
boystop=loadAnimation("boy1.png");

lifeImg= loadImage("heart.png");
blackHeart= loadImage("black-heart.png");
coronai=loadImage("corona.png")

maski=loadImage("Mask.png")

reseti= loadImage("reseet.png");

vaci=loadImage("vac.png");

blackH = loadSound("oneHeart gone.wav");
points= loadSound("point.wav");


}


function setup() {
  createCanvas(800,400);
  
  bgsprite=createSprite(400,50);
  bgsprite.addImage(bgimage);
  bgsprite.velocityX=-3;
  bgsprite.scale=1.3
  
  life1= createSprite(30,59);
  life1.addImage(lifeImg);
  life1.scale= 0.1;
  life2= createSprite(60,59);
  life2.addImage(lifeImg);
  life2.scale= 0.1;
  life3= createSprite(90,59);
  life3.addImage(lifeImg);
  life3.scale= 0.1;
  
  boy=createSprite(50,400);
  boy.addAnimation("walking",boyani);
  boy.addAnimation("stop",boystop);

  
  ground=createSprite(50,400,1000,10);
  ground.visible=false

  reset= createSprite(400,200);
  reset.addImage(reseti);
  
  coronaG=createGroup();
  maskG=createGroup();
  vacG=createGroup();

  boy.debug=true
  boy.setCollider("rectangle",0,0,50,170)
}




function draw(){
  background("black");

 

  if(gameState===PLAY){

    reset.visible=false;
  if(bgsprite.x<0){
    bgsprite.x=400
  }
  if(keyDown("space")&& boy.y >= 159){
    boy.velocityY=-10;
  }
  boy.velocityY = boy.velocityY + 0.8

  for (var i = 0; i  < maskG.length; i++ ){
  if(maskG.get(i).isTouching(boy)){
    maskG.get(i).destroy();
   score=score + 1
   points.play();
  }
}

  for (var i = 0; i  < coronaG.length; i++ ){
    if(coronaG.get(i).isTouching(boy)){
      coronaG.get(i).destroy();
      score=score-1;

      count= count+1;
      if( count === 1){
        life1.addImage(blackHeart);
        blackH.play();
      }
      if( count === 2){
        life2.addImage(blackHeart);
        blackH.play();
      }
      if( count === 3){
        life3.addImage(blackHeart);
        blackH.play();
        gameState=END;
      }
    }
  }
  for (var i = 0; i  < vacG.length; i++ ){
    if(vacG.get(i).isTouching(boy)){
      vacG.get(i).destroy();
      
      co= co+1;
      if( co === 1){
        points.play();
      }
      if( co === 2){
        points.play();
        gameState=WIN;
        WIN();
      }
    }
  }
}

if(gameState===END){

  restart();
}

  boy.collide(ground);

  spawncorona();
  spawnmask();

  drawSprites();

  textSize(20);
  text("score "+score,713,58)


}

function spawncorona(){
  //if(score>5){ 
    if(frameCount%60===0){
     corona= createSprite(800,340);
     corona.addImage(coronai)
   corona.debug=true
   corona.velocityX=-6;
 
   corona.scale=0.2
   coronaG.add(corona);
   }
 }
//}

 function spawnmask(){
  if(frameCount%150===0){

    mask=createSprite(800,340);
    
    mask.addImage(maski);
    mask.velocityX=-6;

    mask.scale=0.2
    maskG.add(mask);
  
  }

}

function spawnvace(){
  if (frameCount%60===0){
if(score>10){
  vac=createSprite(800,340);
  vac.addImage(vaci)
  vac.scale=0.2
  vac.velocityX=-6
}
  }

}

function restart(){
  coronaG.destroyEach();
  maskG.destroyEach();
  boy.changeAnimation("stop",boystop);

  reset.visible=true;
  if(mousePressedOver(reset)){
    gameState=PLAY;
   }

  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;


}

function WIN(){
  bgsprite.velocityX=0;
  boy.velocityY=0;
  boy.changeAnimation("stop",boystop);
  coronaG.setVelocityXEach(0);
  maskG.setVelocityXEach(0);
  reset.visible=true;
 if(mousePressedOver(reset)){
  restart();
 }
  text("WIN",400,300)
}

