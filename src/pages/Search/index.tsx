import {CHeader} from 'components';
import {HEADER_TYPE, ratio, TAB_TYPES} from 'config/themeUtils';
import {
  GetFollowPost,
  GetMostFave,
  GetProfile,
  GetRecent,
} from 'pages/Profile/redux/actions';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import HomeTabComponent from './components/tabBarWrap';

export interface Props {
  listRecipe: any[];
}

const SearchPage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const profile = useSelector((state) => state.Profile);
  const {goBack, navigate} = useNavigation();

  useEffect(() => {
    if (user) {
      dispatch(GetProfile.get(user.username));
      dispatch(
        GetFollowPost.get({
          userId: user.id,
          limit: 10,
          page: 1,
          type: TAB_TYPES[2],
        }),
      );
    }
    dispatch(GetMostFave.get());
    dispatch(GetRecent.get());
  }, []);

  return (
    <View style={styles.container}>
      <CHeader
        type={HEADER_TYPE.SEARCH}
        onInputPress={() => navigate('SearchDetail')}
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
