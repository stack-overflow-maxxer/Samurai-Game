export class Player {
    constructor(game) {
        this.game = game;
        this.width = 200;
        this.height = 200;
        this.x = 40;
        this.y = this.game.canvas.height - this.height+35;

        this.idleImage = document.getElementById('player');
        this.runningImage = document.getElementById('playerRunning');
        this.attackImage = document.getElementById('playerAttack');
        this.currentImage = this.idleImage; // Start with idle image
        this.flipX = false; 

        this.speed = 0;
        this.maxSpeed = 15;

        this.spriteWidth = 96;
        this.spriteHeight = 96;

        this.frameX = 0; 
        this.maxFrame = 9;
        this.fps = 60;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps; // Time between frames in ms
    }
    update(keys) { 
        this.x += this.speed;
        if(keys.includes('d')) {
            this.speed = this.maxSpeed;
            this.currentImage = this.runningImage;
            this.maxFrame = 15;
            this.flipX = false;
        } else if(keys.includes('a')) {
            this.currentImage = this.runningImage;
            this.speed = -this.maxSpeed;
            this.flipX = true;
            this.maxFrame = 15;
        } else if(keys.includes('e')) {
            this.currentImage = this.attackImage;
            this.speed = 0;
            this.maxFrame = 6;
            this.flipX = false;
        } else { 
            if(this.game.input.lastKey === 'a') { this.flipX = true; }
            this.currentImage = this.idleImage;
            this.speed = 0;
            this.maxFrame = 9;
            this.flipX = false;
        }
        if(this.x < 0) {
            this.x = 0;
        }
        if(this.x > this.game.width - this.width) {
            this.x = this.game.width - this.width;
        }

           
        if(this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        } else {
            this.frameTimer += 16; 
        }
        
    }
    draw(context) {
        context.save();
        if (this.flipX) {
            context.scale(-1, 1);
            context.drawImage(
                this.currentImage, 
                this.frameX * this.spriteWidth, 
                0, 
                this.spriteWidth, 
                this.spriteHeight, 
                -(this.x + this.width), 
                this.y, 
                this.width, 
                this.height
            );
        } else {
            context.drawImage(
                this.currentImage, 
                this.frameX * this.spriteWidth, 
                0, 
                this.spriteWidth, 
                this.spriteHeight, 
                this.x, 
                this.y, 
                this.width, 
                this.height
            );
        }
        context.restore();
    }
}