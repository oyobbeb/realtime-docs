const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  const { id } = socket.handshake.query;
  socket.join(id);

  socket.on("edit-content", (content, id, top, left) => {
    if (!id) {
      socket.broadcast.emit("receive-content", content);
    }

    socket.to(id).emit("receive-content", content, top, left);
  });
});

