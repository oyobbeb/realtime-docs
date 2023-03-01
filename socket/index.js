const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const maxParticipants = 2;
const rooms = {};

io.on("connection", (socket) => {
  const { id, user } = socket.handshake.query;
  socket.join(id);

  let room = rooms[id] || { users: new Set() };
  room.users.add(user);
  rooms[id] = room;

  if (room.users.size > maxParticipants) {
    socket.emit("room-full");
    socket.leave(id);
    return;
  }

  const convertedRooms = Object.keys(rooms).reduce((acc, key) => {
    acc[key] = { users: Array.from(rooms[key].users) };
    return acc;
  }, {});

  io.emit("receive-users", convertedRooms);

  socket.on("edit-users", () => {
    socket.emit("receive-users", convertedRooms);
  });

  socket.on("disconnect", () => {
    room.users.delete(user);
    rooms[id] = room;

    socket.to(id).emit("receive-photo", null);
  });

  socket.on("edit-content", (content, id, top, left) => {
    if (!id) {
      return;
    }

    socket.to(id).emit("receive-content", content, top, left);
  });

  socket.on("current-edit", (photo) => {
    socket.to(id).emit("receive-photo", photo);
  });
});

