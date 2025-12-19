import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GimnasioService } from '../../services/gimnasio';

@Component({
  selector: 'app-socios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './socios.html',
  styleUrl: './socios.css'
})
export class SociosComponent implements OnInit {
  
  listaSocios: any[] = [];

  constructor(
    private gimnasioService: GimnasioService,
    private cd: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.obtenerSocios();
  }

  obtenerSocios() {
    this.gimnasioService.obtenerSocios().subscribe({
      next: (datos: any) => {
        let respuesta = datos;
        
        if (typeof datos === 'string') {
          try {
            respuesta = JSON.parse(datos);
          } catch (e) {
            console.error("Error al parsear JSON:", e);
          }
        }

        this.listaSocios = Array.isArray(respuesta) ? respuesta : [];
        
        this.cd.detectChanges();
      },
      error: (e) => {
        console.error('Error de conexion:', e);
      }
    });
  }
}