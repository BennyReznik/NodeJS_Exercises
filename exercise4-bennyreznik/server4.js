const cluster = require("cluster");
const http = require("http");
const child_process = require("child_process");

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
      console.log(`Server (id: ${process.env.workerId}) processing request...`);
      const forked = child_process.fork("./calcsum.js");
      forked.on("message", result => {
        console.log(`child process ${result.result}`);
        res.end(result.result.toString());
      });

      forked.send({
        num1: Math.floor(Math.random() * 10),
        num2: Math.floor(Math.random() * 10)
      });
    })
    .listen(8004);
}
