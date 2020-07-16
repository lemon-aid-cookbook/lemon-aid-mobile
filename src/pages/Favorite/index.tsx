import {CText} from 'components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
export interface Props {}
const FavoritePage: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  return (
    <View style={styles.container}>
      <CText>Favorite</CText>
    </View>
  );
};
export default FavoritePage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
