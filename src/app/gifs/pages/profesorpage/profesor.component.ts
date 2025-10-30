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
import { MaterialModule } from '../../../module/material/material-module';
import { ConfirmComponent } from '../../componets/confirm/confirm.component';
import { Profesor } from '../../interfaces/Profesor';
import { ProfesorService } from '../../services/profesores-service';
import { EditProfesorComponent } from './profesor-edit/edit-profesor.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profesor.component',
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
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './profesor.component.html',
  styleUrl: './profesor.component.css'
})
export class ProfesorComponent implements OnInit {

  listaProfesores: Profesor[] = [];

  private profesorService = inject(ProfesorService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = [
    'id',
    'nombre',
    'primerApellido',
    'segundoApellido',
    'telefono',
    'correo',
    'direccion',
    'materias',
    'actions'
  ];

  dataSource = new MatTableDataSource<Profesor>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    this.getProfesores();
  }

  getProfesores() {
    this.profesorService.getProfesores().subscribe({
      next: (data: any) => this.processProfesoresResponse(data),
      error: (error: any) => console.log("Error obteniendo profesores: ", error)
    });
  }

  processProfesoresResponse(resp: any) {
    const dataProfesores: Profesor[] = [];
    let listProfesores = resp;

    listProfesores.forEach((element: Profesor) => {
      dataProfesores.push(element);
    });

    this.listaProfesores = dataProfesores;

    // set the datasource
    this.dataSource = new MatTableDataSource<Profesor>(dataProfesores);
    this.dataSource.paginator = this.paginator;
  }

  openProfesorDialog() {
    const dialogRef = this.dialog.open(EditProfesorComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 1) {
        this.openSnackBar("Profesor agregado exitosamente", "Éxito");
        this.getProfesores();
      } else if (result === 2) {
        this.openSnackBar("Error al agregar el profesor", "Error");
      }
    });
  }

  edit(
    id: number,
    nombre: string,
    primerApellido: string,
    segundoApellido: string,
    telefono: number,
    correo: string,
    direccion: string,
    materias: string,
  ) {
    const dialogRef = this.dialog.open(EditProfesorComponent, {
      width: '450px',
      data: {
        id: id,
        nombre: nombre,
        primerApellido: primerApellido,
        segundoApellido: segundoApellido,
        telefono: telefono,
        correo: correo,
        direccion: direccion,
        materias: materias,
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 1) {
        this.openSnackBar("Profesor actualizado exitosamente", "Éxito");
        this.getProfesores();
      } else if (result === 2) {
        this.openSnackBar("Error al actualizar el profesor", "Error");
      }
    });
  }

  buscar(termino: string) {
    console.log('Buscando término:', termino);

    if (termino.length === 0) {
      return this.getProfesores();
    }

    this.profesorService.getProfesoresByName(termino).subscribe({
      next: (data: any) => {
        this.processProfesoresResponse(data);
        console.log('Resultado de búsqueda:', data);
      },
      error: (err) => console.log('Error en búsqueda:', err)
    });
  }

delete(id: number): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'No podrás revertir esta acción',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.profesorService.deleteProfesores(id).subscribe({
        next: () => {
          // Mensaje de éxito
          Swal.fire({
            title: 'Eliminado',
            text: 'El profesor fue eliminado correctamente.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });

          // Recargar la lista
          this.getProfesores();
        },
        error: () => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar el profesor.',
            icon: 'error'
          });
        }
      });
    }
  });
}


  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 3000
    });
  }

}
