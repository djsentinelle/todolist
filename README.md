# M2 MIASHS-DCISS : TODOList Project

## Install :

Clone this repository and install dependencies :

```
 git clone https://github.com/moisave/todolist.git
 cd todolist
 npm install
```

## Run server

Run `ng serve` to launch the server. Then navigate to `http://localhost:4200/`. 

---

## Features :

This TODOList includes all functionalities provide by "TodoMVC".
(See : https://todomvc.com/examples/vanillajs/#/)

Some basic and essential features added : 

- Filters
- Clear all
- Local storage
- Wysiwyg edition mode (What You See Is What You Get)

More advanced features :

### Undo & Redo

I've added two attributes to the todo.service : 
- history : An array of Todolists. It stores all todolist states after each user actions. States are stored from the 
more recent to the latest event. Index "0" stores the current state to avoid some undefined errors. Last index stores the latest
todolist state.

- historyIndex : A integer. It represents our location in history. It is initialisez at 0 and can't be greater than the history.length + 1.
The more you "undo", the more historyIndex increases. The more you redo, the more it decrease. The more you make actions in the todolist, 
the more history.length will be high. 

I've seen some tools already implemented here : https://www.npmjs.com/package/ngrx-wieder  
 
but I was struggled to implement it. So I decided to implement it myself.

### Progressive Web Application

TODO

## Development diary

- Commit "zero" : Fixed some tslint issues. Migration to a 100% English application. README started.

- Branch "add" : We can now add an item to our list if it's not empty.
    - Some read about this warning `Private field todoList cannot be resolved when using the AOT compiler.`. Made a public access when necessary so AOT compilers should work as well.

- Branch "delete" : We can now delete an item via the item itself the cross or all items via the footer.
    - Don't understand yet why we have to declare the todoService attribute of a todo-item component as a constructor parameter while we can't just declare it as a simple attribute within the class.
    In fact, if we declare it as a simple attribute, it leads to an error like : "Cannot read property of undefined".

- Branch "done" : Implementations of all functionalities about check status of list items.
    - Items flagged as 'completed' when they are checked. When we click on 'Clear completed', it removes all checked items.
    - Items can be filtered by all, active or done. A border appears around the filter when it's activated.
    - The number of left items is displayed. The description changes within the number.
    - Items can all be checked or unchecked in one click.

- Branch "ui-improvements" : UI bugs fixed. Better feel.
    - Can't succeed to add a label for each input without breaking hard the display. The warning `Inputs should have a associated label` is not respected.
    - I renamed completed to done at the beginning without notifying that it was link to the CSS.
    - I've modified some padding on checkboxes for a better feeling.

- Branch "edition" : User can now edit his notes by double-click on an item.

- Branch "local-storage" : User session is saved so he can leave the application without losing his data.
    - localStorage can't be loaded OnInit. We must call `load()` in the constructor.

- Branch "undo-redo" : User can undo his last actions up to 10 times. He can redo it as well.
    - Still a problem when we try to overwright the remaining redo stuff by our new input. I can't succeed to truncate the history properly. Maybe because of shady Angular mechanism.
    If I could have some ***feedback*** here, it would be awesome. I have first implemented the logic in the todolist component, but I remembered that the logic is preferred as a service.
 
