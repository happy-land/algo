import { LinkedListNode } from "./linked-list-node";

export class LinkedList<T> {
  head: LinkedListNode<T> | null;
  size: number;

  constructor(values: T[]) {
    this.head = null;
    this.size = 0;
    values.forEach(item => this.prepend(item))
    // if (values?.length) {
    //   this.appendArray(values);
    // }
  }

  appendArray(values: T[]) {
    values.forEach((value) => this.append(value));
  }

  prepend(value: T) {
    const node = new LinkedListNode<T>(value);
    if (!this.isEmpty()) {
      node.next = this.head;
      this.head = node;
    }
    this.head = node;
    this.size++;
  }

  append(value: T) {
    const node = new LinkedListNode<T>(value);

    if (!this.head) {
      this.head = node;
    }

    if (!this.isEmpty()) {
      let prev = this.head;
      while (prev?.next) {
        prev = prev.next;
      }
      prev.next = node;
    }

    this.size++;
  }

  /*
  appendToIndex(value: T, index: number) {
    const newNode = new LinkedListNode<T>(value);

    if (index === 0) {
      if (!this.head) {
        newNode.next = this.head;
        this.head = newNode;
      }

      newNode.next = this.head;
      this.head = newNode;

      return; // ???
    }
    if (index > this.length()) {
      return;
    }

    // current -> prev
    // previous -> node

    let prev = this.head;
    // let currentIndex = 0;
    let node = null;

  
    // while (currentIndex < index) {
    //   previous = current;
    //   current = current!.next;
    //   currentIndex++;
    // }
    for (let i = 0; i < index; i++) {
      node = prev;
      prev = prev!.next;
    }

    newNode.next = prev;
    node!.next = newNode;

    this.size++;
  }
  */

  removeToIndex = (index: number) => {

  }

  removeHead = ()  => {

  }

  removeTail = () => {
    
  }

  tail() {
    if (!this.head) {
      return null;
    }

    let node = this.head;
    while (node.next) {
      node = node.next;
    }

    return node;
  }

  length() {
    let l = 0;

    let node = this.head;
    while (node) {
      l++;
      node = node.next;
    }

    return l;
  }

  isEmpty = (): boolean => {
    return this.head === null;
  };
}
