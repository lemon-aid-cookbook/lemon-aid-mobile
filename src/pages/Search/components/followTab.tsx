import {CText, CButton} from 'components';
import React, { useEffect } from 'react';
import {FlatList, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import RecipeItem from 'pages/Search/components/recipeItem';
import { ratio, TAB_TYPES } from 'config/themeUtils';
import EmptyList from './emptyList';
import { GetDetailPost, GetFollowPost } from 'pages/Profile/redux/actions';

export interface Props {

}

const FollowTab: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const followPost = useSelector((state) => state.Profile.followPost);
  const followPostPage = useSelector((state) => state.Profile.followPostPage);
  const totalFollowPost = useSelector((state) => state.Profile.totalFollowPost);

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

  if (!user) {
    return (
      <View>
          <CText fontSize={16} style={styles.text}>
            Bạn chưa đăng nhập. Vui lòng đăng nhập để xem công thức của người dùng bạn đang theo dõi.
          </CText>
          <CButton
            style={styles.btnStyle}
            title="Đăng nhập"
            onPress={() => navigate('Profile')}
          />
      </View>
    );
  }

  const handleLoadMore = () => {
    if ( followPost.length < totalFollowPost) {
      dispatch(
        GetFollowPost.get({
          userId: user.id,
          limit: 10,
          page: followPostPage + 1,
          type: TAB_TYPES[2],
        }),
      );
    }
  }

  return (
    <FlatList
      data={followPost}
      keyExtractor={(index) => index.toString()}
      renderItem={_renderItem}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => <EmptyList />}
      onEndReachedThreshold={0.4}
      onEndReached={handleLoadMore}
    />
  );
};

export default FollowTab;


const styles = StyleSheet.create({
    text: {
      textAlign: 'center',
      marginHorizontal: 16 * ratio,
      marginVertical: 24 * ratio,
    },
    btnStyle: {
      width: 120 * ratio,
      borderRadius: 10 * ratio,
      alignSelf: 'center'
    },
  });
