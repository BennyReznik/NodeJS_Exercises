const cluster = require("cluster");
const http = require("http");

if (cluster.isMaster) {
  for (let i = 0; i < 4; i++) {
    cluster.fork({ workerId: i });
  }

  // Count requests
  function messageHandler(msg) {
    if (msg.cmd && msg.cmd === "notifyRequest") {
      numReqs += 1;
    }
  }

  for (const id in cluster.workers) {
    cluster.workers[id].on("message", messageHandler);
  }

  console.log("[MASTER] Created " + 4 + " workers.");
} else {
  http
    .createServer((req, res) => {
      sleep(2000);
      console.log(`Server (id: ${process.env.workerId}) processing request...`);
      res.end();
    })
    .listen(8003);

  function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
  }
}
