

export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  size: () => number;
  clear: () => void;
  setElementByIndex: (index: number, element: T) => void;
}



export class Stack<T> implements IStack<T> {

  private container: T[] = [];

  get elements() {
    return [...this.container];
  }

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container.length > 0) {
      this.container.pop();
    }
  };

  peak = (): T | null => {
    if (this.container.length > 0) {
      const index = this.size() - 1;
      return this.container[index];
    }
    return null;
  };

  size = () => this.container.length;

  clear = () => {
    this.container = [];
  }

  setElementByIndex = (index: number, element: T) => {
    this.container[index] = element;
  }
}
