const crypto = require("crypto");

//random bytes
// const randomValue = crypto.randomBytes(8)
// console.log(randomValue);

//create hash

// const hashValue = crypto.createHash("sha256").update("dipesh").digest("hex");
// console.log(hashValue);

//encryption and decryption assignment

const algorithm = 'aes-256-cbc'; // Encryption algorithm
const key = crypto.randomBytes(32); // Generate a 32-byte key
const iv = crypto.randomBytes(16); // Generate a 16-byte initialization vector

// Function to encrypt text
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv); // Create a Cipher object
  let encrypted = cipher.update(text, 'utf8', 'hex'); // Encrypt the text
  encrypted += cipher.final('hex'); // Finalize encryption
  return { encryptedData: encrypted, iv: iv.toString('hex') };
}

// Function to decrypt text
function decrypt(encryptedData, ivHex) {
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex')); // Create a Decipher object
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8'); // Decrypt the text
  decrypted += decipher.final('utf8'); // Finalize decryption
  return decrypted;
}


const text = "Hello, this is a secret message!";

// Encrypt the text
const encrypted = encrypt(text);
console.log("Encrypted Data:", encrypted.encryptedData);
console.log("Initialization Vector:", encrypted.iv);

// Decrypt the text
const decrypted = decrypt(encrypted.encryptedData, encrypted.iv);
console.log("Decrypted Data:", decrypted);
