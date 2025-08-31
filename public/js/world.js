class World { 
    constructor(game) { 
        this.game = game;
        this.sky = document.getElementById('sky');
        this.ground = document.getElementById('ground');
    }
    draw(context) {
        // Draw sky as background covering the entire canvas
        context.drawImage(this.sky, 0, -50, this.game.canvas.width, this.game.canvas.height);
        context.drawImage(this.ground, 0, this.game.canvas.height - 50, this.game.canvas.width, 100);
    }
}

export { World };