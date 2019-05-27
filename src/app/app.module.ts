import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LoginComponent } from './auth/login/login.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ContactComponent } from './contact/contact.component';
import { InfoComponent } from './info/info.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './search/search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FastCalculationsComponent } from './fast-calculations/fast-calculations.component';
import { FastCalculatorComponent } from './fast-calculations/fast-calculator/fast-calculator.component';
import { FastEquationsComponent } from './fast-calculations/fast-equations/fast-equations.component';
import { SimpleDialogComponent } from './fast-calculations/fast-calculator/simple-dialog/simple-dialog.component';
import { CustomDialogComponent } from './fast-calculations/fast-calculator/custom-dialog/custom-dialog.component';
import { AddCalculatorComponent } from './calculator/add-calculator/add-calculator.component';
import { ManageCalculatorComponent } from './calculator/manage-calculator/manage-calculator.component';
import { InfoCalculatorComponent } from './calculator/info-calculator/info-calculator.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CalculatorComponent,
    ContactComponent,
    InfoComponent,
    HomeComponent,
    SignupComponent,
    SearchComponent,
    FastCalculationsComponent,
    FastCalculatorComponent,
    FastEquationsComponent,
    SimpleDialogComponent,
    CustomDialogComponent,
    AddCalculatorComponent,
    ManageCalculatorComponent,
    InfoCalculatorComponent,

  ],
  entryComponents: [
    SimpleDialogComponent,
    CustomDialogComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
