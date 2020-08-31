import {CText, CHeader} from 'components';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {HEADER_TYPE, ratio, COLOR, TAB_TYPES} from 'config/themeUtils';
import SegmentedControlTab from "react-native-segmented-control-tab";
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import RecipeItem from './components/recipeItem'
import { useDispatch, useSelector } from 'react-redux';
import { GetProfile, GetMostFave, GetRecent, GetFavoritePost, GetFollowPost } from 'pages/Profile/redux/actions';
import HomeTabComponent from './components/tabBarWrap';

export interface Props {
  listRecipe: any[];
}

const SearchPage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const profile = useSelector((state) => state.Profile);
  
  useEffect(() => {
    if (user) {
      dispatch(GetProfile.get(user.username))
      dispatch(GetFollowPost.get({
        userId: user.id,
        limit: 10,
        page: 1,
        type: TAB_TYPES[2]
      }))
    }
    dispatch(GetMostFave.get())
    dispatch(GetRecent.get())
  }, [])

  return (
    <View style={styles.container}>
      <CHeader
        type={HEADER_TYPE.SEARCH}
        onSearch={(text) => {
          console.info(text);
        }}
      />
      <View style={styles.listWrap}>
        <HomeTabComponent />
      </View>
    </View>
  );
};

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
    paddingBottom: 16 * ratio
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
