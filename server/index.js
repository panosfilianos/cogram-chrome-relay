const express = require("express")
const http = require("http")
const fs = require("fs")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
});

io.on("connection", (socket) => {
	// when connected send the socket id
	socket.emit("socketId", socket.id);
	// when connected send ACK to client
    socket.emit("socketConnected", true);

	socket.on("disconnect", () => {
		socket.broadcast.emit("streamEnded");
	})

	socket.on('mediaData', (data) => {
		// Save media data to a file or process it as needed
		const buffer = Buffer.from(new Uint8Array(data));
		fs.appendFile('media.webm', buffer, (err) => {
			if (err) {
			console.error('Error saving media data', err);
			}
		});
	});

	socket.on("sendStream", (data) => {
        console.log(data);
		io.to(data.socketId).emit("relayStream", { signal: data.signalData });
	})
});

server.listen(5001, () => console.log("Server is running on port 5001"))