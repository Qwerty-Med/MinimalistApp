import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from "./../../../module/material/material-module";
import { EstudianteService } from '../../services/estudiante-service';
import { Estudiante } from '../../interfaces/Estudiante';
import { MatDialog } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-trending-page-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
],
  templateUrl: './trending-page.component.html',
  styleUrl: './trending-page.component.css'
})
export default class TrendingPageComponent implements OnInit{


  chartBar: any;
  charDoughnut: any;
  private estudianteService = inject(EstudianteService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

   constructor() {
    // Registrar todos los componentes necesarios de Chart.js
    Chart.register(...registerables);
  }

  ngOnInit(): void {   
    this.getEstudiantes();
  }

  getEstudiantes() {
    this.estudianteService.getProducts().subscribe({
      next: (data) => this.processEstudiantesResponse(data),
      error: (err) => console.error('Error al cargar estudiantes:', err)
    });
  }

processEstudiantesResponse(resp: Estudiante[]) {
    const totalEstudiantes = resp.length;

    // Si quisieras mostrar más adelante por PAE, podrías agruparlos aquí
    const labels = ['Total Estudiantes'];
    const data = [totalEstudiantes];

    // ==== GRÁFICO DE BARRAS ====
    this.chartBar = new Chart('canvas-bar', {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Cantidad de Estudiantes',
            data,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Total de Estudiantes Registrados' }
        },
        scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
      }
    });

    // ==== GRÁFICO DOUGHNUT ====
    this.chartBar = new Chart('myChart', {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Distribución de Estudiantes',
            data,
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC']
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }
    
  }






 


 

 


