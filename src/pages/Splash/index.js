import LottieView from 'lottie-react-native';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {APP_NAME} from 'config';
import { COLOR } from 'config/themeUtils';

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      return this._navigateReset('Main');
    }, 3000);
  }

  _navigateReset = (routeName) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName})],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View style={styles.body}>
          <LottieView
            source={require('../../assets/food-carousel.json')}
            autoPlay
            loop
            style={{width: 300}}
            resizeMode={'contain'}
          />
          <Text style={styles.title}>{APP_NAME}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: -60,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 40,
    letterSpacing: 3,
    fontFamily: 'Pacifico-Regular',
    color: COLOR.PRIMARY_ACTIVE,
  },
});
