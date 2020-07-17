import {Observable} from 'redux';
import {combineEpics, ofType} from 'redux-observable';
import {PlainAction} from 'redux-typed-actions';
import {of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {GlobalLoadingSetup, GlobalModalSetup} from 'components';
import {request} from 'utils/network/api';
import {
  LoginRequest,
  LoginRequestFailed,
  LoginRequestSuccess,
  SignupRequest,
  SignupRequestSuccess,
  SignupRequestFailed,
} from './actions';

const loginRequest$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(LoginRequest.type),
    exhaustMap((action: any) => {
      GlobalLoadingSetup.getLoading().isVisible();
      return request<any>({
        method: 'POST',
        url: 'signin',
        param: action.payload,
      }).pipe(
        map((value) => {
          GlobalLoadingSetup.getLoading().isHide();
          if ((value as any).status === 200) {
            return LoginRequestSuccess.get((value as any).result);
          }
          return LoginRequestFailed.get();
        }),
        catchError((error) => {
          GlobalLoadingSetup.getLoading().isHide();
          return of(LoginRequestFailed.get(error));
        }),
      );
    }),
  );

const signupRequest$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(SignupRequest.type),
    exhaustMap((action: any) => {
      GlobalLoadingSetup.getLoading().isVisible();
      return request<any>({
        method: 'POST',
        url: 'signup',
        param: action.payload,
        option: {
          format: 'json'
        }
      }).pipe(
        map((value) => {
          GlobalLoadingSetup.getLoading().isHide();
          if ((value as any).status === 200) {
            return SignupRequestSuccess.get(value as any);
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).message,
          );
          return SignupRequestFailed.get();
        }),
        catchError((error) => {
          GlobalLoadingSetup.getLoading().isHide();
          return of(SignupRequestFailed.get(error));
        }),
      );
    }),
  );

export const authEpics = combineEpics(loginRequest$, signupRequest$);
