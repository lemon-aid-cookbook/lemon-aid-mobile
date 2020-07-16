import {PlainAction} from 'redux-typed-actions';
import {AuthState} from '../model';
import {LoginRequestSuccess} from './actions';

const initialState: AuthState = {
  jwt: null,
};

export function authReducer(
  state: AuthState = initialState,
  action: PlainAction,
) {
  switch (action.type) {
    case LoginRequestSuccess.type:
      return {...state, jwt: action.payload};
    default:
      return state;
  }
}
