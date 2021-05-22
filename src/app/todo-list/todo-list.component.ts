import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {


  todoList = [];
  todoListClone = [];
  tabDetailOpen = -1;

  form = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    dueDate: [this.toDateInputValue()],
    priority: ['low']
  });
  constructor(private fb: FormBuilder,
    private toDoService: TodoService) { }

  ngOnInit(): void {
    this.getTodoList()
  }

  getTodoList() {
    this.todoList = this.toDoService.get();
    this.todoListClone = [...this.todoList];
  }
  
  addItem(item) {
    this.todoList = this.toDoService.post(item);
    this.todoListClone = [...this.todoList];
  }

  changeData(value, key, index) {
    this.todoListClone.map((item, i) => {
      if (index === i) {
        item[key] = value;
      }
      return item;
    })
  }

  update(index) {
    const dataUpdate = this.todoListClone[index];
    this.todoList = this.toDoService.put(dataUpdate, index);
    this.todoListClone = [...this.todoList];
  }

  remove(item) {
    this.todoList = this.toDoService.destroy(item);
    this.todoListClone = [...this.todoList];
  }

  toDateInputValue () {
    var local = new Date();
    local.setMinutes(new Date().getMinutes() - new Date().getTimezoneOffset());
    return local.toJSON().slice(0,10)
  }

  listSelected = []
  selectedItem(value, item) {
    if (value) {
      this.listSelected.push(item);
    } else {
      this.listSelected = [...this.todoListClone];
      this.listSelected.splice(this.listSelected.indexOf(item), 1);
    }
    
  }

  filterToDo(value) {
    if(value) {
      this.todoList = this.todoList.filter(item => item.title.indexOf(value) !== -1);
    } else {
      this.getTodoList();
    }
  }

  removeList() {
    this.listSelected.map(item => {
      this.remove(item)
    })
    this.listSelected = []
  }

  isSubmmited = false
  submit() {
    this.isSubmmited = true;
    if (this.form.invalid) return;
    this.addItem(this.form.value);
    this.form.reset();
    this.isSubmmited = false;
  }

}
