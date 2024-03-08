import {Readable, Writable} from 'stream';

const readableStream = new Readable({
    highWaterMark: 20, // Threshold value not limit
    read(){} // Read method is required
});

const writeableStream = new Writable({
    write(chunk){
        console.log(chunk.toString());
    }
})
readableStream.on('data',(chunk)=>{
    // console.log(chunk);
    writeableStream.write(chunk);
});

console.log(readableStream.push("Rushikesh!dvSD dcdsdjkvlb"));

