package com.will.sistema_pagos_backend.Services;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.will.sistema_pagos_backend.Entities.Pago;
import com.will.sistema_pagos_backend.Entities.Student;
import com.will.sistema_pagos_backend.Enums.PagosStatus;
import com.will.sistema_pagos_backend.Enums.TyoePago;
import com.will.sistema_pagos_backend.Repocitorio.PagosRepo;
import com.will.sistema_pagos_backend.Repocitorio.StudentRepo;


import jakarta.transaction.Transactional;

import java.nio.file.Path; 



@Service
@Transactional
public class PagoServices {
    @Autowired
    private PagosRepo pagosRepo;
    @Autowired
    private StudentRepo studentRepo;

    public Pago savePago(MultipartFile file,double cantidad,TyoePago tipo, LocalDate fecha,String codigo) {
        
        /* 
         - Creamos una ruta donde guardaremos los archivos de pago
         - La ruta es: /home/usuario/enset-data/pagos
        */
        Path folderpath = Paths.get(System.getProperty("user.home"),"enset-data","pagos");

        if (!Files.exists(folderpath)){
            try {
                Files.createDirectories(folderpath);
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }

        String filename = UUID.randomUUID().toString();
        //craemos una ruta completa para el archivo
        Path filepath = Paths.get(System.getProperty("user.home"),"enset-data","pagos",filename+".pdf");

        try {
            //copiamos la data pasada por la solicitud HTTP A la ruta creada
            Files.copy(file.getInputStream(), filepath);
        } catch (IOException e) {
            e.printStackTrace();
        }

        Student student = studentRepo.findByCodigo(codigo);
        Pago pago = Pago.builder()
                .fecha(fecha)
                .Cantidad(cantidad)
                .pagosstatus(PagosStatus.CREADO)
                .tipopagao(tipo)
                .file(filepath.toUri().toString())
                .studentid(student)
                .build();
        return pagosRepo.save(pago);
    }

    public byte[] getFileId(Long id) throws IOException {
      Pago pago = pagosRepo.findById(id).get();
      /*
       - pago.getFile() devuelve la URI del archivo
       - URI.create(pago.getFile()) convierte la cadena de texto en una URI
       - path.of(URI.create(pago.getFile())) convierte la URI en un objeto Path
       - Files.readAllBytes(Path) lee el contenido del archivo y lo devuelve como un array de bytes
       */
      return Files.readAllBytes(Path.of(URI.create(pago.getFile())));
    }
    public Pago actualizarPagoStatus(Long id, PagosStatus status) {
        Pago pago = pagosRepo.findById(id).get();
        pago.setPagosstatus(status);
        return pagosRepo.save(pago);
    }

}
