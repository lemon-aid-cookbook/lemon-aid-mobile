import React from 'react';
import SplashScreen from 'pages/Splash';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {COLOR, ratio} from 'config/themeUtils';
import Feather from 'react-native-vector-icons/Feather';
import LoginPage from 'pages/Login';
import SearchPage from 'pages/Search';
import CameraPage from 'pages/Camera';
import FavoritePage from 'pages/Favorite';
import SignUpPage from 'pages/SignUp';
import ForgotPasswordPage from 'pages/Login/components/forgotPassword.page';

const CameraStack = createStackNavigator(
  {
    Camera: {screen: CameraPage},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Camera',
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Feather name="camera" size={24 * ratio} color={tintColor} />
      ),
    },
  },
);

const FavoriteStack = createStackNavigator(
  {
    Favorite: {screen: FavoritePage},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Favorite',
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Feather name="heart" size={24 * ratio} color={tintColor} />
      ),
    },
  },
);

const SearchStack = createStackNavigator(
  {
    Search: {screen: SearchPage},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Search',
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Feather name="compass" size={24 * ratio} color={tintColor} />
      ),
    },
  },
);

const LoginStack = createStackNavigator(
  {
    LoginPage: {screen: LoginPage},
    ForgotPassword: {screen: ForgotPasswordPage},
  },
  {
    headerMode: 'none',
    initialRouteName: 'LoginPage',
  },
);

// const ProfileStack = createStackNavigator(
//   {
//     ProfilePage: ProfilePage,
//     Setting: SettingPage,
//     ChangeInformation: ChangeInformationPage,
//     ChangeAvatar: ChangeAvatarPage,
//   },
//   {
//     headerMode: 'none',
//     initialRouteName: 'ProfilePage',
//   },
// );

const ProfileSwitch = createSwitchNavigator(
  {
    // Loading: LoadingPage,
    Login: LoginStack,
    SignUp: SignUpPage,
    // ProfileStack: ProfileStack,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Feather name="user" size={24 * ratio} color={tintColor} />
      ),
    },
    initialRouteName: 'Login',
  },
);

const MainTabNavigator = createBottomTabNavigator(
  {
    Camera: CameraStack,
    Search: SearchStack,
    Favorite: FavoriteStack,
    Profile: ProfileSwitch,
  },
  {
    tabBarOptions: {
      activeTintColor: COLOR.PRIMARY_ACTIVE,
      inactiveTintColor: COLOR.DEACTIVE_GRAY,
      style: {
        backgroundColor: 'white',
        height: 60,
      },
      showLabel: false,
    },
    initialRouteName: 'Search',
  },
);

const AppRouteConfigs = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
    },
    Main: MainTabNavigator,
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  },
);

export default createAppContainer(AppRouteConfigs);
