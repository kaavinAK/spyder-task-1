import { View, Text,StyleSheet,ScrollView } from 'react-native';
import React,{useState,useEffect} from 'react';
import {Button} from 'react-native-paper'
let styles = StyleSheet.create({
  fullview:{
      display: 'flex',
      flexDirection:'row',
      paddingTop:'15%',
      paddingLeft:'10%',
      height: '50%',
      borderColor:'yellow',
      borderWidth:1,
      marginTop:'20%'
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
      color: 'white'
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
borderColor:'yellow',
borderWidth:1,
height: '30%',
display: 'flex',
flexDirection:'row',
alignItems:'center',
paddingLeft:'20%'
  },
  timehour:{
      fontSize:55,
      padding:'3%',
      color: 'white'
    
  },
  timeminute:{
fontSize:55,
padding:'3%',
color: 'white'
  },
  timetimezone:{
fontSize:55,
padding:'3%',
color: 'white'
  }
})
export default function Timer() {
  let [hour,sethour]=useState('00')
  let [minute,setminute]=useState('00')
  let [second,setsecond]=useState('00')
  let [timerstarted,settimerstarted]=useState(false)
  let [timerpaused,settimerpaused]=useState(false)
  let [intervalstate,setintervalstate]=useState()
  let [time,settime]=useState(0)
  let hours=[];
  let seconds=[]
  useEffect(()=>
  {
    let hourint;
    let secondint;
    let minuteint;
       
      if(hour[0]=='0')
      {
                  hourint=parseInt(hour[1])
                  hourint=hourint*60*60
      } 
      else
      {
        hourint=parseInt(hour)
        hourint=hourint*60*60    
      }
      if(second[0]=='0')
      {
                  secondint=parseInt(second[1])
                  secondint=secondint*60*60
      } 
      else
      {
        secondint=parseInt(second)
        secondint=secondint    
      }
      if(minute[0]=='0')
      {
        minuteint=parseInt(minute[1])
        minuteint=minuteint*60
      } 
      else
      {
        minuteint=parseInt(minute)
        minuteint=minuteint*60
      }
       settime(minuteint+hourint+secondint)

  },[hour,minute,second])

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
 // let minutes=[]
  for(let i=0;i<=60;i++)
  {
      
      if(i<10)
      {
          seconds.push('0'+i)
      }
      else
      {
          seconds.push(i.toString())
      }
  }
  let starttimer=()=>
  {
    settimerstarted(true)
    settimerpaused(false)
    let interval= setInterval(()=>
    {
         settime(prev=>prev+1)
    },1000)
    setintervalstate(interval)
  }
  let resumetimer=()=>
  {
    if(intervalstate)
    {
     
      clearInterval(intervalstate)
     let  interval=setInterval(()=>
      {
            settime(prev=>prev+1)
      },1000)
      setintervalstate(interval)
    }
    else
    {
      let interval=setInterval(()=>
      {
        settime(prev=>prev+1)
      },1000)
      setintervalstate(interval)
 
    }
   
  }
  let resettimer=()=>
  {
     if(intervalstate)
     {
     
       clearInterval(intervalstate)
       settime(0)
       settimerstarted(false)
     }
     else
     {
       settime(0)
     }
  }
  let pausetimer=()=>
  {
    if(intervalstate)
    {
      
      clearInterval(intervalstate)
      
    }
  }
 
  let presstimer=(ct)=>
  {
    if(ct)
    {
      settimerpaused(false)
resumetimer()
    }
    else
    {
      settimerpaused(true)
    pausetimer()
    }
  }
  return <View style={{
      backgroundColor:'#1A2228',
      height: "100%",
      width: "100%",
      borderColor:'red',
      borderWidth:1,
      display: 'flex',
      flexDirection:'column'
    }}>
    
     {timerstarted===false?<>
     <View style={styles.fullview}>
      
     <ScrollView style={styles.hourscroll}>
         {
            hours.map(num=>
               {
                   
                   return <>
                   {hour==num?<Text style={styles.anumber} onPress={()=>{
                       console.log("come on mn ",num+1)
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
     <ScrollView style={styles.hourscroll}>
         {
            seconds.map(num=>
               {
                   
                   return <>
                   {hour==num?<Text style={styles.anumber} onPress={()=>{
                       
                       setsecond(num)}}>{num}</Text>:
                   <Text  style={styles.number} onPress={()=>{
                       
                       setsecond(num)}}>{num}</Text>}
                   </>
               })
         }
     </ScrollView>
   </View> <View style={{
        borderColor:'green',
        borderWidth:1,
        
        display: 'flex',
        flexDirection:"row",
        paddingLeft:'10%'
      }}>
      <Text style={styles.timehour}>{hour?'f':'d'}</Text>
          <Text style={{fontSize:55,padding:'3%',color: 'white'}}>:</Text>
         
          <Text style={styles.timeminute}>{minute?'g':'g'}</Text>
          <Text style={{fontSize:55,padding:'3%',color: 'white'}}>:</Text>
         
          <Text style={styles.timetimezone}>{second?second:''}</Text>
      </View></>:<View style={{
        borderColor:'green',
        borderWidth:1,
        
        display: 'flex',
        flexDirection:"row",
        paddingLeft:'10%'
      }}>
      <Text style={styles.timehour}>{hour?hour:""}</Text>
          <Text style={{fontSize:55,padding:'3%',color: 'white'}}>:</Text>
         
          <Text style={styles.timeminute}>{minute?minute:""}</Text>
          <Text style={{fontSize:55,padding:'3%',color: 'white'}}>:</Text>
         
          <Text style={styles.timetimezone}>{second?second:''}</Text>
      </View>}
    
   
      <View style={{
        marginTop:'15%'
      }}>
        {timerstarted?
         <View style={{
          display: 'flex',
          flexDirection:'row',
         position: 'absolute',
         top: '80%',
         left: "31%"
        }}  >
      <Button onPress={()=>
      {
        presstimer(timerpaused)
      }}  >{timerpaused?'Resume':'pause'}</Button>
      <Button onPress={()=>
      {
        resettimer()
      }}>Reset</Button></View>:<Button onPress={
        ()=>
        {
          starttimer()
        }
      } style={{
        borderColor:'red',
        borderWidth:2,
        position: 'absolute',
        top: "80%",
        left: "40%"
      }}>Start</Button>  }
      </View>
    </View>
   
  
}
