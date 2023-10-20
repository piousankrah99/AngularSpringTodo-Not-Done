import { Component, OnInit, inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { TodoService } from '../todos.service';
import { Todos } from '../Todos';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  todos: Todos[] = []; // Initialize as an empty array
  doneTodos: Todos[] = [];
  formGroup!: FormGroup;
  formBuilder= inject(FormBuilder);

  stlLogo: string = "assets/images/super_tech_logo.jpg"

  constructor(private todoService: TodoService) {}


  ngOnInit() {

    this.getTodosList();
    this.formGroup = this.formBuilder.group({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl(''),
      task: new FormControl(''),
      time: new FormControl(''),
      date: new FormControl(''),
      createdAt: new FormControl(''),

    })

    if (this.todos.length > 0) {
      this.fetchTodoData(this.todos[0].id);
    }
  }

  // private getTodosList() {
  //   this.todoService.getTodosList().subscribe(data => {
  //     this.todos = data;
  //   });
  // }

  private getTodosList(): void {
    this.todoService.getTodosList().subscribe(
      (data: any) => {
        this.todos = data;
      },
      (error: any) => {
        // Handle the error here, for example:
        console.error('An error occurred while fetching todos: ', error);
      }
    );
  }


  // saveTodo() {
  //   this.todoService.addNewTodo(this.formGroup).subscribe(
  //       data => {
  //         console.log(data);
  //       },
  //       error => console.log("The error is", error)
  //   );
  // }

  confirmInsert(): void {
    const confirmation = window.confirm('Are you sure you want to Add this todo?');

    if (confirmation) {
      // User confirmed, proceed with deletion
      this.saveTodo();
    }
  }




  saveTodo() {
    const formData = this.formGroup.value; // Get the form values
    this.todoService.addNewTodo(formData).subscribe(
      data => {
        this.getTodosList(); // Refresh the todo list after deletion

        console.log(data);
      },
      error => console.log("The error is", error)
    );
  }

  confirmUpdate(id: number): void {
    const confirmation = window.confirm('Are you sure you want to Update this todo?');

    if (confirmation) {
      // User confirmed, proceed with deletion
      this.updateTodo(id);
    }
  }



  updateTodo(id: number){
    const formData = this.formGroup.value; // Get the form values
    // const id = formData.id; // Assuming you have an 'id' field in your form

    this.todoService.updateTodo(formData, id).subscribe(
      data => {
        console.log(data);
      },
      error => console.log("The error is", error)
    );
  }

  // onSubmit() {
  //   console.log(this.todos);
  //   this.saveTodo();
  // }

  confirmDelete(id: number): void {
    const confirmation = window.confirm('Are you sure you want to delete this todo?');

    if (confirmation) {
      // User confirmed, proceed with deletion
      this.deleteTodo(id);
    }
  }

  confirmDoneDelete(id: number): void {
    const confirmation = window.confirm('Are you sure you want to delete this completed todo?');

    if (confirmation) {
      // User confirmed, proceed with deletion
      this.deleteTodo(id);
    }
  }

    confirmDone(id: number): void {
        const confirmation = window.confirm('Are you sure you want to delete this todo?');

        if (confirmation) {
            // User confirmed, proceed with deletion
            this.doneTodo(id);
        }
    }



  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(data => {
      console.log(data);
      this.getTodosList(); // Refresh the todo list after deletion
    });
  }


  doneTodo(id: number) {
    this.todoService.getTodosList().subscribe(() => {
      const deletedItem = this.todos.find(item => item.id === id);
      if (deletedItem) {
        this.doneTodos.push(deletedItem);
        this.todos = this.todos.filter(item => item.id !== id);
      }
    }, error => console.log(error));
  }


  // Add the fetchTodoData method to fetch data by ID
  fetchTodoData(id: number): void {
    if (id) {
      this.todoService.getTodoById(id).subscribe(
        (updatedData) => {
          console.log('DATA TO EDIT:', updatedData);

          // Update UI fields with the received data
          this.formGroup.patchValue({
            task: updatedData.task,
            date: updatedData.date,
            time: updatedData.time,
            firstname: updatedData.firstname,
            lastname: updatedData.lastname,
            email: updatedData.email,
            createdAt: updatedData.email

            // Add more fields if needed
          });

          // Optional: Trigger Angular change detection
          this.formGroup.updateValueAndValidity();
        },
        (error) => {
          console.error('FETCHING error:', error);
          // Handle errors if needed
        }
      );
    }
  }


}
