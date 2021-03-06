import {PlainAction} from 'redux-typed-actions';
import {AuthState} from '../model';
import {LoginRequestSuccess, SignoutRequest} from './actions';

const initialState: AuthState = {
  token: null,
  user: null,
};

export function authReducer(
  state: AuthState = initialState,
  action: PlainAction,
) {
  switch (action.type) {
    case LoginRequestSuccess.type:
      return {...state, token: action.payload.token, user: action.payload.user};
    case SignoutRequest.type:
      return {
        token: null,
        user: null,
      };
    default:
      return state;
  }
}
