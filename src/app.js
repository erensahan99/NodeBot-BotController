
var io = require("socket.io-client");
const WebSocket = require("ws")


let pongResponse = false;

function connectToCam() {
    var wss = new WebSocket("ws://192.168.1.35:80/ws");

    wss.on("open", message => {
        console.log("opened");
    });

    wss.on("message", message => {
        if (typeof message == "string") {
            if (message == "pong") {
                // console.log(message)
                pongResponse = true;
                socket.emit("conState", "connected");
            }
            else if (message == "disconnected") {
                socket.emit("conState", "disconnected");
            }
            else if (message == "error") {
                socket.emit("conState", "error");
            }
        }
        else {
            socket.emit("video", message);
        }
    });

    wss.on("error", message => {
        socket.emit("conState", "error");
        console.log("wss error");
    });
    return wss;
}

var wss = connectToCam();

// var socket = io.connect("ws://localhost:3000/", {
var socket = io.connect("ws://nodebot-control.herokuapp.com/", {
    reconnection: true
});

socket.on("connect", function () {
    console.log("connected to localhost:8080. id= " + socket.id);
});

function sendPing() {
    try {
        wss.send("ping");
    } catch (error) {
        wss = connectToCam();
    }
    if (typeof pingInterval !== "undefined") {
        clearInterval(pingInterval);
    }
    pingInterval = setInterval(() => {
        // console.log("pingInterval: " + pongResponse);
        if (!pongResponse) {
            socket.emit("conState", "error");
            clearInterval(pingInterval);
        }
        else {
            pongResponse = false;
            wss.send("ping");
        }
    }, 5000);
}

socket.on("announcements", function (data) {
    console.log("Got announcement:", data.message);
    sendPing();
});

socket.on("flash", function (data) {
    if(data.value=="on"){
        wss.send("flashOn");
        console.log("flashOn");
    }
    else{
        wss.send("flashOff");
        console.log("flashOff");
    }
});

require("./boards")(socket);
