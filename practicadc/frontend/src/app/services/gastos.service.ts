import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { Gasto } from '../models/gasto.model';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  private apiUrl = '/api/gastos';
  

  constructor(private http: HttpClient) {}

   getGastos(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(this.apiUrl).pipe(
      timeout(3000),
      retry(2),
      catchError(err => {
        console.error(' Error al obtener gastos:', err);
        return throwError(() => new Error('No se pudieron cargar los gastos'));
      })
    );
  }

  agregarGasto(gasto: Gasto): Observable<Gasto> {
    return this.http.post<Gasto>(this.apiUrl, gasto).pipe(
      timeout(3000),
      retry(2),
      catchError(err => {
        console.error(' Error al agregar gasto:', err);
        return throwError(() => new Error('No se pudo agregar el gasto'));
      })
    );
  }

  deleteGasto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      timeout(3000),
      retry(2),
      catchError(err => {
        console.error(` Error al eliminar gasto con ID ${id}:`, err);
        return throwError(() => new Error('No se pudo eliminar el gasto'));
      })
    );
  }
  
/*
   //Guardar respaldo
  guardarRespaldo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/respaldo/guardar`);
  }

  //Ver respaldo desde archivo
  verRespaldo(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(`${this.apiUrl}/respaldo/ver`);
  }
    */

}
