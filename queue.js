export class Queue {
  constructor() {
    this.$writeQueue = new Array();
    this.$readQueue = new Array();
    this.$capacity = 10;
  }

  canWrite() {
    return this.$writeQueue.length < this.$capacity;
  }

  write(msg) {
    if (this.canWrite()) {
      this.$writeQueue.push(msg);
      console.warn(msg, `Size:: ${this.$writeQueue.length}`);
      return;
    }
    console.warn("Queue is full!!");
  }

  read() {
    // pop all elements from writeQueue and push them to readQueue
    if (this.$writeQueue.length > 0 && this.$readQueue.length === 0) {
      while (this.$writeQueue.length > 0) {
        this.$readQueue.push(this.$writeQueue.pop());
      }
    }
    // return last element from readQueue if non-empty
    if (this.$readQueue.length > 0) {
      return this.$readQueue.pop();
    }

    return "Queue is empty";
  }
}
