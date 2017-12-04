"use strict";

class Renderer {
    constructor(element) {
        this.element = element;
        this.setup();
    }

    setup() {
        let box = document.createElement("div");
        box.style.position = "absolute";
        box.style.top = "20px";
        box.style.left = "20px";
        box.style.backgroundColor = "red";
        box.style.width = "20px";
        box.style.height = "20px";

        this.element.appendChild(box);
        this.box = box;
    }
    render(position) {
        this.box.style.top = position + "px";
    }
}

class Box {
    constructor(){
        this.position = 0;
        // Negativer speed: Nach oben
        // Positiver speed: Nach unten
        this.speed = 0;
    }
    runLoop(){
        this.speed++;
        this.position = this.position + this.speed;
    }
    moveUp() {
        this.speed = - 20;
    }
}

class Game {
    constructor(element){
        this.renderer = new Renderer(element);
        this.box = new Box();
        this.element = element;
        this.isRunning = true;
        this.setup();
    }
    setup() {
        this.element.addEventListener("click",() => {
            this.box.moveUp();
        },false);
    }
    start() {
        let counter = 0; // Counter = Highscore
        let timer = setInterval(() => {
            counter++;
            this.box.runLoop();
            if(this.box.position < 0) {
                this.isRunning = false;
                clearInterval(timer);
                alert("Oberer Rand erreicht: Gameover! " + counter + " Punkte");
            } 
            if(this.box.position + 20 > this.element.clientHeight){
                this.isRunning = false;
                clearInterval(timer);
                alert("Unterer Rand erreicht: Gameover! " + counter + " Punkte");
            }
            if(this.isRunning == true){
                this.renderer.render(this.box.position);
            }
        }, 40);
    }
}

let game = new Game(document.getElementById("game"));
game.start();
