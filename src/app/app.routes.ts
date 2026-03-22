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
        path: 'organizations/detail/:code',
        loadComponent: () => import('./features/organizations/org-detail/org-detail').then(c => c.OrgDetailComponent)
      },
      {
        path: 'tills',
        loadComponent: () => import('./features/till-management/till-management/till-management').then(c => c.TillManagement)
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
        path: 'approvals',
        loadComponent: () => import('./features/approvals/approval-list/approval-list').then(c => c.ApprovalList)
      },
      {
        path: 'approvals/:id',
        loadComponent: () => import('./features/approvals/approval-detail/approval-detail').then(c => c.ApprovalDetail)
      },
      {
        path: 'products',
        loadComponent: () => import('./features/products/products-list/products-list').then(c => c.ProductsList)
      }
    ]
  }
];
