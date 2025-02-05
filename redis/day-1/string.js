const client = require("./client");

async function init() {
    const result = await client.get("greeting:1");
    console.log(result);
    
}

init();