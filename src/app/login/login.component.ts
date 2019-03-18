
import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';
import { Candidato } from '../candidato/candidato';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatosService } from './../candidato/service/candidatos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  usuario: Candidato = new Candidato();

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private service: CandidatosService
  ) { }

  ngOnInit() {
    this.service.isAutenticado = false;
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  onLogin() {
    console.log(this.form.value);
    this.authService.fazerLogin(this.form.value);
  }

  onCadastrar() {
    this.service.isAutenticado = false;
    this.router.navigate(['/novo_'], { relativeTo: this.route });
  }
}
