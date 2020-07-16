import LottieView from 'lottie-react-native';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {APP_NAME} from 'config';

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      return this._navigateReset('Main');
    }, 5000);
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
            style={{width: '100%'}}
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
    fontSize: 40,
    letterSpacing: 4,
    fontFamily: 'Pacifico-Regular',
    color: '#FF7000',
  },
});
