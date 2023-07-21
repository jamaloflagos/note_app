const socket = require("socket.io");

let io;

const initSocket = (server) => {
    io = socket(server)

    io.on("connection", (socket) => {
        console.log("Socket connected", socket.id);

        // Listen for note edits
    socket.on('editNote', (data) => {
    // Broadcast the editedd note to all connected clients except the sender
    socket.broadcast.emit('noteEdited', data);
  });

  // Listen for note deletions
  socket.on('deleteNote', (data) => {
    // Broadcast the deleted note ID to all connected clients except the sender
    socket.broadcast.emit('noteDeleted', data);
    console.log("note deleted");
    
  });

  // Listen for disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
    })

    return io;
}

const getIO = () => {
    if (!io) {
      throw new Error("Socket.IO is not initialized");
    }
    return io;
  };
module.exports ={initSocket, getIO, io}