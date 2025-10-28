import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ConfirmComponent } from '../../componets/confirm/confirm.component';
import { Estudiante } from '../../interfaces/Estudiante';
import { Evaluacion } from '../../interfaces/Evaluacion';
import { EvaluacionService } from '../../services/evaluacion-service';
import { EstudianteComponent } from '../estudiantepage/estudiante-component/estudiante.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from '../../../module/material/material-module';
import { EditComponent } from './edit-component/edit-component';

@Component({
  selector: 'app-evaluaciones-component',
  imports: [ CommonModule,
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
  templateUrl: './evaluaciones-component.html',
  styleUrl: './evaluaciones-component.css'
})
export class EvaluacionesComponent implements OnInit {

 
  listaEstudiante: Evaluacion[] = [];

  private productService = inject(EvaluacionService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  constructor() { }

  ngOnInit(): void {
    this.getProducts();
  }

  displayedColumns: string[] = ['id', 'tipo', 'materia','nota', 'estudiante', 'actions'];
  dataSource = new MatTableDataSource<Evaluacion>

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
    const dataEstudent: Evaluacion[] = [];
    let listEstudent = resp;

    listEstudent.forEach((element: Evaluacion) => {
      //element.category = element.category.name;
      // element.picture = element.picture ? 'data:image/jpeg;base64,' + element.picture : '';
      dataEstudent.push(element);
    });

    this.listaEstudiante = dataEstudent;

    //set the datasource
    this.dataSource = new MatTableDataSource<Evaluacion>(dataEstudent);
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
    tipo: string,
    nota: number,
    materia: string,
    estudiante: string,
  ) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '450px',
      data: {
        id: id,
        tipo: tipo,
        nota:nota,
        materia: materia,
        estudiante: estudiante,
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

  delete(id: number) {

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: { id: id, module: "product" }
    });

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result == 1) {
        this.openSnackBar("Evaluacion Eliminada", "Exitoso");
        this.getProducts();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al eliminar la Evaluacion", "Error");
      }

    });
  }





  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 3000
    })

  }




}



