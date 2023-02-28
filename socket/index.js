const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const maxParticipants = 2;
const rooms = {};

io.on("connection", (socket) => {
  const { id } = socket.handshake.query;
  socket.join(id);

  let roomsUserNumber = io.sockets.adapter.rooms.get(id)?.size;
  let room = rooms[id] || { users: new Set(), count: 0 };
  room.users.add(socket.id);
  room.count = room.users.size;
  rooms[id] = room;

  if (roomsUserNumber > maxParticipants) {
    socket.emit("room-full");
    socket.leave(id);
    return;
  }

  socket.on("disconnect", () => {
    room.users.delete(socket.id);
    room.count = room.users.size;
    rooms[id] = room;
    console.log(rooms);
  });

  socket.on("edit-content", (content, id, top, left) => {
    if (!id) {
      socket.broadcast.emit("receive-content", content);
    }

    socket.to(id).emit("receive-content", content, top, left);
  });

  console.log(rooms);
});

