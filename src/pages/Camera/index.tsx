import {CText, CHeader} from 'components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {HEADER_TYPE, ratio} from 'config/themeUtils';
export interface Props {}
const CameraPage: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  return (
    <View style={styles.container}>
      <CHeader type={HEADER_TYPE.MAIN} />
      <View style={styles.listWrap}>
        <CText>
          Đăng ký
        </CText>
      </View>
    </View>
  );
};
export default CameraPage;
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
    paddingHorizontal: 16 * ratio,
  },
});
