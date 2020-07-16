import {CText} from 'components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
export interface Props {}
const CameraPage: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  return (
    <View style={styles.container}>
      <CText>Camera</CText>
    </View>
  );
};
export default CameraPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
