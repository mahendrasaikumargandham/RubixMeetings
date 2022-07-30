import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home/HomeScreen';
import LoginScreen from './screens/Login/LoginScreen';
import RegisterScreen from './screens/Register/RegisterScreen';
import ForgotPassword from './screens/ForgotPassword/ForgotPassword';
import Meeting from './components/DrawNavigator/Meeting/Meeting';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from "./redux/store";

const Stack = createNativeStackNavigator();
const store = configureStore();

const App = () => {
  return (
    <ReduxProvider store = {store}>
      <NavigationContainer independent = {true}>
        <Stack.Navigator>
          <Stack.Screen options = {{ headerShown: false }} name = "Login" component = {LoginScreen} />
          <Stack.Screen options = {{ headerShown: false }} name = "Register" component = {RegisterScreen} />
          <Stack.Screen options = {{ headerShown: false }} name = "ForgotPassword" component = {ForgotPassword} />
          <Stack.Screen options = {{ headerShown: false }} name = "Home" component = {HomeScreen} />
          <Stack.Screen name = "Meeting" component = {Meeting} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
