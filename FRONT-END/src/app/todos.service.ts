import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todos } from './Todos';
import { FormGroup } from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseURL = "http://localhost:8081/Todos";

  constructor(private httpClient: HttpClient) { }

  getTodosList(): Observable<Todos[]> {
    return this.httpClient.get<Todos[]>(`${this.baseURL}/toDos`);
  }

  addNewTodo(newTodo: FormGroup): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/addNewTodo`, newTodo);
  }


  updateTodo(updatedTodo: FormGroup, id: number): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/update/${id}`, updatedTodo);
  }

    doneTodo(doneTodo: FormGroup, id: number): Observable<Object> {
        return this.httpClient.put(`${this.baseURL}/doneTodo/${id}`, doneTodo);
    }


  deleteTodo(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
  }

  getTodoById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-HTTP-Method-Override': 'GET'
    });

    return this.httpClient.get(`${this.baseURL}/${id}`, { headers });
  }


}
