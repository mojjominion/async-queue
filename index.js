import { Queue } from "./queue.js";

function sleep(ms = 2000) {
  return new Promise((resolve) => setTimeout(() => resolve(true), ms));
}
/**
 * @param {Queue} q - queue object
 * @param {number} readerId - Reader id
 */
async function reader(q, readerId) {
  while (true) {
    try {
      await sleep();
      const data = await q.read();
      console.log(`[Reader ${readerId}] Received ::`, data);
    } catch (error) {
      console.log(`[Reader Error ${readerId}] ::`, error);
    }
  }
}

/**
 * @param {Queue} q - queue object
 * @param {number} writerId - Reader id
 */
async function writer(q, writerId) {
  let i = 0;
  while (i < 40) {
    try {
      // await sleep(4000);
      const msg = `msg_${writerId}${++i}`;
      await q.write(msg);
      console.log(`[Writer] ::`, msg);
    } catch (error) {
      console.log(`[Writer Error] ::`, error);
    }
  }
}

function run() {
  const queue = new Queue();
  for (let i = 0; i < 20; i++) {
    reader(queue, `${i + 1}`);
  }

  for (let i = 0; i < 2; i++) {
    writer(queue, `${i + 1}`);
  }
}

run();
