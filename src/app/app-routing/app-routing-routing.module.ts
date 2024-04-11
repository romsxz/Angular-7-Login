import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { LoginHomeComponent } from '../login-home/login-home.component';

const routes: Routes = [
  { path : '', redirectTo: '/login', pathMatch: 'full' },
  { path : 'login', component: LoginComponent },
  { path : 'loginHome', component: LoginHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingRoutingModule { }
