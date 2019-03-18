import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';

import { AuthService } from './../login/auth.service';
import { Observable } from 'rxjs';
import { AlertModalService } from '../alert-modal/alert-modal.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private authService: AuthService,
        private router: Router,
        private modal: AlertModalService,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | boolean {

        return this.verificarAcesso();
    }

    private verificarAcesso() {
        if (this.authService.usuarioEstaAutenticado()) {
            return true;
        } else {
            this.modal.showAlertDanger('Permissão negada!');
            this.router.navigate(['/login']);
            return false;
        }
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        console.log('canLoad: verificando se usuário pode carregar o cod módulo');

        return this.verificarAcesso();
    }

}