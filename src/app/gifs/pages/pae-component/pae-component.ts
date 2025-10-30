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
import { EditProfesorComponent } from '../profesorpage/profesor-edit/edit-profesor.component';
import { PaeService } from '../../services/pae-service';
import { PAE } from '../../interfaces/PAE';
import { EditComponent } from './edit-component/edit-component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pae-component',
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
  templateUrl: './pae-component.html',
  styleUrl: './pae-component.css'
})
export class PaeComponent implements OnInit {

  listaProfesores: PAE[] = [];

  private profesorService = inject(PaeService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

displayedColumns: string[] = ['id', 'nombre', 'estudiante','actions'];

  dataSource = new MatTableDataSource<PAE>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    this.getProducts();
    console.log('this data')
  }

  getProducts() {
    this.profesorService.getProfesores().subscribe((data: any) => {
      console.log('this data', data)
      this.processProfesoresResponse(data);
    }, (error: any) => {
      console.log("error in products: ", error);
    })
  }


  processProfesoresResponse(resp: any) {
    const dataProfesores: PAE[] = [];
    let listProfesores = resp;

    listProfesores.forEach((element: PAE) => {
      dataProfesores.push(element);
    });

    this.listaProfesores = dataProfesores;

    // set the datasource
    this.dataSource = new MatTableDataSource<PAE>(dataProfesores);
    this.dataSource.paginator = this.paginator;
  }

  openProfesorDialog() {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 1) {
        this.openSnackBar("PAE agregado exitosamente", "Éxito");
        this.getProducts();
      } else if (result === 2) {
        this.openSnackBar("Error al agregar el PAE", "Error");
      }
    });
  }

  edit(
    id: number,
    nombre: string,
    estudiante: string,
  ) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '450px',
      data: {
        id: id,
        nombre: nombre,
        estudiante: estudiante,
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 1) {
        this.openSnackBar("Profesor actualizado exitosamente", "Éxito");
        this.getProducts();
      } else if (result === 2) {
        this.openSnackBar("Error al actualizar el profesor", "Error");
      }
    });
  }

  buscar(termino: string) {
    console.log('Buscando término:', termino);

    if (termino.length === 0) {
      return this.getProducts();
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
             text: 'La Materia fue eliminado correctamente.',
             icon: 'success',
             timer: 2000,
             showConfirmButton: false
           });
 
           // Recargar la lista
           this.getProducts();
         },
         error: () => {
           Swal.fire({
             title: 'Error',
             text: 'No se pudo eliminar la materia.',
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