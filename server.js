const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://zeshinn.github.io",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("chat message", (data) => {
        io.emit("chat message", data);  
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 10000
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
