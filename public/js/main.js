import { Player } from './player.js';
import { InputHandler } from './input.js';

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    class Game { 
        constructor(canvas, canvasWidth, canvasHeight) {
            this.canvas = canvas;
            this.ctx = ctx;
            this.canvas.width = canvasWidth;
            this.canvas.height = canvasHeight;
            this.player = new Player(this);
            this.input = new InputHandler();
        }
        update() {
            this.player.update(this.input.keys);
        }
           
        draw() {
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

