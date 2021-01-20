{
    const accelerometer = new Accelerometer({
        controller: "ADXL345",
        board: boards.byId("A")
        // Optionally set the range to one of
        // 2, 4, 8, 16 (±g)
        // Defaults to ±2g
        // range: ...
    });

    /*accelerometer.on("change", () => {
      const {acceleration, inclination, orientation, pitch, roll, x, y, z} = accelerometer;
      console.log("Accelerometer:");
      console.log("  x            : ", x);
      console.log("  y            : ", y);
      console.log("  z            : ", z);
      console.log("  pitch        : ", pitch);
      console.log("  roll         : ", roll);
      console.log("  acceleration : ", acceleration);
      console.log("  inclination  : ", inclination);
      console.log("  orientation  : ", orientation);
      console.log("--------------------------------------");
    });*/

    var button = new Button({
        pin: 0,
        board: boards.byId("A")
    });

    var servo0 = new Servo({
        controller,
        id: "MyServo",
        pin: 0,
        type: "standard",
        fps: 100,
        invert: false,
        startAt: 0,
        board: boards.byId("A")
    });

    var servo1 = new Servo({
        controller,
        pin: 1,
        type: "standard",
        fps: 100,
        invert: false,
        startAt: 130,
        board: boards.byId("A")
    });

    var servo2 = new Servo({
        controller,
        pin: 2,
        type: "standard",
        fps: 100,
        invert: false,
        startAt: 50,
        board: boards.byId("A")
    });

    var servo3 = new Servo({
        controller,
        pin: 3,
        type: "standard",
        fps: 100,
        invert: true,
        startAt: 0,
        board: boards.byId("A")
    });

    var servo4 = new Servo({
        controller,
        id: "MyServo",
        pin: 4,
        type: "standard",
        fps: 100,
        invert: true,
        startAt: 130,
        board: boards.byId("A")
    });

    var servo5 = new Servo({
        controller,
        pin: 5,
        type: "standard",
        fps: 100,
        invert: true,
        startAt: 30,
        board: boards.byId("A")
    });

    var servo6 = new Servo({
        controller,
        pin: 6,
        type: "standard",
        fps: 100,
        invert: false,
        startAt: 0,
        board: boards.byId("A")
    });

    var servo7 = new Servo({
        controller,
        pin: 7,
        type: "standard",
        fps: 100,
        invert: false,
        startAt: 130,
        board: boards.byId("A")
    });

    var servo8 = new Servo({
        controller,
        pin: 8,
        type: "standard",
        fps: 100,
        invert: true,
        startAt: 30,
        board: boards.byId("A")
    });

    var servo10 = new Servo({
        controller,
        pin: 9,
        type: "standard",
        fps: 100,
        invert: true,
        startAt: 0,
        board: boards.byId("A")
    });

    var servo9 = new Servo({
        controller,
        pin: 10,
        type: "standard",
        fps: 100,
        invert: true,
        startAt: 130,
        board: boards.byId("A")
    });

    var servo11 = new Servo({
        controller,
        pin: 11,
        type: "standard",
        fps: 100,
        invert: false,
        startAt: 30,
        board: boards.byId("A")
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////

button.on("hit", function () {
    console.log("Basıldı");
}).on("release", function () {
    console.log("Bırakıldı");
});

//////////////////////////////////////////////////////////////////////////////////////////////////

socket.on("spot", (data) => {
    //console.log("Got movement:", data.id + ' ' + data.value);
    if (data.id === "motor0") {
        servo0.to(data.value);
        servo3.to(data.value);
        servo6.to(data.value);
        servo9.to(data.value);
    }
    else if (data.id === "motor1") {
        servo1.to(data.value);
        servo4.to(data.value);
        servo7.to(data.value);
        servo10.to(data.value);
    }
    else if (data.id === "motor2") {
        servo2.to(data.value);
        servo5.to(data.value);
        servo8.to(data.value);
        servo11.to(data.value);
    }
    else console.log("hmmm interesting it is")
});