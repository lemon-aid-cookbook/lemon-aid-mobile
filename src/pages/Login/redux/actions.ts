import {defineAction} from 'redux-typed-actions';

export const LoginRequest = defineAction<any>('LOGIN_REQUEST');
export const LoginRequestSuccess = defineAction<any>('LOGIN_REQUEST_SUCCESS');
export const LoginRequestFailed = defineAction<any>('LOGIN_REQUEST_FAILED');

export const SignupRequest = defineAction<any>('SIGNUP_REQUEST');
export const SignupRequestSuccess = defineAction<any>('SIGNUP_REQUEST_SUCCESS');
export const SignupRequestFailed = defineAction<any>('SIGNUP_REQUEST_FAILED');

export const ForgotPassword = defineAction<any>('FORGOT_PASSWORD');
export const ForgotPasswordSuccess = defineAction<any>(
  'FORGOT_PASSWORD_SUCCESS',
);
export const ForgotPasswordFailed = defineAction<any>('FORGOT_PASSWORD_FAILED');

export const SignoutRequest = defineAction<void>('SIGNOUT_REQUEST');
