import { Queue } from "./queue.js";

async function reader(q) {
  while (true) {
    try {
      const data = await q.read();
      console.log(
        "[Reader] Received ::",
        data,
        // q.$readQueue.length,
        // q.$writeQueue.length,
      );
    } catch (error) {
      console.log("[Reader Error] ::", error);
    }
  }
}

async function writer(q) {
  let i = 0;
  while (true) {
    try {
      const msg = `msg_${i + 1}`;
      await q.write(msg);
      i += 1;
      console.log(
        "[Writer] ::",
        msg,
        // q.$readQueue.length,
        // q.$writeQueue.length,
      );
    } catch (error) {
      console.log("[Writer Error] ::", error);
    }
  }
}

function run() {
  const queue = new Queue();
  reader(queue);
  writer(queue);
}

run();
