export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.lastKey = '';
        window.addEventListener('keydown', (e) => {
            if((e.key === 'd' || e.key === 'a' || e.key === 'e' || e.key === ' ') && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            } else if(e.key === 'l') {
                console.log('debug');
                this.game.debug = !this.game.debug;
            }
        });
        
        window.addEventListener('keyup', (e) => {
            if((e.key === 'd' || e.key === 'a' || e.key === 'e' || e.key === ' ') && this.keys.indexOf(e.key) > -1) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
                this.lastKey = e.key;
            }
        });

    }
}