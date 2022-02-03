import { View, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import Alarm from './Navigators/AlarmStack'
import Stopwatch from './pages/Stopwatch'
import Timer from './pages/Timer'
import Setalarm from './pages/Setalarm'
let BottomtabNav = createMaterialBottomTabNavigator()
export default function Main() {
  return (
    <NavigationContainer>
        <BottomtabNav.Navigator  activeColor="#df73ff"
  inactiveColor="#df73ff" shifting={true}    barStyle={{ backgroundColor: '#282C35',color:'white' }}>
            <BottomtabNav.Screen name="Alarm" component={Alarm} options={{
              tabBarColor:'#16161d',
          tabBarLabel: 'Alarm',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="alarm" color={'purple'} size={26} />
          ),
        }} />
            <BottomtabNav.Screen name="Stopwatch" component={Stopwatch} options={{
              tabBarColor:'#16161d',
          tabBarLabel: ' Stopwatch',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="timer-sand" color={'purple'} size={26} />
          ),
        }} />
            <BottomtabNav.Screen name="Setalarm" component={Setalarm}  options={{
              tabBarColor:'#16161d',
          tabBarLabel: '  Setalarm',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={'purple'} size={30} />
          ),
        }} />
           {/* <BottomtabNav.Screen name="Timer" component={Timer} options={{tabBarColor:'#16161d'}} />
             */}
        </BottomtabNav.Navigator>
    </NavigationContainer>
  );
}
