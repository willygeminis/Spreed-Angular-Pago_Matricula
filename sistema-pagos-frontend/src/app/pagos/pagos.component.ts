import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EstudiantesService } from '../services/estudiantes.service';
import { Pago } from '../../environments/environment.development';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css'
})
export class PagosComponent implements OnInit {

  public pagos!: Array<Pago>; // Cambiar 'any' por el tipo de datos adecuado
  public dataSource!: MatTableDataSource<Pago>; // Cambiar 'any' por el tipo de datos adecuado
  public displayedColumns = ['id', 'fecha', 'cantidad', 'type', 'status',"nombre"];
  /* @ViewChild es un decorador que sirve para acceder con los hijos de DOOM  */
  @ViewChild(MatPaginator) paginador!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http:HttpClient, private  estudianteservice:EstudiantesService) {}

  ngOnInit(): void {
    this.estudianteservice.getAllPagos().subscribe({
      next: data=>{
        this.pagos = data;
        this.dataSource = new MatTableDataSource<Pago>(this.pagos);
        this.dataSource.paginator = this.paginador;
        this.dataSource.sort = this.sort;
      },
      error: error => {
        console.log('Error al cargar los pagos', error);
      }
    })
  }


  }



