import {CText, CHeader} from 'components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import { HEADER_TYPE } from 'config/themeUtils';
export interface Props {}
const SearchPage: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  return (
    <View style={styles.container}>
      <CHeader type={HEADER_TYPE.NORMAL} headerTitle='Search'/>
      <CText>Search</CText>
    </View>
  );
};
export default SearchPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
