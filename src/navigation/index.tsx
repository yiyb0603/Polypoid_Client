import { createStackNavigator } from 'react-navigation-stack';
import AuthScreen from '~/screens/AuthScreen';
import { createAppContainer } from 'react-navigation';
import HomeScreen from '~/screens/HomeScreen';
import FormScreen from '~/screens/FormScreen';
import { palette } from '~/styles/Palette';

const { primary } = palette;

const AppNavigator = createStackNavigator(
  {
    Auth: {
      screen: AuthScreen,
      navigationOptions: {
        headerShown: false,
      },
    },

    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    
    Form: {
      screen: FormScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: primary,
        },

        headerTitle: "글 작성하기",
        headerTintColor: '#fff',
        
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    },
  },

  {
    initialRouteName: "Auth",
  }
);

export default createAppContainer(AppNavigator);