import { AlertModalService } from './../../alert-modal/alert-modal.service';
import { Component, OnInit } from '@angular/core';
import { CandidatosService } from '../service/candidatos.service';

import { Observable, empty, of, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { Candidato } from '../candidato';
import { CandidatoFormComponent } from './../form/candidato-form.component';

@Component({
  selector: 'app-candidato-listar',
  templateUrl: './candidato-listar.component.html',
})
export class CandidatoListarComponent implements OnInit {

  candidatos$: Observable<Candidato[]>;
  error$ = new Subject<boolean>();

  constructor(
    private service: CandidatosService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.service.isAutenticado = true;
    this.onRefresh();
  }

  onRefresh() {
    this.candidatos$ = this.service.list()
      .pipe(
        catchError(error => {
          console.error(error);
          this.handleError();
          return empty();
        })
      );
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar candidatos. Tente novamente mais tarde.');
  }

  onUpdate(id) {
    this.service.isAutenticado = true;
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onCreate() {
    this.service.isAutenticado = true;
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  onDisconect() {
    //encerra sessao do usuario, exclui token salvo
    this.service.isAutenticado = false;
    this.router.navigate(['/login'], { relativeTo: this.route });
  }

  onDelete(id) {
    this.service.delete(id);
  }

}
