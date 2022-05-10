import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from "rxjs";

import { AuthService } from "src/app/shared/services/auth-service/auth-service.service";
import { TIMED_SWEET_ALERT } from "src/app/shared/utils/helper";
import * as AuthActions from '../actions/auth.actions'

@Injectable()
export class AuthEffects {
    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.loginPage),
            exhaustMap((details) =>
                this.authService.logInUser(details).pipe(
                    map((user: any) => AuthActions.loginSuccess({ user: user.data })),
                    tap((user) => {
                        console.log('success');
                        TIMED_SWEET_ALERT('SuccessFull', `Welcome Back ${user}`,'success')
                        localStorage.setItem('User Authenticated', JSON.stringify(user))
                        localStorage.setItem('Token', user.user.access_token)
                        this.router.navigate(['/Authenticated/dashboard'])
                    }),
                    catchError((error) => of(AuthActions.loginFailure({ error: error.error.message })))
                )
            )
        )
    })

    // loginSuccess$ = createEffect(() => 
    //     this.actions$.pipe(
    //         ofType(AuthActions.loginSuccess),
    //         tap((user) => {
    //             console.log('success');
                
    //             TIMED_SWEET_ALERT('SuccessFull', `Welcome Back ${user}`,'success')
    //             localStorage.setItem('User Authenticated', JSON.stringify(user))
    //             localStorage.setItem('Token', user.user.access_token)
    //             this.router.navigate(['/Authenticated/dashboard'])
    //         })
    //     ),
    //     { dispatch: false }
    // )

    constructor(private actions$: Actions, private authService: AuthService, private router: Router) {

    }
}