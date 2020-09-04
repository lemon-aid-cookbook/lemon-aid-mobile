import {CHeader} from 'components';
import {CATEGORIES, COLOR, HEADER_TYPE, ratio} from 'config/themeUtils';
import {
  ClearSearch,
  GetDetailPost,
  SearchRecipes,
} from 'pages/Profile/redux/actions';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {RNChipView} from 'react-native-chip-view';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import EmptyList from './emptyList';
import RecipeItem from './recipeItem';
import FilterModal from './filterModal';

export interface Props {}

const SearchDetailPage: React.FC<Props> = (props) => {
  const keyword = useNavigationParam('keyword') || '';
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.Profile);
  const [isShowModal, setShowModal] = useState(false);
  const [filterVal, setFilterVal] = useState({})
  const {goBack, navigate} = useNavigation();

  useEffect(() => {
    if (keyword.length > 0) {
      dispatch(
        SearchRecipes.get({
          isFilter: false,
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

  const renderCategory = ({item, index}) => {
    return (
      <View style={{ width: '30%', marginVertical: 10 * ratio, marginRight: 10 * ratio}}>
        <RNChipView
          key={`chip${index}`}
          title={item.title}
          avatar={false}
          titleStyle={{
            fontSize: 14 * ratio,
            color: 'white',
            fontFamily: 'Cabin-Regular',
            fontWeight: 'normal',
          }}
          backgroundColor={COLOR.PRIMARY_ACTIVE}
          onPress={() =>
            {
              dispatch(
                SearchRecipes.get({
                  order: 'latest',
                  limit: 10,
                  page: 1,
                  category: item.code,
                }),
              );
            }
          }
        />
      </View>
    );
  };

  const handleLoadMore = () => {
    if (profile.searchResult.length < profile.totalItems) {
      if (profile.keyword?.length > 0) {
        if (profile.isFilter && profile.isFilter === true) {
          dispatch(
            SearchRecipes.get({
              isFilter: true,
              limit: 10,
              page: profile.searchPage + 1,
              search: profile.keyword,
              ...filterVal
            }),
          );
        } else {
          dispatch(
            SearchRecipes.get({
              order: 'latest',
              limit: 10,
              page: profile.searchPage + 1,
              search: profile.keyword,
            }),
          );
        }
        
      }
      if (profile.category?.length > 0) {
        dispatch(
          SearchRecipes.get({
            order: 'latest',
            limit: 10,
            page: profile.searchPage + 1,
            category: profile.category,
          }),
        );
      }
    }
  }

  const submitFilter = (val) => {
    setShowModal(false);
    setFilterVal(val)
    if (profile.keyword?.length > 0) {
      dispatch(
        SearchRecipes.get({
          isFilter: true,
          limit: 10,
          page: 1,
          search: profile.keyword,
          ...val
        }),
      );
    }
  }

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
        }}
        onRightPress={() => {
          if (profile.keyword?.length > 0) {
            setShowModal(true)
          }
        }}
      />
      <View style={styles.listWrap}>
        {(profile.keyword?.length > 0 || profile.category?.length > 0) && profile.searchResult.length > 0 && (
          <FlatList
            data={profile.searchResult}
            keyExtractor={(index) => index.toString()}
            renderItem={_renderItem}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <EmptyList />}
            onEndReachedThreshold={0.4}
            onEndReached={handleLoadMore}
          />
        )}
        {profile.keyword?.length < 1 && profile.searchResult.length < 1 && (
          <View style={{ alignItems: 'center'}}>
            <FlatList
            data={CATEGORIES}
            numColumns={3}
            keyExtractor={(index) => index.toString()}
            renderItem={renderCategory}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <EmptyList />}
            contentContainerStyle={{ flex: 1, marginHorizontal: 10 * ratio}}
          />
            </View>
        )}
      </View>
      <FilterModal isShow={isShowModal} onCancel={(val)=> setShowModal(val)} onSubmit={(val) => submitFilter(val)}/>
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
