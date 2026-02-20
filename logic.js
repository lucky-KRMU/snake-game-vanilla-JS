let board = document.getElementById("board");
let player = document.getElementById("player");
let scoreCount = document.getElementById("score-count");
let gridSize = 8;



let snakeTrail = [];
let snakeTail = [];
let direction = "+X";
let foodList = [];
let firstByte = true;
let gameOver = false;


let foodConsumedCount = 0;


let initialPos = { // initial position of the snake head
    x: 5,
    y: 5
};

let velocity = { // velocity object 
    x: 0,
    y: 0
};


snakeTrail.push(initialPos); // appending the initial position of the snake head
snakeTail.push(player);

// taking the key input
document.addEventListener('keydown', (e)=>{
    let key = e.key;
    if (key == "ArrowUp") {
        direction = "-Y"
    } else if (key == "ArrowDown"){
        direction = '+Y';
    } else if (key == "ArrowLeft"){
        direction = "-X";
    } else if (key == "ArrowRight"){
        direction = "+X";
    }
    // console.log(direction);

});

function checkGameOver(){
    // checking for the snake touching it's own body
    let headX = initialPos.x;
    let headY = initialPos.y;

    let neoTail = snakeTail.toSpliced(0, 1);    // removing the head and storing the value in a new array

    neoTail.forEach(snake => {
        let snakeX = snake.style.gridColumn;
        let snakeY = snake.style.gridRow;
           if (snakeX == headX && snakeY == headY){
                gameOver = true;
            }

    });

    // checking if the snake touches the board's walls
    if (initialPos.x < 1){
        gameOver = true;
    } else if (initialPos.x > gridSize){
        gameOver = true;
    }
    
    if (initialPos.y > gridSize){
        gameOver = true;
    } else if (initialPos.y < 1){
        gameOver = true;
    }



    // final things to do if the game is over
    if(gameOver){
        clearInterval(foodLoop); // stopping the food loop
        clearInterval(gameLoop); // terminating the game loop
        alert("Game Over!");
        location.reload() // reloading after the game get's over!
    }
}


function spawnFood () {
    // generating the food at random locations
    let spawnX = Math.ceil(Math.random() * gridSize);
    let spawnY = Math.ceil(Math.random() * gridSize);

    // creating the HTML DOM element for the food
    let food = document.createElement('p');
    food.className = 'food';
    food.style.gridColumn = spawnX;
    food.style.gridRow = spawnY;

    // updating it into the DOM
    board.appendChild(food);
    foodList.push(food);
}

// spawing food in every 3 seconds
let foodLoop = setInterval(()=>{
    spawnFood();
}, 3000)

// main game loop
let gameLoop = setInterval(()=>{

    
    
    
    


    // checking for food consumption
    foodList.forEach((food, index)=>{
        let foodX = food.style.gridColumn;
        let foodY = food.style.gridRow;

        // checking for the Food
        if (initialPos.x == foodX && initialPos.y == foodY){    
            if (board.contains(food)) {
                foodConsumedCount+=1;
                console.log(foodConsumedCount);
                board.removeChild(food);
                // foodList.splice(index, 1);   // need to update the food list(array).

                // adding the snake's tail
                let tailElement = document.createElement('div');
                let trail ={
                    x: 0,
                    y: 0,
                } // making the trail.

                // logic for updating the snake's tail
                if (direction === "+X") {
                    trail.x = snakeTrail[snakeTrail.length - 1].x - 1;
                    trail.y = snakeTrail[snakeTrail.length - 1].y;
                } else if (direction === "-X"){
                    trail.x = snakeTrail[snakeTrail.length-1].x + 1;   
                    trail.y = snakeTrail[snakeTrail.length - 1].y;     
                } else if (direction === "+Y"){
                    trail.x = snakeTrail[snakeTrail.length - 1].x;
                    trail.y = snakeTrail[snakeTrail.length - 1].y - 1;
                } else if (direction === "-Y"){
                    trail.x = snakeTrail[snakeTrail.length - 1].x;
                    trail.y = snakeTrail[snakeTrail.length - 1].y + 1;
                }

                if (firstByte) {
                    firstByte = !firstByte;
                }


                tailElement.className = "player";
                tailElement.style.gridColumn = trail.x;
                tailElement.style.gridRow = trail.y;
                
                snakeTail.push(tailElement);
                snakeTrail.push(trail);
                board.appendChild(tailElement);
            }
        }

    })


    
    
   
    //updating the snake's body
    for (let i = snakeTrail.length - 1; i>0; i--){
        snakeTrail[i].x = snakeTrail[i-1].x;
        snakeTrail[i].y = snakeTrail[i-1].y;
    }

    snakeTail.forEach((snake, index)=>{
        snake.style.gridColumn = snakeTrail[index].x;
        snake.style.gridRow = snakeTrail[index].y;
    })

    
    
    // updating the snake head position
    // updating the movement
    if (direction == "+X") {
        initialPos.x += 1;
        // velocity.x = 1;
    } else if(direction == "-X") {
        initialPos.x -=1;
        // velocity.x = -1;
    } else if (direction == "+Y"){
        initialPos.y += 1;
        // velocity.y = 1;
    } else if (direction == "-Y"){
        initialPos.y -= 1;
        // velocity.y = -1;
    }
    
    player.style.gridColumn = initialPos.x;
    player.style.gridRow = initialPos.y;
    
    checkGameOver();
    scoreCount.textContent = `Score: ${foodConsumedCount}`
}, 300)

