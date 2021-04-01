# M2 MIASHS-DCISS : TODOList Project

## Install :

Clone this repository and install dependencies :

```
 git clone https://github.com/moisave/todolist.git
 cd todolist
`npm install`
```

## Run server

Run `ng serve` to launch the server. Then navigate to `http://localhost:4200/`. 

---

## Features :

This TODOList includes all functionalities provide by "TodoMVC".
(See : https://todomvc.com/examples/vanillajs/#/)

Some basic and essential features added : 

- Clear all
- Select all
- Undo & Redo

More advanced features :

### First

TODO

### Second

TODO

## Development diary

- Commit "zero" : Fixed some tslint issues. Migration to a 100% English application. README started.
- Branch "add" : We can now add an item to our list if it's not empty.
    - Some read about this warning `Private field todoList cannot be resolved when using the AOT compiler.`. Made a public access when necessary so AOT compilers should work as well.
- Branch "delete" : We can now delete an item via the item itself the cross or all items via the footer.
    - Don't understand yet why we have to declare the todoService attribute of a todo-item component as a constructor parameter while we can't just declare it as a simple attribute within the class.
    In fact, if we declare it as a simple attribute, it leads to an error like : "Cannot read property of undefined".
- 