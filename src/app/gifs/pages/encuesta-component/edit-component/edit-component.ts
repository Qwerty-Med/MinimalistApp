import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
    MatSnackBarModule,],
  templateUrl: './edit-component.html',
  styleUrl: './edit-component.css'
})
export class EditComponent implements OnInit {
  private productService = inject(EncuestaService);

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
      estudiante: ['', Validators.required],
      comentarios: ['', Validators.required],
    });
  }

 onSave() {
  const data = {
    nombre: this.productForm.get('nombre')?.value,
    estudiante: this.productForm.get('estudiante')?.value,
    comentarios: this.productForm.get('comentarios')?.value,
  };

  console.log("📤 Enviando JSON:", data);

  if (this.data) {
    console.log("📤 XXXXXXXXXXX", data);
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



   

  updateForm(data: any) {
    this.productForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      estudiante: [data.estudiante, Validators.required],
      comentarios: [data.comentarios, Validators.required],
    });
  }


}

