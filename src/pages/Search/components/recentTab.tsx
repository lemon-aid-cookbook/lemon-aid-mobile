import {CText} from 'components';
import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import RecipeItem from 'pages/Search/components/recipeItem';
import { ratio } from 'config/themeUtils';
import EmptyList from './emptyList';
import { GetDetailPost } from 'pages/Profile/redux/actions';

export interface Props {

}

const RecentTab: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const recentPost = useSelector((state) => state.Profile.recentPost);

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

  return (
    <FlatList
      data={recentPost}
      keyExtractor={(index) => index.toString()}
      renderItem={_renderItem}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => <EmptyList />}
    />
  );
};

export default RecentTab;