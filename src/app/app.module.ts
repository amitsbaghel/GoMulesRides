import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule }    from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddrideComponent } from './addride/addride.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RidesComponent } from './rides/rides.component';
import { WalletComponent } from './wallet/wallet.component';
import { MessageComponent } from './message/message.component';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateCustomParserFormatter} from './shared/dateFormat'
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GreaterThanValidatorDirective } from './shared/greater-than.directive';
import { SumPipe } from './shared/sum.pipe';
import { MybookingComponent } from './mybooking/mybooking.component';
import { MyridepostingComponent } from './myrideposting/myrideposting.component';
import { TimeBeforeValidatorDirective } from './shared/time-before.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AddrideComponent,
    PageNotFoundComponent,
    RidesComponent,
    WalletComponent,
    MessageComponent,
    GreaterThanValidatorDirective,
    TimeBeforeValidatorDirective,
    SumPipe,
    MybookingComponent,
    MyridepostingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [ {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter},SumPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
