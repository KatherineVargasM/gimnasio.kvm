import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GimnasioService } from '../../services/gimnasio';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-clases',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clases.html',
  styleUrl: './clases.css'
})
export class ClasesComponent implements OnInit {
  listaClases: any[] = [];
  filtro: string = '';
  clase = { id: 0, nombre: '', instructor: '', horario: '' };

  constructor(private service: GimnasioService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.service.obtenerClases().subscribe({
      next: (res: any) => {
        this.listaClases = Array.isArray(res) ? res : [];
        this.cd.detectChanges();
      },
      error: (err: any) => {
        this.notificar('Error al cargar datos', 'error');
      }
    });
  }

  filtrar() {
    if (!this.filtro) return this.listaClases;
    return this.listaClases.filter((c: any) => 
      c.nombre.toLowerCase().includes(this.filtro.toLowerCase()) || 
      c.instructor.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  nuevo() {
    this.limpiar();
    const modalElement = document.getElementById('ModalClase');
    const m = bootstrap.Modal.getOrCreateInstance(modalElement);
    m.show();
  }

  editar(id: number) {
    const seleccionado = this.listaClases.find((c: any) => c.id == id);
    if (seleccionado) {
      this.clase = { ...seleccionado };
      const modalElement = document.getElementById('ModalClase');
      const m = bootstrap.Modal.getOrCreateInstance(modalElement);
      m.show();
      this.cd.detectChanges();
    }
  }

  guardar() {
    const peticion = (this.clase.id == 0) 
      ? this.service.insertarClase(this.clase) 
      : this.service.actualizarClase(this.clase);

    peticion.subscribe({
      next: (res: any) => {
        if (res.status === 'ok') {
          this.notificar(res.mensaje, 'success');
          const modalElement = document.getElementById('ModalClase');
          const m = bootstrap.Modal.getInstance(modalElement);
          if (m) m.hide();
          this.cargar();
        } else {
          this.notificar('Error: ' + res.mensaje, 'error');
        }
      },
      error: (err: any) => {
        this.notificar('Error de red o servidor', 'error');
      }
    });
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Eliminar clase?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#004d4d',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.service.eliminarClase(id).subscribe({
          next: (res: any) => {
            if (res.status === 'ok') {
              this.notificar(res.mensaje, 'success');
              this.cargar();
            }
          },
          error: (err: any) => {
            this.notificar('Error al eliminar', 'error');
          }
        });
      }
    });
  }

  limpiar() {
    this.clase = { id: 0, nombre: '', instructor: '', horario: '' };
  }

  notificar(msj: string, icono: any) {
    Swal.fire({ 
      icon: icono, 
      title: msj, 
      timer: 1500, 
      showConfirmButton: false 
    });
  }
}