import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {COLOR, ratio} from 'config/themeUtils';
import {CText} from 'components';
import DiscussTab from './discussTab';
import DetailTab from './favTab';
import MostFavTab from './favTab';
import RecentTab from './recentTab';
import FollowTab from './followTab';

const FirstRoute = () => (
        <MostFavTab key={'mostFav'}/>
);

const SecondRoute = () => (
  <RecentTab key={'Recent'}/>
);

const ThirdRoute = () => (
  <FollowTab key={'Follow'}/>
);

const initialLayout = {width: Dimensions.get('window').width};

export default function HomeTabComponent() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Yêu thích'},
    {key: 'second', title: 'Mới nhất'},
    {key: 'third', title: 'Theo dõi'},
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <TabView
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={styles.curve}
          indicatorStyle={{backgroundColor: COLOR.PRIMARY_ACTIVE}}
          renderLabel={({route, focused, color}) => (
            <CText
              fontSize={16}
              bold
              style={{color: COLOR.PRIMARY_ACTIVE, margin: 8}}>
              {route.title}
            </CText>
          )}
        />
      )}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  curve: {
    borderTopLeftRadius: 24 * ratio,
    borderTopRightRadius: 24 * ratio,
    backgroundColor: 'white',
  }
});
