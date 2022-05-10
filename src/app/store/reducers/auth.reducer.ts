import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store"
import * as AuthActions from '../actions/auth.actions'

export const authFeatureKey = 'auth'

export interface AuthState {
    user: any
    error: any
}

export const initialState: AuthState = {
    user: null,
    error: null
}

export const authReducer = createReducer(
    initialState,
    on(AuthActions.loginSuccess, (state, { user }) => {
        return {
            ...state,
            user: user,
            error: null
        }
    }),
    on(AuthActions.loginFailure, (state, { error }) => {
        return {
            ...state,
            user: null,
            error: error
        }
    })
)

export const selectAuthState = createFeatureSelector<AuthState>('authData')

export const selectUser = createSelector(selectAuthState, state => state.user)