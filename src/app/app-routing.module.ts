import { HomeComponent } from './component/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './component/lobby/lobby.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { GuestGuardService } from './services/guest-guard.service';
import { GameStartComponent } from './component/game-start/game-start.component';

const routes: Routes = [

  {
    path: 'lobby',
    component: LobbyComponent,
    canActivate: [ AuthGuardService ],

  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ],
  },
  {
    path: 'start',
    component: GameStartComponent,
    canActivate: [ AuthGuardService ],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [ GuestGuardService ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
