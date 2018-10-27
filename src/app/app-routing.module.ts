import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AddrideComponent } from './addride/addride.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './_guards/auth.guard';


// https://codecraft.tv/courses/angular/routing/nested-routes/
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,  children: [
    
    {path: 'addride', component: AddrideComponent} 
  ],canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
