import { View, Text, ScrollView,StyleSheet, Button, Alert } from 'react-native';
import React, { useState,useRef,useEffect,useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Noticontext } from '../../App';
import Asyncstorage from '@react-native-async-storage/async-storage'

//import { createAlarm } from 'react-native-simple-alarm';
let styles = StyleSheet.create({
    fullview:{
        display: 'flex',
        flexDirection:'row',
        paddingTop:'15%',
        paddingLeft:'10%',
        height: '50%',
      
        marginTop:'1%',
        marginBottom:'5%',
        backgroundColor:'#16161d'
    },
    minutescroll:{
        height:"60%"
    },
    hourscroll:{
        height:'60%'
    },
    number:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        color:'white'
    },
    submitbutton:{
        backgroundColor:'red'
    },
    anumber:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        color:'blue'
    },
    time:{

height: '30%',
display: 'flex',
flexDirection:'row',
alignItems:'center',
paddingLeft:'20%'
    },
    timehour:{
        fontSize:55,
        padding:'3%',
        color:'white'
      
    },
    timeminute:{
fontSize:55,
color:'white'
    },
    timetimezone:{
fontSize:55,
color:'white'
    }
})
export default function Setalarm({navigation,route}) {
    let notification=useContext(Noticontext)
    let [hour,sethour]=useState('00')
    let [minute,setminute]=useState('00')
    let [timezone,settime]=useState('AM')
    let [alarmarray,setalarmarray]=useState([])
    let hours=[];
    

    for(let i=0;i<=12;i++)
    {
        if(i<10)
        {
            hours.push('0'+i)
        }
        else
        {
            hours.push(i.toString())
        }
        
    }
    let minutes=[]
    for(let i=0;i<=60;i++)
    {
        
        if(i<10)
        {
            minutes.push('0'+i)
        }
        else
        {
            minutes.push(i.toString())
        }
    }
    useFocusEffect(

        React.useCallback(()=>
        {
          Asyncstorage.getItem('alarms').then(value=>
            {
              if(value)
              {
                
                setalarmarray(JSON.parse(value))
         
              }
            })
        },[]))
    let submit=async()=>
    {
        
        let data= {
            hour,minute,timezone,active:true,id:alarmarray.length
        }
        data=[...alarmarray,data]
        data=JSON.stringify(data)
        try{
            await  Asyncstorage.setItem('alarms',data)
            
           //  Alert.alert("alarm is created using function ... ")
           if(timezone=='PM')
           {
             hour=(parseInt(hour)+12).toString()
           }
           if(timezone=='AM')
           {
            
             hour=(parseInt(hour)).toString()
           }
           let date = new Date()
           let scheduledate = new Date(date.getFullYear(),date.getMonth(),date.getDate(),parseInt(hour),parseInt(minute))
      //    console.log(scheduledate.getTime(),date.getTime())
           if(scheduledate.getTime()<=date.getTime())
           {
            
             scheduledate=new Date(date.getFullYear(),date.getMonth(),date.getDate()+1,parseInt(hour),parseInt(minute))
           }
           notification.localNotification({
             channelId:"channel-id",
             title:"Alarm added",
             message: "Alarm is set for "+hour+":"+minute+" "+timezone
           })
           notification.localNotificationSchedule({
             channelId:"channel-id",
             message:"alarm is set ",
             date: scheduledate,
             id:id,
             actions:["dismiss","snooze"],
             soundName:'default',
             autoCancel:false
           })
           
     
        }
        catch(e)
        {
        }
        
         navigation.navigate('AlarmHome',{
                 action:'alarmadded',
                 
             
         })
    }

  return (
      <><View style={{
        backgroundColor:'#1A2228',
        height: "100%",
        width: "100%"
      }}>
      <View style={styles.time}>

          <Text style={styles.timehour}>{hour}</Text>
          <Text style={{fontSize:55,padding:'3%',color:'white'}}>:</Text>
         
          <Text style={styles.timeminute}>{minute}</Text>
          <Text style={{fontSize:55,padding:'3%'}}></Text>
         
          <Text style={styles.timetimezone}>{timezone?timezone:''}</Text>
      </View>
    <View style={styles.fullview}>
      <ScrollView style={styles.hourscroll}>
          {
             hours.map(num=>
                {
                    
                    return <>
                    {hour==num?<Text style={styles.anumber} onPress={()=>{
                        
                        sethour(num)}}>{num}</Text>:
                    <Text  style={styles.number} onPress={()=>{
                        
                        sethour(num)}}>{num}</Text>}
                    </>
                })
          }
      </ScrollView>
      <ScrollView style={styles.minutescroll}>
           {
               minutes.map(num=>
                {
                    return <>
                    {minute==num?<Text style={styles.anumber} onPress={()=>{
                        
                        setminute(num)}}>{num}</Text>:<Text style={styles.number} onPress={()=>{
                        
                            setminute(num)}}>{num}</Text>}
                   
                    </>
                })
           }
      </ScrollView>
      <ScrollView>
              <Text style={styles.number} onPress={()=>{settime('AM')}} >AM</Text>
              <Text style={styles.number} onPress={()=>{settime('PM')}} >PM</Text>
      </ScrollView>
     
    </View>
    
     <Button style={styles.submitbutton} title='set Alarm' onPress={submit} />
     </View>
     </>
  );
}
