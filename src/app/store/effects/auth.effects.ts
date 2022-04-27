import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of } from "rxjs";

import { AuthService } from "src/app/shared/services/auth-service/auth-service.service";
import * as AuthActions from '../actions/auth.actions'

@Injectable()
export class AuthEffects {
    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.loginPage),
            concatMap((action) => 
                this.authService.logInUser({username: action.username, pin: action.password, device_name: ''}).pipe(
                    map((user) => AuthActions.loginSuccess({ user: user })),
                    catchError((error) => of(AuthActions.loginFailure({ error })))
                )
            )
        )
    })

    constructor(private actions$: Actions, private authService: AuthService) {

    }
}