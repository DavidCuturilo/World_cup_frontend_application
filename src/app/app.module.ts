import { EnvServiceProvider } from './services/env/env.service.provider';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { MaterialModule } from './material';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StandingsComponent } from './standings/standings.component';
import { MatchesComponent } from './matches/matches.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { PredictionOfResultsModalComponent } from './prediction-of-results-modal/prediction-of-results-modal.component';
import { Page404Component } from './page404/page404.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    StandingsComponent,
    MatchesComponent,
    ScoreboardComponent,
    PredictionOfResultsModalComponent,
    Page404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    EnvServiceProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
