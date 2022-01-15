import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginFormComponent } from './login-form/login-form.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterFormComponent } from './register-form/register-form.component';

const routes: Routes = [
  { path: '', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: '**', redirectTo: '' }, // Wildcard redirect to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
