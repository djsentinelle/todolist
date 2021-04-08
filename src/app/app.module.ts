import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

import { TodoService } from './todo.service';

import { FormsModule } from '@angular/forms';
import {CtrlKeysDirective} from './todo-list/todo-list.directive';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    CtrlKeysDirective
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [
    TodoService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {}
