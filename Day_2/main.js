setTimeout(() => {
    console.log('Hello i am from global');
    
}, 1000);


let count = 0
const interval = setInterval(() => {
    console.log(`Interval count:${count++}`);
    
    if (count == 4) {
        clearInterval(interval)
    }
}, 1000);

// console.log(Object.getOwnPropertyNames(global));
