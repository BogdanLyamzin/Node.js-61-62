const {Server} = require("socket.io");
const {createServer} = require("http");

const httpServer = createServer();

const wsServer = new Server(httpServer, {
    cors: {
        origins: "*"
    }
});

wsServer.on("connection", socket => {
    // console.log("New frontend connected")
    socket.on("chat-message", message => {
        socket.broadcast.emit("chat-message", message);
    })
})

httpServer.listen(5000);