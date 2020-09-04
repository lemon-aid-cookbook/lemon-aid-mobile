import {CText} from 'components';
import {COLOR, ratio, TAB_TYPES} from 'config/themeUtils';
import {
  Follow,
  GetDetailPostNotNav,
  LikePost,
  Unfollow,
  UnlikePost,
} from 'pages/Profile/redux/actions';
import React, {useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {RNChipView} from 'react-native-chip-view';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';

export interface Props {
  detailRecipe: any;
}

const defaultProps = {
  detailRecipe: {
    id: 0,
    userId: 3,
    favNum: 30,
    name: 'Steven Black',
    icon: 'https://source.unsplash.com/random',
    ava: 'https://source.unsplash.com/random',
    title: 'Salad ngon ngon',
    time: 3600,
    ration: 4,
    category: ['Rau', '100gr thịt heo'],
    steps: [
      {description: 'Rửa rau', img: 'https://source.unsplash.com/random'},
      {description: 'Xào rau', img: 'https://source.unsplash.com/random'},
      {
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        img: 'https://source.unsplash.com/random',
      },
    ],
  },
};

const DetailTab: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const detailPost = useSelector((state) => state.Profile.detailPost);
  const followings = useSelector(
    (state) => state.Profile.profileInfo?.followings,
  );
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const [refreshing] = useState(false);

  const renderProfile = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 9 * ratio,
        }}>
        <Image
          source={{
            uri: detailPost.author?.avatar,
          }}
          style={{
            width: 30 * ratio,
            height: 30 * ratio,
            borderRadius: 15 * ratio,
            marginRight: 5 * ratio,
          }}
        />
        <View>
          <CText fontSize={14} color={COLOR.DEACTIVE_GRAY}>
            {detailPost.author?.username}
          </CText>
          {user && detailPost.author?.username !== user?.username && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleFollow()}>
              <CText fontSize={14} color={COLOR.PRIMARY_ACTIVE}>
                {checkFollow() ? 'Đang theo dõi' : 'Theo dõi'}
              </CText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const handleFollow = () => {
    if (user) {
      const val = {
        userId: user.id,
        limit: 10,
        page: 1,
        type: TAB_TYPES[2],
        followerId: detailPost.userId,
      };
      if (checkFollow() === true) {
        dispatch(Unfollow.get(val));
      } else {
        dispatch(Follow.get(val));
      }
    }
  };

  const renderInge = () => {
    return (
      <View style={{marginVertical: 9 * ratio}}>
        <CText fontSize={16} bold color={COLOR.PRIMARY_ACTIVE}>
          Nguyên liệu
        </CText>
        {detailPost.ingredients.length > 0 &&
          detailPost.ingredients.map((item: any) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginLeft: 16 * ratio,
                }}>
                <CText fontSize={14} style={{flex: 1, textAlign: 'justify'}}>
                  {item}
                </CText>
              </View>
            );
          })}
      </View>
    );
  };

  const renderStep = () => {
    return (
      <View style={{marginBottom: 16 * ratio}}>
        <CText fontSize={16} bold color={COLOR.PRIMARY_ACTIVE}>
          Các bước thực hiện
        </CText>
        {detailPost.content.length > 0 &&
          detailPost.content.map((item: any, index: number) => {
            return (
              <View style={{flex: 1, paddingVertical: 5 * ratio}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                  }}>
                  <View style={styles.index}>
                    <CText fontSize={14} color={'white'} bold>
                      {index + 1}
                    </CText>
                  </View>
                  <View style={{flex: 1}}>
                    <View
                      style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                      <CText
                        fontSize={14}
                        style={{flex: 1, textAlign: 'justify'}}>
                        {item.making}
                      </CText>
                    </View>
                    {item.image && (
                      <Image
                        source={{
                          uri: item.image,
                        }}
                        style={{
                          width: '100%',
                          height: 200 * ratio,
                          borderRadius: 9 * ratio,
                          marginTop: 5 * ratio,
                        }}
                      />
                    )}
                  </View>
                </View>
              </View>
            );
          })}
      </View>
    );
  };

  const renderCategory = () => {
    return (
      <View style={{marginTop: 9 * ratio}}>
        <CText fontSize={16} bold color={COLOR.PRIMARY_ACTIVE}>
          Nhóm thức ăn
        </CText>
        <View style={{flexDirection: 'row'}}>
          {detailPost.ingredients.length > 0 &&
            detailPost.categories.map((item: any) => {
              return (
                <View
                  style={{marginHorizontal: 8 * ratio, marginTop: 6 * ratio}}>
                  {item.length > 0 && (
                    <RNChipView
                      title={item}
                      avatar={false}
                      titleStyle={{
                        fontSize: 14 * ratio,
                        color: 'white',
                        fontFamily: 'Cabin-Regular',
                        fontWeight: 'normal',
                      }}
                      backgroundColor={COLOR.PRIMARY_ACTIVE}
                    />
                  )}
                </View>
              );
            })}
        </View>
      </View>
    );
  };

  const checkFavorite = () => {
    if (
      user &&
      detailPost.likes.find((item) => item.user.username === user?.username)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkFollow = () => {
    if (
      user &&
      followings.find(
        (item) => item.user.username === detailPost?.author.username,
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onTouchFav = () => {
    if (user) {
      const val = {
        userId: user.id,
        postId: detailPost.id,
        limit: 10,
        page: 1,
        type: TAB_TYPES[1],
      };
      checkFavorite() === true
        ? dispatch(UnlikePost.get(val))
        : dispatch(LikePost.get(val));
    }
  };

  const onRefreshDetail = () => {
    dispatch(GetDetailPostNotNav.get({postId: detailPost.id}));
  };

  return (
    <View style={styles.container} key={detailPost.likes}>
      <ScrollView
        contentContainerStyle={{marginBottom: 16 * ratio}}
        style={styles.listWrap}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreshDetail} />
        }>
        <View>
          <Image
            source={{
              uri: detailPost.avatar,
            }}
            style={{
              width: '100%',
              height: 200 * ratio,
              borderRadius: 9 * ratio,
            }}
          />

          <TouchableWithoutFeedback
            onPress={() => {
              onTouchFav();
            }}>
            <View style={styles.favoriteWrap}>
              <AntDesign
                name={checkFavorite() ? 'heart' : 'hearto'}
                color={COLOR.PRIMARY_ACTIVE}
                size={24 * ratio}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 5 * ratio,
          }}>
          <CText fontSize={20} bold>
            {detailPost.title}
          </CText>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign
              name={'heart'}
              color={COLOR.PRIMARY_ACTIVE}
              size={14 * ratio}
              style={{marginRight: 8 * ratio}}
            />
            <CText fontSize={14} bold>
              {detailPost.likes.length}
            </CText>
          </View>
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <CText style={{flex: 1}} fontSize={16}>
            {detailPost.description || ''}
          </CText>
        </View>
        {renderProfile()}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CText
            fontSize={14}
            bold
            color={'black'}
            style={{marginRight: 3 * ratio}}>
            Thời gian:
          </CText>
          <CText fontSize={14} color={'black'}>
            {detailPost.cookingTime} phút
          </CText>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CText
            fontSize={14}
            bold
            color={'black'}
            style={{marginRight: 3 * ratio}}>
            Khẩu phần:
          </CText>
          <CText fontSize={14} color={'black'}>
            {detailPost.ration || 1} người
          </CText>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CText
            fontSize={14}
            bold
            color={'black'}
            style={{marginRight: 3 * ratio}}>
            Độ khó:
          </CText>
          <CText fontSize={14} color={'black'}>
            {detailPost.difficultLevel === 1
              ? 'Dễ'
              : detailPost.difficultLevel === 2
              ? 'Trung bình'
              : 'Khó'}
          </CText>
        </View>
        {renderCategory()}
        {renderInge()}
        {renderStep()}
      </ScrollView>
    </View>
  );
};

DetailTab.defaultProps = defaultProps;
export default DetailTab;
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
    borderTopLeftRadius: 24 * ratio,
    borderTopRightRadius: 24 * ratio,
    backgroundColor: 'white',
    padding: 16 * ratio,
  },
  favoriteWrap: {
    position: 'absolute',
    backgroundColor: 'white',
    top: -10 * ratio,
    right: -10 * ratio,
    width: 45 * ratio,
    height: 45 * ratio,
    borderRadius: 25 * ratio,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  index: {
    height: 30 * ratio,
    width: 30 * ratio,
    backgroundColor: COLOR.PRIMARY_ACTIVE,
    borderRadius: 20 * ratio,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5 * ratio,
    marginTop: 5 * ratio,
  },
});
