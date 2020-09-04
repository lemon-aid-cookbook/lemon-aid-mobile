import { SignoutRequest } from 'pages/Login/redux/actions';
import { PlainAction } from 'redux-typed-actions';
import { ProfileState } from '../model';
import {
  ClearSearch,
  GetAnotherProfileSuccess, GetDetailPostSuccess,
  GetDetailPostSuccessNotNav, GetFavoritePostSuccess,


  GetFollowPostSuccess, GetMostFaveSuccess, GetProfileSuccess,


  GetRecentSuccess,






  GetUserPostSuccess, SearchRecipesSuccess
} from './actions';

const initialState: ProfileState = {
  profileInfo: null,
  anotherProfile: null,
  mostFavPost: [],
  recentPost: [],
  followPost: [],
  favPost: [],
  detailPost: null,
  searchResult: [],
  userPost: [],
  userPage: 1,
  totalUserPost: 0,
  totalItems: 0,
};

export function profileReducer(
  state: ProfileState = initialState,
  action: PlainAction,
) {
  switch (action.type) {
    case GetProfileSuccess.type:
      return { ...state, profileInfo: action.payload };

    case GetAnotherProfileSuccess.type:
      return { ...state, anotherProfile: action.payload };

    case GetFavoritePostSuccess.type:
      return { ...state, favPost: action.payload.posts };

    case GetMostFaveSuccess.type:
      return {
        ...state,
        mostFavPage: action.payload?.page || 1,
        mostFavPost: action.payload?.page === 1
          ? action.payload.posts
          : state.mostFavPost.concat(action.payload.posts),
      };

    case GetRecentSuccess.type:
      return {
        ...state,
        recentPage: action.payload?.page || 1,
        recentPost: action.payload?.page === 1
          ? action.payload.posts
          : state.recentPost.concat(action.payload.posts),
      };

    case GetUserPostSuccess.type:
      return {
        ...state,
        userPost:
          action.payload.page === 1
            ? action.payload.posts
            : state.userPost.concat(action.payload.posts),
        totalUserPost: action.payload.totalItems,
        userPage: action.payload.page,
      };

    case GetFollowPostSuccess.type:
      return {
        ...state, followPost: action.payload?.page === 1
          ? action.payload.posts
          : state.followPost.concat(action.payload.posts)
      };

    case GetDetailPostSuccess.type:
      return { ...state, detailPost: action.payload.post };
    case GetDetailPostSuccessNotNav.type:
      return { ...state, detailPost: action.payload.post };
    case SignoutRequest.type:
      return {
        profileInfo: null,
        anotherProfile: null,
        mostFavPost: [],
        recentPost: [],
        followPost: [],
        favPost: [],
        detailPost: null,
        searchResult: [],
        userPost: [],
        totalUserPost: 0,
        totalItems: 0,
      };
    case SearchRecipesSuccess.type:
      return {
        ...state,
        searchResult: action.payload.posts,
        totalItems: action.payload.numberOfPosts
          ? action.payload.numberOfPosts
          : 0,
      };
    case ClearSearch.type:
      return {
        ...state,
        searchResult: [],
        totalItems: 0,
      };
    default:
      return state;
  }
}
