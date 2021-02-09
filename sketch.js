var balloon,balloon_image;
var database;
var height;

function preload(){
  balloon_image = loadAnimation("HAB2.png","HAB3.png","HAB4.png")
  b1=loadImage("HAB1.png")
}

function setup() {
  database = firebase.database();
  //console.log(database);

  createCanvas(500,500);
  balloon = createSprite(250,250,10,10);

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value",readHeight,showError); 
}

function draw() {
  background(b1); 

  //stroke();
  textSize(35);
  fill("white")
  text("USE ARROW KEYS TO MOVE THE HOT AIR BALLOON",10, 50)

  if (height!== undefined)
  {
  
  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloon_image);
    balloon.x = balloon.x-10;
   }
   else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloon_image);
    balloon.x = balloon.x+10;
  }
  else if(keyDown(UP_ARROW)){
  updateHeight(0,-10);
  balloon.addAnimation("hotAirBalloon",balloon_image);
  balloon.scale=balloon.scale-0.3;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloon_image);
  balloon.y = balloon.y+10;
}

drawSprites();
}
}

function updateHeight(x,y){
  database.ref('balloon/position').set({
     'x' : height.x + x,
     'y' : height.y + y
  })
  }

function readHeight(data){
   height = data.val();
   //console.log(position.x);
   balloon.x = height.x;
   balloon.y = height.y;
}   

function showError(){
  console.log("Error in writing to the database");
}