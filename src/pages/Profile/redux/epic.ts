import {GlobalLoadingSetup, GlobalModalSetup} from 'components';
import {NavigationActions} from 'react-navigation';
import {Observable} from 'redux';
import {combineEpics, ofType} from 'redux-observable';
import {PlainAction} from 'redux-typed-actions';
import {store} from 'reduxs';
import {of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {request} from 'utils/network/api';
import {
  GetDetailPost,
  GetDetailPostFailed,
  GetDetailPostNotNav,
  GetDetailPostSuccess,
  GetDetailPostSuccessNotNav,
  GetFavoritePost,
  GetFavoritePostFailed,
  GetFavoritePostSuccess,
  GetFollowPost,
  GetFollowPostFailed,
  GetFollowPostSuccess,
  GetMostFave,
  GetMostFaveFailed,
  GetMostFaveSuccess,
  GetProfile,
  GetProfileFailed,
  GetProfileSuccess,
  GetRecent,
  GetRecentFailed,
  GetRecentSuccess,
  LikePost,
  LikePostFailed,
  LikePostSuccess,
  UnlikePost,
  UnlikePostFailed,
  UnlikePostSuccess,
  Follow,
  FollowSuccess,
  FollowFailed,
  UnfollowSuccess,
  UnfollowFailed,
  Unfollow,
  UpdateInfo,
  UpdateInfoSuccess,
  UpdateInfoFailed,
  CommentPost,
  CommentPostSuccess,
  CommentPostFailed,
} from './actions';
import { TAB_TYPES } from 'config/themeUtils';

const getProfileRequest$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(GetProfile.type),
    exhaustMap((action: any) => {
      GlobalLoadingSetup.getLoading().isVisible();
      return request<any>({
        method: 'GET',
        url: `user/${action.payload}`,
      }).pipe(
        map((value) => {
          GlobalLoadingSetup.getLoading().isHide();
          if ((value as any).status === 200) {
            return GetProfileSuccess.get((value as any).data.userData);
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return GetProfileFailed.get(value.data);
        }),
        catchError((error) => {
          GlobalLoadingSetup.getLoading().isHide();
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (error as any).data?.message,
          );
          return of(GetProfileFailed.get(error.data));
        }),
      );
    }),
  );

const getMostFavRequest$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(GetMostFave.type, UnlikePostSuccess.type, LikePostSuccess.type),
    exhaustMap((action: any) => {
      GlobalLoadingSetup.getLoading().isVisible();
      return request<any>({
        method: 'GET',
        url: 'post/search',
        param: {sort: 'common', limit: 10, page: 1},
      }).pipe(
        map((value) => {
          GlobalLoadingSetup.getLoading().isHide();
          if ((value as any).status === 200) {
            return GetMostFaveSuccess.get((value as any).data);
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return GetMostFaveFailed.get(value.data);
        }),
        catchError((error) => {
          GlobalLoadingSetup.getLoading().isHide();
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (error as any).data?.message,
          );
          return of(GetMostFaveFailed.get(error.data));
        }),
      );
    }),
  );

const getRecent$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(GetRecent.type,  UnlikePostSuccess.type, LikePostSuccess.type),
    exhaustMap((action: any) => {
      return request<any>({
        method: 'GET',
        url: 'post/search',
        param: {sort: 'latest', limit: 10, page: 1},
      }).pipe(
        map((value) => {
          if ((value as any).status === 200) {
            return GetRecentSuccess.get((value as any).data);
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return GetRecentFailed.get(value.data);
        }),
        catchError((error) => {
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (error as any).data?.message,
          );
          return of(GetRecentFailed.get(error.data));
        }),
      );
    }),
  );

const getFollowPost$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(GetFollowPost.type, FollowSuccess.type, UnfollowSuccess.type),
    exhaustMap((action: any) => {
      return request<any>({
        method: 'GET',
        url: 'post/getPostsByTabs',
        param: action.payload,
      }).pipe(
        map((value) => {
          if ((value as any).status === 200) {
            return GetFollowPostSuccess.get((value as any).data);
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return GetFollowPostFailed.get(value.data);
        }),
        catchError((error) => {
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (error as any).data?.message,
          );
          return of(GetFollowPostFailed.get(error.data));
        }),
      );
    }),
  );

  const getFollowPostFav$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(GetFollowPost.type, LikePost.type, UnlikePost.type),
    exhaustMap((action: any) => {
      return request<any>({
        method: 'GET',
        url: 'post/getPostsByTabs',
        param: {userId: action.payload.userId,
          limit: 10,
          page: 1,
          type: TAB_TYPES[2]
        },
      }).pipe(
        map((value) => {
          if ((value as any).status === 200) {
            return GetFollowPostSuccess.get((value as any).data);
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return GetFollowPostFailed.get(value.data);
        }),
        catchError((error) => {
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (error as any).data?.message,
          );
          return of(GetFollowPostFailed.get(error.data));
        }),
      );
    }),
  );

const getFavoritePost$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(GetFavoritePost.type, UnlikePostSuccess.type, LikePostSuccess.type),
    exhaustMap((action: any) => {
      return request<any>({
        method: 'GET',
        url: 'post/getPostsByTabs',
        param: action.payload,
      }).pipe(
        map((value) => {
          if ((value as any).status === 200) {
            return GetFavoritePostSuccess.get((value as any).data);
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return GetFavoritePostFailed.get(value.data);
        }),
        catchError((error) => {
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (error as any).data?.message,
          );
          return of(GetFavoritePostFailed.get(error.data));
        }),
      );
    }),
  );

const getDetail$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(GetDetailPost.type),
    exhaustMap((action: any) => {
      GlobalLoadingSetup.getLoading().isVisible();
      return request<any>({
        method: 'GET',
        url: `post/getPost/${action.payload.postId}`,
      }).pipe(
        map((value) => {
          GlobalLoadingSetup.getLoading().isHide();
          if ((value as any).status === 200) {
            return GetDetailPostSuccess.get((value as any).data);
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return GetDetailPostFailed.get(value.data);
        }),
        catchError((error) => {
          GlobalLoadingSetup.getLoading().isHide();
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (error as any).data?.message,
          );
          return of(GetDetailPostFailed.get(error.data));
        }),
      );
    }),
  );

const getDetailNotNav$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(GetDetailPostNotNav.type, UnlikePostSuccess.type, LikePostSuccess.type),
    exhaustMap((action: any) => {
      return request<any>({
        method: 'GET',
        url: `post/getPost/${action.payload.postId}`,
      }).pipe(
        map((value) => {
          if ((value as any).status === 200) {
            return GetDetailPostSuccessNotNav.get((value as any).data);
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return GetDetailPostFailed.get(value.data);
        }),
        catchError((error) => {
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (error as any).data?.message,
          );
          return of(GetDetailPostFailed.get(error.data));
        }),
      );
    }),
  );

const getDetailSuccess$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(GetDetailPostSuccess.type),
    map((action: any) => {
      return store.dispatch(
        NavigationActions.navigate({
          routeName: 'Detail',
        }),
      );
    }),
  );

const likePost$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(LikePost.type),
    exhaustMap((action: any) => {
      return request<any>({
        method: 'POST',
        url: 'user/likepost',
        param: action.payload,
        option: {
          format: 'json',
        },
      }).pipe(
        map((value) => {
          if ((value as any).status === 200) {
            return LikePostSuccess.get(action.payload)
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return LikePostFailed.get(value.data);
        }),
        catchError((error) => {
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (error as any).data?.message,
          );
          return of(LikePostFailed.get(error.data));
        }),
      );
    }),
  );

const unlikePost$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(UnlikePost.type),
    exhaustMap((action: any) => {
      return request<any>({
        method: 'POST',
        url: 'user/unlikepost',
        param: action.payload,
        option: {
          format: 'json',
        },
      }).pipe(
        map((value) => {
          if ((value as any).status === 200) {
            return UnlikePostSuccess.get(action.payload)
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return UnlikePostFailed.get(value.data);
        }),
        catchError((error) => {
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (error as any).data?.message,
          );
          return of(UnlikePostFailed.get(error.data));
        }),
      );
    }),
  );

  const followUser$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(Follow.type),
    exhaustMap((action: any) => {
      return request<any>({
        method: 'POST',
        url: 'user/follow',
        param: action.payload,
        option: {
          format: 'json',
        },
      }).pipe(
        map((value) => {
          if ((value as any).status === 200) {
            store.dispatch(GetProfile.get(store.getState().Auth.user.username))
            return FollowSuccess.get(action.payload)
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return FollowFailed.get(value.data);
        }),
        catchError((error) => {
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (error as any).data?.message,
          );
          return of(FollowFailed.get(error.data));
        }),
      );
    }),
  );

const unFollowUser$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(Unfollow.type),
    exhaustMap((action: any) => {
      return request<any>({
        method: 'POST',
        url: 'user/unfollow',
        param: action.payload,
        option: {
          format: 'json',
        },
      }).pipe(
        map((value) => {
          if ((value as any).status === 200) {
            store.dispatch(GetProfile.get(store.getState().Auth.user.username))
            return UnfollowSuccess.get(action.payload)
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return UnfollowFailed.get(value.data);
        }),
        catchError((error) => {
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (error as any).data?.message,
          );
          return of(UnfollowFailed.get(error.data));
        }),
      );
    }),
  );

const updateInfo$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(UpdateInfo.type),
    exhaustMap((action: any) => {
      console.info(`user/update/${action.payload.userId}`)
      return request<any>({
        method: 'PUT',
        url: `user/update/${action.payload.userId}`,
        param: action.payload.data,
        option: {
          format: 'json',
        },
      }).pipe(
        map((value) => {
          console.info(value)
          if ((value as any).status === 200) {
            store.dispatch(GetProfile.get(store.getState().Auth.user.username))
            return UpdateInfoSuccess.get(action.payload)
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return UpdateInfoFailed.get(value.data);
        }),
        catchError((error) => {
          console.info(error)
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (error as any).data?.message,
          );
          return of(UpdateInfoFailed.get(error.data));
        }),
      );
    }),
  );

const commentPost$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(CommentPost.type),
    exhaustMap((action: any) => {
      return request<any>({
        method: 'POST',
        url: 'user/comment',
        param: action.payload,
        option: {
          format: 'json',
        },
      }).pipe(
        map((value) => {
          if ((value as any).status === 200) {
            store.dispatch(
              GetDetailPost.get({ postId: action.payload.postId })
            )
            return CommentPostSuccess.get(action.payload)
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return CommentPostFailed.get(value.data);
        }),
        catchError((error) => {
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (error as any).data?.message,
          );
          return of(CommentPostFailed.get(error.data));
        }),
      );
    }),
  );

export const profileEpics = combineEpics(
  getProfileRequest$,
  getFavoritePost$,
  getFollowPost$,
  getRecent$,
  getMostFavRequest$,
  getDetail$,
  getDetailSuccess$,
  likePost$,
  unlikePost$,
  getDetailNotNav$,
  followUser$,
  unFollowUser$,
  updateInfo$,
  commentPost$,
  getFollowPostFav$
);
