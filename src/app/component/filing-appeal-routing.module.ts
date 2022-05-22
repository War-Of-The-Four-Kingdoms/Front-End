import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LobbyComponent } from './lobby/lobby.component';


const routes: Routes = [ {
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},
{
  path: 'lobby',
  component: LobbyComponent,
},
{
  path: 'home',
  component: HomeComponent,
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilingAppealRoutingModule { }
