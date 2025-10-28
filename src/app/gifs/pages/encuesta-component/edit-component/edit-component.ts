import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../../module/material/material-module';
import { ConfirmComponent } from '../../../componets/confirm/confirm.component';
import { Encuesta } from '../../../interfaces/Encuesta';
import { EncuestaService } from '../../../services/encuesta-service';
import { EstudianteComponent } from '../../estudiantepage/estudiante-component/estudiante.component';

@Component({
  selector: 'app-edit-component',
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
    MatIconModule],
  templateUrl: './edit-component.html',
  styleUrl: './edit-component.css'
})
export class EditComponent implements OnInit {


  listaEstudiante: Encuesta[] = [];

  private productService = inject(EncuestaService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  constructor() { }

  ngOnInit(): void {
  }




}



