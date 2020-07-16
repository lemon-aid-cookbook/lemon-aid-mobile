import {Observable} from 'redux';
import {combineEpics, ofType} from 'redux-observable';
import {PlainAction} from 'redux-typed-actions';
import {of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {GlobalLoadingSetup} from 'components';
import {request} from 'utils/network/api';
import {LoginRequest, LoginRequestFailed, LoginRequestSuccess} from './actions';

const loginRequest$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(LoginRequest.type),
    exhaustMap((action: any) => {
      GlobalLoadingSetup.getLoading().isVisible();
      return request<any>({
        method: 'GET',
        url: 'cities',
      }).pipe(
        map((value) => {
          GlobalLoadingSetup.getLoading().isHide();
          if ((value as any).result.length > 0) {
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

export const authEpics = combineEpics(loginRequest$);
