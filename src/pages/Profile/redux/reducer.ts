import {PlainAction} from 'redux-typed-actions';
import {ProfileState} from '../model';
import {GetProfileSuccess, GetFavoritePostSuccess, GetMostFaveSuccess, GetRecentSuccess, GetFollowPostSuccess, GetDetailPostSuccess, GetDetailPostSuccessNotNav, SearchRecipesSuccess, ClearSearch} from './actions';
import { SignoutRequest } from 'pages/Login/redux/actions';

const initialState: ProfileState = {
  profileInfo: null,
  mostFavPost: [],
  recentPost: [],
  followPost: [],
  favPost: [],
  detailPost: null,
  searchResult: [],
  totalItems: 0,
};

export function profileReducer(
  state: ProfileState = initialState,
  action: PlainAction,
) {
  switch (action.type) {
    case GetProfileSuccess.type:
      return {...state, profileInfo: action.payload};

      case GetFavoritePostSuccess.type:
        return {...state, favPost: action.payload.posts};

      case GetMostFaveSuccess.type:
        return {...state, mostFavPost: action.payload.posts};

      case GetRecentSuccess.type:
        return {...state, recentPost: action.payload.posts};

      case GetFollowPostSuccess.type:
        return {...state, followPost: action.payload.posts};

      case GetDetailPostSuccess.type:
        
      return {...state, detailPost: action.payload.post}
      case GetDetailPostSuccessNotNav.type: 
      return {...state, detailPost: action.payload.post}
      case SignoutRequest.type:
      return {};
      case SearchRecipesSuccess.type:
        return {
          ...state,
          searchResult: action.payload.posts,
        totalItems: action.payload.numberOfPosts
          ? action.payload.numberOfPosts
          : 0,
        }
      case ClearSearch.type:
        return {
          ...state,
          searchResult: [],
        totalItems: 0
        }
    default:
      return state;
  }
}
