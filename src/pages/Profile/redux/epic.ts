import {GlobalLoadingSetup, GlobalModalSetup} from 'components';
import {TAB_TYPES} from 'config/themeUtils';
import {SignoutRequest} from 'pages/Login/redux/actions';
import {NavigationActions, StackActions} from 'react-navigation';
import {Observable} from 'redux';
import {combineEpics, ofType} from 'redux-observable';
import {PlainAction} from 'redux-typed-actions';
import {store} from 'reduxs';
import {of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {request} from 'utils/network/api';
import {
  ChangePassword,
  ChangePasswordFailed,
  ChangePasswordSuccess,
  CommentPost,
  CommentPostFailed,
  CommentPostSuccess,
  CreateRecipe,
  CreateRecipeFailed,
  CreateRecipeSuccess,
  Follow,
  FollowFailed,
  FollowSuccess,
  GetAnotherProfile,
  GetAnotherProfileFailed,
  GetAnotherProfileSuccess,
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
  SearchRecipes,
  SearchRecipesFailed,
  SearchRecipesSuccess,
  Unfollow,
  UnfollowFailed,
  UnfollowSuccess,
  UnlikePost,
  UnlikePostFailed,
  UnlikePostSuccess,
  UpdateInfo,
  UpdateInfoFailed,
  UpdateInfoSuccess,
  GetUserPost,
  GetUserPostSuccess,
  GetUserPostFailed,
  UpdateRecipeSuccess,
  UpdateRecipe,
  UpdateRecipeFailed,
  DeleteRecipe,
  DeleteRecipeSuccess,
  DeleteRecipeFailed,
  DeleteComment,
  DeleteCommentSuccess,
  DeleteCommentFailed,
} from './actions';
import { act } from 'react-test-renderer';

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
            store.dispatch(
              GetUserPost.get({
                userId: (value as any).data.userData.id,
                limit: 10,
                page: 1,
                type: TAB_TYPES[0],
              }),
            );
            store.dispatch(
              GetFollowPost.get({
                userId: (value as any).data.userData.id,
                limit: 10,
                page: 1,
                type: TAB_TYPES[2],
              }),
            );
            store.dispatch(
              GetFavoritePost.get({
                userId: (value as any).data.userData.id,
                limit: 10,
                page: 1,
                type: TAB_TYPES[1],
              }),
            );
            
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

const getAnotherProfileRequest$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(GetAnotherProfile.type),
    exhaustMap((action: any) => {
      GlobalLoadingSetup.getLoading().isVisible();
      return request<any>({
        method: 'GET',
        url: `user/${action.payload}`,
      }).pipe(
        map((value) => {
          GlobalLoadingSetup.getLoading().isHide();
          if ((value as any).status === 200) {
            store.dispatch(
              GetUserPost.get({
                userId: (value as any).data.userData.id,
                limit: 10,
                page: 1,
                type: TAB_TYPES[0],
              }),
            );
            return GetAnotherProfileSuccess.get((value as any).data.userData);
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return GetAnotherProfileFailed.get(value.data);
        }),
        catchError((error) => {
          GlobalLoadingSetup.getLoading().isHide();
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (error as any).data?.message,
          );
          return of(GetAnotherProfileFailed.get(error.data));
        }),
      );
    }),
  );

const getMostFavRequest$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(GetMostFave.type, UnlikePostSuccess.type, LikePostSuccess.type),
    exhaustMap((action: any) => {
      return request<any>({
        method: 'GET',
        url: 'post/search',
        param: {sort: 'common', limit: 10, page: action.payload?.page || 1},
      }).pipe(
        map((value) => {
          if ((value as any).status === 200) {
            const data = {
              posts: (value as any).data.posts,
              page: action.payload?.page || 1,
              numberOfPosts: (value as any).data.numberOfPosts
            }
            return GetMostFaveSuccess.get(data);
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return GetMostFaveFailed.get(value.data);
        }),
        catchError((error) => {
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
    ofType(GetRecent.type, UnlikePostSuccess.type, LikePostSuccess.type),
    exhaustMap((action: any) => {
      return request<any>({
        method: 'GET',
        url: 'post/search',
        param: {sort: 'latest', limit: 10, page: action.payload?.page || 1},
      }).pipe(
        map((value) => {
          if ((value as any).status === 200) {
            const data = {
              posts: (value as any).data.posts,
              page: action.payload?.page || 1,
              numberOfPosts: (value as any).data.numberOfPosts
            }
            return GetRecentSuccess.get(data);
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
            const data = {
              posts: (value as any).data.posts,
              page: action.payload?.page || 1,
              numberOfPosts: (value as any).data.totalItems
            }
            return GetFollowPostSuccess.get(data);
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
        param: {
          userId: action.payload.userId,
          limit: 10,
          page: 1,
          type: TAB_TYPES[2],
        },
      }).pipe(
        map((value) => {
          if ((value as any).status === 200) {
            const data = {
              posts: (value as any).data.posts,
              page: action.payload?.page || 1,
              numberOfPosts: (value as any).data.totalItems
            }
            return GetFollowPostSuccess.get(data);
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
            const val = {
              posts: (value as any).data.posts,
              totalItems: (value as any).data.totalItems,
              page: action.payload.page,
            };
            return GetFavoritePostSuccess.get(val);
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

const getUserPost$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(GetUserPost.type),
    exhaustMap((action: any) => {
      return request<any>({
        method: 'GET',
        url: 'post/getPostsByTabs',
        param: action.payload,
      }).pipe(
        map((value) => {
          if ((value as any).status === 200) {
            const val = {
              posts: (value as any).data.posts,
              totalItems: (value as any).data.totalItems,
              page: action.payload.page,
            };
            return GetUserPostSuccess.get(val);
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return GetUserPostFailed.get(value.data);
        }),
        catchError((error) => {
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (error as any).data?.message,
          );
          return of(GetUserPostFailed.get(error.data));
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
    ofType(
      GetDetailPostNotNav.type,
      UnlikePostSuccess.type,
      LikePostSuccess.type,
    ),
    exhaustMap((action: any) => {
      GlobalLoadingSetup.getLoading().isVisible();
      return request<any>({
        method: 'GET',
        url: `post/getPost/${action.payload.postId}`,
      }).pipe(
        map((value) => {
          GlobalLoadingSetup.getLoading().isHide();
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
            return LikePostSuccess.get(action.payload);
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
            return UnlikePostSuccess.get(action.payload);
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
            store.dispatch(GetProfile.get(store.getState().Auth.user.username));
            return FollowSuccess.get(action.payload);
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
            store.dispatch(GetProfile.get(store.getState().Auth.user.username));
            return UnfollowSuccess.get(action.payload);
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
      GlobalLoadingSetup.getLoading().isVisible();
      return request<any>({
        method: 'PUT',
        url: `user/update/${action.payload.userId}`,
        param: action.payload.data,
        option: {
          format: 'json',
        },
      }).pipe(
        map((value) => {
          GlobalLoadingSetup.getLoading().isHide();
          if ((value as any).status === 200) {
            store.dispatch(GetProfile.get(store.getState().Auth.user.username));
            return UpdateInfoSuccess.get(action.payload);
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return UpdateInfoFailed.get(value.data);
        }),
        catchError((error) => {
          GlobalLoadingSetup.getLoading().isHide();
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
      GlobalLoadingSetup.getLoading().isVisible();
      return request<any>({
        method: 'POST',
        url: 'user/comment',
        param: action.payload,
        option: {
          format: 'json',
        },
      }).pipe(
        map((value) => {
          GlobalLoadingSetup.getLoading().isHide();
          if ((value as any).status === 200) {
            store.dispatch(
              GetDetailPostNotNav.get({postId: action.payload.postId}),
            );
            return CommentPostSuccess.get(action.payload);
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return CommentPostFailed.get(value.data);
        }),
        catchError((error) => {
          GlobalLoadingSetup.getLoading().isHide();
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (error as any).data?.message,
          );
          return of(CommentPostFailed.get(error.data));
        }),
      );
    }),
  );

const deleteComment$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(DeleteComment.type),
    exhaustMap((action: any) => {
      GlobalLoadingSetup.getLoading().isVisible();
      return request<any>({
        method: 'POST',
        url: 'user/deletecomment',
        param: action.payload.data,
        option: {
          format: 'json',
        },
      }).pipe(
        map((value) => {
          GlobalLoadingSetup.getLoading().isHide();
          if ((value as any).status === 200) {
            store.dispatch(
              GetDetailPostNotNav.get({postId: action.payload.postId}),
            );
            return DeleteCommentSuccess.get(action.payload);
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return DeleteCommentFailed.get(value.data);
        }),
        catchError((error) => {
          GlobalLoadingSetup.getLoading().isHide();
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (error as any).data?.message,
          );
          return of(DeleteCommentFailed.get(error.data));
        }),
      );
    }),
  );

const createRecipeEpic$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(CreateRecipe.type),
    exhaustMap((action: any) => {
      return request<any>({
        method: 'POST',
        url: 'post/create',
        param: action.payload,
        option: {
          format: 'json',
        },
      }).pipe(
        map((result) => {
          if ((result as any).status === 200) {
            store.dispatch(GetProfile.get(store.getState().Auth.user.username));
            return CreateRecipeSuccess.get(result.data);
          }
          return CreateRecipeFailed.get(result);
        }),
        catchError((error) => {
          return CreateRecipeFailed.get(error);
        }),
      );
    }),
  );

const updateRecipeEpic$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(UpdateRecipe.type),
    exhaustMap((action: any) => {
      GlobalLoadingSetup.getLoading().isVisible();
      return request<any>({
        method: 'PUT',
        url: `post/update/${action.payload.id}`,
        param: action.payload.data,
        option: {
          format: 'json',
        },
      }).pipe(
        map((result) => {
          GlobalLoadingSetup.getLoading().isHide();
          if ((result as any).status === 200) {
            store.dispatch(GetProfile.get(store.getState().Auth.user.username));
            return UpdateRecipeSuccess.get(result.data);
          }
          return UpdateRecipeFailed.get(result);
        }),
        catchError((error) => {
          GlobalLoadingSetup.getLoading().isHide();
          return UpdateRecipeFailed.get(error);
        }),
      );
    }),
  );

const createPostSuccess$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(CreateRecipeSuccess.type, UpdateRecipeSuccess.type),
    map(() => {
      return store.dispatch(StackActions.pop());
    }),
  );

const deleteRecipeEpic$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(DeleteRecipe.type),
    exhaustMap((action: any) => {
      GlobalLoadingSetup.getLoading().isVisible();
      return request<any>({
        method: 'POST',
        url: 'post/remove',
        param: action.payload,
        option: {
          format: 'json',
        },
      }).pipe(
        map((result) => {
          GlobalLoadingSetup.getLoading().isHide();
          if ((result as any).status === 200) {
            store.dispatch(GetProfile.get(store.getState().Auth.user.username));
            return DeleteRecipeSuccess.get(result.data);
          }
          return DeleteRecipeFailed.get(result);
        }),
        catchError((error) => {
          GlobalLoadingSetup.getLoading().isHide();
          return DeleteRecipeFailed.get(error);
        }),
      );
    }),
  );

const changePasswordEpic$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(ChangePassword.type),
    exhaustMap((action: any) => {
      return request<any>({
        method: 'POST',
        url: 'new-password',
        param: action.payload,
        option: {
          format: 'json',
        },
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return ChangePasswordSuccess.get(result.data);
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            result.data.err,
          );
          return ChangePasswordFailed.get(result);
        }),
        catchError((error) => {
          return ChangePasswordFailed.get(error);
        }),
      );
    }),
  );

const changePasswordSuccess$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(ChangePasswordSuccess.type),
    map(() => {
      return SignoutRequest.get();
    }),
  );

const getSearchPost$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(SearchRecipes.type),
    exhaustMap((action: any) => {
      GlobalLoadingSetup.getLoading().isVisible();
      return request<any>({
        method: 'GET',
        url: 'post/search',
        param: action.payload,
      }).pipe(
        map((value) => {
          GlobalLoadingSetup.getLoading().isHide();
          if ((value as any).status === 200) {
            const data = {
              search: action.payload.search || '',
              isFilter: action.payload.isFilter || false,
              page: action.payload.page || 1,
              posts: value.data.posts,
              numberOfPosts: value.data.numberOfPosts
            }
            return SearchRecipesSuccess.get(data);
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (value as any).data?.message,
          );
          return SearchRecipesFailed.get(value.data);
        }),
        catchError((error) => {
          GlobalLoadingSetup.getLoading().isHide();
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Thông báo',
            (error as any).data?.message,
          );
          return of(SearchRecipesFailed.get(error.data));
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
  getFollowPostFav$,
  createRecipeEpic$,
  changePasswordEpic$,
  getSearchPost$,
  changePasswordSuccess$,
  createPostSuccess$,
  getAnotherProfileRequest$,
  getUserPost$,
  updateRecipeEpic$,
  deleteRecipeEpic$,
  deleteComment$,
);
