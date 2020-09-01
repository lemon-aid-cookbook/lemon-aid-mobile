import React from 'react';
import {Alert, BackHandler, Platform, StatusBar, View} from 'react-native';
// import codePush from 'react-native-code-push';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {
  GlobalLoading,
  GlobalLoadingSetup,
  GlobalModal,
  GlobalModalSetup,
} from 'components';
import AppWithNavigationState from 'navigators/AppNavigator';
import {persistor, store} from 'reduxs';
import {getCurrentRouteName} from 'utils/function';

console.disableYellowBox = true;
StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');
StatusBar.setBackgroundColor('transparent');

interface Props {}

class App extends React.Component<Props, {}> {
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.backHandler);
    }
    // codePush.sync({
    //   updateDialog: true,
    //   installMode: codePush.InstallMode.IMMEDIATE,
    // });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
  }

  backHandler = () => {
    if (getCurrentRouteName(store.getState().nav) === 'Home') {
      Alert.alert(
        '',
        'Thoát ứng dụng?',
        [
          {
            text: 'Từ chối',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Đồng ý',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {cancelable: true},
      );
      return true;
    }
    store.dispatch({type: 'Navigation/BACK'});
    return true;
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AppWithNavigationState />
          </PersistGate>
        </Provider>
        <GlobalLoading ref={(ref) => GlobalLoadingSetup.setLoading(ref)} />
        <GlobalModal
          ref={(ref) => GlobalModalSetup.setGlobalModalHolder(ref)}
        />
      </View>
    );
  }
}

// const App = codePush(AppComponent);
// const App = AppComponent;
export default App;
