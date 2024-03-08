import http from 'http';
import fs from 'fs';
import { Transform, pipeline } from 'stream';

const server = http.createServer((req, res) => {
    console.log(req.url);
    if(req.url === '/'){
        res.write('Home Page');
        res.end();
        return;
    }
    //* Sending file to client
    //*bad practice
    // const file = fs.readFileSync('./sample.txt');
    // return res.end(file);

    //*good practice
    // const readableStream = fs.createReadStream('./sample.txt');
    // readableStream.pipe(res);

    //* Copying file from one to another
    //*bad practice
    // const file = fs.readFileSync('./sample.txt');
    // fs.writeFileSync('./copy.txt',file);

    //*good practice
    // const readableStream = fs.createReadStream('./sample.txt');
    // const writableStream = fs.createWriteStream('./copy.txt');
    // readableStream.on('data',(chunk)=>{
    //     console.log(chunk.toString());
    //     writableStream.write(chunk);
    // }
    // );

    //* String processing

    const smapleReadStream = fs.createReadStream('./sample.txt');   
    const outputWriteStream = fs.createWriteStream('./output.txt');

    const transform = new Transform({
        transform(chunk, encoding, callback){
            const final = chunk.toString().replaceAll(/ipsum/gi, 'Rushikesh').toUpperCase();
            callback(null,final);
        }
    })

    // smapleReadStream.on('data',(chunk)=>{
    //     console.log(chunk.toString());
    //     const final = chunk.toString().replaceAll(/ipsum/gi, 'Rushikesh').toUpperCase();
    //     outputWriteStream.write(final);
    // });

    // smapleReadStream
    //     .pipe(transform)
    //     .on('error',(err)=>{
    //         console.log(err);
    //     })
    //     .pipe(outputWriteStream)
    //     .on('error',(err)=>{
    //         console.log(err);
    //     });

    pipeline(smapleReadStream,transform,outputWriteStream,(err)=>{
        if(err){
            console.log(err);
        }
    });

    res.end();

});

server.listen(3000,()=>{
    console.log('Server is running on port 3000');
})