import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/Mainscreen';
import DetailedScreen from './screens/Detailedscreen';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
      <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                  name='Сервис по поиску вакансий'
                  component={MainScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name='Detail' component={DetailedScreen}   options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
}
