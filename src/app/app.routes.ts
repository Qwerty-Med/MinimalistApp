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
        path: 'search',
        loadComponent: () =>
          import('./gifs/pages/estudiantepage/search-page-component/search-page.component'),
        children: [
          {
            path: 'estudiante',
            loadComponent: () =>
              import('./gifs/pages/estudiantepage/search-page-component/estudiante-component/estudiante.component')
                .then(m => m.EstudianteComponent),
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
