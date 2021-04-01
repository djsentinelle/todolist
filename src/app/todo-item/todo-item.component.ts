import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { TodoItemData } from '../../../../TodoList/src/app/dataTypes/TodoItemData';
import { TodoService } from '../todo.service';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})

export class TodoItemComponent implements OnInit {

  @Input() item: TodoItemData;

  @ViewChild('newTextInput', { static: false }) private inputLabel: ElementRef;

  constructor(private todoService: TodoService) {}

  ngOnInit() {}

  // Getters and setters

  get label(): string {
    return this.item.label;
  }

  set label(lab: string) {
    this.todoService.setItemsLabel(lab, this.item);
  }

  // Methods

  // Delete the current item
  deleteItem(): void {
    console.log(this.item);
    this.todoService.removeItems(this.item);
  }

}
