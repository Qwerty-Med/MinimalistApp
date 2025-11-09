import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOption {
  icon: string;
  label: string;
  route: string;
  subLabel: string;
}


@Component({
  selector: 'app-gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-menu-options-component.html',
  styleUrl: './gifs-side-menu-options-component.css'
})
export class GifsSideMenuOptionsComponent {
  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-house-user',
      label: 'Home',
      subLabel: 'Pagina principal',
      route: '/dashboard/trending',
    },
    {
      icon: 'fa-solid fa-envelope',
      label: 'Escribe Tu Carta',
      subLabel: 'Administracion',
      route: '/dashboard/coment',
    }, 

    {
      icon: 'fa-solid fa-user-tie',
      label: 'Comentarios',
      subLabel: 'Comentario',
      route: '/dashboard/comentarios',
    },

    {
      icon: 'fa-solid fa-person-chalkboard',
      label: 'Profesor',
      subLabel: 'Profesor',
      route: '/dashboard/profesores',
    },
    {
      icon: 'fa-solid fa-users',
      label: 'Estudiante',
      subLabel: 'Estudiante',
      route: '/dashboard/estudiantes',
    },
    {
      icon: 'fa-solid fa-users',
      label: 'Materia',
      subLabel: 'Estudiante',
      route: '/dashboard/materias',
    },
    {
      icon: 'fa-solid fa-book',
      label: 'Evaluacion',
      subLabel: 'Evaluaciones',
      route: '/dashboard/evaluaciones',
    },
    {
      icon: 'fa-solid fa-note-sticky',
      label: 'Encuesta',
      subLabel: 'Encuestas',
      route: '/dashboard/encuestas',
    },
    {
      icon: 'fa-solid fa-utensils',
      label: 'Pae',
      subLabel: 'pae estudiantil',
      route: '/dashboard/pae',
    },
  ];

}
