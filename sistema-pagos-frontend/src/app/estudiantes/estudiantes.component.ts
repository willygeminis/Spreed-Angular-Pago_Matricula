import { Student } from './../../environments/environment.development';
import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../services/estudiantes.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent implements OnInit {

  public estudiantes!: Array<Student>;
  EstudiantesDataSource!: MatTableDataSource<Student>;
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'codigo', 'programaid', 'pagos'];

  constructor(private estudianteservice: EstudiantesService, private router: Router) { }

  ngOnInit(): void {
    this.estudianteservice.getAllEstudiantes().subscribe({
      next: data => {
        this.estudiantes = data;
        this.EstudiantesDataSource = new MatTableDataSource<Student>(this.estudiantes);
      },
      error: error => {
        console.log('Error al cargar los estudiantes', error);
      }
    });
  }

listarPagosPorEstudiante(estudiante:Student): void {
  this.router.navigateByUrl(`admin/estudiante-detalles/${estudiante.codigo}`); // Cambia el índice según sea necesario
}



}
