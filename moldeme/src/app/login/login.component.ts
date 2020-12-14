import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAuth, ILoginForm, Login } from '../shared/model/login.model';
import { LoginService } from '../shared/services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    login: ILoginForm = new Login();
    loginAuth: Subscription;
    error: boolean;
    errorName: string;
    userData: IAuth = new Login();

    constructor(
        private loginService: LoginService,
        private router: Router
        ) { }

    ngOnInit(): void {
    }

    onSubmit(form: NgForm): void {
        this.error = true;
        this.errorName = '';
        this.login = form.value;

        if (this.login.email === '') {
            this.errorName = 'Preencha o campo Email';
        } else if (this.login.password === '') {
            this.errorName = 'Preencha o campo Senha';
        } else {
            this.error = false;
            this.loginAuth = this.loginService
            .post(this.login)
            .subscribe(
            (response: IAuth) => {
                this.userData = response;
                localStorage.setItem('authToken', JSON.stringify((this.userData)));
                console.log(JSON.stringify(this.userData));
                this.router.navigate(['/home']);
            },
            err => {
                this.error = true;
                this.errorName = err.error.message;
                console.log(err);
            });
        }
    }
}
