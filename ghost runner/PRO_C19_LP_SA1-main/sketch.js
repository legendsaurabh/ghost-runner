var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
 doorsGroup=new Group();
 climbersGroup=new Group();
 ghost=createSprite(200,200,50,50);
 ghost.addImage("ghost",ghostImg);
 ghost.scale=0.3;
 invisibleBlockGroup=new Group;

}

function draw() {
  background(200);
  
  if(gameState==="play"){

   

  spawnDoors();
  if(tower.y > 400){
      tower.y = 100
    }
   //controls
    if(keyDown("left_arrow")){
      ghost.x=ghost.x-3;
    } 
    if(keyDown("right_arrow")){
      ghost.x=ghost.x+3;
    } 
    if(keyDown("up_arrow")){
      ghost.velocityY=-5;
    } 
   //gravity
  ghost.velocityY=ghost.velocityY+0.8; 

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;

  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600||ghost.y<=30){
    ghost.destroy();
    gameState="end";
  }

    drawSprites();

}


if(gameState==="end"){
if(keyDown("space")){
  gamestate="play";
}
background("green");
stroke("red");
fill("black");
textSize(50);
text("GAME OVER!!",100,300);
stroke("white");
fill("yellow");
textSize(40);
text("reload the page to restart",50,400);
stroke("blue");
fill("red");
textSize(50);
text("Have a good day;)",50,200);

}

}



function spawnDoors(){
  if(frameCount%240===0){
    //doors
    door = createSprite(200,-50);
    door.addImage("door",doorImg);
    doorsGroup.add(door);
    door.velocityY=2;
    door.x=Math.round(random(120,400));
    door.lifetime=300;
    
    //increasing depth
    ghost.depth=door.depth;
    ghost.depth+=1;

  //climbers
   climber = createSprite(200,10);
   climber.addImage("climber",climberImg);
   climbersGroup.add(climber);
   climber.x=door.x;
   climber.velocityY=2;
   //invisible block
   invisibleBlock = createSprite(200,15);
   invisibleBlock.width=climber.width;
   invisibleBlock.height=2;
   invisibleBlock.x=door.x;
   invisibleBlock.velocityY=2;
   //invisibleBlock.debug=true;
   invisibleBlockGroup.add(invisibleBlock);
  }
}





