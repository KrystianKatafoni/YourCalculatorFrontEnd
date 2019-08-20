import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CalculatorComponent } from './calculator/calculator.component';
import { ContactComponent } from './contact/contact.component';
import { InfoComponent } from './info/info.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './search/search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddCalculatorComponent } from './calculator/add-calculator/add-calculator.component';
import { InfoCalculatorComponent } from './calculator/info-calculator/info-calculator.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { VariablesDialogComponent } from './calculator/variables-dialog/variables-dialog.component';
import { AddInfoCalcComponent } from './calculator/add-calculator/add-info-calc/add-info-calc.component';
import { AddConstCalcComponent } from './calculator/add-calculator/add-const-calc/add-const-calc.component';
import { AddInputCalcComponent } from './calculator/add-calculator/add-input-calc/add-input-calc.component';
import { AddOutputCalcComponent } from './calculator/add-calculator/add-output-calc/add-output-calc.component';
import { AddExpressionCalcComponent } from './calculator/add-calculator/add-expression-calc/add-expression-calc.component';
import { AddDoneCalcComponent } from './calculator/add-calculator/add-done-calc/add-done-calc.component';
import { AddAcceptanceCalcComponent } from './calculator/add-calculator/add-acceptance-calc/add-acceptance-calc.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { environment } from '../environments/environment';
import { ViewComponent } from './view/view.component';
import {CalculatorStorageService} from "./shared/storage/calculator-storage.service";
import {CategoryStorageService} from "./shared/storage/category-storage.service";
import {ViewResolver} from "./view/view.resolver";
@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    ContactComponent,
    InfoComponent,
    HomeComponent,
    SearchComponent,
    AddCalculatorComponent,
    InfoCalculatorComponent,
    VariablesDialogComponent,
    AddInfoCalcComponent,
    AddConstCalcComponent,
    AddInputCalcComponent,
    AddOutputCalcComponent,
    AddExpressionCalcComponent,
    AddDoneCalcComponent,
    AddAcceptanceCalcComponent,
    ViewComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DragDropModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'yourcalculator-online'),
    AngularFireDatabaseModule
  ],
  providers: [ViewResolver],
  bootstrap: [AppComponent],
  entryComponents: [VariablesDialogComponent]
})
export class AppModule {
}
