package com.will.sistema_pagos_backend;

import java.time.LocalDate;
import java.util.Random;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.will.sistema_pagos_backend.Entities.Pago;
import com.will.sistema_pagos_backend.Entities.Student;
import com.will.sistema_pagos_backend.Enums.PagosStatus;
import com.will.sistema_pagos_backend.Enums.TyoePago;
import com.will.sistema_pagos_backend.Repocitorio.PagosRepo;
import com.will.sistema_pagos_backend.Repocitorio.StudentRepo;

@SpringBootApplication
public class SistemaPagosBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SistemaPagosBackendApplication.class, args);
	}
	
	@Bean
	CommandLineRunner commandLineRunner(StudentRepo studentRepo, PagosRepo pagosRepo) {
		return args -> {
			studentRepo.save(Student.builder()
					.id("1")
					.name( "John")
					.lastname("doe")
					.codigo("12345")
					.programaid("CS101")
					.build());
			studentRepo.save(Student.builder()
					.id("2")
					.name( "will")
					.lastname("peña")
					.codigo("23456")
					.programaid("CS101")
					.build());

			studentRepo.save(Student.builder()
					.id("3")
					.name( "david")
					.lastname("goleman")
					.codigo("34567")
					.programaid("BS101")
					.build());

			TyoePago tiposPago[] = TyoePago.values();
			Random random = new Random();
			
			studentRepo.findAll().forEach((student) -> {
				for (int i = 0; i < 5;i++){
					int index = random.nextInt(tiposPago.length);
					Pago pago = Pago.builder()
					.Cantidad(1000 + (int)(Math.random() * 2000))
					.tipopagao(tiposPago[index])
					.pagosstatus(PagosStatus.CREADO)
					.fecha(LocalDate.now())
					.studentid(student)
					.build();
					pagosRepo.save(pago);
				}

			});

					
		};
	}
}
