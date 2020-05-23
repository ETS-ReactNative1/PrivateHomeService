import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';

import ForgotPassword from './src/components/ForgotPassword';
import Home from './src/components/Home';
import SelectedCategory from './src/components/SelectedCategory';
import LandingPage from './src/components/LandingPage';
import Login from './src/components/login';
import Register from './src/components/Register';
import { createDrawerNavigator } from 'react-navigation-drawer';
import CustomDrawer from './src/components/customDrawer';
import reducers from './src/redux/reducers'
import Cart from './src/components/Cart';
import seesha from './src/components/Sheesha';
import SocialGames from './src/components/SocialGames';
import FindMe from './src/components/FindMe';
import Payments from './src/components/Payments';
import OrderSummary from './src/components/OrderSummary';
import { PrimayColor } from './src/components/theme/Colors';
import { Platform } from 'react-native';
import thunk from 'redux-thunk';


MaterialIcon.loadFont();
Feather.loadFont()
FontAwesome.loadFont()
MaterialCommunityIcons.loadFont();

const innerNavigator = createStackNavigator({
  Home,
  SelctedCategory: SelectedCategory,
  Cart,
  seesha,
  games:SocialGames,
  location:FindMe,
  payment:Payments,
  orderSummary:OrderSummary
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: PrimayColor,
      height:Platform.OS==='android' ? 38:80
    },
    headerTintColor: '#000',
  }
})


const dashBoard = createDrawerNavigator({
  Home: innerNavigator
}, {
  contentOptions: {
    activeTintColor: '#fd6d24',
    backgroundTintColor: '#fdbf83'
  },
  initialRouteName: 'Home',
  drawerType: 'slide',
  contentComponent: props => <CustomDrawer {...props} />,
})


const authNavigator = createStackNavigator({
  Login: Login,
  Register: Register,
  Reset: ForgotPassword,

}, {
  initialRouteName: 'Login',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f3b771',
    },
    headerTintColor: '#000',
  }
})
const AppNavigator = createSwitchNavigator({
  Landing: LandingPage,
  authNavigator,
  Home: dashBoard
});


const AppContainer = createAppContainer(AppNavigator);

const store = createStore(reducers,applyMiddleware(thunk));

export default App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}