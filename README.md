# Snake Game 🐍

A classic, grid-based **Snake Game** built with vanilla JavaScript, HTML5, and CSS3. Navigate the snake to consume food, grow your tail, and aim for the highest score without hitting the walls or yourself.

---

## 🕹️ How to Play

1. **Start**: Press any arrow key to begin the game and set the snake in motion.
2. **Controls**: Use the **Arrow Keys** (Up, Down, Left, Right) to change the snake's direction.
3. **Objective**: Eat the **red food** circles to grow your tail and increase your score.
4. **Game Over**: The game ends if the snake:
* Hits the boundary of the  grid.
* Collides with its own body.



---

## 🚀 Features

* **Dynamic Growth**: Every time the snake consumes food, a new tail segment is appended to the body.
* **Real-time Scoring**: The score updates instantly at the top of the screen as you play.
* **Procedural Food Spawning**: Food appears at random locations on the grid every 3 seconds once the game starts.
* **Responsive Retro Design**: Uses a custom pixel-art font style (`Rubik Pixels` and `Jersey 10`) and a blurred backdrop for a modern-retro aesthetic.

---

## 🛠️ Technical Overview

### Grid System

The game operates on a fixed ** grid**. The layout is managed via CSS Grid, with the board size defined using `vmin` units to ensure it remains square and centered on different screen sizes.

### Game Logic (`logic.js`)

* **Game Loop**: Runs every **300ms**, handling movement, collision detection, and score rendering.
* **Movement**: The snake's "head" (initial position) is updated based on the current velocity, and each subsequent tail piece follows the position of the piece before it.
* **Collision Detection**: The script checks coordinates after every move to see if the head's  position matches a wall or a body segment.

---

## 📂 File Structure

* `index.html`: The skeleton of the game, including the score display and game board container.
* `style.css`: Handles the "Snake" theme, including the lime-green player segments and red food styling.
* `logic.js`: The "brain" of the game, managing the intervals for food spawning and the movement engine.

---
