import {CText, CButton, CHeader} from 'components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {useSelector} from 'react-redux';
import {ratio, HEADER_TYPE} from 'config/themeUtils';
export interface Props {}

const FavoritePage: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const user = useSelector((state) => state.Auth.user);

  if (!user) {
    return (
      <View style={styles.container}>
        <CHeader type={HEADER_TYPE.NORMAL} headerTitle="Yêu thích" />
        <CText fontSize={16 * ratio} style={styles.text}>
          Bạn chưa đăng nhập. Vui lòng đăng nhập để xem các công thức đã thích.
        </CText>
        <CButton
          style={styles.btnStyle}
          title="Đăng nhập"
          onPress={() => navigate('Profile')}
        />
      </View>
    );
  }
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
    backgroundColor: 'white',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginHorizontal: 16 * ratio,
    marginVertical: 24 * ratio,
  },
  btnStyle: {
    width: 120 * ratio,
    borderRadius: 10 * ratio,
  },
});
