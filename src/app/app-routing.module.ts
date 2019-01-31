import { AuthGuardService } from './services/authguard/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //{ path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './components/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './components/register/register.module#RegisterPageModule' },
  { 
    path: 'home', 
    loadChildren: './components/home/home.module#HomePageModule',
    canActivate: [AuthGuardService]
  },
  { path: 'account', loadChildren: './components/account/account.module#AccountPageModule', canActivate: [AuthGuardService] },
  //{ path: 'modaluser', loadChildren: './components/modaluser/modaluser.module#ModaluserPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
