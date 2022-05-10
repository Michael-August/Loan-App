export interface IUserSignUp {
    phone_number: string,
    pin: string,
    referral_code: string
}

export interface ILogInUser {
    username: string,
    pin: string,
    device_name: string
}