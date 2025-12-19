import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GimnasioService } from '../../services/gimnasio';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-socios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './socios.html',
  styleUrl: './socios.css'
})
export class SociosComponent implements OnInit {
  listaSocios: any[] = [];
  socio = { id: 0, nombre: '', cedula: '', telefono: '', email: '' };

  constructor(private service: GimnasioService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.service.obtenerSocios().subscribe((res: any) => {
      this.listaSocios = res;
      this.cd.detectChanges();
    });
  }

  nuevo() {
    this.limpiar();
    const modalElement = document.getElementById('ModalSocio');
    const m = bootstrap.Modal.getOrCreateInstance(modalElement);
    m.show();
  }

  editar(id: number) {
    const seleccionado = this.listaSocios.find((s: any) => s.id == id);
    if (seleccionado) {
      this.socio = { ...seleccionado };
      const modalElement = document.getElementById('ModalSocio');
      const m = bootstrap.Modal.getOrCreateInstance(modalElement);
      m.show();
      this.cd.detectChanges();
    }
  }

  guardar() {
    const peticion = (this.socio.id == 0) 
      ? this.service.insertarSocio(this.socio) 
      : this.service.actualizarSocio(this.socio);

    peticion.subscribe({
      next: (res: any) => {
        if (res.status === 'ok') {
          this.notificar(res.mensaje, 'success');
          const modalElement = document.getElementById('ModalSocio');
          const m = bootstrap.Modal.getInstance(modalElement);
          if (m) m.hide();
          this.cargar();
        } else {
          this.notificar('Error: ' + res.mensaje, 'error');
        }
      },
      error: (err: any) => {
        this.notificar('Error de red o servidor', 'error');
        console.error(err);
      }
    });
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Eliminar socio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.service.eliminarSocio(id).subscribe((res: any) => {
          if (res.status === 'ok') {
            this.notificar(res.mensaje, 'success');
            this.cargar();
          }
        });
      }
    });
  }

  limpiar() {
    this.socio = { id: 0, nombre: '', cedula: '', telefono: '', email: '' };
  }

  notificar(msj: string, icono: any) {
    Swal.fire({ icon: icono, title: msj, timer: 1500, showConfirmButton: false });
  }
}