const http = require("http");

let i = 0;
const server = http
  .createServer((req, res) => {
    console.log(`server ${i++}`);
    sleep(2000);
    res.end("end request");
  })
  .listen(8002);

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

console.log("Server is up, waiting for calls...");
