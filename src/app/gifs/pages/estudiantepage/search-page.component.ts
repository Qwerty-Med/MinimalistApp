import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../module/material/material-module';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../componets/confirm/confirm.component';
import { EstudianteService } from '../../services/estudiante-service';
import { EstudianteComponent } from './estudiante-component/estudiante.component';
import { Estudiante } from '../../interfaces/Estudiante';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-search-page-component',
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
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export default class SearchPageComponent implements OnInit {

 
  listaEstudiante: Estudiante[] = [];

  private productService = inject(EstudianteService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  constructor() { }

  ngOnInit(): void {
    this.getProducts();
  }

  displayedColumns: string[] = ['id', 'nombre', 'primerApellido', 'segundoApellido', 'telefono', 'correo', 'direccion', 'pae', 'materias', 'actions'];
  dataSource = new MatTableDataSource<Estudiante>

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.processCategoriesResponse(data);
    }, (error: any) => {
      console.log("error in products: ", error);
    })
  }


  processCategoriesResponse(resp: any) {
    const dataEstudent: Estudiante[] = [];
    let listEstudent = resp;

    listEstudent.forEach((element: Estudiante) => {
      //element.category = element.category.name;
      // element.picture = element.picture ? 'data:image/jpeg;base64,' + element.picture : '';
      dataEstudent.push(element);
    });

    this.listaEstudiante = dataEstudent;

    //set the datasource
    this.dataSource = new MatTableDataSource<Estudiante>(dataEstudent);
    this.dataSource.paginator = this.paginator;

  }



  openProductDialog() {
    const dialogRef = this.dialog.open(EstudianteComponent, {
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
    primerApellido: string,
    segundoApellido: string,
    telefono: number,
    correo: string,
    direccion: string,
    materias: string,
    pae: boolean,
  ) {
    const dialogRef = this.dialog.open(EstudianteComponent, {
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
        pae: pae,
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
            text: 'El profesor fue eliminado correctamente.',
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
    })

  }




}



