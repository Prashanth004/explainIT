import {OPEN_HOME,OPEN_INBOX,OPEN_CREATED,OPEN_PARTICIPATED} from '../actions/types'

const initialState={
    openHome:false,
    openCreated:false,
    openParticipated:false,
    openInbox:false
}

export default function(state=initialState, action){
    switch(action.type){
        case OPEN_HOME:
            return{
                ...state,
                openHome:true,
                openCreated:false,
                openParticipated:false,
                openInbox:false
            }
        case OPEN_CREATED:
            return{
                ...state,
                openHome:false,
                openCreated:true,
                openParticipated:false,
                openInbox:false
            }
        case OPEN_INBOX:
        return{
            ...state,
            openHome:false,
            openCreated:false,
            openParticipated:false,
            openInbox:true
        }
        case OPEN_PARTICIPATED:
            return{
                ...state,
                openHome:false,
                openCreated:false,
                openParticipated:true,
                openInbox:false
            }
        default:
            return{
                ...state
            }
    }
}