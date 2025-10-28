import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MateriaService } from '../../../services/materia-service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../../../module/material/material-module';

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
    MatSnackBarModule,
  ],
  templateUrl: './edit-component.html',
  styleUrl: './edit-component.css'
})
export class EditComponent implements OnInit {
  private productService = inject(MateriaService);

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
      profesor: ['', Validators.required],
      estudiante: ['', Validators.required],
      evaluaciones: ['', Validators.required],
      directiva: ['', Validators.required],
    });
  }

 onSave() {
  const data = {
    nombre: this.productForm.get('nombre')?.value,
    profesor: this.productForm.get('profesor')?.value,
    segundoApellido: this.productForm.get('segundoApellido')?.value,
    estudiante: this.productForm.get('estudiante')?.value,
    evaluaciones: this.productForm.get('evaluaciones')?.value,
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
      profesor: [data.profesor, Validators.required],
      estudiante: [data.estudiante, Validators.required],
      evaluaciones: [data.evaluaciones, Validators.required],
      directiva: [data.directiva, Validators.required],
    });
  }


}

