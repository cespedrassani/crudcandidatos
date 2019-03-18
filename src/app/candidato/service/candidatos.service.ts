import { AlertModalService } from './../../alert-modal/alert-modal.service';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { tap, delay, take, catchError, retry, map } from 'rxjs/operators';
import { Observable, throwError, empty } from 'rxjs';
import { Candidato } from '../candidato';

@Injectable({
  providedIn: 'root'
})
export class CandidatosService {

  private readonly API = `/candidate/`;
  isAutenticado: boolean;
  constructor(
    private http: HttpClient,
    private modal: AlertModalService,
  ) { }

  list() {
    return this.http.get<Candidato[]>('https://delineaapi.herokuapp.com/candidate/').pipe(delay(2000));
  }

  loadByID(id) {
    return this.http.get(`https://delineaapi.herokuapp.com/candidate/${id}`).pipe(take(1));
  }

  create(candidato) {
    console.log(JSON.stringify(candidato));
    return this.http.post('/candidate/', candidato)
      .pipe(catchError(error => {
        this.modal.showAlertDanger('Erro ao cadastrar candidato, tente novamente!');
        console.log(error);
        return empty();
      }));
  }

  update(candidato) {
    console.log(candidato);
    return this.http.put(`https://delineaapi.herokuapp.com/candidate/${candidato.id}`, candidato)
      .pipe(catchError(error => {
        this.modal.showAlertDanger('Erro ao atualizar candidato, tente novamente!');
        return empty();
      }));
  }

  save(candidato) {
    if (candidato.id) {
      return this.update(candidato);
    }
    return this.create(candidato);
  }

  delete(id) {
    return this.http.delete(`https://delineaapi.herokuapp.com/candidate/${id}/delete`).subscribe(error => {
      console.log(error);
    });
  }
}