import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../../../module/material/material-module';
import { EstudianteService } from '../../../services/estudiante-service';
import { ProfesorService } from '../../../services/profesores-service';

@Component({
  selector: 'app-edit-profesor.component',
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
  templateUrl: './edit-profesor.component.html',
  styleUrl: './edit-profesor.component.css'
})
export class EditProfesorComponent implements OnInit {

  private productService = inject(ProfesorService);

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
  };

  console.log("📤 Enviando JSON:", data);

  if (this.data) {
    this.productService.updateProfesores(data, this.data.id).subscribe({
      
      next: () => this.dialogRef.close(1),
      error: (err) => {
          console.log("📤 EDITANDO", data);
        this.dialogRef.close(2);
      }
    });
  } else {
    this.productService.saveProfesores(data).subscribe({
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
    });
  }


}
