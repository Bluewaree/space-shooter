export class Keyboard {
    constructor(){
        this.pressed = {};
        this.held;
    }

    watch(){
        document.addEventListener('keydown', (e) => {
            let key = e.key;
            if(e.keyCode==32){
                key = e.keyCode;
                if(this.held)
                    return;                
            }
            this.pressed[key] = true;
        })
        document.addEventListener('keyup', (e) => {
            let key = e.key;
            if(e.keyCode==32){
                key = e.keyCode;
                this.held = false;
            }
            this.pressed[key] = false;
        })
    }
}