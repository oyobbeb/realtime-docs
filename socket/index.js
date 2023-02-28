const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const maxParticipants = 1;
const rooms = {};

io.on("connection", (socket) => {
  const { id } = socket.handshake.query;
  socket.join(id);

  let room = rooms[id] || { users: new Set() };
  room.users.add(socket.id);
  rooms[id] = room;

  if (room.users.size > maxParticipants) {
    socket.emit("room-full");
    socket.leave(id);
    return;
  }

  socket.on("disconnect", () => {
    room.users.delete(socket.id);
    rooms[id] = room;
  });

  socket.on("edit-content", (content, id, top, left) => {
    if (!id) {
      socket.broadcast.emit("receive-content", content);
    }

    socket.to(id).emit("receive-content", content, top, left);
  });
});

