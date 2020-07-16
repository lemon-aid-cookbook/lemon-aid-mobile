import {defineAction} from 'redux-typed-actions';

export const LoginRequest = defineAction<any>('LOGIN_REQUEST');
export const LoginRequestSuccess = defineAction<any>('LOGIN_REQUEST_SUCCESS');
export const LoginRequestFailed = defineAction<any>('LOGIN_REQUEST_FAILED');
