package com.will.sistema_pagos_backend.Entities;

import java.time.LocalDate;

import com.will.sistema_pagos_backend.Enums.PagosStatus;
import com.will.sistema_pagos_backend.Enums.TyoePago;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class   Pago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate fecha;
    private double  Cantidad; 
    private PagosStatus pagosstatus; 
    private TyoePago tipopagao;
    private String file;
    @ManyToOne
    private Student studentid; 
}
