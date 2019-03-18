import { CandidatoFormComponent } from './form/candidato-form.component';
import { CandidatoListarComponent } from './listar/candidato-listar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: CandidatoListarComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'novo',
        component: CandidatoFormComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'editar/:id',
        component: CandidatoFormComponent,
        canActivate: [AuthGuard],
    },
    {
        path: ':id/deletar',
        component: CandidatoFormComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'novo_',
        component: CandidatoFormComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CandidatoRoutingModule { }