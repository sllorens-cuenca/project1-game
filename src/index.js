class Player {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.positionX = 50 - (this.width / 2);
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
            this.positionX -= 2;
            this.updateUI();
        }
    }
    moveRight() {
        if (this.positionX < 100 - this.width) {
            this.positionX += 2;
            this.updateUI();
        }
    }
    moveUp() {
        if (this.positionY < 100 - this.height) {
            this.positionY += 2;
            this.updateUI();
        }
    }
    moveDown() {
        if (this.positionY > 0) {
            this.positionY -= 2;
            this.updateUI();
        }
    }
}

const player = new Player();

document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
        player.moveLeft();
    } else if (event.code === "ArrowRight") {
        player.moveRight();
    } else if (event.code === "ArrowUp") {
        player.moveUp();
    } else if (event.code === "ArrowDown") {
        player.moveDown();
    }
});
