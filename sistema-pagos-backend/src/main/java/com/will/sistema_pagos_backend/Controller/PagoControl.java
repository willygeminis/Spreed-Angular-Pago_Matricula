package com.will.sistema_pagos_backend.Controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.will.sistema_pagos_backend.Entities.Pago;
import com.will.sistema_pagos_backend.Entities.Student;
import com.will.sistema_pagos_backend.Enums.PagosStatus;
import com.will.sistema_pagos_backend.Enums.TyoePago;
import com.will.sistema_pagos_backend.Repocitorio.PagosRepo;
import com.will.sistema_pagos_backend.Repocitorio.StudentRepo;
import com.will.sistema_pagos_backend.Services.PagoServices;



@RestController
@CrossOrigin(
             origins = { "http://localhost", "http://localhost:4200" },
             methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE},
             allowedHeaders = "*")

public class PagoControl {

    @Autowired
    private StudentRepo studentRepo;
    @Autowired
    private PagosRepo pagosRepol;
    @Autowired
    private PagoServices pagoServices;

    @GetMapping("/estudiantes")
    public List<Student> listaStudiantes(){
        return studentRepo.findAll();
    }   

    @GetMapping("/estudiantes/{codigo}")
    public Student EstudianteporCOdigo(@PathVariable String codigo){
        return studentRepo.findByCodigo(codigo);
    }
    
    @GetMapping("/estudiantePrograma")
    public List<Student> EstudiantesporPrograma(@RequestParam String programaid){
        return studentRepo.findByProgramaid(programaid);    
    }

    @GetMapping("/pagoEstudiante")
    public List<Pago> pagosEstudiante(){
        return pagosRepol.findAll();
    }

    @GetMapping("/pagoEstudiante/{id}")
    public Pago pagoID (@PathVariable Long id){
        return pagosRepol.findById(id).get();
    }
    @GetMapping("/pagoEstudiante/{codigo}/pagos")
    public List<Pago> pagosEstudianteCodigo(@PathVariable String codigo){
        return pagosRepol.findByStudentidCodigo(codigo);
    }
    @GetMapping("/pagosporstatus")
    public List<Pago> pagosEstudianteStatus(@RequestParam PagosStatus status){
        return pagosRepol.findByPagosstatus(status);
    }
    @GetMapping("/pagos/porTipo")
    public List<Pago> pagoTYpo(@RequestParam TyoePago tipo) {
        return  pagosRepol.findByTipopagao(tipo);
    }
    
    @PutMapping("/pagos/{id}/actualizar")
    public Pago actualizarPago(@PathVariable Long id, @RequestParam PagosStatus status) {
        return pagoServices.actualizarPagoStatus(id,status);
    }

    @PostMapping(path = "/guardarPago", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Pago guardarPago(@RequestParam("file") MultipartFile file, double cantidad, TyoePago tipo,
                              LocalDate fecha, String codigo) {
        
        return pagoServices.savePago(file, cantidad, tipo, fecha, codigo);
    }

    @GetMapping(value= "/pago/{id}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public byte[] getFileIdporId(@PathVariable Long id) throws Exception {
        return pagoServices.getFileId(id);
    }
}
