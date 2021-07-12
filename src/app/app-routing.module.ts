import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './app.guard';

const routes: Routes = [
  { path: 'customers/:id', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule), canLoad: [AppGuard]},
  { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: '404', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
