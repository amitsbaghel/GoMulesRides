import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AddrideComponent } from './addride/addride.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './_guards/auth.guard';
import { RidesComponent } from './rides/rides.component';
import { WalletComponent } from './wallet/wallet.component';
import { MybookingComponent } from './mybooking/mybooking.component';
import { MyridepostingComponent } from './myrideposting/myrideposting.component';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { MessageComponent } from './message/message.component';


// https://codecraft.tv/courses/angular/routing/nested-routes/
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,  children: [
    {path: 'addride', component: AddrideComponent},
    {path: 'rides', component: RidesComponent},
    {path: '', component: RidesComponent},
    {path:'wallet',component: WalletComponent},
    {path:'mybookings',component: MybookingComponent},
    {path:'myrideposting',component: MyridepostingComponent},
    {path:'message/:id',component: MessageComponent},
    {path:'message',component: MessageComponent}
  ],canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
  { path: 'upload', component: ImageuploadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
