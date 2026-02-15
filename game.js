let board = document.getElementById("board");
let player = document.getElementById("player");


let playerPos ={ // storing the player position
    x: 0,
    y: 0,
}

document.addEventListener("keydown", (e)=>{
    let key = e.key;
    if (key === "ArrowLeft" || key === "a" || key === "A"){
        playerPos.x -= 1;
    } else if (key === "ArrowRight" || key === "d" || key === "D"){
        playerPos.x += 1;
    } else if (key === "ArrowDown" || key === "s" || key === "S"){
        playerPos.y += 1;
    } else if (key === "ArrowUp" || key === "w" || key === "W"){
        playerPos.y -= 1;
    }
    console.log(key, playerPos);
})