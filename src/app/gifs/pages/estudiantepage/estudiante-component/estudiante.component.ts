import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MaterialModule } from '../../../../module/material/material-module';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstudianteService } from '../../../services/estudiante-service';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-estudiante-component',
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
    MatCheckboxModule
  ],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent implements OnInit {
  private productService = inject(EstudianteService);

  selectedFile: any;
  nameImg: string = "";
  public productForm!: FormGroup;
  estadoFormulario: string = "";
  private fb = inject(FormBuilder);

  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.estadoFormulario = "Agregar";
    this.getForm();


    if (this.data != null) {
      this.updateForm(this.data);
      this.estadoFormulario = "Actualizar";
    }

  }

  

  onCancel() {
    this.dialogRef.close(3);
  }

  getForm() {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', Validators.required],
      materias: ['', Validators.required],
      pae: ['', Validators.required],
    });
  }

 onSave() {
  const data = {
    nombre: this.productForm.get('nombre')?.value,
    primerApellido: this.productForm.get('primerApellido')?.value,
    segundoApellido: this.productForm.get('segundoApellido')?.value,
    telefono: this.productForm.get('telefono')?.value,
    direccion: this.productForm.get('direccion')?.value,
    correo: this.productForm.get('correo')?.value,
    materias: this.productForm.get('materias')?.value,
    pae: this.productForm.get('pae')?.value,
  };

  console.log("📤 Enviando JSON:", data);

  if (this.data) {
    this.productService.updateProduct(data, this.data.id).subscribe({
      next: () => this.dialogRef.close(1),
      error: (err) => {
        console.error("❌ Error al actualizar:", err);
        this.dialogRef.close(2);
      }
    });
  } else {
    this.productService.saveProducts(data).subscribe({
      next: (res) => {
        console.log("✅ Guardado con éxito:", res);
        this.dialogRef.close(1);
      },
      error: (err) => {
        console.error("❌ Error al guardar:", err);
        this.dialogRef.close(2);
      }
    });
  }
}


  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    this.nameImg = this.selectedFile.name;
  }

   

  updateForm(data: any) {
    this.productForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      primerApellido: [data.primerApellido, Validators.required],
      segundoApellido: [data.segundoApellido, Validators.required],
      telefono: [data.telefono, Validators.required],
      direccion: [data.direccion, Validators.required],
      correo: [data.correo, Validators.required],
      materias: [data.materias, Validators.required],
      pae: [data.pae, Validators.required],
       
    });
  }


}
