import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GimnasioService {
  
  private url = 'http://localhost/gimnasio/backend/controllers';

  constructor(private http: HttpClient) { }

  obtenerSocios(): Observable<any> {
    return this.http.get(`${this.url}/socios.controllers.php`);
  }

  obtenerClases(): Observable<any> {
    return this.http.get(`${this.url}/clase.controllers.php`);
  }

  obtenerMembresias(): Observable<any> {
    return this.http.get(`${this.url}/membresia.controllers.php`);
  }

  obtenerPagos(): Observable<any> {
    return this.http.get(`${this.url}/pago.controllers.php`);
  }

  eliminarPago(id: number): Observable<any> {
    return this.http.delete(`${this.url}/pago.controllers.php?id=${id}`);
  }
}