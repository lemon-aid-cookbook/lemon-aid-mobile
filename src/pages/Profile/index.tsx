import {CText, CButton, CHeader} from 'components';
import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {useSelector} from 'react-redux';
import {ratio, HEADER_TYPE} from 'config/themeUtils';
import RecipeItem from 'pages/Search/components/recipeItem';
export interface Props {
  listFavorite: any[]
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

const ProfilePage: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const user = useSelector((state) => state.Auth.user);

  return (
    <View style={styles.container}>
       <CText>Trang cá nhân</CText>
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
