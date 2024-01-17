export class Queue {
  constructor() {
    this.$writeQueue = new Array();
    this.$readQueue = new Array();
    this.$capacity = 10;
  }

  async waitFor({ predicate, error, noTimeout }) {
    return new Promise((resolve, reject) => {
      if (!noTimeout) {
        setTimeout(() => reject(error ?? "Timeout"), 3 * 1000);
      }

      setInterval(() => {
        if (predicate()) {
          resolve(true);
        }
      }, 200);
    });
  }

  async write(msg) {
    if (
      await this.waitFor({
        predicate: () => this.$writeQueue.length < this.$capacity,
        error: "Write timeout",
      })
    ) {
      this.$writeQueue.push(msg);
      return Promise.resolve();
    }
    return new Promise("Queue is full!!")();
  }

  async read() {
    //
    // pop all elements from writeQueue and push them to readQueue
    if (
      await this.waitFor({
        predicate: () => this.$writeQueue.length > 0,
        error: "Read timeout",
      })
    ) {
      if (this.$readQueue.length == 0) {
        while (this.$writeQueue.length > 0) {
          this.$readQueue.push(this.$writeQueue.pop());
        }
      }
    }

    // return last element from readQueue if non-empty
    if (
      await this.waitFor({
        predicate: () => this.$readQueue.length > 0,
        error: "final reading",
      })
    ) {
      return this.$readQueue.pop();
    }

    return "Queue is empty";
  }
}
