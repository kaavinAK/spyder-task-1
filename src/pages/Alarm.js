import { View, Text, ScrollView } from 'react-native';
import React, { useState,useContext, useEffect } from 'react';
import Appbar from '../components/Appbar'
import { useFocusEffect } from '@react-navigation/native';
import Asyncstorage from '@react-native-async-storage/async-storage'
import TimeItem from '../components/Alarmtimecard'
import {Noticontext} from '../../App'


export default function Alarm({navigation,route}) {
    let [alarms,setalarms]=useState([])
    let notification = useContext(Noticontext)
    useEffect(()=>
    {
// notification.addEventListerner('notification',(notificationdata)=>
// {
//      console.log("that notifcation is recieved bro" ,notificationdata)
// })
// return ()=>
// {
//   notification.removeEventListerner('notification')
// }

    },[])
useFocusEffect(

  React.useCallback(()=>
  {
    Asyncstorage.getItem('alarms').then(value=>
      {
        if(value)
        {
          
          setalarms(JSON.parse(value))
   
        }
      })
  },[])
   
)
console.log(alarms)  
  return (
    <View>
    <Appbar setalarms={setalarms} alarms={alarms} navigation={navigation}/>
    <View style={{height:'90%'}}>
    <ScrollView>
           {alarms.length>0?alarms.map(alarm=>
           {
             
               return <>
                      
                      <TimeItem style={{
       height: '60%'
      
    }} hour={alarm.hour} status={alarm.active} minute={alarm.minute} timezone={alarm.timezone} id={alarm.id} />
               </>
           }):<Text>No Alarms Active</Text>}
    </ScrollView>
    </View>
    </View>
  );
}
