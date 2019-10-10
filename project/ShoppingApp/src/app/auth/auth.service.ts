import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';


export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new BehaviorSubject<User>(null);

    private KEY = 'AIzaSyBQEAYpwOy6xbFhY8uSyL-OpPjRz0s1rNk';
    private signUpEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.KEY}`;
    private signInEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.KEY}`;
    private _tokenExpirationTime: any;


    constructor(private httpClient: HttpClient, private router: Router) { }

    signup(email: string, password: string) {
        return this.httpClient.post<AuthResponseData>(this.signUpEndpoint,
            {
                email,
                password,
                returnSecureToken: true
            }).pipe(
                catchError(this.handleError),
                tap(
                    resp => {
                        this.handleAuthentication(
                            resp.email,
                            resp.localId,
                            resp.idToken,
                            +resp.expiresIn
                        );
                    }
                )
            );
    }

    login(email: string, password: string) {
        return this.httpClient.post<AuthResponseData>(
            this.signInEndpoint,
            {
                email,
                password,
                returnSecureToken: true
            }).pipe(
                catchError(this.handleError),
                tap(
                    resp => {
                        this.handleAuthentication(
                            resp.email,
                            resp.localId,
                            resp.idToken,
                            +resp.expiresIn
                        );
                    }
                )
            );
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');

        if (this._tokenExpirationTime) {
            clearTimeout(this._tokenExpirationTime);
        }

        this._tokenExpirationTime = null;
    }

    autoLogout(expirationDuration: number) {
        console.log(expirationDuration);
        this._tokenExpirationTime = setTimeout(() => this.logout(), expirationDuration);
    }

    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
    ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured!';
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }

        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'The email address is already in use by another account.';
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'Password sign-in is disabled for this project.';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid or the user does not have a password.';
                break;
            case 'USER_DISABLED':
                errorMessage = 'The user account has been disabled by an administrator.';
                break;
        }
        return throwError(errorMessage);
    }
}
