import { COLOR, ratio } from 'config/themeUtils';
import CameraPage from 'pages/Camera';
import DetailPage from 'pages/DetailRecipe';
import FavoritePage from 'pages/Favorite';
import LoginPage from 'pages/Login';
import ForgotPasswordPage from 'pages/Login/components/forgotPassword.page';
import LoadingPage from 'pages/Login/components/loading.page';
import ProfilePage from 'pages/Profile';
import SearchPage from 'pages/Search';
import SignUpPage from 'pages/SignUp';
import SplashScreen from 'pages/Splash';
import React from 'react';
import { View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { DEVICE_WIDTH } from 'config/themeUtils'
import CreatePostPage from 'pages/CreatePost';
const CameraStack = createStackNavigator(
  {
    Camera: { screen: CameraPage },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Camera',
  },
);
CameraStack.navigationOptions = ({ navigation }) => {
  if (navigation.state.routes[navigation.state.index].routeName === 'Camera') {
    return { tabBarVisible: true };
  }
  return { tabBarVisible: false };
};

const FavoriteStack = createStackNavigator(
  {
    Favorite: { screen: FavoritePage },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Favorite',
  },
);

FavoriteStack.navigationOptions = ({ navigation }) => {
  if (navigation.state.routes[navigation.state.index].routeName === 'Favorite') {
    return { tabBarVisible: true };
  }
  return { tabBarVisible: false };
};

const SearchStack = createStackNavigator(
  {
    Search: { screen: SearchPage },
    Detail: { screen: DetailPage }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Search',
  },
);

SearchStack.navigationOptions = ({ navigation }) => {
  if (navigation.state.routes[navigation.state.index].routeName === 'Search') {
    return { tabBarVisible: true };
  }
  return { tabBarVisible: false };
};

const LoginStack = createStackNavigator(
  {
    LoginPage: { screen: LoginPage },
    ForgotPassword: { screen: ForgotPasswordPage },
  },
  {
    headerMode: 'none',
    initialRouteName: 'LoginPage',
  },
);

const ProfileStack = createStackNavigator(
  {
    ProfilePage: ProfilePage,
    CreatePost: CreatePostPage
  },
  {
    headerMode: 'none',
    initialRouteName: 'ProfilePage',
  },
);

ProfileStack.navigationOptions = ({ navigation }) => {
  if (navigation.state.routes[navigation.state.index].routeName === 'ProfilePage') {
    return { tabBarVisible: true };
  }
  return { tabBarVisible: false };
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

ProfileSwitch.navigationOptions = ({ navigation }) => {
  if (navigation.state.routes[navigation.state.index].routeName === 'Profile' || navigation.state.routes[navigation.state.index].routeName === 'Login') {
    return { tabBarVisible: true };
  }
  return { tabBarVisible: false };
};

const MainTabNavigator = createBottomTabNavigator(
  {
    Search: SearchStack,
    Camera: CameraStack,
    Favorite: FavoriteStack,
    Profile: ProfileSwitch,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        const itemBar = (iconName, name, color, focused) => {
          return (
            <View style={{ alignItems: 'center', width: DEVICE_WIDTH / 4 }}>
              <Feather name={iconName} size={24 * ratio} color={focused ? color : '#888888'} />
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
