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
import Swal from 'sweetalert2';
import { MaterialModule } from '../../../module/material/material-module';
import { Encuesta } from '../../interfaces/Encuesta';
import { EncuestaService } from '../../services/encuesta-service';
import { EditComponent } from '../materia-component/edit-component/edit-component';
import { ComentarioService } from '../../services/comentario-service';
import { Comentario } from '../../interfaces/Comentario';

@Component({
  selector: 'app-comentarios-component',
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
  templateUrl: './comentarios-component.html',
  styleUrl: './comentarios-component.css'
})
export class ComentariosComponent implements OnInit {

 
  listaEstudiante: Comentario[] = [];

    private comentarioService = inject(ComentarioService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  constructor() { }

  ngOnInit(): void {
    this.getProducts();
  }

  displayedColumns: string[] = ['id', 'contenido'];
  dataSource = new MatTableDataSource<Comentario>

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProducts() {
    this.comentarioService.getEncuestas().subscribe((data: any) => {
      this.processCategoriesResponse(data);
    }, (error: any) => {
      console.log("error in products: ", error);
    })
  }


  processCategoriesResponse(resp: any) {
    const dataEstudent: Comentario[] = [];
    let listEstudent = resp;

    listEstudent.forEach((element: Comentario) => {
      //element.category = element.category.name;
      // element.picture = element.picture ? 'data:image/jpeg;base64,' + element.picture : '';
      dataEstudent.push(element);
    });

    this.listaEstudiante = dataEstudent;

    //set the datasource
    this.dataSource = new MatTableDataSource<Comentario>(dataEstudent);
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

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 3000
    })

  }




}
