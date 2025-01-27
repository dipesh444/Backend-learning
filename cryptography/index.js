import express from "express";
import crypto from "crypto";
import fs from "fs";
import path from "path"
import { fileURLToPath } from 'url';
const PORT= 8080;
const app = express();
app.use(express.json())

// Get the current file's path
const __filename = fileURLToPath(import.meta.url);

// Get the current directory's path
const __dirname = path.dirname(__filename);

// Directory for storing keys
const keysDir = path.join(__dirname, 'keys');

// Create the keys folder if it doesn't exist
if (!fs.existsSync(keysDir)) {
  fs.mkdirSync(keysDir, { recursive: true }); // Create the directory recursively
}

  // Define file paths
  const publicKeyPath = path.join(keysDir, 'public_key.pem');
  const privateKeyPath = path.join(keysDir, 'private_key.pem');

//genrate ras key pair

const generateKeys = ()=>{
    const {publicKey, privateKey} = crypto.generateKeyPairSync("rsa",{
        modulusLength:2048,
        publicKeyEncoding:{
            type:"pkcs1",
            format:"pem"
        },
        privateKeyEncoding:{
            type:"pkcs1",
            format:"pem"
        }
    })

    return {publicKey , privateKey}
}

const encrypt = (publicKey, message)=>{
    const encrypted = crypto.publicEncrypt(publicKey,Buffer.from(message));
    return encrypted.toString("base64");
}

const decrypt = (privateKey, encryptedMessage)=>{
    const decrypted = crypto.privateDecrypt(privateKey,Buffer.from(encryptedMessage,"base64"));
    return decrypted.toString("utf8");
}
const keys = generateKeys();

const publicKey = keys.publicKey;
const privateKey = keys.privateKey;
app.get('/',(req,res)=>{
    res.send("Hello world");
})

app.post('/encrypt',(req,res)=>{
    const {message} = req.body;
    const encryptedData = encrypt(publicKey,message);
    res.json({encryptedData})
})

app.post('/decrypt',(req,res)=>{
    const {encryptMessage} = req.body;
const decryptedData = decrypt(privateKey,encryptMessage)
    res.json({decryptedData})
})
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`); 
    // console.log("public ley:\n",publicKey);
    // console.log("pricate ley:\n",privateKey); 
    fs.writeFileSync(publicKeyPath, publicKey);
   fs.writeFileSync(privateKeyPath, privateKey);
})
