import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GimnasioService } from '../../services/gimnasio';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagos.html',
  styleUrl: './pagos.css'
})
export class PagosComponent implements OnInit {
  listaPagos: any[] = [];
  listaSocios: any[] = [];
  listaMembresias: any[] = [];
  filtro: string = '';
  pago = { id: 0, socio_id: 0, membresia_id: 0, monto: 0, fecha_pago: '', fecha_inicio: '', fecha_fin: '' };

  constructor(private service: GimnasioService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargar();
    this.cargarRelaciones();
  }

  cargar() {
    this.service.obtenerPagos().subscribe((res: any) => {
      this.listaPagos = res;
      this.cd.detectChanges();
    });
  }

  cargarRelaciones() {
    this.service.obtenerSocios().subscribe(res => this.listaSocios = res);
    this.service.obtenerMembresias().subscribe(res => this.listaMembresias = res);
  }

  filtrar() {
    if (!this.filtro) return this.listaPagos;
    return this.listaPagos.filter(p => 
      p.socio_nombre.toLowerCase().includes(this.filtro.toLowerCase()) || 
      p.membresia_nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  nuevo() {
    this.limpiar();
    const m = bootstrap.Modal.getOrCreateInstance(document.getElementById('ModalPago'));
    m.show();
  }

  editar(id: number) {
    const seleccionado = this.listaPagos.find((p: any) => p.id == id);
    if (seleccionado) {
      this.pago = { ...seleccionado };
      const m = bootstrap.Modal.getOrCreateInstance(document.getElementById('ModalPago'));
      m.show();
      this.cd.detectChanges();
    }
  }

  guardar() {
    const peticion = (this.pago.id == 0) 
      ? this.service.insertarPago(this.pago) 
      : this.service.actualizarPago(this.pago);

    peticion.subscribe((res: any) => {
      if (res.status === 'ok') {
        Swal.fire({ icon: 'success', title: res.mensaje, timer: 1500, showConfirmButton: false });
        bootstrap.Modal.getInstance(document.getElementById('ModalPago')).hide();
        this.cargar();
      }
    });
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Eliminar registro de pago?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#004d4d',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.service.eliminarPago(id).subscribe((res: any) => {
          if (res.status === 'ok') {
            Swal.fire({ icon: 'success', title: res.mensaje, timer: 1500, showConfirmButton: false });
            this.cargar();
          }
        });
      }
    });
  }

  limpiar() {
    this.pago = { id: 0, socio_id: 0, membresia_id: 0, monto: 0, fecha_pago: '', fecha_inicio: '', fecha_fin: '' };
  }
}