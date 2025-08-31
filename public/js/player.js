import { Idle, Running, Jump, Attack } from './playerStates.js';


export class Player {
    constructor(game) {
        this.game = game;
        // Display size (for rendering)
        this.width = 220;
        this.height = 180;
        
        // Hitbox size (for collision detection)
        this.hitboxWidth = 80;
        this.hitboxHeight = 140;
        this.hitboxOffsetX = 70; // Offset to center hitbox within sprite
        this.hitboxOffsetY = 40;
        



        this.idleImage = document.getElementById('player');
        this.runningImage = document.getElementById('playerRunning');
        this.attackImage = document.getElementById('playerAttack');
        this.jumpImage = document.getElementById('playerJump');

        this.currentImage = this.idleImage; 
        this.flipX = false; 

        this.speed = 0;
        this.maxSpeed = 8;

        this.spriteWidth = 106;
        this.spriteHeight = 84;


        this.x = 40;
        this.y = this.game.canvas.height - this.height-30;
        this.vy = 0;
        this.weight = 1;


        this.frameX = 0; 
        this.maxFrame = 13;
        this.fps = 60;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps; 

        this.states = [new Idle(this), new Running(this), new Jump(this), new Attack(this)]; 
        this.currentState = this.states[0];
        this.currentState.enter();
    }
    update(input) { 
        this.currentState.handleInput(input);
        
        this.x += this.speed;

        if(this.x + this.hitboxOffsetX < 0) {
            this.x = -this.hitboxOffsetX;
        }
        if(this.x + this.hitboxOffsetX + this.hitboxWidth > this.game.width) {
            this.x = this.game.width - this.hitboxWidth - this.hitboxOffsetX;
        }

       
        this.y += this.vy;
        if(!this.onGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
        }

        if(this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        } else {
            this.frameTimer += 8; 
        }
        
    }
    draw(context) {
        context.save();
        if (this.game.debug) {
            // Draw the actual hitbox
            context.strokeStyle = 'red';
            context.strokeRect(
                this.x + this.hitboxOffsetX, 
                this.y + this.hitboxOffsetY, 
                this.hitboxWidth, 
                this.hitboxHeight
            );
            
    
        }
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
    onGround() { 
        return this.y + this.hitboxOffsetY + this.hitboxHeight >= this.game.canvas.height-30;
    }
    setState(state) { 
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}