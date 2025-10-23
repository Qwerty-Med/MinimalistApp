import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../module/material/material-module';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../../componets/confirm/confirm.component';
import { EstudianteService } from '../../../services/estudiante-service';
import { EstudianteComponent } from './estudiante-component/estudiante.component';

interface Product {
    id: number;
    name: string;
    price: number;
    account: number;
    picture: string;
 
}

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
    
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export default class  SearchPageComponent implements OnInit {

  listProducts: Product[] = [];

  private productService = inject(EstudianteService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  constructor() { }

  ngOnInit(): void {
    this.getProducts();
  }

  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture', 'actions'];
  dataSource = new MatTableDataSource<ProductElement>

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
    const dataProduct: ProductElement[] = [];
    if (resp.metadata[0].code == "00") {
      let listCProduct = resp.product.products;

      listCProduct.forEach((element: ProductElement) => {
        //element.category = element.category.name;
        element.picture = element.picture ? 'data:image/jpeg;base64,' + element.picture : '';
        dataProduct.push(element);
      });

      this.listProducts = dataProduct;

      //set the datasource
      this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
      this.dataSource.paginator = this.paginator;
    }
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


  edit(id: number, name: string, price: number, account: number, category: any) {

    const dialogRef = this.dialog.open(EstudianteComponent, {
      width: '450px',
      data: { id: id, name: name, price: price, account: account, category: category }
    });

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result == 1) {
        this.openSnackBar("Producto Actualizada", "Exitosa");
        this.getProducts();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al actualizar la producto", "Error");
      }

    });
  }


  buscar(termino: string) {

    console.log('this is termino', termino)

    if (termino.length === 0) {
      return this.getProducts();
    }
    this.productService.getProductsByName(termino).subscribe((data: any) =>{
      
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
       this.openSnackBar("Product Eliminado", "Exitoso");
       this.getProducts();
     } else if (result == 2) {
       this.openSnackBar("Se produjo un error al eliminar la Product", "Error");
     }
 
   });
 }
 

 


  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 3000
    })

  }




}



export interface ProductElement {
  id: number;
  name: string;
  price: number;
  account: number;
  category: any;
  picture: any;

}