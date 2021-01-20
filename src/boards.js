module.exports = (socket) => {
    const {
        Boards,
        Servo,
        Servos,
        Motor,
        Led
    } = require("johnny-five");
    var EtherPortClient = require("etherport-client").EtherPortClient;

    const boards = new Boards([{ port: new EtherPortClient({ host: "192.168.1.43", port: 3030 }), id: "A" }]);
    //{ port: new EtherPortClient({ host: "192.168.1.41", port: 3030 }), id: "A" }
    //{ port: "/dev/rfcomm0", id: "B" }
    //{ port: "/dev/ttyUSB0", id: "C" }
    var motor1, motor2, servo0, servo1, servo2, servo3, robotKol;

    boards.on("ready", () => {

        laser = new Led(15);

        motor1 = new Motor({
            pins: {
                pwm: 16,
                dir: 2,
                cdir: 0
            },
            board: boards.byId("A")
        });

        motor2 = new Motor({
            pins: {
                pwm: 13,
                dir: 12,
                cdir: 14
            },
            board: boards.byId("A")
        });

        const controller = "PCA9685";

        servo0 = new Servo({
            controller,
            pin: 0,
            type: "standard",
            startAt: 80,
            invert: true,
            board: boards.byId("A")
        });

        servo1 = new Servo({
            controller,
            pin: 1,
            type: "standard",
            startAt: 90,
            board: boards.byId("A")
        });

        servo2 = new Servo({
            controller,
            pin: 2,
            type: "standard",
            invert: true,
            startAt: 50,
            board: boards.byId("A")
        });

        servo3 = new Servo({
            controller,
            pin: 3,
            type: "standard",
            startAt: 0,
            board: boards.byId("A")
        });

        const led0 = new Led.RGB({
            controller: "PCA9685",
            isAnode: true,
            pins: {
                red: 4,
                green: 5,
                blue: 6
            },
            board: boards.byId("A")
        });
        const led1 = new Led.RGB({
            controller: "PCA9685",
            isAnode: true,
            pins: {
                red: 7,
                green: 8,
                blue: 9
            },
            board: boards.byId("A")
        });
        const led2 = new Led.RGB({
            controller: "PCA9685",
            isAnode: true,
            pins: {
                red: 10,
                green: 11,
                blue: 12
            },
            board: boards.byId("A")
        });
        const led3 = new Led.RGB({
            controller: "PCA9685",
            isAnode: true,
            pins: {
                red: 13,
                green: 14,
                blue: 15
            },
            board: boards.byId("A")
        });
        
        

        laser.off();

        robotKol = new Servos([servo0, servo1, servo2, servo3])

        boards.repl.inject({
            motor1,
            motor2,

            servo0,
            servo1,
            servo2,
            servo3,
            robotKol,

            led0,
            led1,
            led2,
            led3,

            laser
        });

        motors = { servo0, servo1, servo2, servo3, motor1, motor2 };
        leds = { laser, led0, led1, led2, led3 };

        require('./boards-control')(motors, leds, socket);

    });

    boards[0].on("error", () => {
        console.log("omg");
    });

}
