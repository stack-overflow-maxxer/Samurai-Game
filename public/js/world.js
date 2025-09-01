class World { 
    constructor(game) { 
        this.game = game;
        this.sky = document.getElementById('sky');
        this.ground = document.getElementById('ground');
        this.myGrass = document.getElementById('myGrass');
        this.grassFrame = 0;
        this.grassWidth = 35;
        this.groundHeight = 100;
        this.maxFrame = 5;
        this.fps = 2; // Slower animation for grass swaying effect
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps; 
    }
    update(deltaTime) {
        this.frameTimer += deltaTime;
        if(this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if(this.grassFrame < this.maxFrame) {
                this.grassFrame++;
            } else {
                this.grassFrame = 0;
            }
        }
    }
    
    draw(context) {
      
        context.drawImage(this.sky, 0, -50, this.game.canvas.width, this.game.canvas.height);
        
  
        context.drawImage(this.ground, 0, this.game.canvas.height - 50, this.game.canvas.width, 100);
        
 
        for(let i = 0; i < this.game.canvas.width; i += this.grassWidth-2) {
            context.drawImage(
                this.myGrass, 
                this.grassFrame * this.grassWidth,
                0, 
                this.grassWidth, 
                this.grassWidth, 
                i,
                this.game.canvas.height - 70,
                this.grassWidth, 
                this.grassWidth
            );
        }
    }
}

export { World };