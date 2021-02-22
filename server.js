const http= require('http');
const port= process.env.PORT || 3030;


const app= require('./backend/app');
app.set('port', port);
const server=http.createServer(app);
// const wss = new websocket.server({server});


// const server=  http.createServer((req, resp)=>{
// 	resp.end('hola');
// });


server.listen(port);