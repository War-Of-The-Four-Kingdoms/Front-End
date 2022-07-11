import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilingAppealRoutingModule } from './filing-appeal-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginPageComponent } from './login-page/login-page.component'



@NgModule({
  declarations: [

  
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    FilingAppealRoutingModule,
    BrowserModule,
    FormsModule

  ],

})
export class FilingAppealModule { }
