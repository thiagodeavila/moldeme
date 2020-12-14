export interface IUser {
    name: string;
    email: string;
    last_login_at: Date;
}

export interface IAuth {
    user: IUser;
    auth_token: string;
}

export interface ILoginForm {
    email: string;
    password: string;
}

export class Login implements IAuth, ILoginForm {
    email: string;
    password: string;
    user: IUser;
    auth_token: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    public get $email(): string { return this.email; }
    public get $password(): string { return this.password; }
    public get $user(): IUser { return this.user; }
    public get $auth_token(): string { return this.auth_token; }

    public set $email(value: string) {this.email = value}
    public set $password(value: string) { this.password = value; }
    public set $user(value: IUser) { this.user = value; }
    public set $auth_token(value: string) { this.auth_token = value; }

}
