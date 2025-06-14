import { Component, OnInit } from '@angular/core';
import { Pago } from '../../environments/environment.development';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudiantesService } from '../services/estudiantes.service';

@Component({
  selector: 'app-estudiantes-details',
  templateUrl: './estudiantes-details.component.html',
  styleUrl: './estudiantes-details.component.css'
})
export class EstudiantesDetailsComponent implements OnInit {

  estudianteCodigo!: string;
  pagosEstudiante!: Array<Pago>;
  pagosDataSource!: MatTableDataSource<Pago>;
  public displayedColumns = ['id', 'fecha', 'cantidad', 'type', 'status',"nombre"];

  constructor(private activaterouter: ActivatedRoute, private estudianteservis:EstudiantesService, private router:Router) {}
  ngOnInit(): void {
    this.estudianteCodigo = this.activaterouter.snapshot.params['codigo'];
    this.estudianteservis.getEstudiantePagoByCodigo(this.estudianteCodigo).subscribe({
      next: data => {
        this.pagosEstudiante = data;
        this.pagosDataSource = new MatTableDataSource<Pago>(this.pagosEstudiante);
      },
      error: error => {
        console.log('Error al cargar los pagos del estudiante', error);
      }
    })
  }

  agregarPago(): void {
    this.router.navigateByUrl(`admin/new-pago/${this.estudianteCodigo}`);
  }



}
