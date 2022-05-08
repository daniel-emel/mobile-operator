import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
{
  path: 'home', 
  loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
},
{path: 'subscription', loadChildren: () => import('./pages/subscription/subscription.module').then(m => m.SubscriptionModule)},
{path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule), canActivate: [AuthGuard]},
{path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)},
{path: 'not-found', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)},
{path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
{path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)},
{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},
{
  path: '**',
  redirectTo: '/not-found'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
