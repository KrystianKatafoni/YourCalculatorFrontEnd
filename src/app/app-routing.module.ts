import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CalculatorComponent} from './calculator/calculator.component';
import {ContactComponent} from './contact/contact.component';
import {InfoComponent} from './info/info.component';
import {SearchComponent} from './search/search.component';
import {ViewComponent} from './view/view.component';
import {ViewResolver} from './view/view.resolver';
import {SearchResolver} from "./search/search.resolver";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calculator', component: CalculatorComponent},
  { path: 'search', component: SearchComponent, resolve: {calculators: SearchResolver}},
  { path: 'contact', component: ContactComponent},
  { path: 'info', component: InfoComponent},
  { path: 'view/:id', component: ViewComponent, resolve: { calculator : ViewResolver}}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
