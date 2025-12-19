import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GimnasioService } from '../../services/gimnasio';

@Component({
  selector: 'app-clases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clases.html'
})
export class ClasesComponent implements OnInit {
  
  listaClases: any[] = [];

  constructor(
    private gimnasioService: GimnasioService
  ) {}

  ngOnInit(): void {
    this.obtenerClases();
  }

  obtenerClases() {
    this.gimnasioService.obtenerClases().subscribe({
      next: (datos: any) => {
        if (typeof datos === 'string') {
           try {
             datos = JSON.parse(datos); 
           } catch (e) {
           }
        }
        this.listaClases = datos;
      },
      error: (e) => {
      }
    });
  }
}