import AppRouteConfigs from 'navigators/AppRouteConfig';
import {createNavigationReducer} from 'react-navigation-redux-helpers';
import {combineReducers} from 'redux';
import {authReducer} from 'pages/Login/redux/reducer';
import {profileReducer} from 'pages/Profile/redux/reducer';
const navReducer = createNavigationReducer(AppRouteConfigs);

export const rootReducer = combineReducers({
  nav: navReducer,
  Auth: authReducer,
  Profile: profileReducer
});
