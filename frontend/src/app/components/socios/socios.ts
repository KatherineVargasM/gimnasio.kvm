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
        console.log('Datos recibidos del backend:', datos);

        if (typeof datos === 'string') {
           try {
             datos = JSON.parse(datos); 
             console.log('Datos convertidos de string a JSON:', datos);
           } catch (e) {
             console.error('Error al intentar convertir JSON:', e);
           }
        }

        this.listaSocios = datos;

        this.cd.detectChanges();
        
        console.log('Lista de socios actualizada:', this.listaSocios);
      },
      error: (e) => {
        console.error('Error de conexión:', e);
      }
    });
  }
}