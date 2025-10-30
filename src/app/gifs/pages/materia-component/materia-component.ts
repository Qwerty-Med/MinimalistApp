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
import { Estudiante } from '../../interfaces/Estudiante';
import { EstudianteService } from '../../services/estudiante-service';
import { EstudianteComponent } from '../estudiantepage/estudiante-component/estudiante.component';
import { MateriaService } from '../../services/materia-service';
import { Materia } from '../../interfaces/Materia';
import { EditComponent } from './edit-component/edit-component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materia-component',
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
  templateUrl: './materia-component.html',
  styleUrl: './materia-component.css'
})
export class MateriaComponent implements OnInit {

 
  listaEstudiante: Materia[] = [];

  private productService = inject(MateriaService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  constructor() { }

  ngOnInit(): void {
    this.getProducts();
  }

  displayedColumns: string[] = ['id', 'nombre', 'profesor', 'estudiante','evaluaciones' ,'actions'];
  dataSource = new MatTableDataSource<Materia>

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      console.log("EVALUACIONES: ", data);
      this.processCategoriesResponse(data);
    }, (error: any) => {
      console.log("error in products: ", error);
    })
  }


  processCategoriesResponse(resp: any) {
    const dataEstudent: Materia[] = [];
    let listEstudent = resp;

    listEstudent.forEach((element: Materia) => {
      //element.category = element.category.name;
      // element.picture = element.picture ? 'data:image/jpeg;base64,' + element.picture : '';
      dataEstudent.push(element);
    });

    this.listaEstudiante = dataEstudent;

    //set the datasource
    this.dataSource = new MatTableDataSource<Materia>(dataEstudent);
    this.dataSource.paginator = this.paginator;

  }



  openProductDialog() {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result == 1) {

        this.openSnackBar("Producto add", "Exitosa");
        this.getProducts();

      } else if (result == 2) {

        this.openSnackBar("Se produjo un error al agregar la product", "Error");

      }

    });
  }


  edit(
    id: number,
    nombre: string,
    profesor: string,
    estudiante: string,
    evaluaciones: string,
  ) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '450px',
      data: {
        id: id,
        nombre: nombre,
        profesor: profesor,
        estudiante: estudiante,
        evaluaciones: evaluaciones,
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 1) {
        this.openSnackBar("Estudiante actualizado exitosamente", "Éxito");
        this.getProducts(); // 🔸 puedes renombrar a getEstudiantes() si corresponde
      } else if (result === 2) {
        this.openSnackBar("Se produjo un error al actualizar el estudiante", "Error");
      }
    });
  }



  buscar(termino: string) {

    console.log('this is termino', termino)

    if (termino.length === 0) {
      return this.getProducts();
    }
    this.productService.getProductsByName(termino).subscribe((data: any) => {

      this.processCategoriesResponse(data);
      console.log('this is resp', data)
    })
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
      this.productService.deleteProduct(id).subscribe({
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
    })

  }




}