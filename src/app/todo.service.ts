import { Injectable } from '@angular/core';
import { TodoListData } from './dataTypes/TodoListData';
import { Observable, BehaviorSubject } from 'rxjs';
import { TodoItemData } from './dataTypes/TodoItemData';

@Injectable()
export class TodoService {

  // Getters
  get history(): TodoListData[] {
    return this._history;
  }

  get historyIndex(): number {
    return this._historyIndex;
  }

  // Setters
  set history(value: TodoListData[]) {
    this._history = value;
  }

  set historyIndex(value: number) {
    this._historyIndex = value;
  }

  private _history: TodoListData[];
  private _historyIndex: number;

  private todoListSubject = new BehaviorSubject<TodoListData>({
    title: 'TODOList',
    items: []
  });

  constructor() {
    this.load();
  }

  // We declare an observable TodoListData with a name and items
  getTodoListDataObservable(): Observable<TodoListData> {
    return this.todoListSubject.asObservable();
  }

  setItemsLabel(label: string, ...items: TodoItemData[]): void {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next({
      title: tdl.title,
      items: tdl.items.map(I =>
        items.indexOf(I) === -1 ? I : { label, isDone: I.isDone }
      )
    });
    this.save();
  }

  setItemsDone(isDone: boolean, ...items: TodoItemData[]): void {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next({
      title: tdl.title,
      items: tdl.items.map(I => items.indexOf(I) === -1 ? I : ({label: I.label, isDone}))
    });
    this.save();
  }

  appendItems(...items: TodoItemData[]): void {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next({
      title: tdl.title,
      items: [...tdl.items, ...items]
    });
    this.save();
  }

  removeItems(...items: TodoItemData[]): void {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next({
      title: tdl.title,
      items: tdl.items.filter(I => items.indexOf(I) === -1)
    });
    this.save();
  }

  // If a user localStorage backup exists, loads it in the todoList
  load(): void {
    if (localStorage.getItem('todoList') !== null) {
      const tdl = JSON.parse(localStorage.getItem('todoList'));
      this.todoListSubject.next({
        title: tdl.title,
        items: tdl.items
      });
    }
  }

  // Saves the todoList in the localStorage
  save(): void {
    localStorage.setItem('todoList',
      JSON.stringify(this.todoListSubject.getValue())
    );
  }
}
