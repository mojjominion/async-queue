import { waitFor } from "./wait-for.js";

export class Queue {
  constructor() {
    this.$writeQueue = new Array();
    this.$readQueue = new Array();
    this.$capacity = 10;
  }

  async write(msg) {
    if (
      await waitFor({
        predicate: () => this.$writeQueue.length < this.$capacity,
        errorMsg: "Write timeout",
      })
    ) {
      this.$writeQueue.push(msg);
      return "Success";
    }
    return "Queue is full!!";
  }

  async read() {
    // wait for writeQueue to fill up if readQueue is empty
    if (
      this.$readQueue.length == 0 &&
      (await waitFor({
        predicate: () => this.$writeQueue.length > 0,
        errorMsg: "Shift timeout",
      }))
    ) {
      // pop all elements from writeQueue and push them to readQueue
      while (this.$writeQueue.length > 0) {
        this.$readQueue.push(this.$writeQueue.pop());
      }
    }

    // return last element from readQueue if non-empty
    if (
      await waitFor({
        predicate: () => this.$readQueue.length > 0,
        errorMsg: "Read timeout",
      })
    ) {
      return this.$readQueue.pop();
    }

    return "Queue is empty";
  }
}
