package com.ToDo.ToDo.ToDo;


import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class TodoService {

    private final TodoRepository todoRepository;

    private NamedParameterJdbcTemplate jdbcTemplate;


    public List<Todos> getTodos() {
       return todoRepository.findAll();
    }

//Search Todos by Task
    public List<Todos> searchTodosByTask(String task) {
        return todoRepository.findByTaskContaining(task);
    }


    //Change Plan Type



    public void addNewTodo(Todos newTodo) {
        Optional<Todos> existingTodoOptional = 
            todoRepository.findByTask(newTodo.getTask());
    
        Todos savedTodo = todoRepository.save(newTodo);
    
        System.out.println("New todo added: " + savedTodo);
    }


    public void addNewTodayTodo(Todos newTodo) {
        Optional<Todos> existingTodoOptional =
                todoRepository.findByTask(newTodo.getTask());

        Todos savedTodo = todoRepository.save(newTodo);

        System.out.println("New todo added: " + savedTodo);
    }


    @Transactional
    //Delete Todos
    public void deleteTodo(Long TodosId){
        boolean exists = todoRepository.existsById(TodosId);
        if (!exists){
            throw new IllegalStateException(
                "Todos with id " + TodosId + "does not exists");
        }
        todoRepository.deleteById(TodosId);
    }

    public void deleteAllTodos(){
        todoRepository.deleteAll();
    }


    //Return All Todos

    public List<Todos> getAllTodos() {
        return todoRepository.findAll();
    }

    @Transactional
    public Todos getTodoByTask(String task) {
        Optional<Todos> todo = todoRepository.findByTask(task);
        return todo.orElse(null);
    }


    public void updateTodo(Todos todo) {
        todoRepository.save(todo);
    }


    public Todos getTodoById(Long id) {
        Optional<Todos> todoOptional = todoRepository.findById(id);
        return todoOptional.orElse(null);
    }

    public Todos getTodayTodoById(Long id) {
        Optional<Todos> todoOptional = todoRepository.findById(id);
        return todoOptional.orElse(null);
    }


    public Todos getTodoId(Long id) {
      return todoRepository.findById(id).get();
    }


    public boolean isTaskAlreadyExists(String task) {
        // Implement the logic to check if a todo with the given Task already exists
        Optional<Todos> existingTodo = todoRepository.findByTask(task);
        return existingTodo.isPresent();
    }

    public Todos findById(Long id) {
                return todoRepository.findById(id).get();

            }

    public long countTodos(){
        return todoRepository.count();
    }



}    

