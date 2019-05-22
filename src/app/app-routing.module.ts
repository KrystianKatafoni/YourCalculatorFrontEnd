import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {CalculatorComponent} from './calculator/calculator.component';
import {ContactComponent} from './contact/contact.component';
import {InfoComponent} from './info/info.component';
import {SearchComponent} from './search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent},
  { path: 'calculator', component: CalculatorComponent},
  { path: 'search', component: SearchComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'info', component: InfoComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
