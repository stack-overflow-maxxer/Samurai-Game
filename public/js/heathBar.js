class HeathBar {
    constructor(x, y, width, height, maxHealth, currentHealth,type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.maxHealth = maxHealth;
        this.currentHealth = currentHealth;
        this.borderColor = 'black';
        this.borderWidth = 2;
        this.type = type;

    }
    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = this.borderColor;
        ctx.lineWidth = this.borderWidth;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        if (this.type == 'enemy') {
            ctx.fillStyle = 'red';
        } else {
            ctx.fillStyle = 'green';
        }
        ctx.fillRect(this.x, this.y, this.width * (this.currentHealth / this.maxHealth), this.height);
    }
    update(currentHealth,posx,posy) {
        if (this.type == 'enemy') {
            this.currentHealth = currentHealth;
        } else {
            this.currentHealth = currentHealth;
        }
        this.currentHealth = currentHealth;
        this.x = posx;
        this.y = posy;
    }
}

export default HeathBar;    