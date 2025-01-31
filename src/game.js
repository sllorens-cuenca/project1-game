class Game {
    constructor() {

        this.score = 0;
        this.lives = 3;

        this.showScore();
        this.updateScore();
        this.showLives();
    }

    showScore() {
        // step1: create the element:
        this.scoreCount = document.createElement("div");

        // step2: add content or modify
        this.scoreCount.id = "score";
        this.scoreCount.style.left = "0vw";
        this.scoreCount.innerText = this.score;

        //step3: append to the dom: `parentElm.appendChild()`
        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.scoreCount);
    }

    showLives() {
        // step1: create the element:
        this.livesCount = document.createElement("div");

        // step2: add content or modify
        this.livesCount.id = "lives";
        this.livesCount.style.right = "0vw";
        this.livesCount.innerText = this.lives + " lives";

        //step3: append to the dom: `parentElm.appendChild()`
        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.livesCount);
    }

    updateScore() {
        setInterval(() => {
            this.score++;
            this.scoreCount.innerText = this.score;
        }, 500)
    }

    increaseScore(amount) {
        this.score += amount;
        this.scoreCount.innerText = this.score;
    }

    increaseLives(amount) {
        this.lives += amount;
        this.livesCount.innerText = this.lives + " lives";
    }

    decreaseLife() {
        this.lives--;
        this.livesCount.innerText = this.lives + " lives";

        if (this.lives <= 0) {
            location.href = "gameover.html";
        }
    }

}

class Bullet {
    constructor(positionXBullet, positionYBullet) {
        this.width = 1;
        this.height = 2;
        this.positionX = positionXBullet;
        this.positionY = positionYBullet;

        this.showBullet();
    }

    showBullet() {
        this.bulletElm = document.createElement("div");
        this.bulletElm.className = "bullet";
        this.bulletElm.style.width = this.width + "vw";
        this.bulletElm.style.height = this.height + "vh";
        this.bulletElm.style.left = this.positionX + "vw";
        this.bulletElm.style.bottom = this.positionY + "vh";

        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.bulletElm);
    }

    moveUp() {
        this.positionY += 2.5;
        this.bulletElm.style.bottom = this.positionY + "vh";
    }
}

class Player {
    constructor() {
        this.width = 5;
        this.height = 15;
        this.positionX = 26 - (this.width / 2);
        this.positionY = 0;


        this.playerElm = document.getElementById("player");

        this.playerElm.style.backgroundSize = "cover";

        this.updateUI();
    }
    updateUI() {
        this.playerElm.style.width = this.width + "vw";
        this.playerElm.style.height = this.height + "vh";
        this.playerElm.style.left = this.positionX + "vw";
        this.playerElm.style.bottom = this.positionY + "vh";
    }
    moveLeft() {
        if (this.positionX > 0) {
            this.positionX -= 3;
            this.updateUI();
        }
    }
    moveRight() {
        if (this.positionX < 51 - this.width) {
            this.positionX += 3;
            this.updateUI();
        }
    }
    moveUp() {
        if (this.positionY < 100 - this.height) {
            this.positionY += 3;
            this.updateUI();
        }
    }
    moveDown() {
        if (this.positionY > 0) {
            this.positionY -= 3;
            this.updateUI();
        }
    }

}

class Obstacle {
    constructor(speed) {
        this.width = 5;
        this.height = 10;
        this.speed = speed
        this.positionX = Math.floor(Math.random() * (50 - this.width + 1)); // random number between 0 and (100 - width)        
        this.positionY = 100;

        // creating differents types of bonus
        const bonusTypes = ["scoreMult", "extraLife", "normal"]

        // get a random bonus
        this.bonusType = bonusTypes[Math.floor(Math.random() * bonusTypes.length)];

        this.createDomElement();
    }
    createDomElement() {
        // step1: create the element:
        this.obstacleElm = document.createElement("div");

        // step2: add content or modify
        this.obstacleElm.className = "obstacle";
        this.obstacleElm.style.width = this.width + "vw";
        this.obstacleElm.style.height = this.height + "vh";
        this.obstacleElm.style.left = this.positionX + "vw";
        this.obstacleElm.style.bottom = this.positionY + "vh";

        // Check if it is a bonus

        if (this.bonusType === "scoreMult") {
            this.obstacleElm.style.backgroundImage = "url('../images/coin.png')";
            this.obstacleElm.style.backgroundSize = "cover";
            this.obstacleElm.style.height = "11vh";
        } else if (this.bonusType === "extraLife") {
            this.obstacleElm.style.backgroundImage = "url('../images/oneUp.png')";
            this.obstacleElm.style.backgroundSize = "cover";
        } else if (this.bonusType === "normal") {
            this.obstacleElm.style.backgroundImage = "url('../images/enemy.gif')";
            this.obstacleElm.style.backgroundSize = "cover";
            this.obstacleElm.style.height = "13vh";
        }

        //step3: append to the dom: `parentElm.appendChild()`
        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.obstacleElm);
    }
    moveDown() {
        this.positionY -= this.speed;
        this.obstacleElm.style.bottom = this.positionY + "vh";
    }
}

const player = new Player();

const game = new Game();

const bulletsArr = [];

const obstaclesArr = [];

let speedObs = 50;

let frame = 0

let currentSpeed = 1

let speedCreatingObs = 800;


// // Increase speed of obstacles by 5 every 10 seconds
// setInterval(() => {
//     speedObs = Math.max(1, speedObs - 10); // the speed doesn't go below 5 
//     console.log("Speed is: " + speedObs)
// }, 5000);


// // Increase the rating of create obstacles 
// setInterval(() => {
//     speedCreatingObs = Math.max(300, speedCreatingObs - 50); // the speed doesn't go below 5 
//     console.log("creation speed is: " + speedCreatingObs)
// }, 2500);

// create obstacles

setInterval(() => {
    const newObstacle = new Obstacle(currentSpeed);
    obstaclesArr.push(newObstacle);
    
}, speedCreatingObs);

// update obstacles
setInterval(() => {

    obstaclesArr.forEach((obstacleInstance, i) => {
        
        frame += 1
        if (frame % 200 === 0) {
            currentSpeed += 0.1
        }

        obstacleInstance.moveDown();

        if (
            player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            player.positionX + player.width > obstacleInstance.positionX &&
            player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            player.positionY + player.height > obstacleInstance.positionY
        ) {

            if (obstacleInstance.bonusType === "scoreMult") {
                game.increaseLives(1);
                game.increaseScore(100);  // Add 100 points
            } else if (obstacleInstance.bonusType === "extraLife") {
                game.increaseLives(2);  // Add extra life
            }


            //If there is a collision, decrease 1 life
            game.decreaseLife();

            // Remove obstacle on collision
            obstaclesArr.splice(i, 1);
            obstacleInstance.obstacleElm.remove();
        }

        bulletsArr.forEach((bullet, bulletIndex) => {
            if (
                bullet.positionX < obstacleInstance.positionX + obstacleInstance.width &&
                bullet.positionX + bullet.width > obstacleInstance.positionX &&
                bullet.positionY < obstacleInstance.positionY + obstacleInstance.height &&
                bullet.positionY + bullet.height > obstacleInstance.positionY
            ) {
                // Remove obstacle and bullet on collision
                obstaclesArr.splice(i, 1);
                bulletsArr.splice(bulletIndex, 1);

                obstacleInstance.obstacleElm.remove();
                bullet.bulletElm.remove();
            }
        });
    });
}, speedObs);

document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
        player.moveLeft();
    } else if (event.code === "ArrowRight") {
        player.moveRight();
    } else if (event.code === "ArrowUp") {
        player.moveUp();
    } else if (event.code === "ArrowDown") {
        player.moveDown();
    } else if (event.code === "Space") {

        const bullet = new Bullet(player.positionX + player.width / 2 - 0.5, player.positionY + player.height);
        bulletsArr.push(bullet);

        const moveBullets = setInterval(() => {
            bulletsArr.forEach((bullet) => {
                bullet.moveUp();
            });
        }, 100);
    }
});


