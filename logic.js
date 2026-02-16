let board = document.getElementById("board");
let player = document.getElementById("player");
let gridSize = 8;

let snakeTrail = [];
let snakeTail = [];
let direction = "+X";
let foodList = [];
let firstByte = true;

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
    console.log(direction)

});



function spawnFood () {

    let spawnX = Math.ceil(Math.random() * gridSize);
    let spawnY = Math.ceil(Math.random() * gridSize);

    let food = document.createElement('p');
    food.className = 'food';
    food.style.gridColumn = spawnX;
    food.style.gridRow = spawnY;

    board.appendChild(food);
    foodList.push(food);
}

// spawing food in every 3 seconds
setInterval(()=>{
    spawnFood();
}, 3000)

// main game loop
setInterval(()=>{

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


    // Condition to check that the player does not go out of the baord and return to the opposite edge.
    if (initialPos.x < 1){
        initialPos.x = gridSize;
    } else if (initialPos.x > gridSize){
        initialPos.x = 0;
    }
    
    if (initialPos.y > gridSize){
        initialPos.y = 0;
    } else if (initialPos.y < 1){
        initialPos.y = gridSize;
    }

    foodList.forEach((food, index)=>{
        let foodX = food.style.gridColumn;
        let foodY = food.style.gridRow;

        if (initialPos.x == foodX && initialPos.y == foodY){
            if (board.contains(food)) {
                board.removeChild(food);
                // foodList.splice(index, 1);   // need to update the food list(array).

                // adding the snake's tail
                let tailElement = document.createElement('div');
                let trail ={
                    x: 0,
                    y: 0,
                } // making the trail.
                if (firstByte){
                    if (direction === "+X") {
                        trail.x = initialPos.x - 1;
                        trail.y = initialPos.y;
                    } else if (direction === "-X"){
                        trail.x = initialPos.x + 1;   
                        trail.y = initialPos.y;     
                    } else if (direction === "+Y"){
                        trail.x = initialPos.x;
                        trail.y = initialPos.y - 1;
                    } else if (direction === "-Y"){
                        trail.x = initialPos.x;
                        trail.y = initialPos.y + 1;
                    }
                    firstByte = !firstByte;
                } else {
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
                }
                tailElement.className = "player";
                tailElement.style.gridColumn = trail.x;
                tailElement.style.gridRow = trail.y;

                board.appendChild(tailElement);
                snakeTail.push(tailElement);
            }
        }

    })

    //updating the snake's body
    for (let i = snakeTrail.length - 1; i>0; i--){

    }
   


    // updating the snake head position
    player.style.gridColumn = initialPos.x;
    player.style.gridRow = initialPos.y;


}, 300)

