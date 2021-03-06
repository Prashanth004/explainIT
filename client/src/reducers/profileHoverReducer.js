import {GET_PROFILE_DETAILS_ON_HOVER,
    GET_PROFILE_DETAILS_FAIL_ON_HOVER} from '../actions/types'

const initialState = {
   
    email:null,
    profilePic:null,
    userName:null,
    noParticipated:null,
    noCreated:null,
    errorFetchingProfileData:null,
    myIssues:null,
    participatedIssue:null,
    twitterHandle:null,
  
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_PROFILE_DETAILS_ON_HOVER:
            return {
                ...state,
                email:action.email,
                userName:action.userName,
                profilePic:action.profilePic,
                noParticipated:action.noParticipated,
                noCreated:action.noCreated,
                myIssues:action.myIssue,
                participatedIssue : action.participatedIssue,
                twitterHandle:action.twitterHandle
            }
        case GET_PROFILE_DETAILS_FAIL_ON_HOVER:
            return {
                ...state,
                errorFetchingProfileData:action.error
            } 
        default :
            return state;
    }
}