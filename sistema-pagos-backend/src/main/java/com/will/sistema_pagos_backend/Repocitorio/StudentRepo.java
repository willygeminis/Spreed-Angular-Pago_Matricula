package com.will.sistema_pagos_backend.Repocitorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.will.sistema_pagos_backend.Entities.Student;

@Repository
public interface  StudentRepo extends JpaRepository<Student, String> {

    Student findByCodigo(String codigo);
    List<Student> findByProgramaid(String programaid);
    
}
