// import { createServer } from 'node:http';
// import { Server } from 'socket.io';
// // import {cors} from 'cors'
// import express from 'express';


// const app = express();
// const server = createServer(app);
// const io = new Server(server,{
//     cors:{
//     origin:'*',
// }

// });

// const ROOM = 'group'

// app.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
// });

// io.on('connection', (socket) => {
//   console.log('a user connected',socket.id);


//     socket.on('joinRoom',async(userName)=>{
//         console.log(`${userName} is joining the group`)
//          await socket.join(ROOM)
//          //send to all 
//         //  io.to(ROOM).emit("roomNotice",userName);
//          //broadcast
//          socket.to(ROOM).emit("roomNotice",userName);

//     });

//     socket.on('chatMessage',(msg)=>{
//         socket.to(ROOM).emit("chatMessage",msg);
//     });
     
//     socket.on('typing',(userName)=>{
//         socket.to(ROOM).emit("typing",userName);
//     });
    
//     socket.on('stopTyping', (userName) => {
//         socket.to(ROOM).emit('stopTyping', userName);
//     });
// });


// server.listen(4600, () => {
//   console.log('server running at http://localhost:4600');
// });


// import { createServer } from 'node:http';
// import express from 'express';
// import { Server } from 'socket.io';

// const app = express();

// const server = createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: '*',
//     },
// });

// const ROOM = 'group';

// io.on('connection', (socket) => {
//     console.log('a user connected', socket.id);

//     socket.on('joinRoom', async (userName) => {
//         console.log(`${userName} is joining the group.`);

//         await socket.join(ROOM);

//         // send to all
//         // io.to(ROOM).emit('roomNotice', userName);

//         // broadcast
//         socket.to(ROOM).emit('roomNotice', userName);
//     });

//     socket.on('chatMessage', (msg) => {
//         socket.to(ROOM).emit('chatMessage', msg);
//     });

//     socket.on('typing', (userName) => {
//         socket.to(ROOM).emit('typing', userName);
//     });

//     socket.on('stopTyping', (userName) => {
//         socket.to(ROOM).emit('stopTyping', userName);
//     });
// });

// app.get('/', (req, res) => {
//     res.send('<h1>Hello world</h1>');
// });
import { createServer } from 'node:http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors'; // Enable explicitly for REST endpoints if you add them later

const app = express();
const server = createServer(app);


const PORT = process.env.PORT || 4600; 

// const io = new Server(server, {
//     cors: {
        
//         origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
//         methods: ["GET", "POST"]
//     },
// });
const io = new Server(server, {
    cors: {
        // Automatically allows both local testing and your specific Render frontend
        origin: [
            'http://localhost:5173', 
            'https://mini-webchat-app.onrender.com'
        ], 
        methods: ["GET", "POST"]
    },
});

const ROOM = 'group';

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('joinRoom', async (userName) => {
        console.log(`${userName} is joining the group.`);
        await socket.join(ROOM);
        socket.to(ROOM).emit('roomNotice', userName);
    });

    socket.on('chatMessage', (msg) => {
        socket.to(ROOM).emit('chatMessage', msg);
    });

    socket.on('typing', (userName) => {
        socket.to(ROOM).emit('typing', userName);
    });

    socket.on('stopTyping', (userName) => {
        socket.to(ROOM).emit('stopTyping', userName);
    });
});

app.get('/', (req, res) => {
    res.send('<h1>Server is Live and Healthy!</h1>');
});

// Use the dynamic port variable
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// server.listen(4600, () => {
//     console.log('server running at http://localhost:4600');
// });