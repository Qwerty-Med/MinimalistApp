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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta-component',
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
  templateUrl: './encuesta-component.html',
  styleUrl: './encuesta-component.css'
})  
export class EncuestaComponent  implements OnInit {

 
  listaEstudiante: Encuesta[] = [];

  private productService = inject(EncuestaService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  constructor() { }

  ngOnInit(): void {
    this.getProducts();
  }

  displayedColumns: string[] = ['id', 'titulo', 'estudiante','comentarios', 'actions'];
  dataSource = new MatTableDataSource<Encuesta>

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProducts() {
    this.productService.getEncuestas().subscribe((data: any) => {
      this.processCategoriesResponse(data);
    }, (error: any) => {
      console.log("error in products: ", error);
    })
  }


  processCategoriesResponse(resp: any) {
    const dataEstudent: Encuesta[] = [];
    let listEstudent = resp;

    listEstudent.forEach((element: Encuesta) => {
      //element.category = element.category.name;
      // element.picture = element.picture ? 'data:image/jpeg;base64,' + element.picture : '';
      dataEstudent.push(element);
    });

    this.listaEstudiante = dataEstudent;

    //set the datasource
    this.dataSource = new MatTableDataSource<Encuesta>(dataEstudent);
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
    estudiante: string,
    comentarios: string,
  ) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '450px',
      data: {
        id: id,
        nombre: nombre,
        estudiante:estudiante,
        comentarios: comentarios,
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
               text: 'La encuesta fue eliminado correctamente.',
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
               text: 'No se pudo eliminar la encuesta.',
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



