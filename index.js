import { Queue } from "./queue.js";

function reader(q) {
  for (let i = 0; i < 20; i++) {
    const data = q.read();
    console.log("data=", data);
  }
}

function writer(q) {
  for (let i = 0; i < 20; i++) {
    q.write(`msg_${i + 1}`);
  }
}

function run() {
  const queue = new Queue();
  writer(queue);
  reader(queue);
}
run();
