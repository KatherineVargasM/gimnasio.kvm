import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GimnasioService } from '../../services/gimnasio';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-membresias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './membresias.html',
  styleUrl: './membresias.css'
})
export class MembresiasComponent implements OnInit {
  listaMembresias: any[] = [];
  filtro: string = '';
  membresia = { id: 0, nombre: '', precio: 0, duracion_dias: 0 };

  constructor(private service: GimnasioService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.service.obtenerMembresias().subscribe((res: any) => {
      this.listaMembresias = res;
      this.cd.detectChanges();
    });
  }

  filtrar() {
    if (!this.filtro) return this.listaMembresias;
    return this.listaMembresias.filter(m => 
      m.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  nuevo() {
    this.limpiar();
    const m = bootstrap.Modal.getOrCreateInstance(document.getElementById('ModalMembresia'));
    m.show();
  }

  editar(id: number) {
    const seleccionado = this.listaMembresias.find((m: any) => m.id == id);
    if (seleccionado) {
      this.membresia = { ...seleccionado };
      const m = bootstrap.Modal.getOrCreateInstance(document.getElementById('ModalMembresia'));
      m.show();
      this.cd.detectChanges();
    }
  }

  guardar() {
    const peticion = (this.membresia.id == 0) 
      ? this.service.insertarMembresia(this.membresia) 
      : this.service.actualizarMembresia(this.membresia);

    peticion.subscribe((res: any) => {
      if (res.status === 'ok') {
        Swal.fire({ icon: 'success', title: res.mensaje, timer: 1500, showConfirmButton: false });
        bootstrap.Modal.getInstance(document.getElementById('ModalMembresia')).hide();
        this.cargar();
      }
    });
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Eliminar membresía?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#004d4d',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.service.eliminarMembresia(id).subscribe((res: any) => {
          if (res.status === 'ok') {
            Swal.fire({ icon: 'success', title: res.mensaje, timer: 1500, showConfirmButton: false });
            this.cargar();
          }
        });
      }
    });
  }

  limpiar() {
    this.membresia = { id: 0, nombre: '', precio: 0, duracion_dias: 0 };
  }
}