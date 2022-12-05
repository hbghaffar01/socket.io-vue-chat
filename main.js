const express = require("express");
const app = express();
const path = require("path");

const http = require("http").Server(app);
const port = process.env.PORT || 8080;

//attach http server to the socket.io
const io = require("socket.io")(http);

// route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

//create a new connection
io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on('message', (message) => {
    console.log('client msg:' + message);
  })
});

http.listen(port, () => {
  console.log(`app listining on port ${port}`);
});
