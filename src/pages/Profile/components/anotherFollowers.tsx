import {CButton, CHeader, CText} from 'components';
import {COLOR, HEADER_TYPE, ratio, TAB_TYPES} from 'config/themeUtils';
import EmptyList from 'pages/Search/components/emptyList';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackActions} from 'react-navigation';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {Follow, Unfollow} from '../redux/actions';

const AnotherFollowerPage: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const headerTitle = useNavigationParam('title') || 'Người theo dõi';
  const followers = useNavigationParam('followers') || [];
  const followings = useSelector(
    (state) => state.Profile.profileInfo.followings,
  );
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();

  const _renderItem = ({item, index}: {item: any; index: string}) => {
    return (
      <TouchableOpacity
        disabled={user && user.username === item.user.username}
        onPress={() =>
          dispatch(
            StackActions.push({
              routeName: 'AnotherProfile',
              params: {username: item.user.username},
            }),
          )
        }
        style={{
          marginHorizontal: 16 * ratio,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 10 * ratio,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Image
            style={{
              width: 50 * ratio,
              height: 50 * ratio,
              borderRadius: 35 * ratio,
              marginRight: 5 * ratio,
            }}
            source={{
              uri:
                item.user?.avatar ||
                'https://discovery-park.co.uk/wp-content/uploads/2017/06/avatar-default.png',
            }}
          />

          <CText fontSize={16}>{item.user.username}</CText>
        </View>
        {user && user.username !== item.user.username && (
          <CButton
            textColor={COLOR.PRIMARY_ACTIVE}
            title={checkFollow(item.user) ? 'Đang theo dõi' : 'Theo dõi'}
            style={styles.btnStyle}
            onPress={() => onUnfollow(item.user)}
          />
        )}
      </TouchableOpacity>
    );
  };

  const checkFollow = (fl: any) => {
    if (
      user &&
      followings.find((item: any) => item.user.username === fl.username)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onUnfollow = (item: any) => {
    if (user) {
      const val = {
        userId: user.id,
        limit: 10,
        page: 1,
        type: TAB_TYPES[2],
        followerId: item.id,
      };
      if (checkFollow(item) === true) {
        dispatch(Unfollow.get(val));
      } else {
        dispatch(Follow.get(val));
      }
    }
  };

  return (
    <View style={styles.container}>
      <CHeader
        headerTitle={headerTitle}
        type={HEADER_TYPE.NORMAL}
        isShowLeft
        onLeftPress={() => goBack()}
      />
      <View style={styles.listWrap}>
        <FlatList
          data={followers}
          keyExtractor={(item, index) => item.id}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <EmptyList />}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1 * ratio,
                backgroundColor: '#DADADA',
                marginHorizontal: 16 * ratio,
              }}
            />
          )}
          contentContainerStyle={{marginTop: 16 * ratio}}
        />
      </View>
    </View>
  );
};

export default AnotherFollowerPage;

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
  btnStyle: {
    width: 150 * ratio,
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLOR.PRIMARY_ACTIVE,
    borderWidth: 1 * ratio,
  },
});
