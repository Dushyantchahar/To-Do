package com.example.ToDo.repo;


import com.example.ToDo.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    public Task findByTask(String task);

    public List<Task> findAll();
    public Task getById(Long id);
}
