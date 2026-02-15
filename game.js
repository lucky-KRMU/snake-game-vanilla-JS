let board = document.getElementById("board"); // targeting the board
let player = document.getElementById("player"); // targeting the player
let gridSize = 8; // the size of the grid
let fps = 500; // defined fps

let movement = true;

let direction;

let playerPos ={ // storing the player position
    x: 5,
    y: 5,
}

document.addEventListener("keydown", (e)=>{
    let key = e.key;
    if (key === "ArrowLeft" || key === "a" || key === "A"){
        playerPos.x -= 1;
        // movement = true;
    } else if (key === "ArrowRight" || key === "d" || key === "D"){
        playerPos.x += 1;
        // movement = true;
    } else if (key === "ArrowDown" || key === "s" || key === "S"){
        playerPos.y += 1;
        // movement = false;
    } else if (key === "ArrowUp" || key === "w" || key === "W"){
        playerPos.y -= 1;
        // movement = false;
    }
    console.log(key, playerPos);
})

setInterval(()=>{
    
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
    
    player.style.gridColumn = playerPos.x;
    player.style.gridRow = playerPos.y;
    playerPos.y+=1;
    
}, fps);