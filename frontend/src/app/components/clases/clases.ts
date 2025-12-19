import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GimnasioService } from '../../services/gimnasio';

@Component({
  selector: 'app-clases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clases.html',
  styleUrl: './clases.css'
})
export class ClasesComponent implements OnInit {
  
  listaClases: any[] = [];

  constructor(
    private gimnasioService: GimnasioService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.obtenerClases();
  }

  obtenerClases() {
    this.gimnasioService.obtenerClases().subscribe({
      next: (datos: any) => {
        let respuesta = datos;
        if (typeof datos === 'string') {
           try {
             respuesta = JSON.parse(datos); 
           } catch (e) {
             console.error("Error al parsear clases:", e);
           }
        }
        this.listaClases = Array.isArray(respuesta) ? respuesta : [];
        this.cd.detectChanges();
      },
      error: (e) => {
        console.error('Error de conexion en clases:', e);
      }
    });
  }
}