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

    constructor(private todoService: TodoService) {
      // We retrieve our observable service and subscribe to it. Each time a change occurs, data is updated as well
      todoService.getTodoListDataObservable().subscribe(tdl => this.todoList = tdl);
    }

    ngOnInit() {}

    // Getters
    get title(): string {
      return this.todoList ? this.todoList.title : '';
    }

    get items(): TodoItemData[] {
      return this.todoList ? this.todoList.items : [];
    }

    // Methods

    // Add an item to our list
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
}
