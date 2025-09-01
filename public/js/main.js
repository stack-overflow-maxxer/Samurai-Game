import { Player } from './player.js';
import { InputHandler } from './input.js';
import { World } from './world.js';
import { Skeleton } from './enemy.js';

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Game { 
        constructor(canvas, canvasWidth, canvasHeight) {
            this.canvas = canvas;
            this.ctx = ctx;
            this.canvas.width = canvasWidth;
            this.canvas.height = canvasHeight;
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.debug = true;
            this.world = new World(this);
            this.lastTime = 0;

            this.enemies = []
            this.enemyTimer = 0;
            this.enemyInterval = 2000;
        }
        update(timeStamp) {
            const deltaTime = timeStamp - this.lastTime;
            this.lastTime = timeStamp;
            this.player.update(this.input);
            this.world.update(deltaTime);
            this.enemyTimer += deltaTime;
            if(this.enemyTimer > this.enemyInterval) {
                this.enemyTimer = 0;
                if (this.enemies.length < 1) {
                    this.addEnemy();
                }
            } else { 
                this.enemyTimer += deltaTime
            }
            this.enemies.forEach(enemy => {enemy.update(deltaTime); 
                if (enemy.death === true) {
                    this.enemies.splice(this.enemies.indexOf(enemy), 1);
                }
            });
        }
           
        draw() {
            this.world.draw(this.ctx);  
            this.player.draw(this.ctx); 
            this.enemies.forEach(enemy => enemy.draw(this.ctx));
        }
        addEnemy() {
            this.enemies.push(new Skeleton(this));
            console.log(this.enemies);
        }
    }

    const game = new Game(canvas, canvas.width, canvas.height);
    console.log(game);

    function animate(timeStamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(timeStamp);
        game.draw();
        requestAnimationFrame(animate);
    }
    animate(0);
});

