package com.will.sistema_pagos_backend.Dto;

import java.time.LocalDate;

import com.will.sistema_pagos_backend.Enums.TyoePago;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class New_Pago {
    private double cantidad;
    private TyoePago ryoepago;
    private LocalDate date;
    private String codigoEstudiante;
}
