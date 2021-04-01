import { Injectable } from '@angular/core';
import { TodoListData } from './dataTypes/TodoListData';
import { Observable, BehaviorSubject } from 'rxjs';
import { TodoItemData } from './dataTypes/TodoItemData';

@Injectable()
export class TodoService {

  private todoListSubject = new BehaviorSubject<TodoListData>({
    title: 'TODOList',
    items: []
  });

  constructor() {}

  // We declare an observable TodoListData with a name and items
  getTodoListDataObservable(): Observable<TodoListData> {
    return this.todoListSubject.asObservable();
  }

  setItemsLabel(label: string, ...items: TodoItemData[]) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next({
      title: tdl.title,
      items: tdl.items.map(I =>
        items.indexOf(I) === -1 ? I : { label, isDone: I.isDone }
      )
    });
  }

  setItemsDone(isDone: boolean, ...items: TodoItemData[]) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next({
      title: tdl.title,
      items: tdl.items.map(I => items.indexOf(I) === -1 ? I : ({label: I.label, isDone}))
    });
  }

  appendItems(...items: TodoItemData[]) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next({
      title: tdl.title,
      items: [...tdl.items, ...items]
    });
  }

  removeItems(...items: TodoItemData[]) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next({
      title: tdl.title,
      items: tdl.items.filter(I => items.indexOf(I) === -1)
    });
  }
}
