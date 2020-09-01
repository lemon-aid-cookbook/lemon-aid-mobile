import {defineAction} from 'redux-typed-actions';

export const GetProfile = defineAction<any>('GET_PROFILE_REQUEST');
export const GetProfileSuccess = defineAction<any>('GET_PROFILE_SUCCESS');
export const GetProfileFailed = defineAction<any>('GET_PROFILE_FAILED');

export const GetAnotherProfile = defineAction<any>(
  'GET_ANOTHER_PROFILE_REQUEST',
);
export const GetAnotherProfileSuccess = defineAction<any>(
  'GET_ANOTHER_PROFILE_SUCCESS',
);
export const GetAnotherProfileFailed = defineAction<any>(
  'GET_ANOTHER_PROFILE_FAILED',
);

export const GetMostFave = defineAction<any>('GET_MOST_FAVE');
export const GetMostFaveSuccess = defineAction<any>('GET_MOST_FAVE_SUCCESS');
export const GetMostFaveFailed = defineAction<any>('GET_MOST_FAVE_FAILED');

export const GetRecent = defineAction<any>('GET_RECENT_REQUEST');
export const GetRecentSuccess = defineAction<any>('GET_RECENT_SUCCESS');
export const GetRecentFailed = defineAction<any>('GET_RECENT_FAILED');

export const GetFollowPost = defineAction<any>('GET_FOLLOW_REQUEST');
export const GetFollowPostSuccess = defineAction<any>('GET_FOLLOW_SUCCESS');
export const GetFollowPostFailed = defineAction<any>('GET_FOLLOW_FAILED');

export const GetFavoritePost = defineAction<any>('GET_FAVORITE_REQUEST');
export const GetFavoritePostSuccess = defineAction<any>('GET_FAVORITE_SUCCESS');
export const GetFavoritePostFailed = defineAction<any>('GET_FAVORITE_FAILED');

export const GetDetailPost = defineAction<any>('GET_DETAIL_REQUEST');
export const GetDetailPostSuccess = defineAction<any>('GET_DETAIL_SUCCESS');
export const GetDetailPostFailed = defineAction<any>('GET_DETAIL_FAILED');

export const GetDetailPostNotNav = defineAction<any>('GET_DETAIL_NOT_NAV');
export const GetDetailPostSuccessNotNav = defineAction<any>(
  'GET_DETAIL_SUCCESS_NOT_NAV',
);

export const Follow = defineAction<any>('FOLLOW');
export const FollowSuccess = defineAction<any>('FOLLOW_SUCCESS');
export const FollowFailed = defineAction<any>('FOLLOW_FAILED');

export const Unfollow = defineAction<any>('UNFOLLOW');
export const UnfollowSuccess = defineAction<any>('UNFOLLOW_SUCCESS');
export const UnfollowFailed = defineAction<any>('UNFOLLOW_FAILED');

export const LikePost = defineAction<any>('LIKE_POST');
export const LikePostSuccess = defineAction<any>('LIKE_POST_SUCCESS');
export const LikePostFailed = defineAction<any>('LIKE_POST_FAILED');

export const UnlikePost = defineAction<any>('UNLIKE_POST');
export const UnlikePostSuccess = defineAction<any>('UNLIKE_POST_SUCCESS');
export const UnlikePostFailed = defineAction<any>('UNLIKE_POST_FAILED');

export const CommentPost = defineAction<any>('COMMENT_POST');
export const CommentPostSuccess = defineAction<any>('COMMENT_POST_SUCCESS');
export const CommentPostFailed = defineAction<any>('COMMENT_POST_FAILED');

export const DeleteComment = defineAction<any>('DELETE_COMMENT');
export const DeleteCommentSuccess = defineAction<any>('DELETE_COMMENT_SUCCESS');
export const DeleteCommentFailed = defineAction<any>('DELETE_COMMENT_FAILED');

export const UpdateInfo = defineAction<any>('UPDATE_INFO');
export const UpdateInfoSuccess = defineAction<any>('UPDATE_INFO_SUCCESS');
export const UpdateInfoFailed = defineAction<any>('UPDATE_INFO_FAILED');

export const CreateRecipe = defineAction<any>('CREATE_RECIPE');
export const CreateRecipeSuccess = defineAction<any>('CREATE_RECIPE_SUCCESS');
export const CreateRecipeFailed = defineAction<any>('CREATE_RECIPE_FAILED');

export const ChangePassword = defineAction<any>('CHANGE_PASSWORD');
export const ChangePasswordSuccess = defineAction<any>(
  'CHANGE_PASSWORD_SUCCESS',
);
export const ChangePasswordFailed = defineAction<any>('CHANGE_PASSWORD_FAILED');

export const SearchRecipes = defineAction<any>('SEARCH_RECIPES')
export const SearchRecipesSuccess = defineAction<any>('SEARCH_RECIPES_SUCCESS')
export const SearchRecipesFailed = defineAction<any>('SEARCH_RECIPES_FAILED')
export const ClearSearch = defineAction<any>('CLEAR_SEARCH')
