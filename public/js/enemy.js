import HeathBar from './heathBar.js';

class Enemy {       
    constructor() {
        this.frameX = 0;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.death = false;
    }
    update(deltaTime) {
        this.x += this.maxSpeed;
        if(this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        } else { 
            this.frameTimer += deltaTime;
        }
    }
    draw(context) { 
        context.drawImage(
            this.currentImage, 
            this.frameX * this.spriteWidth, 
            0 , 
            this.spriteWidth, 
            this.spriteHeight, 
            this.x, 
            this.y, 
            this.width, 
            this.height);
    }
}

export class Skeleton extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        
        // Display size (for rendering)
        this.width = 240;
        this.height = 150;
        
        // Hitbox size (for collision detection)
        this.hitboxWidth = 60;
        this.hitboxHeight = 120;
        this.hitboxOffsetX = 80; // Offset to center hitbox within sprite
        this.hitboxOffsetY = 30;

        this.spriteWidth = 96;
        this.spriteHeight = 64;
        this.idle = document.getElementById('skeletonIdle');
        this.walk = document.getElementById('skeletonWalk');
        this.attack = document.getElementById('skeletonAttack');
        this.death = document.getElementById('skeletonDeath');
        this.hurt = document.getElementById('skeletonHurt');
        this.currentImage = this.walk;

        this.speed = 0;
        this.maxSpeed = 1;

        this.hitboxX = 300;
        this.hitboxY = this.game.canvas.height - 25 - this.hitboxHeight; 
        
        this.health = 50;
        this.healthBar = new HeathBar(this.hitboxX, this.hitboxY - 20, this.hitboxWidth, 7, 100, this.health,'enemy');

        this.maxFrame = 9
    }
    

    get x() {
        return this.hitboxX - this.hitboxOffsetX;
    }
    
    set x(value) {
        this.hitboxX = value + this.hitboxOffsetX;
    }
    
    get y() {
        return this.hitboxY - this.hitboxOffsetY;
    }
    
    set y(value) {
        this.hitboxY = value + this.hitboxOffsetY;
    }   
    
    update(deltaTime) {
        // Handle animation frame updates (from parent class)
        if(this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        } else { 
            this.frameTimer += deltaTime;
        }
        
        // Custom movement towards player (override parent's movement)
        if (this.maxSpeed > 0 && this.game.player) {
            if (this.game.player.hitboxX > this.hitboxX) {
                this.hitboxX += this.maxSpeed;
            } else {
                this.hitboxX -= this.maxSpeed;
            }
        }
        
        this.healthBar.update(this.health, this.hitboxX, this.hitboxY - 20, this.hitboxWidth, 7, 100, this.health, 'enemy');
    }
    
 
    getHitbox() {
        return {
            x: this.hitboxX,
            y: this.hitboxY,
            width: this.hitboxWidth,
            height: this.hitboxHeight
        };
    }
    
    

    draw(context) {
        super.draw(context);
        this.healthBar.draw(context);
        
        if (this.game.debug) {
            // Draw hitbox in red
            context.strokeStyle = 'red';
            context.lineWidth = 2;
            context.strokeRect(this.hitboxX, this.hitboxY, this.hitboxWidth, this.hitboxHeight);

            // Draw sprite bounds in blue
            context.strokeStyle = 'blue';
            context.lineWidth = 2;
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}

