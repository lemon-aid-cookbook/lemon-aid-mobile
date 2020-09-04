import {CText} from 'components';
import React from 'react';
import {FlatList, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import RecipeItem from 'pages/Search/components/recipeItem';
import { ratio, TAB_TYPES } from 'config/themeUtils';
import EmptyList from './emptyList';
import { GetDetailPost, GetMostFave } from 'pages/Profile/redux/actions';

export interface Props {

}

const MostFavTab: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const mostFavPost = useSelector((state) => state.Profile.mostFavPost);
  const mostFavPage = useSelector((state) => state.Profile.mostFavPage);

  const _renderItem = ({item, index}: {item: any; index: string}) => {
    return (
      <TouchableOpacity
      activeOpacity={0.8}
        onPress={() => {
          dispatch(GetDetailPost.get({ postId: item.id }))
        }}>
        <View style={{width: '100%'}}>
          <RecipeItem item={item} />
        </View>
      </TouchableOpacity>
    );
  };

  const handleLoadMore = () => {
    dispatch(
      GetMostFave.get({
        page: mostFavPage + 1,
      }),
    );
  }

  return (
    <FlatList
      data={mostFavPost}
      keyExtractor={(index) => index.toString()}
      renderItem={_renderItem}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => <EmptyList />}
      onEndReachedThreshold={0.4}
      onEndReached={handleLoadMore}
    />
  );
};

export default MostFavTab;
