
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertModalModule } from './alert-modal/alert-modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { CandidatoModule } from './candidato/candidato.module';
import { CandidatosService } from './candidato/service/candidatos.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    AlertModalModule,
    FormsModule,
    ReactiveFormsModule,
    CandidatoModule
  ],
  providers: [
      AuthService,
      AuthGuard,
      CandidatosService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
