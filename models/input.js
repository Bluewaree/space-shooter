export class Input {
    constructor(){
        this.pressed = {};
        this.held;
        this.start=false;
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

        document.addEventListener('click', (e) => {
            if (e.target.className=="start")
                this.start=true;
            
            if (e.target.className=="exit")
                window.location.href = "https://www.playngo.com/";
        })
    }
}