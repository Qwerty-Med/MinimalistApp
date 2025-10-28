import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../../module/material/material-module';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { Directivas } from '../../services/directivas';

@Component({
  selector: 'app-directiva-component',
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
    MatSnackBarModule,
    MatIconModule],
  templateUrl: './directiva-component.html',
  styleUrl: './directiva-component.css'
})
export class DirectivaComponent implements OnInit {
   private directivaService = inject(Directivas);

  directiva: any = {};
  resumen: any[] = [];

  chartBar: any;
  chartDoughnut: any;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getDirectivaData();
  }

  getDirectivaData() {
    this.directivaService.getProducts() // 🔹 Ajusta la URL según tu endpoint
      .subscribe({
        next: (data: any) => {
          this.directiva = data;
          this.buildResumen();
          this.generateCharts();
        },
        error: (err) => {
          console.error('❌ Error al cargar datos de directiva:', err);
        }
      });
  }

  buildResumen() {
    this.resumen = [
      { label: 'Profesores', total: this.directiva.profesores?.length || 0 },
      { label: 'Estudiantes', total: this.directiva.estudiantes?.length || 0 },
      { label: 'Materias', total: this.directiva.materias?.length || 0 },
      { label: 'Charlas', total: this.directiva.charlas?.length || 0 },
      { label: 'Encuestas', total: this.directiva.encuestas?.length || 0 },
    ];
  }

  generateCharts() {
    const labels = this.resumen.map(r => r.label);
    const dataValues = this.resumen.map(r => r.total);

    // Destruir gráficos previos si ya existen
    if (this.chartBar) this.chartBar.destroy();
    if (this.chartDoughnut) this.chartDoughnut.destroy();

    // 🔹 Gráfico de Barras
    this.chartBar = new Chart('canvas-bar', {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Cantidad',
          data: dataValues,
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#EC407A'],
          borderColor: '#1E88E5',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Resumen General de la Directiva' }
        },
        scales: { y: { beginAtZero: true } }
      }
    });

    // 🔹 Gráfico Circular (Doughnut)
    this.chartDoughnut = new Chart('myChart', {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          label: 'Distribución',
          data: dataValues,
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#EC407A'],
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          title: { display: true, text: 'Distribución de Entidades' }
        }
      }
    });
  }

  refreshData() {
    this.getDirectivaData();
  }
}