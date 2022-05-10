import { createAction, props } from "@ngrx/store";
import { ILogInUser } from '../../auths/auth.model'

export const loginPage = createAction(
    '[Login Component] Login User',
    (userInfo: ILogInUser) => userInfo
    // props<{ username: string; pin: string; device_name: string }>()
)

export const loginSuccess = createAction(
    '[Auth Effect] Login User Success',
    props<{ user: any }>()
)

export const loginFailure = createAction(
    '[Auth Effect] Login User Failure',
    props<{ error: any }>()
)