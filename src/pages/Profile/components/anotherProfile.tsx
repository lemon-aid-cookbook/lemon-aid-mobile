import {CHeader, CText} from 'components';
import {COLOR, HEADER_TYPE, ratio, TAB_TYPES} from 'config/themeUtils';
import EmptyList from 'pages/Search/components/emptyList';
import RecipeItem from 'pages/Search/components/recipeItem';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackActions} from 'react-navigation';
import {
  useIsFocused,
  useNavigation,
  useNavigationParam,
} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {
  Follow,
  GetAnotherProfile,
  GetDetailPost,
  Unfollow,
  GetUserPost,
} from '../redux/actions';

export interface Props {
  avatar: string;
  name: string;
  email: string;
  listFavorite: any[];
}

const defaultProps = {
  avatar:
    'https://discovery-park.co.uk/wp-content/uploads/2017/06/avatar-default.png',
  name: 'Matilda Brown',
  email: 'ThisIsAnEmail@gmail.com',
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

const AnotherProfilePage: React.FC<Props> = (props) => {
  const username = useNavigationParam('username') || null;
  const {goBack, navigate} = useNavigation();
  const user = useSelector((state) => state.Auth.user);
  const profile = useSelector((state) => state.Profile);
  const {anotherProfile, userPost, totalUserPost, userPage} = profile;
  const followings = useSelector(
    (state) => state.Profile.profileInfo.followings,
  );
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [refreshing, setRefreshing] = useState(false);

  const isFollowing =
    user &&
    followings &&
    followings.some((item: any) => item.user.username === username);

  useEffect(() => {
    if (username && isFocused) {
      dispatch(GetAnotherProfile.get(username));
    }
  }, [isFocused, isFollowing]);

  const _renderItem = ({item, index}: {item: any; index: string}) => {
    const recipe = {
      ...item,
      userAvar: anotherProfile.avatar,
      username: anotherProfile.username,
    };
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => dispatch(GetDetailPost.get({postId: item.id}))}
        style={{flex: 1}}>
        <RecipeItem item={recipe} />
      </TouchableOpacity>
    );
  };

  const onFollow = () => {
    const val = {
      userId: user.id,
      limit: 10,
      page: 1,
      type: TAB_TYPES[2],
      followerId: anotherProfile.id,
    };
    if (isFollowing) {
      dispatch(Unfollow.get(val));
    } else {
      dispatch(Follow.get(val));
    }
  };

  const handleLoadMore = () => {
    if (isFocused && userPost.length < totalUserPost) {
      dispatch(
        GetUserPost.get({
          userId: anotherProfile.id,
          limit: 10,
          page: userPage + 1,
          type: TAB_TYPES[0],
        }),
      );
    }
  };

  if (!anotherProfile || anotherProfile.username !== username) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <CHeader
        headerTitle="Trang cá nhân"
        type={HEADER_TYPE.NORMAL}
        isShowLeft
        onLeftPress={() => goBack()}
      />
      <View style={styles.listWrap}>
        <View style={styles.profileView}>
          <Image
            style={styles.avatar}
            source={{
              uri:
                anotherProfile?.avatar ||
                'https://discovery-park.co.uk/wp-content/uploads/2017/06/avatar-default.png',
            }}
          />
          <View style={styles.infoView}>
            <CText bold style={{fontSize: 18 * ratio}}>
              {anotherProfile.username}
            </CText>
            {user && (
              <TouchableOpacity onPress={onFollow}>
                <CText
                  style={{fontSize: 18 * ratio, color: COLOR.PRIMARY_ACTIVE}}>
                  {isFollowing ? 'Đang theo dõi' : 'Theo dõi'}
                </CText>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: 8 * ratio,
            marginBottom: 16 * ratio,
          }}>
          <View style={styles.flView}>
            <CText bold fontSize={18}>
              {anotherProfile?.Posts.length || 0}
            </CText>
            <CText>bài đăng</CText>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.flView}
            onPress={() =>
              dispatch(
                StackActions.push({
                  routeName: 'AnotherFollowers',
                  params: {
                    title: 'Người theo dõi',
                    followers: anotherProfile?.followers,
                  },
                }),
              )
            }>
            <CText bold fontSize={18}>
              {anotherProfile?.followers.length || 0}
            </CText>
            <CText>người theo dõi</CText>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.flView}
            onPress={() =>
              dispatch(
                StackActions.push({
                  routeName: 'AnotherFollowers',
                  params: {
                    title: 'Đang theo dõi',
                    followers: anotherProfile?.followings,
                  },
                }),
              )
            }>
            <CText bold fontSize={18}>
              {anotherProfile?.followings.length || 0}
            </CText>
            <CText>đang theo dõi</CText>
          </TouchableOpacity>
        </View>
        {/* <CText
          bold
          fontSize={22}
          style={{
            color: COLOR.PRIMARY_ACTIVE,
            paddingVertical: 20 * ratio,
            paddingLeft: 24 * ratio,
          }}>
          Công thức của {username}
        </CText> */}
        <FlatList
          data={userPost}
          keyExtractor={(item, index) => item.id}
          onRefresh={() => dispatch(GetAnotherProfile.get(username))}
          refreshing={refreshing}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <EmptyList />}
          onEndReachedThreshold={0.4}
          onEndReached={handleLoadMore}
        />
      </View>
    </View>
  );
};

AnotherProfilePage.defaultProps = defaultProps;
export default AnotherProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listWrap: {
    flex: 1,
    marginTop: -24 * ratio,
    borderTopLeftRadius: 24 * ratio,
    borderTopRightRadius: 24 * ratio,
    backgroundColor: 'white',
  },
  floatingBtn: {
    position: 'absolute',
    right: 16 * ratio,
    bottom: 16 * ratio,
    backgroundColor: COLOR.PRIMARY_ACTIVE,
    width: 56 * ratio,
    height: 56 * ratio,
    borderRadius: 28 * ratio,
    shadowColor: COLOR.PRIMARY_ACTIVE,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20 * ratio,
  },
  avatar: {
    width: 70 * ratio,
    height: 70 * ratio,
    marginLeft: 25 * ratio,
    borderRadius: 35 * ratio,
  },
  infoView: {
    flexDirection: 'column',
    flex: 7,
    marginHorizontal: 16 * ratio,
    marginBottom: 16 * ratio,
  },
  flView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
