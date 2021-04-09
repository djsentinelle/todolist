import { Component, OnInit, Input, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';

import { TodoListData } from '../dataTypes/TodoListData';
import { TodoItemData } from '../dataTypes/TodoItemData';
import { TodoService } from '../todo.service';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodoListComponent implements OnInit, AfterViewInit {

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
    this.todoService.history = [];
    this.todoService.historyIndex = 0;
  }

  ngAfterViewInit() {
    this.todoService.history.push(this.todoList);
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
      this.sliceHistory();
      this.todoService.appendItems(this.todoListItem);
      this.saveToHistory();
    }

    // We reset our todoListItem attribute when the work is done
    this.newTodoInputValue = '';
  }

  // Deletes all items
  deleteAllItems(): void {
    this.todoList.items.forEach(item => {
      this.todoService.removeItems(item);
    });
    this.saveToHistory();
  }

  // Deletes all checked items
  deleteAllItemsChecked(): void {
    this.todoList.items.forEach(item => {
      if (item.isDone) {
        this.todoService.removeItems(item);
      }
    });
    this.saveToHistory();
  }

  // Returns items depending on the filter attribute status
  filterItems(): TodoItemData[] {
    switch (this.filter) {
      case 'all' :
        return this.todoList.items;
      case 'active' :
        return this.todoList.items.filter(item => !item.isDone);
      case 'completed' :
        return this.todoList.items.filter(item => item.isDone);
    }
    this.saveToHistory();
  }

  // Checks or unchecks all items
  toggleAllItems(): void {
    this.allCompleted() ?
      this.todoList.items.forEach(item => {
        this.todoService.setItemsDone(false, item);
      })
      :
      this.todoList.items.forEach(item => {
        this.todoService.setItemsDone(true, item);
      });
    this.saveToHistory();
  }

  // Push the list status inside the history accumulator
  saveToHistory(): void {
    if (this.todoService.historyIndex === 0) {
      this.todoService.history.unshift(this.todoList);
    } else {
      this.todoService.historyIndex = 0;
      this.todoService.history.unshift(this.todoList);
    }
    this.todoService.save();
  }

  sliceHistory(): void {
    console.log('todolist actual value');
    console.log(this.todoList);
    this.todoService.history = this.todoService.history.slice(this.todoService.historyIndex);
    console.log('We sliced the history');
    console.log(this.todoService.history);
  }

  // Utils

  // Returns the number of items that still active
  numberOfItemsLeft(): number {
    return this.todoList.items.length - this.todoList.items.filter(item => item.isDone).length;
  }

  // Checks if all items are checked
  allCompleted(): boolean {
    return (
      this.todoList.items.length ===
      this.todoList.items.filter(item => item.isDone).length
    );
  }

  // Keypress events methods

  // Retrieves the last todolist status from "history" attribute
  onCtrlZ() {
    if (this.todoService.historyIndex + 1 < this.todoService.history.length) {
      console.log('Undo');
      this.todoService.historyIndex += 1;
      this.todoList = this.todoService.history[this.todoService.historyIndex];
      console.log(this.todoService.history[this.todoService.historyIndex]);
    } else {
      console.log('Nothing to Undo.');
    }
  }

  // Retrieves the last todolist status from "revertHistory" attribute
  onShiftCtrlZ() {
    if (this.todoService.historyIndex > 0) {
      console.log('Redo');
      this.todoService.historyIndex -= 1;
      this.todoList = this.todoService.history[this.todoService.historyIndex];
      console.log(this.todoService.history);
    } else {
      console.log('Nothing to Redo.');
    }
  }

  // Displays attributes "history" and "revertHistory" in the console
  onCtrlD() {
    console.log('Debug');
    console.log(this.todoService.history);
    console.log(this.todoService.history.length);
    console.log(this.todoService.historyIndex);
  }
}
