export default class Queue {
  #items = [];
  enqueue = (element) => this.#items.push(element);
  dequeue = () => this.#items.shift();
  peek = () => this.#items[this.#items.length - 1];
  isEmpty = () => this.#items.length === 0;
  empty = () => (this.#items.length = 0);
  size = () => this.#items.length;
}
