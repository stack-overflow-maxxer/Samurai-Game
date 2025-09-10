import { Idle, Running, Jump, Attack } from './playerStates.js';
import HeathBar from './heathBar.js';

export class Player {
    constructor(game) {
        this.game = game;
        // Display size (for rendering)
        this.width = 380;
        this.height = 300;
        
        // Hitbox size (for collision detection)
        this.hitboxWidth = 75;
        this.hitboxHeight = 140;
        this.hitboxOffsetX = 150; // Offset to center hitbox within sprite
        this.hitboxOffsetY = 140;

        this.idleImage = document.getElementById('player');
        this.runningImage = document.getElementById('playerRunning');
        this.attackImage = document.getElementById('playerAttack');
        this.jumpImage = document.getElementById('playerJump');

        this.currentImage = this.idleImage; 
        this.flipX = false; 

        this.speed = 0;
        this.maxSpeed = 12;

        this.spriteWidth = 106;
        this.spriteHeight = 84;

        // Hitbox position as the main reference
        this.hitboxX = 40;
        this.hitboxY = this.game.canvas.height - 25 - this.hitboxHeight;
        
        this.vy = 0;
        this.weight = 1;

        this.frameX = 0; 
        this.maxFrame = 13;
        this.fps = 120;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps; 

        this.states = [new Idle(this), new Running(this), new Jump(this), new Attack(this)]; 
        this.currentState = this.states[0];
        this.currentState.enter();
        
        this.currentHealth = 100;
        this.maxHealth = 100;
        this.heathBar = new HeathBar(this.hitboxX, this.hitboxY, this.hitboxWidth, 7, this.maxHealth, this.currentHealth);

        this.attack1 = false;
        this.damage = 1;
    }
    
    update(input) { 
        this.checkCollision();
        this.currentState.handleInput(input);

        this.hitboxX += this.speed;
        
        // Boundary checking for hitbox
        if(this.hitboxX < 0) {
            this.hitboxX = 0;
        }
        if(this.hitboxX + this.hitboxWidth > this.game.width) {
            this.hitboxX = this.game.width - this.hitboxWidth;
        }

        // Update health bar position
        this.heathBar.update(this.currentHealth, this.hitboxX, this.hitboxY-10);

        // Vertical movement
        this.hitboxY += this.vy;
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
        this.heathBar.draw(context);
        
        if (this.game.debug) {
            // Draw the hitbox (red)
            context.strokeStyle = 'red';
            context.strokeRect(
                this.hitboxX, 
                this.hitboxY, 
                this.hitboxWidth, 
                this.hitboxHeight
            );
            
            // Draw the rendering bounds (blue)
            context.strokeStyle = 'blue';
            context.strokeRect(
                this.hitboxX - this.hitboxOffsetX, 
                this.hitboxY - this.hitboxOffsetY, 
                this.width, 
                this.height
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
                -(this.hitboxX - this.hitboxOffsetX + this.width), 
                this.hitboxY - this.hitboxOffsetY, 
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
                this.hitboxX - this.hitboxOffsetX, 
                this.hitboxY - this.hitboxOffsetY, 
                this.width, 
                this.height
            );
        }
        context.restore();
    }
    onGround() {  
        return this.hitboxY + this.hitboxHeight >= this.game.canvas.height - 25;
    }
    
    setState(state) { 
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    checkCollision() {
        this.game.enemies.forEach(enemy => {
            // Calculate extended hitbox for attacks
            let effectiveHitboxX = this.hitboxX;
            let effectiveHitboxWidth = this.hitboxWidth;
            
            if (this.attack1) { 
                if (this.flipX) { 
                    // Attacking left: extend hitbox to the left
                    effectiveHitboxX = this.hitboxX - 100;
                    effectiveHitboxWidth = this.hitboxWidth + 100;
                } else { 
                    // Attacking right: extend hitbox to the right
                    effectiveHitboxWidth = this.hitboxWidth + 100;
                }
            }
            
            // Use the effective hitbox for collision detection
            if (enemy.hitboxX < effectiveHitboxX + effectiveHitboxWidth && 
                enemy.hitboxX + enemy.hitboxWidth > effectiveHitboxX && 
                enemy.hitboxY < this.hitboxY + this.hitboxHeight && 
                enemy.hitboxY + enemy.hitboxHeight > this.hitboxY) {
                if (this.attack1) { 
                    enemy.health -= this.damage;
                    if (enemy.health <= 0) { 
                        enemy.death = true;
                    }
                }
            } 
            
            
         })
    }
}