let board = document.getElementById("board"); // targeting the board
let player = document.getElementById("player"); // targeting the player
let gridSize = 8; // the size of the grid
let fps = 300; // defined fps
let foodArray = []; // defining the food array
let food = spawnFood(gridSize, foodArray); // spawing the initial food.

let snakeTail = [];
let snakeTrail = [];

let firstByte = true;


let direction; // defining the direction variable

let playerPos ={ // storing the player position
    x: 5,
    y: 5,
}

let counter = 0;


// function to change the direction of movement
document.addEventListener("keydown", (e)=>{
    let key = e.key;
    if (key === "ArrowLeft" || key === "a" || key === "A"){
        // playerPos.x -= 1;
        direction = "-X";
        // movement = true;
    } else if (key === "ArrowRight" || key === "d" || key === "D"){
        // playerPos.x += 1;
        direction = "+X";
        // movement = true;
    } else if (key === "ArrowDown" || key === "s" || key === "S"){
        // playerPos.y += 1;
        direction = "+Y";
        // movement = false;
    } else if (key === "ArrowUp" || key === "w" || key === "W"){
        // playerPos.y -= 1;
        direction = "-Y";
        // movement = false;
    }
    // console.log(key, playerPos);
});



// function to spawn food
function spawnFood (gridSize){
    let foodX = Math.ceil( Math.random() * gridSize );
    let foodY = Math.ceil( Math.random() * gridSize );

    let food = document.createElement('div');
    food.className = "food";
    food.style.gridColumn = foodX;
    food.style.gridRow = foodY;
    board.appendChild(food);

    foodArray.push(food);
    return foodArray;

}


// function to handle the food consumption event
function foodConsumed ( food, playerHead ) {
    if (food.style.gridColumn === playerHead.style.gridColumn && food.style.gridRow === playerHead.style.gridRow) {
        if (board.contains(food)){

            board.removeChild(food);    // removing the food.


            let tail = document.createElement('div');
            tail.className = 'player';
            snakeTail.push(tail);
            board.appendChild(tail);

            let trail = {
                x:0,
                y:0
            };

            if (firstByte){

                if (direction === "+X") {
                    trail.x = playerPos.x - 1;
                    trail.y = playerPos.y;
                } else if (direction === "-X"){
                    trail.x = playerPos.x + 1;   
                    trail.y = playerPos.y;     
                } else if (direction === "+Y"){
                    trail.x = playerPos.x;
                    trail.y = playerPos.y - 1;
                } else if (direction === "-Y"){
                    trail.x = playerPos.x;
                    trail.y = playerPos.y + 1;
                }
                
                firstByte = !firstByte;
            } else {
                
                if (direction === "+X") {
                    trail.x = snakeTrail[snakeTrail.length-1]["x"] - 1;
                    trail.y = snakeTrail[snakeTrail.length-1]["y"];
                } else if (direction === "-X"){
                    trail.x = snakeTrail[snakeTrail.length-1]["x"] + 1;   
                    trail.y = snakeTrail[snakeTrail.length-1]["y"];
                } else if (direction === "+Y"){
                    trail.x = snakeTrail[snakeTrail.length-1]["x"];
                    trail.y = snakeTrail[snakeTrail.length-1]["y"] - 1;
                } else if (direction === "-Y"){
                    trail.x = snakeTrail[snakeTrail.length-1]["x"];
                    trail.y = snakeTrail[snakeTrail.length-1]["y"] + 1;
                } 
            }



            console.log(trail)
            snakeTrail.push(trail);
            console.log(snakeTrail);
        }
        
    }
}



// interval to spawn food
setInterval(() => {
    food = spawnFood(gridSize); //calling the spawnFood method
}, 5000);



// actual game loop
setInterval(()=>{


    // iterating over the food array to check for each consumption
    foodArray.forEach((food)=>{
        foodConsumed(food, player)
    })
    




    // updating the position of the player
    if (direction === "+X") {
        playerPos.x += 1;
    } else if (direction === "-X"){
        playerPos.x -= 1;        
    } else if (direction === "+Y"){
        playerPos.y += 1;
    } else if (direction === "-Y"){
        playerPos.y -= 1;
    }



    
    // Condition to check that the player does not go out of the baord and return to the opposite edge.
    if (playerPos.x < 1){
        playerPos.x = gridSize;
    } else if (playerPos.x > gridSize){
        playerPos.x = 0;
    }
    
    if (playerPos.y > gridSize){
        playerPos.y = 0;
    } else if (playerPos.y < 1){
        playerPos.y = gridSize;
    }



    snakeTrail.map( trail =>{
        if (trail.x < 1){
            trail.x = gridSize;
        } else if (trail.x > gridSize){
            trail.x = 0;
        }

        if (trail.y > gridSize){
            trail.y = 0;
        } else if (trail.y < 1){
            trail.y = gridSize;
        }
        
        if (direction === "+X") {
            trail.x += 1;
            // trail.y = trail.y;
        } else if (direction === "-X"){
            trail.x -= 1;   
            // trail.y = trail.y;     
        } else if (direction === "+Y"){
            // trail.x = trail.x;
            trail.y += 1;
        } else if (direction === "-Y"){
            // trail.x = trail.x;
            trail.y -= 1;
        }

        
        return trail;
    })


    // Logic for appending the tail of the snake
    snakeTail.forEach((tailNode, index)=>{
        tailNode.style.gridColumn = snakeTrail[index]["x"];
        tailNode.style.gridRow = snakeTrail[index]["y"];

    });




    // Updating the position of the player
    player.style.gridColumn = playerPos.x;
    player.style.gridRow = playerPos.y;

    
}, fps);