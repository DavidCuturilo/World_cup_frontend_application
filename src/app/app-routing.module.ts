import { AlreadyLoggedGuard } from './auth/already-logged.guard';
import { Page404Component } from './page404/page404.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { MatchesComponent } from './matches/matches.component';
import { RegisterComponent } from './register/register.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { StandingsComponent } from './standings/standings.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full',redirectTo: 'signIn' },
  { path: 'signIn', component: LoginComponent, canActivate: [AlreadyLoggedGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AlreadyLoggedGuard] },
  { path: 'standings', component: StandingsComponent, canActivate: [AuthGuard] },
  { path: 'matches', component: MatchesComponent, canActivate: [AuthGuard] },
  { path: 'scoreboard', component: ScoreboardComponent, canActivate: [AuthGuard] },
  { path: '404', component: Page404Component },
  { path: '**',redirectTo: '404'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard, AlreadyLoggedGuard]
})
export class AppRoutingModule { }
