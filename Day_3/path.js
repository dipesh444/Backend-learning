const path = require('path');



//1.join

const filePath = path.join("folder","students","data.txt");

console.log(filePath);

const parseDataPath = path.parse(filePath);
const resolvedPath = path.resolve(filePath);
const extName = path.extname(filePath)
const baseName = path.basename(filePath)
const dirName = path.dirname(filePath)

console.log({
    parseDataPath,
    resolvedPath,
    extName,
    baseName,
    dirName
});
