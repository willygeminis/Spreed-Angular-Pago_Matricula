import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoadEstudiantesComponent } from './load-estudiantes/load-estudiantes.component';
import { LoginComponent } from './login/login.component';
import { PagosComponent } from './pagos/pagos.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoadPagosComponent } from './load-pagos/load-pagos.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthorizationGuard } from './guards/Auhorizationt';
import { EstudiantesDetailsComponent } from './estudiantes-details/estudiantes-details.component';
import { NewPagoComponent } from './new-pago/new-pago.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  {
    path: "admin", component: AdminTemplateComponent,
    canActivate:[AuthGuard],
    children: [
      { path: "home", component: HomeComponent },
      { path: "profile", component: ProfileComponent },
      {
        path: "loadEstudiantes", component: LoadEstudiantesComponent,
        canActivate: [AuthorizationGuard], data: { role: ['ADMIN'] }
      },
      {
        path: "loadPagos", component: LoadPagosComponent,
        canActivate: [AuthorizationGuard], data: { role: ['ADMIN'] }
      },
      { path: "estudiantes", component: EstudiantesComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "pagos", component: PagosComponent },
      {path: "estudiante-detalles/:codigo", component: EstudiantesDetailsComponent },
      {path:"new-pago/:codigo", component: NewPagoComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
