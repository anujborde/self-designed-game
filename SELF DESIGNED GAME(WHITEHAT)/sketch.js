var player,plr_img
var enemy,enemyGroup,eimg
var bullet,b_img
var health1,health2,health3,himg
var score=0
var bulletGroup
var asteroid,as_img
var loss=0
var over,oimg
var extra ,grp
var gamestate="start"
var beep
var shot
var bg
var bg1,bg_img
var Start,s



function preload(){
  plr_img=loadImage("aeroplane.jpg")
  eimg=loadImage("alien1.png")
  b_img=loadImage("bullet.png")
  as_img=loadImage("as.png")
  himg=loadImage("life.png")
  oimg=loadImage("gameOver.jpg")
  beep=loadSound("beep.mp3")
shot=loadSound("shot.mp3")
bg=loadImage("bg.jpg")
bg_img=loadImage("title.jpg")
s=loadImage("s.png")

}

function setup() {
  createCanvas(600, 600);
  
  bg1=createSprite(300,300,170,800)
bg1.addImage(bg_img)
bg1.scale=1.5

Start=createSprite(300,300,50,10)
Start.addImage(s)
Start.scale=0.2

player=createSprite(300,550,20,20)
player.addImage(plr_img)
player.scale=0.2

health1=createSprite(10,20)
health1.addImage(himg)
health1.scale=0.1

health2=createSprite(50,20)
health2.addImage(himg)
health2.scale=0.1

health3=createSprite(90,20)
health3.addImage(himg)
health3.scale=0.1
  
  enemyGroup=new Group()
  bulletGroup=new Group()
  grp=new Group();
  
}

function draw() {
 
  
  

if(gamestate==="start"){

  fill("red")
textSize(20)
text("CLICK START TO PLAY",600,400)
player.visible=false
health1.visible=false
health2.visible=false
health3.visible=false

fill("red")
textSize(20)
text("CLICK START TO PLAY",300,400)

//Start.position(300,300)
if(mousePressedOver(Start)){
  gamestate="play"
  bg1.destroy();
  Start.destroy();
}

}

if(gamestate==="play"){
  //background(bg);
  background(bg);
  health1.visible=true
  health2.visible=true
  health3.visible=true
  player.visible=true

   displayScore();
  spawnBullets();
  spawnEnemy()
  //advantage();
  Extra();

  if(keyWentDown("right")){
    // player.rotationSpeed=8
     player.velocityX=7
       
   }
   if(keyWentUp("right")){
     //player.rotationSpeed=0
     player.velocityX=0
   }
   
   if(keyWentDown("left")){
    player.velocityX=-7
     //player.rotationSpeed=-8
   }
   
   if(keyWentUp("left")){
     //player.rotationSpeed=0
     player.velocityX=0
   }

   for(var i =0;i<enemyGroup.length;i++){
    if(enemyGroup.get(i).isTouching(player)){
        enemyGroup.get(i).destroy()
        beep.play();
        loss+=1
        
        }
  }
  
  if(loss===1){
    health3.visible=false;
}
if (loss===2){
    health2.visible=false;
}
if(loss===3){
    health1.visible=false;
    player.destroy();
enemyGroup.destroyEach();
over=createSprite(300,300)
over.addImage(oimg)
bulletGroup.destroyEach()
}

if(grp.isTouching(player)&&loss===1){
health3.visible=true
loss=loss-1
grp.destroyEach();
}
if(grp.isTouching(player)&&loss===2){
  health2.visible=true
  grp.destroyEach()
  loss=loss-1
  }

  

enemyGroup.setVelocityYEach(6+score/30)

fill("green")
textSize(20)
// text("HEALTH :-"+health,10,20)


text("SCORE:-"+score,480,20)


}
  
  
 
  
  drawSprites();
}


function spawnEnemy(){
  if(frameCount%100===0){
    enemy=createSprite(random(100,550),10)
    enemy.addImage(eimg)
    enemy.scale=0.09
    enemy.velocityY=6
    enemyGroup.add(enemy)
    enemy.lifetime=200
  }

  
  
  
  if(frameCount%100===0&&score>10){
    asteroid=createSprite(random(100,550),10)
   asteroid.addImage(as_img)
   asteroid.scale=0.1
   asteroid.velocityY=5
   asteroid.lifetime=200
   enemyGroup.add(asteroid)
  }
  
}

function spawnBullets(){
  
  if(keyDown("space")){
    bullet=createSprite(player.x,player.y)
   bullet.addImage(b_img)
    bullet.scale=0.1
    bullet.velocityY=-6
    bulletGroup.add(bullet)
  }
}
function displayScore(){
  for(var i =0;i<enemyGroup.length;i++){
  if(bulletGroup.isTouching(enemyGroup.get(i))){
     enemyGroup.get(i).destroy();
    bulletGroup.destroyEach();
    shot.play()
    score=score+5
}
  }
  
}

function Extra(){
  if(loss===2||loss===1&&score>10){
if(frameCount%500===0){
extra=createSprite(random(50,580),10,30,30)
extra.addImage(himg)
extra.lifetime=200
extra.velocityY=5
extra.scale=0.1
console.log("abcd")
grp.add(extra)
}
  }

  

  



  



}



