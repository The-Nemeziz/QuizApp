// In App.js in a new project

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen";
import CategoryScreen from "./Screens/CategoryScreen";
import QuizScreen from "./Screens/QuizScreen";
import ScoreScreen from "./Screens/ScoreScreen";
import LeaderBoardScreen from "./Screens/LeaderBoardScreen"



const Stack = createNativeStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Category" component={CategoryScreen} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
            <Stack.Screen name="Score" component={ScoreScreen} />
            <Stack.Screen name="Leaderboard" component={LeaderBoardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
