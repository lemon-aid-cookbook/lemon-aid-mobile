import AppRouteConfigs from 'navigators/AppRouteConfig';
import {createNavigationReducer} from 'react-navigation-redux-helpers';
import {combineReducers} from 'redux';
import {authReducer} from 'pages/Login/redux/reducer';
const navReducer = createNavigationReducer(AppRouteConfigs);

export const rootReducer = combineReducers({
  nav: navReducer,
  Auth: authReducer,
});
