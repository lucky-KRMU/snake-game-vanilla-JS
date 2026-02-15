let board = document.getElementById("board"); // targeting the board
let player = document.getElementById("player"); // targeting the player


let playerPos ={ // storing the player position
    x: 1,
    y: 1,
}

document.addEventListener("keydown", (e)=>{
    let key = e.key;
    if (key === "ArrowLeft" || key === "a" || key === "A"){
        if (playerPos.x < 2){
            playerPos.x = 9;
        }
        playerPos.x -= 1;
        player.style.gridColumn = playerPos.x;
    } else if (key === "ArrowRight" || key === "d" || key === "D"){
        if (playerPos.x > 7){
            playerPos.x = 0;
        }
        playerPos.x += 1;
        player.style.gridColumn = playerPos.x;
    } else if (key === "ArrowDown" || key === "s" || key === "S"){
        if (playerPos.y > 7){
            playerPos.y = 0;
        }
        playerPos.y += 1;
        player.style.gridRow = playerPos.y;
    } else if (key === "ArrowUp" || key === "w" || key === "W"){
        if (playerPos.y < 2){
            playerPos.y = 9;
        }
        playerPos.y -= 1;
        player.style.gridRow = playerPos.y;
    }
    console.log(key, playerPos);
})

// setInterval(()=>{
//     player.style.gridColumn = playerPos.x;
//     player.style.gridRow = playerPos.y;

//     playerPos.x += 1;
// }, 1000)