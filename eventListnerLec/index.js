const EventListner = require('node:events');

const eventListner = new EventListner();

eventListner.on("greet",(name)=>{
    console.log(`Greeting ${name}`);
})

eventListner.emit('greet',"Gaurav Kumar");