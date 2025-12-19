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
  listaActivas: any[] = [];
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

  verReporte() {
    const url = 'http://localhost/gimnasio/backend/controllers/pago.controllers.php?op=reporte_activas';
    fetch(url).then(res => res.json()).then(data => {
      this.listaActivas = data;
      this.cd.detectChanges();
      const m = bootstrap.Modal.getOrCreateInstance(document.getElementById('ModalReporte'));
      m.show();
    });
  }

  generarPDF(accion: string) {
    window.open(`http://localhost/gimnasio/backend/reportes/reporte_pdf.php?accion=${accion}`, '_blank');
  }

  generarExcel() {
    window.open('http://localhost/gimnasio/backend/reportes/reporte_excel.php', '_blank');
  }

  generarCSV() {
    window.open('http://localhost/gimnasio/backend/reportes/reporte_csv.php', '_blank');
  }

  imprimirVista() {
    const contenido = document.getElementById("tablaReporte")?.outerHTML;
    const ventana = window.open('', '', 'height=600,width=800');
    ventana?.document.write('<html><head><title>Reporte de Membresías</title>');
    ventana?.document.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">');
    ventana?.document.write('</head><body>');
    ventana?.document.write('<h3 class="text-center my-4">Membresías Activas</h3>');
    ventana?.document.write(contenido || '');
    ventana?.document.write('</body></html>');
    ventana?.document.close();
    ventana?.print();
  }

  filtrar() {
    if (!this.filtro) return this.listaMembresias;
    return this.listaMembresias.filter(m => m.nombre.toLowerCase().includes(this.filtro.toLowerCase()));
  }

  nuevo() {
    this.limpiar();
    bootstrap.Modal.getOrCreateInstance(document.getElementById('ModalMembresia')).show();
  }

  editar(id: number) {
    const sel = this.listaMembresias.find((m: any) => m.id == id);
    if (sel) {
      this.membresia = { ...sel };
      bootstrap.Modal.getOrCreateInstance(document.getElementById('ModalMembresia')).show();
      this.cd.detectChanges();
    }
  }

  guardar() {
    const p = (this.membresia.id == 0) ? this.service.insertarMembresia(this.membresia) : this.service.actualizarMembresia(this.membresia);
    p.subscribe((res: any) => {
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

  limpiar() { this.membresia = { id: 0, nombre: '', precio: 0, duracion_dias: 0 }; }
}