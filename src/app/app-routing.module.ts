import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { MatchesComponent } from './matches/matches.component';
import { RegisterComponent } from './register/register.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { StandingsComponent } from './standings/standings.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signIn', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'standings', component: StandingsComponent, canActivate: [AuthGuard] },
  { path: 'matches', component: MatchesComponent, canActivate: [AuthGuard] },
  { path: 'scoreboard', component: ScoreboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
