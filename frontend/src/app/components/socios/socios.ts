import { Component, OnInit } from '@angular/core';
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

  constructor(private gimnasioService: GimnasioService) {}

  ngOnInit(): void {
    this.obtenerSocios();
  }

  obtenerSocios() {
    this.gimnasioService.obtenerSocios().subscribe({
      next: (datos: any) => {
        console.log('Datos recibidos:', datos);

        if (typeof datos === 'string') {
           try {
             datos = JSON.parse(datos); 
             console.log('Datos convertidos manualmente:', datos);
           } catch (e) {
             console.error('Error limpiando datos:', e);
           }
        }

        this.listaSocios = datos;
      },
      error: (e) => {
        console.error('Error de conexión:', e);
      }
    });
  }
}