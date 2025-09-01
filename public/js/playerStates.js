const playerStates = {
    IDLE: 0,
    RUNNING: 1,
    JUMP: 2,
    ATTACK: 3,
}

class State { 
    constructor(state) { 
         this.state = state;
    } 
}

export class Idle extends State { 
    constructor(player) { 
        super('idle');
        this.player = player;
    }
    enter() { 
       
        this.player.currentImage = this.player.idleImage;
        this.player.maxFrame = 13;
        this.player.speed = 0;
        this.player.frameX = 0;
    }
    handleInput(input) { 
        if(input.keys.includes('d')) { 
            this.player.setState(playerStates.RUNNING);
        } else if(input.keys.includes('a')) { 
            this.player.flipX = true;
            this.player.setState(playerStates.RUNNING);
        } else if(input.keys.includes(' ') && this.player.onGround()) { 
            this.player.setState(playerStates.JUMP);
        } else if(input.keys.includes('e')) { 
            this.player.setState(playerStates.ATTACK);
        }

    }
}

export class Running extends State { 
    constructor(player) { 
        super('running');
        this.player = player;
    }
    enter() { 

        this.player.currentImage = this.player.runningImage;
        this.player.maxFrame = 7;
        this.player.frameX = 0;
        this.player.flipX = false;
    }
        handleInput(input) { 
        
      
        if(input.keys.includes(' ') && this.player.onGround()) { 
            this.player.setState(playerStates.JUMP);
            return; // Exit early since we're changing states
        }
        if (input.keys.includes('e')) {
            this.player.setState(playerStates.ATTACK);
            return;
        }

        if(input.keys.includes('d')) {
            this.player.speed = this.player.maxSpeed;
            this.player.flipX = false;
        } else if(input.keys.includes('a')) {
            this.player.speed = -this.player.maxSpeed;
            this.player.flipX = true;
        } else {
            // No movement keys pressed, go back to idle
            this.player.setState(playerStates.IDLE);
            if (input.lastKey == 'a') {
                this.player.flipX = true;
            } else if(input.lastKey === 'd') {
                this.player.flipX = false;
            }
        }
    }
}



export class Jump extends State { 
    constructor(player) { 
        super('jump');
        this.player = player;
    }
    enter() { 
        this.player.currentImage = this.player.jumpImage;
        this.player.maxFrame = 2;
        this.player.frameX = 0;
        this.player.vy = -15; 
    }
    handleInput(input) { 
     
        if(input.keys.includes('d')) {
            this.player.speed = this.player.maxSpeed;
            this.player.flipX = false;
        } else if(input.keys.includes('a')) {
            this.player.speed = -this.player.maxSpeed;
            this.player.flipX = true;
        } else {
            this.player.speed = 0;
        }
        
        if(this.player.onGround() && this.player.vy >= 0) {
            if(input.keys.includes('d') || input.keys.includes('a')) { 
                this.player.setState(playerStates.RUNNING);
            } else if(input.keys.includes('e')) { 
                this.player.setState(playerStates.ATTACK);
            } else {
                this.player.setState(playerStates.IDLE);
            }
        }
    }
}

export class Attack extends State { 
    constructor(player) { 
        super('attack');
        this.player = player;
    }
    enter() { 
        this.player.currentImage = this.player.attackImage;
        this.player.maxFrame = 4; 
        this.player.frameX = 0;
        this.player.attack1 = true;
       
        if (this.player.flipX) {   
    
            this.player.speed = -0.5; 
        } else { 
           
            this.player.speed = 0.5; 
        }
    }
    handleInput(input) { 
        if(this.player.frameX >= this.player.maxFrame) {
            setTimeout(() => {
           this.player.attack1 = false;
            if(input.keys.includes('d') || input.keys.includes('a')) { 
                this.player.setState(playerStates.RUNNING);
            } else if(input.keys.includes(' ') && this.player.onGround()) { 
                this.player.setState(playerStates.JUMP);
            } else {
                if (this.player.flipX) {
                    this.player.flipX = true;
                } else {
                    this.player.flipX = false;
                }
                    this.player.setState(playerStates.IDLE);
                }
            }, 100);
        }
    }
}