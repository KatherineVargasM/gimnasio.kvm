import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GimnasioService } from '../../services/gimnasio';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagos.html',
  styleUrl: './pagos.css'
})
export class PagosComponent implements OnInit {
  
  listaPagos: any[] = [];

  constructor(
    private gimnasioService: GimnasioService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.obtenerPagos();
  }

  obtenerPagos() {
    this.gimnasioService.obtenerPagos().subscribe({
      next: (datos: any) => {
        let respuesta = datos;
        if (typeof datos === 'string') {
          try {
            respuesta = JSON.parse(datos);
          } catch (e) {}
        }
        this.listaPagos = Array.isArray(respuesta) ? respuesta : [];
        this.cd.detectChanges();
      }
    });
  }

  eliminarPago(id: number) {
    if (confirm('¿Estás seguro de eliminar este registro de pago?')) {
      this.gimnasioService.eliminarPago(id).subscribe({
        next: () => {
          this.obtenerPagos();
        }
      });
    }
  }
}