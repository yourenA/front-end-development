const binding = require('mbus_wm_gb');
const obj1 = new binding.Mbus();

var addr = Buffer.from([0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA, 0xAA]);
var payload = Buffer.from([0x1F, 0x90, 0x00]);

obj1.metertype = 0x10;
obj1.addr      = addr;
console.log("addr: " + obj1.addr.toString('hex'));

if (0 != obj1.setbaudrate(2400)) {
    console.log("setup serial baudrate failure.");
}
// databits:8, stopbits:1, parity:event('n':none, 'o':odd, 'e':event)
if (0 != obj1.setformat(8, 1, 'e')) {
    console.log("setup serial format failure.");
}

if (0 != obj1.connect("COM4")) {
    console.log("device connect failure.");
}

if (0 == obj1.send(0x01, payload)) {
    console.log("device send success.");
} else {
    console.log("device send failure.");
}

var packet = obj1.recv();
if (0 == packet.code) {
    console.log("device recv success.");
    console.log("Meter Type: " + packet.metertype);
    console.log("Address: " + packet.addr.toString('hex'));
    console.log("Control: " + packet.ctrl);
    console.log("Payload lenght: " + packet.payload.length);
    console.log("Payload: " + packet.payload.toString('hex'));
} else {
    console.log("device recv failure, Code " + packet.code);
}

if (0 != obj1.disconnect()) {
    console.log("device disconnect failure.");
}

process.exit()