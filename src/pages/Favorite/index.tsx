import {CText, CButton, CHeader} from 'components';
import React, { useEffect } from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {useSelector, useDispatch} from 'react-redux';
import {ratio, HEADER_TYPE, TAB_TYPES} from 'config/themeUtils';
import RecipeItem from 'pages/Search/components/recipeItem';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { GetFavoritePost, GetDetailPost } from 'pages/Profile/redux/actions';
import EmptyList from 'pages/Search/components/emptyList';
export interface Props {
  listFavorite: any[];
}

const defaultProps = {
  listFavorite: [
    {
      id: 0,
      favCount: 30,
      userId: 3,
      userName: 'stevenblack1717',
      icon: 'https://source.unsplash.com/random',
      ava: 'https://source.unsplash.com/random',
      title: 'Salad ngon ngon',
      time: 3600,
    },
    {
      id: 1,
      favCount: 30,
      userId: 3,
      userName: 'stevenblack1717',
      icon: 'https://source.unsplash.com/random',
      ava: 'https://source.unsplash.com/random',
      title: 'Salad ngon ngon',
      time: 3600,
    },
    {
      id: 2,
      favCount: 30,
      userId: 3,
      userName: 'stevenblack1717',
      icon: 'https://source.unsplash.com/random',
      ava: 'https://source.unsplash.com/random',
      title: 'Salad ngon ngon',
      time: 3600,
    },
  ],
};

const FavoritePage: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const user = useSelector((state) => state.Auth.user);
  const favPost = useSelector((state) => state.Profile.favPost);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (user) {
      dispatch(GetFavoritePost.get({
        userId: user.id,
        limit: 10,
        page: 1,
        type: TAB_TYPES[1]
      }))
    }

  }, [])

  const _renderItem = ({item, index}: {item: any; index: string}) => {
    return (
      <View style={{width: '100%'}}>
        <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          dispatch(GetDetailPost.get({ postId: item.id }))
        }}>
        <View style={{width: '100%'}}>
          <RecipeItem item={item} />
        </View>
      </TouchableOpacity>
      </View>
    );
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <CHeader type={HEADER_TYPE.NORMAL} headerTitle="Yêu thích" />
        <View style={[styles.listWrap, {alignItems: 'center'}]}>
          <CText fontSize={16 * ratio} style={styles.text}>
            Bạn chưa đăng nhập. Vui lòng đăng nhập để xem các công thức đã
            thích.
          </CText>
          <CButton
            style={styles.btnStyle}
            title="Đăng nhập"
            onPress={() => navigate('Profile')}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CHeader type={HEADER_TYPE.NORMAL} headerTitle={'Yêu thích'} />
      <View style={styles.listWrap}>
        <FlatList
          data={favPost}
          keyExtractor={(index) => index.toString()}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

FavoritePage.defaultProps = defaultProps;
export default FavoritePage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    marginHorizontal: 16 * ratio,
    marginVertical: 24 * ratio,
  },
  btnStyle: {
    width: 120 * ratio,
    borderRadius: 10 * ratio,
  },
  listWrap: {
    flex: 1,
    marginTop: -24 * ratio,
    borderTopLeftRadius: 24 * ratio,
    borderTopRightRadius: 24 * ratio,
    backgroundColor: 'white',
  },
});
