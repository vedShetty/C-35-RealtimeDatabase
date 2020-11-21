var hyponticBall;
var database;
var position;

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  hyponticBall=createSprite(250,250,10,10);
  hyponticBall.shapeColor = "red";

  var hyponticBallPosition = database.ref("ball/position");
  hyponticBallPosition.on("value",readPosition,showError);
}

function draw() {
  background(255,255,255);  
  if(position !== undefined){
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,1);
    }
  }
  
  drawSprites();
}

function writePosition(x,y){
  database.ref("ball/position").set({
    'x':position.x + x,
    'y':position.y + y
  })  
}

function readPosition(data){
  position = data.val()
  hyponticBall.x = position.x;
  hyponticBall.y = position.y;
}

function showError(){
  console.log("error In Writing To Database");
}