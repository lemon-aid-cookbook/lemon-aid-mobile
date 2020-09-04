import {CHeader, CText, GlobalModalSetup, RoyalModal} from 'components';
import {
  COLOR,
  HEADER_TYPE,
  MODAL_TYPE,
  ratio,
  TAB_TYPES,
} from 'config/themeUtils';
import {SignoutRequest} from 'pages/Login/redux/actions';
import EmptyList from 'pages/Search/components/emptyList';
import RecipeItem from 'pages/Search/components/recipeItem';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import {useIsFocused, useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {
  DeleteRecipe,
  GetDetailPost,
  GetProfile,
  GetUserPost,
  UpdateInfo,
} from './redux/actions';

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

const ProfilePage: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const user = useSelector((state) => state.Auth.user);
  const profile = useSelector((state) => state.Profile);
  const {profileInfo, userPost, totalUserPost, userPage} = profile;
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const [isShowModal, setShowModal] = useState(false);
  const [detailItem, setDetailItem] = useState({});

  useEffect(() => {
    if (user && isFocused) {
      dispatch(GetProfile.get(user.username));
    }
  }, [isFocused]);

  const _renderItem = ({item, index}: {item: any; index: string}) => {
    const recipe = {
      ...item,
      userAvar: profileInfo.avatar,
      username: user.username,
    };
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => dispatch(GetDetailPost.get({postId: item.id}))}
        style={{flex: 1}}
        onLongPress={() => {
          setDetailItem(item);
          setShowModal(true);
        }}>
        <RecipeItem item={recipe} />
      </TouchableOpacity>
    );
  };

  const renderFloatingBtn = () => {
    return (
      <TouchableWithoutFeedback onPress={() => navigate('CreatePost')}>
        <View style={styles.floatingBtn}>
          <Feather name={'plus'} size={24 * ratio} color={'white'} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const updateAva = () => {
    ImagePicker.showImagePicker(
      {
        maxWidth: 512,
      },
      (result) => {
        if (!result.didCancel) {
          setAva(`data:${result.type};base64,${result.data}`);
        }
      },
    );
  };

  const setAva = (data: any) => {
    dispatch(
      UpdateInfo.get({
        userId: user.id,
        data: {avatar: data},
      }),
    );
  };

  const handleLoadMore = () => {
    if (isFocused && userPost.length < totalUserPost) {
      dispatch(
        GetUserPost.get({
          userId: user.id,
          limit: 10,
          page: userPage + 1,
          type: TAB_TYPES[0],
        }),
      );
    }
  };

  if (!user) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <CHeader headerTitle="Trang cá nhân" type={HEADER_TYPE.NORMAL} />
      <View style={styles.listWrap}>
        <View style={styles.profileView}>
          <TouchableOpacity style={{flex: 2}} onPress={updateAva}>
            <Image
              style={styles.avatar}
              source={{
                uri:
                  profileInfo?.avatar ||
                  'https://discovery-park.co.uk/wp-content/uploads/2017/06/avatar-default.png',
              }}
            />
          </TouchableOpacity>
          <View style={styles.infoView}>
            <CText bold style={{fontSize: 18 * ratio}}>
              {user.username}
            </CText>
            <CText style={{fontSize: 16 * ratio, color: 'grey'}}>
              {user.email}
            </CText>
            <View style={{flexDirection: 'row', marginTop: 4 * ratio}}>
              <TouchableOpacity onPress={() => navigate('ChangePassword')}>
                <CText style={{fontSize: 18 * ratio, color: 'gold'}}>
                  Đổi mật khẩu
                </CText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginLeft: 24 * ratio}}
                onPress={() => {
                  dispatch(SignoutRequest.get());
                }}>
                <CText
                  style={{fontSize: 18 * ratio, color: COLOR.PRIMARY_ACTIVE}}>
                  Đăng xuất
                </CText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginBottom: 16 * ratio,
          }}>
          <View style={styles.flView}>
            <CText bold fontSize={18}>
              {profileInfo?.Posts.length || 0}
            </CText>
            <CText>bài đăng</CText>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.flView}
            onPress={() => navigate('Followers')}>
            <CText bold fontSize={18}>
              {profileInfo?.followers.length || 0}
            </CText>
            <CText>người theo dõi</CText>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.flView}
            onPress={() => navigate('Followings')}>
            <CText bold fontSize={18}>
              {profileInfo?.followings.length || 0}
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
          Công thức của bạn
        </CText> */}
        <FlatList
          data={userPost}
          keyExtractor={(item, index) => item.id}
          onRefresh={() => dispatch(GetProfile.get(user.username))}
          refreshing={refreshing}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <EmptyList />}
          onEndReachedThreshold={0.4}
          onEndReached={handleLoadMore}
        />
      </View>
      <View>{renderFloatingBtn()}</View>
      <RoyalModal
        item={detailItem}
        isShow={isShowModal}
        onCancel={(val) => setShowModal(val)}
        onDelete={(value) => {
          setShowModal(value.isVisible);
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'Xác nhận',
            `Bạn có chắc chắn muốn xóa công thức ${value.item.title}?`,
            MODAL_TYPE.CHOICE,
            () => dispatch(DeleteRecipe.get({id: value.item.id})),
          );
        }}
        onEdit={(val) => {
          setShowModal(val.isVisible);
          navigate('UpdatePost', {id: val.item.id});
        }}
      />
    </View>
  );
};

ProfilePage.defaultProps = defaultProps;
export default ProfilePage;

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
