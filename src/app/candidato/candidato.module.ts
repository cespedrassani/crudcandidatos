import { CandidatoRoutingModule } from './candidato-routing.module';
import { CandidatoFormComponent } from './form/candidato-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatoListarComponent } from './listar/candidato-listar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CandidatosService } from './service/candidatos.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CandidatoRoutingModule,
    ],
    providers: [
        CandidatosService
    ],
    declarations: [
        CandidatoListarComponent,
        CandidatoFormComponent
    ]
})
export class CandidatoModule { }