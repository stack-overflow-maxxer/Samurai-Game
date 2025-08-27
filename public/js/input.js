export class InputHandler {
    constructor() {
        this.keys = [];
        this.lastKey = '';
        window.addEventListener('keydown', (e) => {
            if((e.key === 'd' || e.key === 'a' || e.key === 'e') && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
              
            }
        });
        
        window.addEventListener('keyup', (e) => {
            if((e.key === 'd' || e.key === 'a' || e.key === 'e') && this.keys.indexOf(e.key) > -1) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
                this.lastKey = e.key;
            }
        });
    }
}