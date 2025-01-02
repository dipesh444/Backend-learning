// const fs = require("fs");

// setImmediate(() => {
//     console.log("hello from setImmediate");
    
// }, 0);

// setTimeout(() => {
//     console.log("hello from setTimeout");

// }, 0);

process.env.UV_THREADPOOL_SIZE = 5;
let start =Date.now()
const crypto = require("crypto");


crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512",()=>{
    console.log(`${Date.now()-start}ms done`);
    
})

crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512",()=>{
    console.log(`${Date.now()-start}ms done`);
    
})

crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512",()=>{
    console.log(`${Date.now()-start}ms done`);
    
})

crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512",()=>{
    console.log(`${Date.now()-start}ms done`);
    
})
crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512",()=>{
    console.log(`${Date.now()-start}ms done`);
    
})

