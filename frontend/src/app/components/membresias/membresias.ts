import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GimnasioService } from '../../services/gimnasio';

@Component({
  selector: 'app-membresias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './membresias.html',
  styleUrl: './membresias.css'
})
export class MembresiasComponent implements OnInit {
  
  listaMembresias: any[] = [];

  constructor(
    private gimnasioService: GimnasioService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.obtenerMembresias();
  }

  obtenerMembresias() {
    this.gimnasioService.obtenerMembresias().subscribe({
      next: (datos: any) => {
        let respuesta = datos;
        if (typeof datos === 'string') {
           try {
             respuesta = JSON.parse(datos); 
           } catch (e) {
             console.error("Error al parsear membresias:", e);
           }
        }
        
        if (Array.isArray(respuesta)) {
          this.listaMembresias = respuesta.map((item: any) => {
            return {
              ...item,
              duracion: item.duracion_dias ?? '0'
            };
          });
        } else {
          this.listaMembresias = [];
        }

        this.cd.detectChanges();
      },
      error: (e) => {
        console.error('Error de conexión en membresías:', e);
      }
    });
  }
}