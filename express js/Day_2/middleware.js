import express from "express";


const app = express();


//global middleware
// function sayHiMiddleware(req, res, next) {
//     console.log("hi i am global middleware");
//     next();
// }
// app.use(sayHiMiddleware);

//specific route middleware
function sayHiMiddleware(req, res, next) {
    console.log("hi i am global middleware");
    next();
}

//or global routre
app.get('/', (req, res) => {
    res.send("HEllo world")
})

//for specific roue
app.get('/home',sayHiMiddleware, (req, res) => {
    res.send("HEllo world")
})
app.get('/users', (req, res) => {
    res.send("users page")
})
app.listen(8080, () => {
    console.log("Server is running on port 3000");

})