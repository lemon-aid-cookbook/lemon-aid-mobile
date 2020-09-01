import {authEpics} from 'pages/Login/redux/epic';
import {profileEpics} from 'pages/Profile/redux/epic'
import {combineEpics} from 'redux-observable';
export const rootEpic = combineEpics(authEpics, profileEpics);
