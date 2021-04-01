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
- Branch "Add" : We can now add an item to our list if it's not empty.
    - Some read about this warning `Private field todoList cannot be resolved when using the AOT compiler.`. Made a public access when necessary so AOT compilers should work as well.
