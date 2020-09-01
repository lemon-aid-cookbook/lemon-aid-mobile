import {COLOR} from 'config/themeUtils';
import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import {useNavigation} from 'react-navigation-hooks';
import {useSelector} from 'react-redux';

export interface Props {}

const LoadingPage: React.FC<Props> = (props) => {
  const {goBack, navigate} = useNavigation();
  const user = useSelector((state) => state.Auth?.token);

  useEffect(() => {
    if (user) {
      navigate('Profile');
    } else {
      navigate('Login');
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <UIActivityIndicator color={COLOR.PRIMARY_ACTIVE} size={50} />
      </View>
    </View>
  );
};
export default LoadingPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
