
var socket = io.connect("http://localhost:8075");

socket.on("welcome", function(data) {
    console.log(data);
});

module.exports = socket;