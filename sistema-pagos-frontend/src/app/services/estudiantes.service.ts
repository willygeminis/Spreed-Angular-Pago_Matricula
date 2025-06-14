import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pago, Student } from '../../environments/environment.development';




@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  constructor(private http: HttpClient) {}

     public getAllPagos():Observable<Array<Pago>> {
      return this.http.get<Array<Pago>>(`${environment.backendHost}/pagoEstudiante`);
    }

      public getAllEstudiantes():Observable<Array<Student>> {
      return this.http.get<Array<Student>>(`${environment.backendHost}/estudiantes`);
    }
    public getEstudiantePagoByCodigo(codigo: string): Observable<Array<Pago>> {
      return this.http.get<Array<Pago>>(`${environment.backendHost}/pagoEstudiante/${codigo}/pagos`);
    }
    public guardarPago(fromData:any):Observable<Pago>{
      return this.http.post<Pago>(`${environment.backendHost}/guardarPago`,fromData);
    }
}
