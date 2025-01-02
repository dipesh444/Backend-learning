const EventEmitter = require("events");

const emmiter = new EventEmitter();


// on(eventName,Listener)  ----- create event

emmiter.on("GREET",(args)=>{
    console.log(`Hello ${args.name} and id is ${args.id}`);
})

// emit(eventName, [args]) ----- execute event

emmiter.emit("GREET",{
    name:'dipesh',
    id:'qwerty'
})