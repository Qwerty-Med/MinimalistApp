import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./gifs/pages/dashboard-page/dashboard-page-component/dashboard-page-component'),
    children: [
      {
        path: 'trending',
        loadComponent: () =>
          import('./gifs/pages/trending-page/trending-page.component'),
      },
      {
        path: 'administracion',
        loadComponent: () =>
          import('./gifs/pages/directiva-component/directiva-component').then(m => m.DirectivaComponent),
        children: [
          {
            path: 'profesor',
            loadComponent: () =>
              import('./gifs/pages/profesorpage/profesor-edit/edit-profesor.component')
                .then(m => m.EditProfesorComponent),
          }
        ]
      },
      {
        path: 'profesores',
        loadComponent: () =>
          import('./gifs/pages/profesorpage/profesor.component').then(m => m.ProfesorComponent),
        children: [
          {
            path: 'profesor',
            loadComponent: () =>
              import('./gifs/pages/profesorpage/profesor-edit/edit-profesor.component')
                .then(m => m.EditProfesorComponent),
          }
        ]
      },
      {
        path: 'estudiantes',
        loadComponent: () =>
          import('./gifs/pages/estudiantepage/search-page.component'),
        children: [
          {
            path: 'estudiante',
            loadComponent: () =>
              import('./gifs/pages/estudiantepage/estudiante-component/estudiante.component')
                .then(m => m.EstudianteComponent),
          }
        ]
      },
      {
        path: 'materias',
        loadComponent: () =>
          import('./gifs/pages/materia-component/materia-component').then(m => m.MateriaComponent),
        children: [
          {
            path: 'editMaterias',
            loadComponent: () =>
              import('./gifs/pages/materia-component/edit-component/edit-component')
                .then(m => m.EditComponent),
          }
        ]
      },
      {
        path: 'evaluaciones',
        loadComponent: () =>
          import('./gifs/pages/evaluaciones-component/evaluaciones-component').then(m => m.EvaluacionesComponent),
        children: [
          {
            path: 'profesor',
            loadComponent: () =>
              import('./gifs/pages/evaluaciones-component/edit-component/edit-component')
                .then(m => m.EditComponent),
          }
        ]
      },
      {
        path: 'encuestas',
        loadComponent: () =>
          import('./gifs/pages/encuesta-component/encuesta-component').then(m => m.EncuestaComponent),
        children: [
          {
            path: 'editEncuesta',
            loadComponent: () =>
              import('./gifs/pages/encuesta-component/edit-component/edit-component')
                .then(m => m.EditComponent),
          }
        ]
      }, {
        path: 'pae',
        loadComponent: () =>
          import('./gifs/pages/pae-component/pae-component').then(m => m.PaeComponent),
        children: [
          {
            path: 'editPae',
            loadComponent: () =>
              import('./gifs/pages/pae-component/edit-component/edit-component')
                .then(m => m.EditComponent),
          }
        ]
      },

      {
        path: '**',
        redirectTo: 'trending'
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
