import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby/lobby.component';
import { FilingAppealRoutingModule } from './filing-appeal-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    LobbyComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FilingAppealRoutingModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class FilingAppealModule { }
