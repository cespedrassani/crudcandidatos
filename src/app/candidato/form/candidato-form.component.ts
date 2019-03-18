import { AlertModalService } from './../../alert-modal/alert-modal.service';
import { CandidatosService } from './../service/candidatos.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from './../../guards/auth.guard';
import { AuthService } from './../../login/auth.service';

@Component({
    selector: 'app-candidato-form',
    templateUrl: './candidato-form.component.html'
})
export class CandidatoFormComponent implements OnInit {
    isAutenticado = false;
    formularioNome = 'Cadastro';
    submitted = false;
    form = this.fb.group({
        password: new FormControl('', Validators.compose([Validators.required])),
// tslint:disable-next-line: max-line-length
        email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')])),
        id: new FormControl(),
        full_name: new FormControl('', Validators.compose([Validators.required])),
        cpf: new FormControl(),
        rg: new FormControl(),
        birth_date: new FormControl(),
        phone: new FormControl(),
        username: new FormControl('', Validators.compose([Validators.required])),
    });
    constructor(
        private fb: FormBuilder,
        private service: CandidatosService,
        private modal: AlertModalService,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
    ) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params: any) => {
                const id = params['id'];
                if (id) {
                    this.formularioNome = 'Edição';
                    const candidato = this.service.loadByID(id);
                    candidato.subscribe(dados => this.populaDadosForm(dados));
                }
            }
        );
    };

    populaDadosForm(cand) {
        this.form.patchValue({
            id: cand.id,
            full_name: cand.full_name,
            cpf: cand.cpf,
            rg: cand.rg,
            birth_date: cand.birth_date,
            phone: cand.phone,
            email: cand.email,
            username: cand.username,
            password: cand.password
        });
    }

    hasError(field: string) {
        return this.form.get(field).errors;
    }

    onSubmit() {
        this.submitted = true;

        if (this.form.valid) {
            let msgSuccess = 'Candidato cadastrado com sucesso!';
            let msgError = 'Erro ao cadastrar candidato, tente novamente!';
            if (this.form.value.id) {
                msgSuccess = 'Candidato atualizado com sucesso!';
                msgError = 'Erro ao atualizar candidato, tente novamente!';
            }
            this.form.value.birth_date = this.form.value.birth_date
            this.service.save(this.form.value).subscribe(
                success => {
                    this.modal.showAlertSuccess(msgSuccess);
                    this.location.back();
                },
                error => this.modal.showAlertDanger(msgError)
            );
        } else {
            if (!this.form.get('full_name').valid && (!this.form.get('full_name').touched || this.form.get('full_name').touched)) {
                this.modal.showAlertDanger('Nome é obrigatório.');
            } else if (!this.form.get('username').valid && (!this.form.get('username').touched || this.form.get('username').touched)) {
                this.modal.showAlertDanger('Username é obrigatório.');
            } else if (!this.form.get('email').valid && (!this.form.get('email').touched || this.form.get('email').touched)) {
                this.modal.showAlertDanger('E-mail é obrigatório.');
            } else if (!this.form.get('password').valid && (!this.form.get('password').touched || this.form.get('password').touched)) {
                this.modal.showAlertDanger('Senha é obrigatória.');
            }
        }
    }

    onCancel() {
        if (this.service.isAutenticado) {
            this.router.navigate(['/'], { relativeTo: this.route });
        } else {
            this.router.navigate(['/login'], { relativeTo: this.route });
        }
    }

    onDisconect() {
        this.service.isAutenticado = false;
        //encerra sessao do usuario, exclui token salvo
        this.router.navigate(['/login'], { relativeTo: this.route });
    }

    onClear() {
        this.submitted = false;
        this.form.reset();
    }
}
