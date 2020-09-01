import { CHeader } from 'components';
import { HEADER_TYPE, ratio } from 'config/themeUtils';
import { ClearSearch, GetDetailPost, SearchRecipes } from 'pages/Profile/redux/actions';
import React, { useEffect } from 'react';
import {
    FlatList, StyleSheet,



    TouchableOpacity, View
} from 'react-native';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { useDispatch, useSelector } from 'react-redux';
import EmptyList from './emptyList';
import RecipeItem from './recipeItem';

export interface Props {}

const SearchDetailPage: React.FC<Props> = (props) => {
  const keyword = useNavigationParam('keyword') || '';
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const profile = useSelector((state) => state.Profile);
  const {goBack, navigate} = useNavigation();

  useEffect(() => {
      if (keyword.length > 0) {
        dispatch(
            SearchRecipes.get({
              order: 'latest',
              limit: 10,
              page: 1,
              search: keyword,
            }),
          );
      }

    return () => dispatch(ClearSearch.get());
  }, []);

  const _renderItem = ({item, index}: {item: any; index: string}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          dispatch(GetDetailPost.get({postId: item.id}));
        }}>
        <View style={{width: '100%'}}>
          <RecipeItem item={item} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <CHeader
        type={HEADER_TYPE.HEADER_SEARCH}
        onSearch={(text) => {
          dispatch(
            SearchRecipes.get({
              order: 'latest',
              limit: 10,
              page: 1,
              search: text,
            }),
          );
          console.info(text);
        }}
      />
      <View style={styles.listWrap}>
        {profile.searchResult.length > 0 && (
          <FlatList
            data={profile.searchResult}
            keyExtractor={(index) => index.toString()}
            renderItem={_renderItem}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <EmptyList />}
          />
        )}
      </View>
    </View>
  );
};

export default SearchDetailPage;
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
    paddingBottom: 16 * ratio,
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
