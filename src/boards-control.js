module.exports = (motors, leds, socket) => {
    var motor1 = motors.motor1;
    var motor2 = motors.motor2;
    var servo0 = motors.servo0;
    var servo1 = motors.servo1;
    var servo2 = motors.servo2;
    var servo3 = motors.servo3;

    var laser = leds.laser;
    var led0 = leds.led0;
    var led1 = leds.led1;
    var led2 = leds.led2;
    var led3 = leds.led3;

    socket.on("setup", function (data) {
        socket.emit("setup", {
            servo0: servo0.value,
            servo1: servo1.value,
            servo2: servo2.value,
            servo3: servo3.value
        });
    });

    socket.on("movement", (data) => {
        //console.log("Got movement:", data.id + ' ' + data.value);
        if (data.id === "motor0") {
            servo0.to(data.value);
        }
        else if (data.id === "motor1") {
            servo1.to(data.value);
        }
        else if (data.id === "motor2") {
            servo2.to(data.value);
        }
        else if (data.id === "kiskac") {
            servo3.to(data.value);
        }
        else console.log("hmmm interesting it is")
    });

    socket.on("motor", (data) => {
        if (data.id === "geri") {
            motor1.forward(data.value);
            motor2.forward(data.value);
        }
        else if (data.id === "ileri") {
            motor1.reverse(data.value);
            motor2.reverse(data.value);
        }
        else if (data.id === "sol") {
            motor2.reverse(data.value);
            motor1.forward(data.value);
        }
        else if (data.id === "sag") {
            motor2.forward(data.value);
            motor1.reverse(data.value);
        }
        else if (data.id === "dur") {
            motor1.stop();
            motor2.stop();
        }
    });

    socket.on("laser", (data) => {
        if (data.value === "on") {
            laser.on();
        }
        else if (data.value === "off") {
            laser.off();
        }
    });

    let index = 0;
    const rainbow = ["FF0000", "FF7F00", "FFFF00", "00FF00", "0000FF", "4B0082", "8F00FF"];
    function rgbLoop() {
        led0.color(rainbow[++index]);
        led1.color(rainbow[index]);
        led2.color(rainbow[index]);
        led3.color(rainbow[index]);

        if (index === rainbow.length - 1) {
            index = 0;
        }
    }
    loop = setInterval(rgbLoop, 1000);
    clearInterval(loop);

    socket.on("rgb", (data) => {

        if (data.value === "on") {
            loop = setInterval(rgbLoop, 1000);
        }
        else if (data.value === "off") {
            led0.off();
            led1.off();
            led2.off();
            led3.off();
            clearInterval(loop);
        }
    });

    socket.on("kol", (data) => {
        if (data.value === "sol") {
            servo0.to(20);
        }
        else if (data.value === "ortala") {
            servo0.to(90);
        }
        else if (data.value === "sag") {
            servo0.to(160);
        }
    });

    socket.on("kiskac", (data) => {
        if (data.value === "on") {
            servo3.to(130);
        }
        else if (data.value === "off") {
            servo3.to(0);
        }
    });

}