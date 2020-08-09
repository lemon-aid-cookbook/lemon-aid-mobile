import {CText, CButton, CHeader} from 'components';
import React from 'react';
import {StyleSheet, View, FlatList, Image} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {useSelector} from 'react-redux';
import {ratio, HEADER_TYPE, COLOR} from 'config/themeUtils';
import RecipeItem from 'pages/Search/components/recipeItem';
export interface Props {
  avatar: string,
  name: string,
  email: string,
  listFavorite: any[]
}

const defaultProps = {
  avatar:  'https://reactnative.dev/img/tiny_logo.png',
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

  const _renderItem = ({item, index}: {item: any; index: string}) => {
    return (
      <View style={{ width: '100%'}}>
        <RecipeItem item={item} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CHeader
       headerTitle='Trang cá nhân'
       type={HEADER_TYPE.NORMAL}
      />
      <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20 * ratio,}}>
        <Image
          style={{width: 70 * ratio, height: 70 * ratio, marginLeft: 25 * ratio,  borderRadius: 35 * ratio}}
          source={{ uri: props.avatar, }}/>
        <View style={{flexDirection: 'column', marginLeft: 15}}>
          <CText bold style={{fontSize: 20}}>
            {props.name}
          </CText>
          
          <CText style={{fontSize: 15, color: 'grey'}}>
            {props.email}
          </CText>

          <CText style={{fontSize: 18, color: 'gold'}}>
            Chỉnh sửa thông tin cá nhân
          </CText>
        </View>
      </View>
      <CText bold  fontSize={22} style={{color: COLOR.PRIMARY_ACTIVE, paddingVertical: 20 * ratio, paddingLeft: 25 * ratio}}>
       Công thức của bạn
      </CText>
      <FlatList
          data={props.listFavorite}
          keyExtractor={(index) => index.toString()}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
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
    alignItems: 'center',
  }
});
