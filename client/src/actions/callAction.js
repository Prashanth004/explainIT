import {CALL_DETAILS_ACCEPT,
    ANSWER_CALL,MISS_CALL,
    SAVE_RECIEVER_DATA,
    INCREASE_CALL_BY_MINUTE,
    UPDATE_CURRENT_TIME,
    SET_PEER_ID,END_CALL_FROM_OTHER_PEER,
    INITIATE_SEND,LOAD_MORE_ACTIVITY,
    ANSWERED_CALL,
    RESET_CALL_ACTIONS,
    RETRY_UPDATE_NO_OF_MINUTES,
    GET_ALL_ACTIVITES,
    GET_ALL_ACTIVITES_FAILED,
    BASIC_INFO_OF_CALL,
    DISABLE_CALL_ACTION,
    MUTE_AUDIO,ADD_NEW_ACTIVITY,
    UNMUTE_AUDIO,
    ADD_USER_TO_STORE,
    DECREASE_CALL_BY_MINUTE,
    UPATE_CURRENT_TIME_TO_DISPLAY,
    SAVE_TOPIC_OF_THE_CALL,
    SET_NUMBER_MINUTES } from './types'
import axios from 'axios';
// import { connect } from 'react-redux';
import config from '../config/config';
import {addNewUser} from './storeUserAction';



export const acceptCallDetails = (link, callerEmail, callerUserName, callerId,callerProfilePic,topicOfTheCall,timeAlloted)=>(dispatch)=>{
dispatch({
    type:CALL_DETAILS_ACCEPT,
    payload:{
        link:link,
        email:callerEmail,
        userName:callerUserName,
        id:callerId,
        profilePic:callerProfilePic,
        topicOfTheCall:topicOfTheCall,
        timeAlloted:timeAlloted
    }
})
}
export const setpeerId = (peerId)=>(dispatch)=>{
    dispatch({
        type:SET_PEER_ID,
        payload:peerId
    })
}
export const muteAudio = ()=>(dispatch)=>{
    dispatch({
        type:MUTE_AUDIO,
    })
}
export const unMuteAudio =()=>(dispatch)=>{
    dispatch({
        type:UNMUTE_AUDIO
    })
}
export const answeredCall = ()=>(dispatch)=>{
    dispatch({
        type:ANSWERED_CALL
    })
}

export const updateRemainingTime = (timeRem)=>dispatch=>{
    dispatch({
        type:UPATE_CURRENT_TIME_TO_DISPLAY,
        payload:timeRem
    })
    return true
}
export const disableCallAction = ()=>(dispatch)=>{
   dispatch({
        type:DISABLE_CALL_ACTION
   }) 
}
export const saveTopicOfTheCall = (topic)=>(dispatch)=>{
    dispatch({
        type:SAVE_TOPIC_OF_THE_CALL,
        payload:topic
    })
}
export const updateCurrentTime = (currentTime)=>(dispatch)=>{
    dispatch({
        type:UPDATE_CURRENT_TIME,
        payload:currentTime
    })
}
export const basicInfoCall = (touser, topic)=>(dispatch)=>{
    dispatch({
        type:BASIC_INFO_OF_CALL,
        payload:{
            touser:touser
        }
    })
}
export const increaseTimer = ()=>(dispatch)=>{
    dispatch({
        type:INCREASE_CALL_BY_MINUTE
    })
}
export const deacreaseTimer = ()=>(dispatch)=>{
    dispatch({
        type:DECREASE_CALL_BY_MINUTE
    })
}

export const retryCall = ()=>(dispatch)=>{
    dispatch({
        type:RETRY_UPDATE_NO_OF_MINUTES
    })
}
export const setNoOfMinutes =(numberMinutes)=>(dispatch)=>{
dispatch({
    type:SET_NUMBER_MINUTES,
    payload:numberMinutes
})
}
export const answerCall = ()=>(dispatch)=>{
    dispatch({
        type:ANSWER_CALL
    })
}
export const resetCallAction = ()=>(dispatch)=>{
    dispatch({
        type:RESET_CALL_ACTIONS
    })
}
export const getAllActivities = (props)=>(dispatch)=>{
    var token = JSON.parse(localStorage.getItem('token'));
    var  result1 = [];
    var result2 = null;
    var promises = [];
    // var result3 = null;
    axios({
        method:'get',
        url:config.base_dir+'/api/activity/user',
        headers:{
            "Authorization":token,
        },
    }).then(response=>{
        if(response.status === 200 || response.status === 304){
            axios({
                methos:'get',
                url:config.base_dir+'/api/referral/',
                headers: {
                    "Authorization":token,
                }
            })
            .then(response1=>{
                const referrals = response1.data.data;
                const activities =response.data.data;
                const allacti =  referrals.concat(activities);
                allacti.sort(function compare(a, b) {
                  var dateA = new Date(a.time);
                  var dateB = new Date(b.time);
                  return dateB-dateA ;
                });
                  dispatch({
                    type:GET_ALL_ACTIVITES,
                    payload:allacti
                })

            var i=0;
            response.data.data.forEach(function(element) {
                result1[i] = element.fromuser;
                result1[i+1] =element.touser;
                i=i+2;
              });
              const unique = (value, index, self) => {
                return (self.indexOf(value) === index && value!==null)
              }
            
              result2 = result1.filter(unique);
              result2 = result2.filter(el=>el!==null);
            result2.forEach(function(projects, index){
                    promises.push(axios.get(config.base_dir+'/api/users/id/'+projects))
                 })
                 axios.all(promises).then(function(results) {
                    results.forEach(function(response, index) {
                        if(response.status===200 || response.status === 304){
                            if( response.data.data!==null){
                                const newItem = {
                                    'key': response.data.data.id,
                                    'data': response.data.data
                                }
                                dispatch({
                                    type: ADD_USER_TO_STORE,
                                    payload: newItem
                                })
                            }
                           
                        }
                    })
                 }).catch(error=>{
                     console.log("error : ",error)
                 })
        }).catch(error=>{
            console.log("error : ",error)
        })

        }
        
   
    }).catch(error=>{
        console.log("error : ",error)
        dispatch({
            type:GET_ALL_ACTIVITES_FAILED,
            payload:error
        })
    })
}

export const loadMoreActivities = ()=>(dispatch)=>
{
    dispatch({
        type:LOAD_MORE_ACTIVITY,
    })
}
export const callSuccessedUpate = (touser, topic, duration, link)=>{
    var token = JSON.parse(localStorage.getItem('token'));
    var data={
        touser:touser,
        activity:config.CALL_SUCCESSFULL,
        subject:topic,
        link:link,
        duration:duration,
    }
    axios({
        method:'post',
        url:config.base_dir+'/api/activity/',
        headers:{
            "Authorization":token,
        },
        data:data
    }).then(data=>{

    })
    .catch(err=>{
        console.log("error in saving the call Success details : ", err)
    })

}
export const initiateSend = ()=>(dispatch)=>{
    dispatch({
        type:INITIATE_SEND
    })
}
export const callFailedUpdate = ( touser, topic)=>(dispatch)=>{
    var token = JSON.parse(localStorage.getItem('token'));
    var data={
        touser:touser,
        activity:config.CALL_FAILED,
        subject:topic,
        link:null,
        duration:null,
    }
    axios({
        method:'post',
        url:config.base_dir+'/api/activity/',
        headers:{
            "Authorization":token,
        },
        data:data
    }).then(data=>{
    })
    .catch(err=>{
        console.log("error in saving the call fail details : ", err)
    })
}
export const addActivity = (activityObj)=>(dispatch)=>{
    dispatch({
        type:ADD_NEW_ACTIVITY,
        payload:activityObj
    })
}
export const endCallfromOtherPeer = ()=>dispatch=>{
    dispatch({
        type:END_CALL_FROM_OTHER_PEER
    })
}
export const missCall = () =>(dispatch)=>{
    dispatch({
        type:MISS_CALL
    });
 }

export const getRecieverData=(profileImage,profileName,userId)=>(dispatch)=>{
    dispatch({
        type:SAVE_RECIEVER_DATA,
        profileImage:profileImage,
        profileName:profileName,
        userId:userId
    })
}


