import React from 'react';
import { StyleSheet, Text, View,Platform,Alert } from 'react-native';
import {createBottomTabNavigator,createStackNavigator,createAppContainer} from 'react-navigation';
import {Provider} from 'react-redux'
import store from './store'
import registerForPushNotificationsAsync from './services/push_notifications';
import Expo, { Notifications } from 'expo';
 import * as Permissions from 'expo-permissions'
import AuthScreen from './screens/AuthScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import MapScreen from './screens/MapScreen'
import DeckScreen from './screens/DeckScreen'
import SettingsScreen from './screens/SettingsScreen'
import ReviewScreen from './screens/ReviewScreen'
import {Button} from 'react-native-elements'


class App extends React.Component{
state = {
    notification: {},
  };
   componentDidMount() {

    registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }
   _handleNotification = (notification) => {

    this.setState({notification: notification});

     Alert.alert(
          'New Push Notification'

        )
     console.log(notification)

  };
  render(){
    return(
      <Provider store={store}>
        <AppContainer />
      </Provider>
      )
  }
}
const reviewStack = createStackNavigator({
  review: {screen:ReviewScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Review Jobs',
      headerStyle:{
        
        marginTop: Platform.OS === 'android' ? 24 : 0
      },
      headerRight: (
        <Button 
        title="Settings"
        type="clear"
        onPress={() => navigation.navigate('settings')}
        
         />

      )
    }),

    


  },
  settings: SettingsScreen,
});


const TabNavigator = createBottomTabNavigator({
  welcome: WelcomeScreen,
  auth: AuthScreen,
  main:createBottomTabNavigator({
    map:MapScreen,
    deck:DeckScreen,
    review:reviewStack
  })
},{
  defaultNavigationOptions: {
    tabBarVisible: false,
  },
    
    lazy:true
});
const AppContainer = createAppContainer(TabNavigator);

export default App;



