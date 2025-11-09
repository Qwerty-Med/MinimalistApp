import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../../module/material/material-module';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { Directivas } from '../../services/directivas';
import { ComentarioService } from '../../services/comentario-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-directiva-component',
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
  templateUrl: './directiva-component.html',
  styleUrl: './directiva-component.css'
})
export class DirectivaComponent implements OnInit {
  private comentarioService = inject(ComentarioService);
  selectedFile: any;
  nameImg: string = "";
  public productForm!: FormGroup;
  estadoFormulario: string = "";
  private fb = inject(FormBuilder);


  ngOnInit(): void {
    this.estadoFormulario = "Agregar";
    this.getForm();



  }


  getForm() {
    this.productForm = this.fb.group({
      contenido: ['', Validators.required],
    });
  }

  onSave() {
    const data = {
      contenido: this.productForm.get('contenido')?.value,
    };
    if ( this.productForm.get('contenido')?.value) {
      console.log("VIAJANDO, ", data)
      this.comentarioService.saveComentarios(data).subscribe({
        next: (res) => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Comentario enviado"
          });
          this.productForm.reset();

        },
        error: (err) => {
          console.error("❌ Error al guardar:", err);

        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No envie comentarios vacios!",
      });
    }

  }
}
