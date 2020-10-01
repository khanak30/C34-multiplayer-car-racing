var ball;
var database ;
var position;

function setup(){
//create a database for our program
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
//referring to the location of node 'position'
    var ballPosition = database.ref('ball/position');
    //.on() to read data from the database
    //readPosition - user defined function to read the positions
    //showError - user-defined function to display error message
    ballPosition.on("value", readPosition, showError);
}

function draw(){
    background("white");
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
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    //.set() - help u to write to( update) the database
    database.ref('ball/position').set({
        'x': position.x + x , 
        'y': position.y + y 
    })
}

function readPosition(data){
//.val() pre-defined function that helps u to read the value
    position = data.val();
    ball.x = position.x ;
    ball.y = position.y ;
}

function showError() {
    console.log("Error in writing the database");
}