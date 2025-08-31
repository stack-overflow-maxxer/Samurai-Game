import { Player } from './player.js';
import { InputHandler } from './input.js';
import { World } from './world.js';

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
            this.debug = false;
            this.world = new World(this);
        }
        update() {
            this.player.update(this.input);
        }
           
        draw() {
            this.world.draw(this.ctx);  
            this.player.draw(this.ctx); 
        }
    }

    const game = new Game(canvas, canvas.width, canvas.height);
    console.log(game);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw();
        requestAnimationFrame(animate);
    }
    animate();
});

