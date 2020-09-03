import {COLOR, DEVICE_WIDTH, ratio} from 'config/themeUtils';
import CameraPage from 'pages/Camera';
import CreatePostPage from 'pages/CreatePost';
import DetailPage from 'pages/DetailRecipe';
import FavoritePage from 'pages/Favorite';
import LoginPage from 'pages/Login';
import ForgotPasswordPage from 'pages/Login/components/forgotPassword.page';
import LoadingPage from 'pages/Login/components/loading.page';
import ProfilePage from 'pages/Profile';
import AnotherProfilePage from 'pages/Profile/components/anotherProfile';
import FollowerPage from 'pages/Profile/components/followers';
import FollowingPage from 'pages/Profile/components/followings';
import ChangePasswordPage from 'pages/Profile/components/updatePassword';
import SearchPage from 'pages/Search';
import SearchDetailPage from 'pages/Search/components/searchDetail';
import SignUpPage from 'pages/SignUp';
import SplashScreen from 'pages/Splash';
import React from 'react';
import {View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import AnotherFollowerPage from 'pages/Profile/components/anotherFollowers';
const CameraStack = createStackNavigator(
  {
    Camera: {screen: CameraPage},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Camera',
  },
);
CameraStack.navigationOptions = ({navigation}) => {
  if (navigation.state.routes[navigation.state.index].routeName === 'Camera') {
    return {tabBarVisible: true};
  }
  return {tabBarVisible: false};
};

const FavoriteStack = createStackNavigator(
  {
    Favorite: {screen: FavoritePage},
    Detail: {screen: DetailPage},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Favorite',
  },
);

FavoriteStack.navigationOptions = ({navigation}) => {
  if (
    navigation.state.routes[navigation.state.index].routeName === 'Favorite'
  ) {
    return {tabBarVisible: true};
  }
  return {tabBarVisible: false};
};

const SearchStack = createStackNavigator(
  {
    Search: {screen: SearchPage},
    Detail: {screen: DetailPage},
    SearchDetail: {screen: SearchDetailPage},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Search',
  },
);

SearchStack.navigationOptions = ({navigation}) => {
  if (navigation.state.routes[navigation.state.index].routeName === 'Search') {
    return {tabBarVisible: true};
  }
  return {tabBarVisible: false};
};

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

const ProfileStack = createStackNavigator(
  {
    ProfilePage: ProfilePage,
    AnotherProfile: AnotherProfilePage,
    CreatePost: CreatePostPage,
    Detail: DetailPage,
    Followings: FollowingPage,
    Followers: FollowerPage,
    AnotherFollowers: AnotherFollowerPage,
    ChangePassword: ChangePasswordPage,
  },
  {
    headerMode: 'none',
    initialRouteName: 'ProfilePage',
  },
);

ProfileStack.navigationOptions = ({navigation}) => {
  if (
    navigation.state.routes[navigation.state.index].routeName === 'ProfilePage'
  ) {
    return {tabBarVisible: true};
  }
  return {tabBarVisible: false};
};

const ProfileSwitch = createSwitchNavigator(
  {
    Loading: LoadingPage,
    Login: LoginStack,
    SignUp: SignUpPage,
    Profile: ProfileStack,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Loading',
  },
);

ProfileSwitch.navigationOptions = ({navigation}) => {
  if (
    navigation.state.routes[navigation.state.index].routeName === 'Profile' ||
    navigation.state.routes[navigation.state.index].routeName === 'Login'
  ) {
    return {tabBarVisible: true};
  }
  return {tabBarVisible: false};
};

const MainTabNavigator = createBottomTabNavigator(
  {
    Search: SearchStack,
    Camera: CameraStack,
    Favorite: FavoriteStack,
    Profile: ProfileSwitch,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused}) => {
        const {routeName} = navigation.state;
        const itemBar = (iconName, name, color, focused) => {
          return (
            <View style={{alignItems: 'center', width: DEVICE_WIDTH / 4}}>
              <Feather
                name={iconName}
                size={24 * ratio}
                color={focused ? color : '#888888'}
              />
            </View>
          );
        };

        switch (routeName) {
          case 'Camera':
            return itemBar('camera', routeName, COLOR.PRIMARY_ACTIVE, focused);
          case 'Search':
            return itemBar('compass', routeName, COLOR.PRIMARY_ACTIVE, focused);
          case 'Favorite':
            return itemBar('heart', routeName, COLOR.PRIMARY_ACTIVE, focused);
          case 'Loading':
            return itemBar('user', routeName, COLOR.PRIMARY_ACTIVE, focused);
          default:
            return itemBar('user', routeName, COLOR.PRIMARY_ACTIVE, focused);
        }
      },
      tabBarOptions: {
        showLabel: false,
        style: {
          height: 50 * ratio,
        },
      },
    }),
    // initialRouteName: 'Search',
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
