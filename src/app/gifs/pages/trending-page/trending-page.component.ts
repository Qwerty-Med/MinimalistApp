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
import { MateriaService } from '../../services/materia-service';
import { Materia } from '../../interfaces/Materia';
import { PAE } from '../../interfaces/PAE';
import { PaeService } from '../../services/pae-service';


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
export default class TrendingPageComponent implements OnInit {


  chartBar: any;
  charDoughnut: any;
  private estudianteService = inject(EstudianteService);
  private materiasService = inject(MateriaService);
  private paeService = inject(PaeService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  constructor() {
    // Registrar todos los componentes necesarios de Chart.js
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getEstudiantes();
    this.getProfesores();
     this.getPae();
  }

  getEstudiantes() {
    this.estudianteService.getProducts().subscribe({
      next: (data) => this.processEstudiantesResponse(data),
      error: (err) => console.error('Error al cargar estudiantes:', err)
    });
  }

  getProfesores() {
    this.materiasService.getProducts().subscribe({
      next: (data) => this.processMateriasResponse(data),
      error: (err) => console.error('Error al cargar estudiantes:', err)
    });
  }

  getPae() {
    this.paeService.getProfesores().subscribe({
      next: (data) => this.processPAEResponse(data),
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


  processMateriasResponse(resp: Materia[]) {
    // Labels: nombres de las materias
    const labels = resp.map(m => m.nombre);

    // Datos: 1 por cada materia para mostrar cantidad en barras
    const data = resp.map(_ => 1);

    // Colores para cada barra
    const colors = labels.map(_ => '#' + Math.floor(Math.random() * 16777215).toString(16));

    // ===== GRÁFICO DE BARRAS =====
    new Chart('materiaBar', {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Cantidad de Materias',
          data,
          backgroundColor: colors,
          borderColor: '#333',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Cantidad de Materias Registradas' }
        },
        scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
      }
    });

    // ===== GRÁFICO DOUGHNUT =====
    new Chart('materiaDoughnut', {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          label: 'Distribución de Materias',
          data,
          backgroundColor: colors
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          title: { display: true, text: 'Distribución de Materias' }
        }
      }
    });
  }


  processPAEResponse(resp: PAE[]) {
    // ===== Preparar datos =====
    const totalPAE = resp.length;

    // Labels: nombres de los estudiantes (sin repetir)
    const students = Array.from(new Set(resp.map(p => p.estudiante)));

    // Datos: contar cuántos PAE tiene cada estudiante
    const dataByStudent = students.map(s => resp.filter(p => p.estudiante === s).length);

    // Colores para cada estudiante
    const colors = students.map(_ => '#' + Math.floor(Math.random() * 16777215).toString(16));

    // ===== GRÁFICO DE BARRAS =====
    new Chart('paeBar', {
      type: 'bar',
      data: {
        labels: ['Total PAE'],
        datasets: [{
          label: 'Cantidad de PAE',
          data: [totalPAE],
          backgroundColor: '#42A5F5',
          borderColor: '#333',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Total de PAE Registrados' }
        },
        scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
      }
    });

    // ===== GRÁFICO DOUGHNUT (Distribución por Estudiante) =====
    new Chart('paeDoughnut', {
      type: 'polarArea',
      data: {
        labels: students,
        datasets: [{
          label: 'PAE por Estudiante',
          data: dataByStudent,
          backgroundColor: colors
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          title: { display: true, text: 'Distribución de PAE por Estudiante' }
        }
      }
    });
  }



}














