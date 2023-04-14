const gameBoard=document.getElementById("gameboard");
const context=gameBoard.getContext("2d");
const scoreText = document.getElementById("scoreValue");

const WIDTH=gameBoard.width;
const HEIGHT=gameBoard.height;

const UNIT = 25;

let foodX;
let foodY;

let xVel = 25;
let yVel =0;
let score=0;
let active = true;

let started = false;

let paused = false;

let snake =[
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT*1,y:0},
    {x:0,y:0},
]
window.addEventListener('keydown',keypress);

startGame();

function startGame(){
    context.fillStyle= "#212121";
    // fillRect(xStart,yStart,width,height)
    context.fillRect(0,0,WIDTH,HEIGHT);
    createFood();
    displayFood();
    drawSnake();
    // moveSnake();
    // drawSnake();
    nexttick();
}
function clearBoard(){
    context.fillStyle= "#212121";
    // fillRect(xStart,yStart,width,height)
    context.fillRect(0,0,WIDTH,HEIGHT);
}

function createFood(){
    foodX=Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foodY=Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;

}
function displayFood(){
    context.fillStyle = "red ";
    context.fillRect(foodX,foodY,UNIT,UNIT)
}
function drawSnake(){
    context.fillStyle ="aqua";
    context.strokeStyle ="#212121"
    snake.forEach((snakePart)=>{
        context.fillRect(snakePart.x,snakePart.y,UNIT,UNIT);
        context.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT);
    })
}
function moveSnake(){
    const head={x:snake[0].x+xVel,y:snake[0].y+yVel}
    snake.unshift(head);
    if(snake[0].x == foodX && snake[0].y ==foodY){
        score +=1;
        scoreText.textContent = score;
        createFood();
    }
    else
    snake.pop();

}
function nexttick() {
    if (active & !paused){
    setTimeout(()=>{
        clearBoard();
        displayFood();
        moveSnake();
        drawSnake();
        checkGameOver();
        nexttick();
    },300)
}
else if(!active){
    clearBoard();
    context.font = "bold 50px serif";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("Game Over!!☹",WIDTH/2,HEIGHT/2);
}
    
}

function keypress(event){
    if(!started){
        started = true;
        nexttick();
    }
    if(event.keyCode===32){
        console.log('clicked')
        if(paused){
            paused = false;
            nextTick();
        }
        else{
            paused = true;
        }
    }
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    switch(true){
        case(event.keyCode==LEFT && xVel!=UNIT):
        xVel=-UNIT;
        yVel=0;
        break;
        case(event.keyCode==RIGHT && xVel !=-UNIT):
        xVel=UNIT;
        yVel=0;
        break;
        case(event.keyCode==UP && yVel!=UNIT):
        xVel=0;
        yVel=-UNIT;
        break;
        case(event.keyCode==DOWN && yVel!=-UNIT):
        xVel=0;
        yVel=UNIT;
        break;
    }
}

function checkGameOver(){
    switch(true){
        case(snake[0].x<0):
         active=false;
         break;
        case(snake[0].x>=WIDTH):
         active=false;
         break;
        case(snake[0].y<0):
         active=false;
         break;
        case(snake[0].y>=HEIGHT):
        active=false;
        break;
    }
}