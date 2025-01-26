import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port:8080})

let userCount=0;
let allSockets: WebSocket[] = []
wss.on("connection",(socket)=>{

    allSockets.push(socket);


    userCount++
    console.log("user connected #"+userCount)
    socket.send(`user # ${userCount} connected!`)
    socket.on("message",(message)=>{
        console.log("message recieved "+message.toString());
        for(let i=0;i<allSockets.length;i++){
            const s =allSockets[i]
            s.send(message.toString()+" :sent from the ws server")
        }
        
    })
    
})