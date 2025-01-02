import express from "express";
import  {data}  from "./data/data.js";
const PORT=8080;
const app = express();

app.use(express.json())

// get request
app.get('/',(req,res)=>{
    res.status(200).send("Hello express")
})

//industry standart
app.get('/api/users',(req,res)=>{
    res.status(200).send(data)
})

app.get('/api/v1/users',(req,res)=>{
    const {name} = req.query;

    if (name) {
      var user = data.filter((user)=>{
        return user.name === name;
      })  
    }
    res.status(200).send(user)
})


//route params
// app.get('/api/v1/users/:id',(req,res)=>{
//     const {id} = req.params;
//     const parseId = parseInt(id)
//     const user = data.find((user)=>user.id === parseId)
//     res.status(200).send(user)
// })


//POST request
app.post('/api/v1/users',(req,res)=>{
    const {name,displayname} = req.body
    const newUser = {
        id:data.length+1,
        name,
        displayname
    }
    data.push(newUser)
    res.status(201).send(
        {
            message:"data created",
            data:newUser
        }
    )
})


//PUT request
//for update all feild
app.put("/api/v1/users/:id",(req,res)=>{
    const {body ,params:{id}} = req
    const parseId = parseInt(id);
    const userIndex = data.findIndex((user)=>user.id === parseId);
    
    if (userIndex === -1) {
        res.status(400).send("user not found")
    }
    data[userIndex] = {
        id:parseId,
        ...body
    }
    res.status(200).send({
        message:"User Updated",
        data:data
    })
})
// for upadate any feild
app.patch('/api/v1/users/:id',(req,res)=>{
    const {body ,params:{id}} = req
    const parseId = parseInt(id);
    const userIndex = data.findIndex((user)=>user.id === parseId);
    
    if (userIndex === -1) {
        res.status(400).send("user not found")
    }
    data[userIndex] = {
        id:parseId,
        ...body
    }
    res.status(200).send({
        message:"User Updated",
        data:data
    })
})

// assignment delete ,filter,
app.delete('/api/v1/users/:id',(req,res)=>{
    const {body ,params:{id}} = req
    const parseId = parseInt(id);
    const index = data.findIndex(item => item.id === parseId);

    if (index !== -1) {
        data.splice(index,1);
        res.status(200).json({message:"item deleted successfully",data});
    } else {
        res.status(404).json({message:"item not found"})
    }
})

//delete

app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`);
    
})