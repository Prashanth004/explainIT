import {STARTED_ADD_TO_CONTACT,ADD_TO_CONTACT_FAILED_OWN_CONT,
    CONTACT_EXIST,CONTACT_DOESNT_EXIST,UPDAT_CONTACT_LIST,
    ADD_TO_LIST,CONTACT_LIST,
    GOT_ALL_CONTACTS,GOT_ALL_CONTACTS_FAILED,SWITCH_TO_ADD_TO_CONTACT,SWITCH_TO_CONTACT_LIST,
    SUCCESS_ADDED_CONTACT,FAILED_TO_ADD_CONTACT} from '../actions/types'
// import { response } from 'express';


const initialState = {
    startAdding:false,
    doneAdding:false,
    successAdded:false,
    failToAdd:false,
    contactid:null,
    error:null,
    contactExist:false,
    fetchedContactInfo :false,
    mycontacts:[],
    failedGettingAllContacts:false,
    searchedContacts : [],
    contactDisplayAction:CONTACT_LIST

}

export default function(state = initialState, action){
    switch(action.type){
        case STARTED_ADD_TO_CONTACT:
            return{
                ...state,
                startAdding:true,
                doneAdding:false,
                successAdded:false,
                contactid:null,
                error:null,
                
            }
        case SUCCESS_ADDED_CONTACT:
            return{
                ...state,
                // startAdding:false,
                doneAdding:true,
                successAdded:true,
                contactid:action.payload.contactid
            }
        case SWITCH_TO_ADD_TO_CONTACT:
            return{
                ...state,
                contactDisplayAction:ADD_TO_LIST
                
            }
        case SWITCH_TO_CONTACT_LIST:
            return{
                ...state,
                contactDisplayAction:CONTACT_LIST
            }
        case CONTACT_EXIST:
            return{
                ...state,
                contactExist:true,
                fetchedContactInfo:true
            }
        case CONTACT_DOESNT_EXIST:
        return{
            ...state,
            contactExist:false,
            fetchedContactInfo:true
        }
        case FAILED_TO_ADD_CONTACT:
            return{
                ...state,
                // startAdding:false,
                doneAdding:true,
                successAdded:false,
                error:action.payload.error,
                contactid:null
            }
        case ADD_TO_CONTACT_FAILED_OWN_CONT:
            return{
                ...state,
                startAdding:false,
                doneAdding:true,
                successAdded:false,
                error:'trying to add own contact',
                contactid:null
            }
        case UPDAT_CONTACT_LIST:
            return{
                ...state,
                searchedContacts:action.newContactList
            }
        case GOT_ALL_CONTACTS:
            return{
                ...state,
                mycontacts:action.data,
                searchedContacts:action.data
            }
        case GOT_ALL_CONTACTS_FAILED:
            return{
                ...state,
                failedGettingAllContacts:true
            }
        default:
            return{
                ...state
            }
    }

    }

