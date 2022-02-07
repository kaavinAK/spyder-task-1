import React,{useContext} from 'react';
import { Alert, Text, View } from 'react-native';
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'
import { Switch } from 'react-native-paper';
import Asyncstorage from '@react-native-async-storage/async-storage'
//import { createAlarm } from 'react-native-simple-alarm';
import moment from 'moment'
import {Noticontext} from '../../App'

const MySwitch = ({size,id,hour,minute,timezone,status}) => {
  console.log("alarm status -- ",status)
  const [isSwitchOn, setIsSwitchOn] = React.useState(status);
  let notification = useContext(Noticontext)
 
  const onToggleSwitch = () => {setIsSwitchOn(!isSwitchOn)
    Asyncstorage.getItem('alarms',async(err,result)=>
    {
      console.log("switch",isSwitchOn)
      if(result)
      {
       result=JSON.parse(result)
       result=result.map(alrm=>
         {
           if(alrm.id==id)
           {
             if(!isSwitchOn)
             {
              // console.log('notification man ',notification)
               // notification.localNotification({
               //   channelId: "channel-id",
               //   title: "sammple title",
               //   message: "message is the notification man "
               // })
               
              
               if(timezone=='PM')
               {
                 hour=(parseInt(hour)+12).toString()
               }
               if(timezone=='AM')
               {
                 console.log("am man am")
                 hour=(parseInt(hour)).toString()
               }
               let date = new Date()
               let scheduledate = new Date(date.getFullYear(),date.getMonth(),date.getDate(),parseInt(hour),parseInt(minute))
          //    console.log(scheduledate.getTime(),date.getTime())
               if(scheduledate.getTime()<=date.getTime())
               {
               //  console.log("lesser man ")
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
                 actions:["dismiss","snooze"],//playSound:true,
          //       soundName:'alarmsound',
                //  autoCancel:false,
                 ongoing: true,
                //  vibrate: true,
                //  vibration: 30000
                 
               })
               
              

                 return {
                   ...alrm,active:true
                 }
             }
             else
             {
               try{

               }
               catch(e)
               {
                 notification.cancelLocalNotification(id)
               }
               
                  return {
                    ...alrm,active:false
                  }
             }
           }
           else
           {
             return {
               ...alrm
             }
           }
         })
         result=JSON.stringify(result)
         await Asyncstorage.setItem('alarms',result)
      }
    })
  
  };
  React.useEffect(()=>
  {
          
          
  },[isSwitchOn])

  return <Switch color={'#EE82EE'} thumbColor={'#720e9e'}  trackColor={{false:"#E6E6FA",true:"#720e9e"}} style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} value={isSwitchOn} onValueChange={onToggleSwitch} />;
};



const MyComponent = ({hour,minute,timezone,style,id,status}) => {
return <>

  <List.Item
    title={props=><Text style={{
        fontSize:35,
        color: 'white'
    }}>{hour+":"+minute+" "+timezone}</Text>}
    description=""
    left={props =>{props.color=timezone=='PM'  ?'yellow':'#E1EBEE'
        return <>{timezone=='PM'?<Icon color={'blue'}  size={50} {...props}  name="partly-sunny"/>:<Icon color='white' size={50} {...props} name="cloudy-night"/>}</>}}
    right={props=><MySwitch  status={status} size={20} id={id} hour={hour} minute={minute} timezone={timezone}/>}
    style={{
        padding: 30,
        fontSize:10,
        backgroundColor:'#1A2228'
    }}
    id={id}
/>

</>    
  
};

export default MyComponent;