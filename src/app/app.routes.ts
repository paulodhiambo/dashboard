import { Routes } from '@angular/router';
import { ShellComponent } from './core/layout/shell/shell.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(c => c.Login)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then(c => c.Dashboard)
      },
      {
        path: 'organizations',
        loadComponent: () => import('./features/organizations/org-list/org-list').then(c => c.OrgListComponent)
      },
      {
        path: 'organizations/new',
        loadComponent: () => import('./features/organizations/org-onboarding/org-onboarding').then(c => c.OrgOnboardingComponent)
      },
      {
        path: 'organizations/search',
        loadComponent: () => import('./features/organizations/org-search/org-search').then(c => c.OrgSearchComponent)
      },
      {
        path: 'organizations/detail/:code',
        loadComponent: () => import('./features/organizations/org-detail/org-detail').then(c => c.OrgDetailComponent)
      },
      {
        path: 'organizations/review/:id',
        loadComponent: () => import('./features/organizations/org-review/org-review').then(c => c.OrgReviewComponent)
      },
      {
        path: 'tills',
        loadComponent: () => import('./features/till-management/till-management/till-management').then(c => c.TillManagement)
      },
      {
        path: 'tills/review/:id',
        loadComponent: () => import('./features/till-management/till-review/till-review').then(c => c.TillReviewComponent)
      },
      {
        path: 'tills/reserve',
        loadComponent: () => import('./features/till-management/reserve-till/reserve-till').then(c => c.ReserveTillComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/users/user-list/user-list').then(c => c.UserListComponent)
      },
      {
        path: 'users/add',
        loadComponent: () => import('./features/users/user-add/user-add').then(c => c.UserAdd)
      },
      {
        path: 'products',
        loadComponent: () => import('./features/products/products-list/products-list').then(c => c.ProductsList)
      }
    ]
  }
];
