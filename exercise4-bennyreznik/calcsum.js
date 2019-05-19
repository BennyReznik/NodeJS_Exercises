process.on("message", input => {
  console.log("calcsum start");
  sleep(2000);
  process.send({ result: input.num1 + input.num2 });
  console.log("calcsum end");
});

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}
