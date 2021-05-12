export default class Stack {
  #items = [];
  push = (element) => this.#items.push(element);
  pop = () => this.#items.pop();
  peek = () => this.#items[0];
  isEmpty = () => this.#items.length === 0;
  empty = () => (this.#items.length = 0);
  size = () => this.#items.length;
}
