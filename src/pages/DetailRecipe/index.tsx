import {CHeader, CText} from 'components';
import {COLOR, HEADER_TYPE, ratio} from 'config/themeUtils';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from 'react-navigation-hooks';
import TabViewComponent from './components/tabBarWrap';
export interface Props {
  detailRecipe: any;
}

const defaultProps = {
  detailRecipe: {
    id: 0,
    userId: 3,
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

const DetailPage: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const [isFavorite, setFavorite] = useState(false);

  return (
    <View style={styles.container} key={Math.random()}>
      <CHeader
        type={HEADER_TYPE.NORMAL}
        headerTitle={'Chi tiết'}
        isShowLeft
        onLeftPress={() => goBack()}
        isShowRight
        rightIcon={'share'}
        onRightPress={() => console.info('share')}
      />
      <View style={styles.listWrap}>
      <TabViewComponent />
      </View>
    </View>
  );
};

DetailPage.defaultProps = defaultProps;
export default DetailPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listWrap: {
    flex: 1,
    zIndex: 999,
    marginTop: -24 * ratio,
    borderTopLeftRadius: 24 * ratio,
    borderTopRightRadius: 24 * ratio,
    backgroundColor: 'white',
  },
});
