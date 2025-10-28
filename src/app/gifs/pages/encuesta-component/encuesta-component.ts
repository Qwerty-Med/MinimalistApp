import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { EncuestaService } from '../../services/encuesta-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from "../../../module/material/material-module";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Encuesta } from '../../interfaces/Encuesta';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../componets/confirm/confirm.component';
import { Estudiante } from '../../interfaces/Estudiante';
import { EstudianteComponent } from '../estudiantepage/estudiante-component/estudiante.component';
import { EditComponent } from './edit-component/edit-component';

@Component({
  selector: 'app-encuesta-component',
  imports: [
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MaterialModule,
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
    MatIconModule
],
  templateUrl: './encuesta-component.html',
  styleUrl: './encuesta-component.css'
})  
export class EncuestaComponent implements OnInit {
  encuestas: any[] = [];
  searchTerm: string = '';
  displayedColumns: string[] = ['titulo', 'estudiante', 'directiva', 'acciones'];

  constructor(private encuestaService: EncuestaService) {}

  ngOnInit(): void {
    this.cargarEncuestas();
  }

  cargarEncuestas() {
    this.encuestaService.getEncuestas().subscribe((data) => {
      this.encuestas = data;
    });
  }

  reloadEncuestas() {
    this.cargarEncuestas();
  }

  filteredEncuestas() {
    return this.encuestas.filter(e =>
      e.titulo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  verDetalles(encuesta: any) {
    // Puedes abrir un diálogo o navegar a un detalle
    console.log('Encuesta seleccionada:', encuesta);
  }
}