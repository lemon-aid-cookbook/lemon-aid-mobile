import {GlobalLoadingSetup, GlobalModalSetup} from 'components';
import {MODAL_TYPE} from 'config/themeUtils';
import {GetProfile} from 'pages/Profile/redux/actions';
import {NavigationActions} from 'react-navigation';
import {Observable} from 'redux';
import {combineEpics, ofType} from 'redux-observable';
import {PlainAction} from 'redux-typed-actions';
import {store} from 'reduxs';
import {of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {request} from 'utils/network/api';
import {
  LoginRequest,
  LoginRequestFailed,
  LoginRequestSuccess,
  SignoutRequest,
  SignupRequest,
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
        option: {
          format: 'json',
        },
      }).pipe(
        map((value) => {
          GlobalLoadingSetup.getLoading().isHide();
          if ((value as any).status === 200) {
            return LoginRequestSuccess.get((value as any).data);
          }
          GlobalLoadingSetup.getLoading().isHide();
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.err,
          );
          return LoginRequestFailed.get(value.data);
        }),
        catchError((error) => {
          GlobalLoadingSetup.getLoading().isHide();
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (error as any).data?.err,
          );
          return of(LoginRequestFailed.get(error.data));
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
          format: 'json',
        },
      }).pipe(
        map((value) => {
          GlobalLoadingSetup.getLoading().isHide();
          if ((value as any).status === 200) {
            GlobalModalSetup.getGlobalModalHolder().alertMessage(
              'Thông báo',
              value.data.message,
              MODAL_TYPE.NORMAL,
              () =>
                store.dispatch(
                  NavigationActions.navigate({
                    routeName: 'Login',
                  }),
                ),
            );
            return store.dispatch(
              NavigationActions.navigate({
                routeName: 'Login',
              }),
            );
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return SignupRequestFailed.get(value.data);
        }),
        catchError((error) => {
          GlobalLoadingSetup.getLoading().isHide();
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (error as any).data?.message,
          );
          return of(SignupRequestFailed.get(error));
        }),
      );
    }),
  );

const signOutRequest$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(SignoutRequest.type),
    map(() => {
      return store.dispatch(
        NavigationActions.navigate({
          routeName: 'Login',
        }),
      );
    }),
  );

const logInSuccess$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(LoginRequestSuccess.type),
    map((action: any) => {
      store.dispatch(GetProfile.get(action.payload.user.username));
      return store.dispatch(
        NavigationActions.navigate({
          routeName: 'Profile',
        }),
      );
    }),
  );
export const authEpics = combineEpics(
  loginRequest$,
  signupRequest$,
  signOutRequest$,
  logInSuccess$,
);
