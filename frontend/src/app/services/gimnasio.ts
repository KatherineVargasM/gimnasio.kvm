import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GimnasioService {
  private url = 'http://localhost/gimnasio/backend/controllers';

  constructor(private http: HttpClient) { }

  obtenerSocios(): Observable<any> { return this.http.get(`${this.url}/socios.controllers.php?op=todos`); }
  obtenerSocio(id: number): Observable<any> {
    const f = new FormData(); f.append('id', id.toString());
    return this.http.post(`${this.url}/socios.controllers.php?op=uno`, f);
  }
  insertarSocio(s: any): Observable<any> { return this.http.post(`${this.url}/socios.controllers.php?op=insertar`, s); }
  actualizarSocio(s: any): Observable<any> { return this.http.post(`${this.url}/socios.controllers.php?op=actualizar`, s); }
  eliminarSocio(id: number): Observable<any> {
    const f = new FormData(); f.append('id', id.toString());
    return this.http.post(`${this.url}/socios.controllers.php?op=eliminar`, f);
  }

  obtenerClases(): Observable<any> { return this.http.get(`${this.url}/clase.controllers.php?op=todos`); }
  obtenerClase(id: number): Observable<any> {
    const f = new FormData(); f.append('id', id.toString());
    return this.http.post(`${this.url}/clase.controllers.php?op=uno`, f);
  }
  insertarClase(c: any): Observable<any> { return this.http.post(`${this.url}/clase.controllers.php?op=insertar`, c); }
  actualizarClase(c: any): Observable<any> { return this.http.post(`${this.url}/clase.controllers.php?op=actualizar`, c); }
  eliminarClase(id: number): Observable<any> {
    const f = new FormData(); f.append('id', id.toString());
    return this.http.post(`${this.url}/clase.controllers.php?op=eliminar`, f);
  }

  obtenerMembresias(): Observable<any> { return this.http.get(`${this.url}/membresia.controllers.php?op=todos`); }
  obtenerMembresia(id: number): Observable<any> {
    const f = new FormData(); f.append('id', id.toString());
    return this.http.post(`${this.url}/membresia.controllers.php?op=uno`, f);
  }
  insertarMembresia(m: any): Observable<any> { return this.http.post(`${this.url}/membresia.controllers.php?op=insertar`, m); }
  actualizarMembresia(m: any): Observable<any> { return this.http.post(`${this.url}/membresia.controllers.php?op=actualizar`, m); }
  eliminarMembresia(id: number): Observable<any> {
    const f = new FormData(); f.append('id', id.toString());
    return this.http.post(`${this.url}/membresia.controllers.php?op=eliminar`, f);
  }

  obtenerPagos(): Observable<any> { return this.http.get(`${this.url}/pago.controllers.php?op=todos`); }
  obtenerPago(id: number): Observable<any> {
    const f = new FormData(); f.append('id', id.toString());
    return this.http.post(`${this.url}/pago.controllers.php?op=uno`, f);
  }
  insertarPago(p: any): Observable<any> { return this.http.post(`${this.url}/pago.controllers.php?op=insertar`, p); }
  actualizarPago(p: any): Observable<any> { return this.http.post(`${this.url}/pago.controllers.php?op=actualizar`, p); }
  eliminarPago(id: number): Observable<any> {
    const f = new FormData(); f.append('id', id.toString());
    return this.http.post(`${this.url}/pago.controllers.php?op=eliminar`, f);
  }
}