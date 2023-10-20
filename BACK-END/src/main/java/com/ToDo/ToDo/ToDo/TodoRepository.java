package com.ToDo.ToDo.ToDo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends JpaRepository<Todos, Long> {

    @Query("SELECT s FROM Todos s WHERE s.task = ?1")
    Optional<Todos> findByTask(String task);

    void deleteAllById(Long Id);

    List<Todos> findByTaskContaining(String task);


    Optional<Todos> findByEmail(String email);




}
