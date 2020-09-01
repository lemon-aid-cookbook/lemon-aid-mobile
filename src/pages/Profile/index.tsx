import {CHeader, CText} from 'components';
import {COLOR, HEADER_TYPE, ratio} from 'config/themeUtils';
import {SignoutRequest} from 'pages/Login/redux/actions';
import RecipeItem from 'pages/Search/components/recipeItem';
import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import EmptyList from 'pages/Search/components/emptyList';
import {GetProfile, GetDetailPost, UpdateInfo} from './redux/actions';
import ImagePicker from 'react-native-image-picker';

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
  const profileInfo = useSelector((state) => state.Profile.profileInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(GetProfile.get(user.username));
    }
  }, []);

  const _renderItem = ({item, index}: {item: any; index: string}) => {
    const recipe = {...item, userAvar: user.avatar, username: user.username};
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => dispatch(GetDetailPost.get({postId: item.id}))}
        style={{flex: 1}}>
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
      (result) => !result.didCancel && setAva(result.data),
    );
  };

  const setAva = (data: any) => {
    dispatch(UpdateInfo.get({
      userId: user.id,
      data: { avatar: 'data:image/png;base64,' + data.substring(1) },
    })
  )
  }

  return (
    <View style={styles.container}>
      <CHeader headerTitle="Trang cá nhân" type={HEADER_TYPE.NORMAL} />
      <View style={styles.listWrap}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 20 * ratio,
          }}>
          <View>
          <Image
            style={{
              width: 70 * ratio,
              height: 70 * ratio,
              marginLeft: 25 * ratio,
              borderRadius: 35 * ratio,
            }}
            source={{
              uri:
              profileInfo?.avatar || 'https://discovery-park.co.uk/wp-content/uploads/2017/06/avatar-default.png',
            }}
          />
          </View>
          <View style={{flexDirection: 'column', marginLeft: 15 * ratio}}>
            <CText bold style={{fontSize: 18 * ratio}}>
              {user.username}
            </CText>

            <CText style={{fontSize: 18 * ratio, color: 'grey'}}>
              {user.email}
            </CText>

            <TouchableOpacity onPress={() => navigate('ChangePassword')}>
              <CText style={{fontSize: 18 * ratio, color: 'gold'}}>
                Chỉnh sửa thông tin cá nhân
              </CText>
            </TouchableOpacity>

            <TouchableOpacity
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <CText bold fontSize={18}>
              {profileInfo?.Posts.length || 0}
            </CText>
            <CText>bài đăng</CText>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigate('Followers')}>
            <CText bold fontSize={18}>
              {profileInfo?.followers.length || 0}
            </CText>
            <CText>người theo dõi</CText>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigate('Followings')}>
            <CText bold fontSize={18}>
              {profileInfo?.followings.length || 0}
            </CText>
            <CText>đang theo dõi</CText>
          </TouchableOpacity>
        </View>
        <CText
          bold
          fontSize={22}
          style={{
            color: COLOR.PRIMARY_ACTIVE,
            paddingVertical: 20 * ratio,
            paddingLeft: 25 * ratio,
          }}>
          Công thức của bạn
        </CText>
        <FlatList
          data={profileInfo?.Posts}
          keyExtractor={(index) => index.toString()}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <EmptyList />}
        />
      </View>
      <View>{renderFloatingBtn()}</View>
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
});
