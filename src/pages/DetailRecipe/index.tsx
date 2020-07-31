import {CText, CButton, CHeader} from 'components';
import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {useSelector} from 'react-redux';
import {ratio, HEADER_TYPE} from 'config/themeUtils';
import RecipeItem from 'pages/Search/components/recipeItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
export interface Props {
  detailRecipe: any[]
}

const defaultProps = {
    detailRecipe: [
    {
      id: 0,
      userId: 3,
      userName: 'stevenblack1717',
      icon: 'https://source.unsplash.com/random',
      ava: 'https://source.unsplash.com/random',
      title: 'Salad ngon ngon',
      time: 3600,
      category: ['Rau', '100gr thịt heo'],
      steps: [
          { description: 'Rửa rau', img: 'https://source.unsplash.com/random'},
      ]
    },
  ],
};

const DetailPage: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const user = useSelector((state) => state.Auth.user);

  return (
    <View style={styles.container}>
      <CHeader type={HEADER_TYPE.NORMAL} headerTitle={'Chi tiết'}/>
       <View style={styles.listWrap}>

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
    // alignItems: 'center',
  }
});
