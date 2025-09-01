import { State } from './playerStates.js';

export class EnemyState { 
    constructor(enemy) { 
        this.enemy = enemy;
    }
}
export class EnemyIdle extends EnemyState { 
    constructor(enemy) { 
        super(enemy);
    }
}
export class EnemyRunning extends EnemyState { 
    constructor(enemy) { 
        super(enemy);
    }
}
export class EnemyJumping extends EnemyState { 
    constructor(enemy) { 
        super(enemy);
    }
}
export class EnemyAttacking extends EnemyState { 
    constructor(enemy) { 
        super(enemy);
    }
}
export class EnemyDying extends EnemyState { 
    constructor(enemy) { 
        super(enemy);
    }
}       
    
