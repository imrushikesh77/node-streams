import fs from 'fs';


const writeStream = fs.createWriteStream('./log.txt');
const readableStream = fs.createReadStream('./output.txt'); 

// process.stdin.pipe(writeStream);
readableStream.pipe(process.stdout);