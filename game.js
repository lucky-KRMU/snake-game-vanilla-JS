let board = document.getElementById("board"); // targeting the board
let player = document.getElementById("player"); // targeting the player
let gridSize = 8; // the size of the grid
let fps = 300; // defined fps

// let movement = true;

let direction;

let playerPos ={ // storing the player position
    x: 5,
    y: 5,
}

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
    console.log(key, playerPos);
})

setInterval(()=>{
    
    
    
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



    // Updating the position of the player
    player.style.gridColumn = playerPos.x;
    player.style.gridRow = playerPos.y;
    
}, fps);