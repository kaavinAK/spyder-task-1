import { View, Text,Alert } from 'react-native';
import React,{useState,useEffect} from 'react';
import { Button } from 'react-native-paper';


export default function Stopwatch() {

  let [clockstarted,setclockstarted]=useState(false)
  let [clockpaused,setclockpaused]=useState(false)
  let [time,settime]=useState(0)
  let [intervalstate,setintervalstate]=useState()
  let hours=parseInt(time/(60*60))<10?'0'+(parseInt(time/(60*60))).toString():(parseInt(time/(60*60))).toString()
  let minutes=(time-hours*60*60)/60<10?'0'+(parseInt((time-hours*60*60)/60)).toString():(parseInt((time-hours*60*60)/60)).toString()
  let seconds=(time-hours*60*60-minutes*60)<10?'0'+(parseInt(time-hours*60*60-minutes*60)).toString():(parseInt(time-hours*60*60-minutes*60)).toString()
  useEffect(()=>
  {
     if(time>100*60*60)
     {
       settime(0)
       
     }
  },[time])
  
  let starttimer=()=>
  {
setclockstarted(true)
setclockpaused(false)
let interval= setInterval(()=>
{
     settime(prev=>prev+1)
},1000)
setintervalstate(interval)

  }
  let pausetimer=()=>
  {
    if(intervalstate)
    {
      clearInterval(intervalstate)
      
    }
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
       setclockstarted(false)
     }
     else
     {
       settime(0)
     }
  }
  let presstimer=(ct)=>
  {
    if(ct)
    {
      setclockpaused(false)
resumetimer()
    }
    else
    {
      setclockpaused(true)
    pausetimer()
    }
  }
  return (
    <View style={{
      backgroundColor:'#1A2228',
      height: "100%",
      width: "100%"
     
     
    }}>
       <Text style={{
        color:'white'
      }}></Text>
      <View style={{
        display: 'flex',
        flexDirection:'row',
        position: 'absolute',
        top: '30%',
        left: '15%'
        
      }}>
     
      <Text  style={{
        color:'white'
        ,fontSize:80
      }} >{hours}</Text>
      <Text   style={{
        color:'white'
        ,fontSize:80
      }}>:</Text>
     <Text   style={{
        color:'white'
        ,fontSize:80
      }}>{minutes}</Text>
     <Text   style={{
        color:'white'
        ,fontSize:80
      }}>:</Text>
   
       <Text   style={{
        color:'white'
        ,fontSize:80
      }}>{seconds}</Text>
       </View>
        {clockstarted?
         <View style={{
          display: 'flex',
          flexDirection:'row',
         position: 'absolute',
         top: '80%',
         left: "31%"
        }}  >
      <Button onPress={()=>
      {
        presstimer(clockpaused)
      }}  >{clockpaused?'Resume':'pause'}</Button>
      <Button onPress={()=>
      {
        resettimer()
      }}>Reset</Button></View>:<Button onPress={
        ()=>
        {
          starttimer()
        }
      } style={{
       
        position: 'absolute',
        top: "80%",
        left: "40%"
      }}>Start</Button>  }
      </View>
    
  );
}
