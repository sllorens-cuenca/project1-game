class Game {
    constructor() {

        this.score = 0;
        this.lives = 3;

        // this.scoreCount = document.createElement("div");
        // this.scoreCount.id = "score";
        // this.board.appendChild(this.scoreCount);
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

    decreaseLife() {
        this.lives--;
        this.livesCount.innerText = this.lives + " lives";

        if (this.lives <= 0) {
            location.href = "gameover.html";
        }
    }

    updateScore() {
        setInterval(() => {
            this.score++;
            this.scoreCount.innerText = this.score;
        }, 600)
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
        this.height = 10;
        this.positionX = 26 - (this.width / 2);
        this.positionY = 0;


        this.playerElm = document.getElementById("player");
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
    constructor() {
        this.width = 5;
        this.height = 10;
        this.positionX = Math.floor(Math.random() * (50 - this.width + 1)); // random number between 0 and (100 - width)        
        this.positionY = 100;

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

        //step3: append to the dom: `parentElm.appendChild()`
        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.obstacleElm);
    }
    moveDown() {
        this.positionY--;
        this.obstacleElm.style.bottom = this.positionY + "vh";
    }
}
const player = new Player();

const game = new Game();

const bulletsArr = [];

const obstaclesArr = [];


// create obstacles
setInterval(() => {
    const newObstacle = new Obstacle();
    obstaclesArr.push(newObstacle);
}, 3000);

// update obstacles
setInterval(() => {
    obstaclesArr.forEach((obstacleInstance, i) => {

        obstacleInstance.moveDown();

        if (
            player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            player.positionX + player.width > obstacleInstance.positionX &&
            player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            player.positionY + player.height > obstacleInstance.positionY
        ) {
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
}, 30);

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
            bulletsArr.forEach((bullet, index) => {
                bullet.moveUp();
            });
        }, 100);
    }
});


