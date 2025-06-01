const http = require('node:http');

const server = http.createServer((req,res)=>{
    const url = req.url;
    console.log("method",req.method)
    if( url === '/'){
       // res.writeHead(200,{'Content-Type':'json'});
        const responseData = {
            message:"Hello, GFG Learner",
            articleData:{
                articleName: "How to send JSON response from NodeJS",
                category:"NodeJS",
                status: "published",
                method: req.method,
            },
            endingMessage:"Visit Geeksforgeeks.org for more"
        }
        res.write(JSON.stringify(responseData));
        res.end()
    } else{
        res.statusCode= 400;
        res.write("Soory!")
        res.end();
    }
})

console.log(server)

const port = 3000;

server.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})