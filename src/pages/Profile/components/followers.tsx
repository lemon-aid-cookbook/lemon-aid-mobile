import {CButton, CHeader, CText} from 'components';
import {COLOR, HEADER_TYPE, ratio, TAB_TYPES} from 'config/themeUtils';
import EmptyList from 'pages/Search/components/emptyList';
import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import { Unfollow, Follow } from '../redux/actions';

const FollowerPage: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const followers = useSelector(
    (state) => state.Profile.profileInfo.followers,
  );
  const followings = useSelector(
    (state) => state.Profile.profileInfo.followings,
  );
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();

  const _renderItem = ({item, index}: {item: any; index: string}) => {
    return (
      <View
        style={{
          marginHorizontal: 16 * ratio,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
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
        <CButton
          textColor={COLOR.PRIMARY_ACTIVE}
          title={checkFollow(item) ? 'Đang theo dõi' : 'Theo dõi'}
          style={styles.btnStyle}
          onPress={() => onUnfollow(item.user)}
        />
      </View>
    );
  };

  const checkFollow = (user:any) => {
    if (user && followings.find(item => item.user.username === user.username)){
      return true
    } else {
      return false
    }
  }

  const onUnfollow = (item: any) => {
        if (user) {
          const val = {
            userId: user.id,
            limit: 10,
            page: 1,
            type: TAB_TYPES[2],
            followerId: item.id
          }
          if (checkFollow(item) === true) {
            dispatch(
              Unfollow.get(val)
            )
          } else {
            dispatch(Follow.get(val))
          }
        }
  };

  return (
    <View style={styles.container}>
      <CHeader headerTitle="Người theo dõi" type={HEADER_TYPE.NORMAL} isShowLeft
        onLeftPress={() => goBack()}/>
      <View style={styles.listWrap}>
        <FlatList
          data={followers}
          keyExtractor={(index) => index.toString()}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <EmptyList />}
          ItemSeparatorComponent={() => <View style={{ height: 1 * ratio, backgroundColor: '#DADADA', width: '100%', marginHorizontal: 16 * ratio}}/>}
          contentContainerStyle={{ marginTop: 16 * ratio}}
        />
      </View>
    </View>
  );
};

export default FollowerPage;

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
    marginVertical: 10 * ratio,
    borderColor: COLOR.PRIMARY_ACTIVE,
    borderWidth: 1 * ratio,
  },
});
