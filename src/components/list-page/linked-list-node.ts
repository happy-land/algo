export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;

  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }

  // get value() {
  //   return this._value;
  // }

  // set value(value: T) {
  //   this._value = value;
  // }

  // get next() {
  //   return this._next;
  // }

  // set next(node: LinkedListNode<T> | null | undefined) {
  //   this._next = node;
  // }
}