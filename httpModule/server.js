const http = require('node:http');

const server = http.createServer((req,res)=>{
    console.log(req);
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end("Hello World!");
})
const port = 3000;
server.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})