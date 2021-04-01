import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { TodoListData } from '../dataTypes/TodoListData';
import { TodoItemData } from '../dataTypes/TodoItemData';
import { TodoService } from '../todo.service';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodoListComponent implements OnInit {

  @Input() newTodoInputValue: string;

  public todoList: TodoListData;
  public todoListItem: TodoItemData;

  public filter: string;


  constructor(private todoService: TodoService) {
    // We retrieve our observable service and subscribe to it. Each time a change occurs, data is updated as well
    todoService.getTodoListDataObservable().subscribe(tdl => this.todoList = tdl);
  }

  ngOnInit() {
    this.filter = 'all';
  }

  // Getters
  get title(): string {
    return this.todoList ? this.todoList.title : '';
  }

  get items(): TodoItemData[] {
    return this.todoList ? this.todoList.items : [];
  }

  // Methods

  // Adds an item to our list
  addItem(): void {
    // We create an item with the input value and set isDone to false by default
    this.todoListItem = {
      label: this.newTodoInputValue,
      isDone: false
    };

    // We add the current item to the list if it's not empty
    if (this.todoListItem.label !== '') {
      this.todoService.appendItems(this.todoListItem);
    }

    // We reset our todoListItem attribute when the work is done
    this.newTodoInputValue = '';
  }

  // Deletes all items
  deleteAllItems(): void {
    this.todoList.items.forEach(item => {
      this.todoService.removeItems(item);
    });
  }

  // Deletes all checked items
  deleteAllItemsChecked(): void {
    this.todoList.items.forEach(item => {
      if (item.isDone) {
        this.todoService.removeItems(item);
      }
    });
  }

  // Returns items depending on the filter attribute status
  filterItems() {
    switch (this.filter) {
      case 'all' : return this.todoList.items;
      case 'active' : return this.todoList.items.filter(item => !item.isDone);
      case 'done' : return this.todoList.items.filter(item => item.isDone);
    }
  }
}
