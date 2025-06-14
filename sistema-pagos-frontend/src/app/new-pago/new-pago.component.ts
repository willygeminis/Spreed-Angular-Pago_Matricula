import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentType } from '../../environments/environment.development';
import { EstudiantesService } from '../services/estudiantes.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-new-pago',
  templateUrl: './new-pago.component.html',
  styleUrl: './new-pago.component.css'
})
export class NewPagoComponent implements OnInit {

  pagoGrupo!: FormGroup;
  codigoEstudiante!: string;
  tiposPago: string[] = [];
  pdfFileUrl!:string;

  constructor(private fb:FormBuilder, private activaterouter: ActivatedRoute, private estudianteservice:EstudiantesService  ) {}

  ngOnInit(): void {

    for(let tipo in PaymentType) {
      let value = PaymentType[tipo];
      if (typeof value == 'string') {
         this.tiposPago.push(value);
      }
    }

    this.codigoEstudiante = this.activaterouter.snapshot.params['codigo'];
    this.pagoGrupo = this.fb.group({
      date: this.fb.control(""),
      cantidad: this.fb.control(""),
      type: this.fb.control(""),
      codigoEstudiante: this.fb.control(this.codigoEstudiante),
      fileSource: this.fb.control(""),
      fileName: this.fb.control(""),
      file: this.fb.control("")
    });
  }
    selecFile(event:any){
      if(event.target.files.length > 0){
        let file = event.target.files[0];
        this.pagoGrupo.patchValue({
          fileSource: file,
          fileName: file.name
        })
        this.pdfFileUrl = window.URL.createObjectURL(file);

      }
      console.log(this.pdfFileUrl);
    }

    guardarPago(){
      let date : Date = new Date(this.pagoGrupo.value.date);
      let formattedDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()//dd/mm/yyyy

      let fromData = new FormData();//parecido a jsonbody

      fromData.set(`date`,formattedDate);
      fromData.set(`cantidad`,this.pagoGrupo.value.cantidad);
      fromData.set(`type`,this.pagoGrupo.value.type);
      fromData.set(`codigoEstudiante`,this.pagoGrupo.value.codigoEstudiante);
      fromData.set(`file`,this.pagoGrupo.value.fileSource);
      console.log(fromData);

      this.estudianteservice.guardarPago(fromData).subscribe({
        next: data =>{
          Swal.fire({
                  title: 'Pago Guardado',
                  text: 'El pago ha sido guardado con exito',
                  icon: 'success'
          })
        },
        error: err =>{
          Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'ha ocurrido un error al guardar el pago ' + err,
          })
        }
      })
    }


}
