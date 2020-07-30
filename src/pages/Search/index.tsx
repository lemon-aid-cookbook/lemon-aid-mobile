import {CText, CHeader} from 'components';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Image} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {HEADER_TYPE, ratio, COLOR} from 'config/themeUtils';
import SegmentedControl from '@react-native-community/segmented-control';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import RecipeItem from './components/recipeItem'

export interface Props {
  listRecipe: any[];
}
const defaultProps = {
  listRecipe: [
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
const SearchPage: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const [segmentIndex, setSegmentIndex] = useState(0);

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
        type={HEADER_TYPE.SEARCH}
        onSearch={(text) => {
          console.info(text);
        }}
      />
      <View style={styles.listWrap}>
        <SegmentedControl
          values={['Yêu thích', 'Theo dõi', 'Mới nhất']}
          selectedIndex={segmentIndex}
          onChange={(event) => {
            setSegmentIndex(event.nativeEvent.selectedSegmentIndex);
          }}
          tintColor={COLOR.PRIMARY_ACTIVE}
          backgroundColor={'white'}
          fontStyle={{
            color: COLOR.PRIMARY_ACTIVE,
            fontSize: 16 * ratio,
            fontFamily: 'Cabin-Regular',
          }}
          activeFontStyle={{
            color: 'white',
            fontSize: 16 * ratio,
            fontFamily: 'Cabin-Regular',
          }}
          style={{marginHorizontal: 16 * ratio}}
        />
        <FlatList
          data={props.listRecipe}
          keyExtractor={(index) => index.toString()}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

SearchPage.defaultProps = defaultProps;

export default SearchPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listWrap: {
    flex: 1,
    marginTop: -24 * ratio,
    borderTopLeftRadius: 24 * ratio,
    borderTopRightRadius: 24 * ratio,
    backgroundColor: 'white',
    paddingTop: 16 * ratio,
    // paddingHorizontal: 16 * ratio
  },
  cardItem: {
    marginHorizontal: 16 * ratio,
    marginTop: 10 * ratio,
    marginBottom: 20 * ratio,
    height: 220 * ratio,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 9 * ratio,
  },
});
