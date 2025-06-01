const EventListner = require('node:events');

class CustomGreetListner extends EventListner{
    constructor(){
        super();
        this.greeting = "Hello"
    }
    greet(name){
        this.emit("greet",`${this.greeting} ${name} !`);
    }
}

const neListner = new CustomGreetListner();
neListner.on('greet',(name)=>{
    console.log(`${name}`);
})

neListner.greet("Gaurav Kumar")