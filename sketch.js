var boy,scene,boyimage
var mosGroup,restart
var score=0
var gamestate="play"
function preload(){
boyimage=loadImage("boy.gif")
mosImage=loadImage("mos-min-1.png")
restartImage=loadImage("restartImage.gif")
bgimage=loadImage("bg.jpg")
batimage=loadImage("bat2.png")
}
function setup(){
	createCanvas(windowWidth,windowHeight)
	bg=createSprite(200,200,width,height)
	bg.scale=2.4
	bg.addImage(bgimage)
	boy=createSprite(800,500,30,30)
	boy.addImage(boyimage)
	mosGroup=new Group()
	bat1=createSprite(800,500,5,5)
	bat1.addImage(batimage)
	bat1.scale=0.6
	bat1.setCollider("rectangle",0,0,573,300)
	//bat1.debug=false
	//boy.debug=true
	//gameOver=createSprite(windowWidth/2,windowHeight/2,40,40)
	//gameOver.addImage(gameOverImage)
	restart=createSprite(windowWidth/2,(windowHeight/2)+60,30,30)
	restart.addImage(restartImage)
}

function draw(){
	background("lightblue")
	if(gamestate==="play"){
		bat1.visible=true
		boy.visible=true
		bat1.x=boy.x-70
		bat1.y=boy.y-110
   // gameOver.visible=false
	restart.visible=false
	makemos()
if(keyDown("UP_ARROW")){
	boy.y=boy.y-5
}
if(keyDown("DOWN_ARROW")){
	boy.y=boy.y+5
}
if(keyDown("RIGHT_ARROW")){
	boy.x=boy.x+5
}
if(keyDown("LEFT_ARROW")){
	boy.x=boy.x-5
}
for (var i = 0; i < mosGroup.length; i++) {
	if (mosGroup.get(i).isTouching(bat1)) {
		mosGroup.get(i).destroy();
		score=score+4
	}
}

//if(mosGroup.isTouching(boy)){
//	mosGroup.destroyEach()
//	count=count+1
//}
 if(score<-2){
	 gamestate="end"
	 //score=0
 }
}
if(gamestate==="end"){
  boy.visible=false
  bat1.visible=false
  mosGroup.destroyEach()
 
  restart.visible=true
  
  restart.scale=0.4
 
}

if(mousePressedOver(restart)){
	gamestate="play"
	score=0
}




	drawSprites()
	textSize(30)
	fill("red")
	stroke("black")
	strokeWeight(3)
	text("SCORE- "+score,(windowWidth/2)-150,100)
}


function makemos(){
	if(frameCount %20===0){
		var mos1=createSprite(Math.round(random(100,windowWidth)),Math.round(random(100,windowHeight)),10,10)
		mos1.addImage(mosImage)
		mos1.velocityX=Math.round(random(-7,7))
		mos1.velocityY=Math.round(random(-7,7))
		mos1.scale=0.3
	//	mos1.lifetime=300
		
	    mosGroup.add(mos1)
		for (var i = 0; i < mosGroup.length; i++) {
			if (mosGroup.get(i).isTouching(boy)) {
				mosGroup.get(i).destroy();
				score=score-2
			}
		}


		if(mousePressedOver(mos1)){
			mos1.destroy();
			text("hi",200,200)
		}
	}
	
	
}
