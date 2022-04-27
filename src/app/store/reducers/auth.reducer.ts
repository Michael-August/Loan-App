import { createReducer, on } from "@ngrx/store"
import * as AuthActions from '../actions/auth.actions'

export const authFeatureKey = 'auth'

export interface State {
    user: any
    error: any
}

export const initialState: State = {
    user: {},
    error: null
}

export const reducer = createReducer(
    initialState,
    on(AuthActions.loginSuccess, (state, action) => {
        return {
            ...state,
            user: action.user,
            error: null
        }
    }),
    on(AuthActions.loginFailure, (state, action) => {
        return {
            ...state,
            user: {},
            error: action.error
        }
    })
)