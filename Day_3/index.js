const EventEmitter = require("events");
const fs = require("fs")
const userEmmiter = new EventEmitter();


const eventCount = {
    login:0,
    logOut:0,
    purchase:0,
    profileUpdate:0
}

const logFile = "eventLog.json"

if (fs.existsSync(logFile)) {
    const data = fs.readFileSync(logFile,"utf-8");
    Object.assign(eventCount,JSON.parse(data))
}

function saveCount() {
    fs.writeFileSync(logFile,JSON.stringify(eventCount,null,2))
}
//Login Event
userEmmiter.on("LOGIN",(userName)=>{
    eventCount.login++
    saveCount()
    console.log(`${userName} logged in successfully✅`);
})


//Logout event
userEmmiter.on("LOGOUT",(userName)=>{
    eventCount.logOut++;
    saveCount()
    console.log(`${userName} logout successfully✅`);
})


//purchase event
userEmmiter.on("PURCHASE",(userName,item)=>{
    eventCount.purchase++;
    saveCount()
    console.log(`${userName} purchased ${item}`);
})


userEmmiter.on("PROFILE_UPDATE",(userName,field)=>{
    eventCount.profileUpdate++;
    saveCount()
    console.log(`${userName} updagted ${field} field`);
})


userEmmiter.on("summury",()=>{
    console.log("\n Event summary");
    console.log(`Logins: ${eventCount.login}`);
    console.log(`LOGOUT: ${eventCount.logOut}`);
    console.log(`PURCHASE: ${eventCount.purchase}`);
    console.log(`PROFILE_UPDATE: ${eventCount.profileUpdate}`);
    
})





// emits event with diff arguments


userEmmiter.emit("LOGIN",'Dipesh')
userEmmiter.emit("LOGOUT",'Dipesh')
userEmmiter.emit("PURCHASE",'Dipesh','IPHONE 16')
userEmmiter.emit("PROFILE_UPDATE",'Dipesh','Email Address')
userEmmiter.emit("summury")