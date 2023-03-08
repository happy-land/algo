import { LinkedListNode } from "./linked-list-node";

export interface ILinkedList<T> {
  append: (value: T) => void;
  prepend: (value: T) => void;
  toArray: () => T[];
  appendByIndex: (value: T, index: number) => void;
  removeByIndex: (index: number) => void;
  removeFromHead: () => void;
  removeFromTail: () => void;
  length: () => number;
  getByIndex: (index: number) => void;
  isEmpty: () => boolean;
}

export class LinkedList<T> implements ILinkedList<T> {
  head: LinkedListNode<T> | null;
  size: number;

  constructor(values: T[]) {
    this.head = null;
    this.size = 0;
    values.forEach((item) => this.prepend(item));
  }

  // appendArray(values: T[]) {
  //   values.forEach((value) => this.append(value));
  // }
  get values(): T[] {
    return this.toArray();
  }

  get listSize(): number {
    return this.size;
  }

  get _head() {
    return this.values[0];
  }

  get _tail() {
    return this.values[this.values.length - 1];
  }

  toArray = (): T[] => {
    const values = [];
    let currentNode = this.head;
    while (currentNode) {
      values.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return values;
  };

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

  prepend(value: T) {
    const node = new LinkedListNode<T>(value);
    if (!this.isEmpty()) {
      node.next = this.head;
      this.head = node;
    }
    this.head = node;
    this.size++;
  }

  appendByIndex(value: T, index: number) {
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

    let prev = this.head;
    let node = null;

    for (let i = 0; i < index; i++) {
      node = prev;
      prev = prev!.next;
    }

    newNode.next = prev;
    node!.next = newNode;

    this.size++;
  }

  removeByIndex = (index: number) => {
    if (index < 0 || index >= this.size) return;
    let current,
      previous,
      counter = 0;
    current = this.head;
    previous = current;

    if (index == 0) {
      this.head = current ? current : null;
    } else {
      while (counter < index) {
        counter++;
        previous = current;
        if (current) {
          current = current.next;
        }
      }
      if (previous) {
        previous.next = current ? current.next : null;
      }
    }
    this.size--;
  };

  removeFromHead = (): void => {
    if (!this.head) {
      return;
    }
    this.head = this.head.next;
    this.size--;
  };

  removeFromTail = (): void => {
    let node = this.head;
    let prev;
    while (node?.next) {
      prev = node;
      node = node.next;
    }
    if (prev?.next) {
      prev.next = null;
    }
    this.size--;
  };

  length = (): number => {
    let l: number = 0;

    let node = this.head;
    while (node) {
      l++;
      node = node.next;
    }

    return l;
  }

  getByIndex = (index: number): T => {
    return this.values[index];
  };

  isEmpty = (): boolean => {
    return this.head === null;
  };
}
