const http = require("http");

module.exports = function sendRequests() {
  for (let i = 0; i < 10; i++) {
    new Promise(function(resolve, reject) {
      http.get("http://localhost:8001", resp => {
        resp.on("data", data => {
          console.log(`response: ${data}`);
        });
        resp.on("end", () => {
          console.log(`Request ${i}: response returned`);
        });
      });
    });
  }
};
