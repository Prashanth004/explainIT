export const FETCH_ISSUE = 'FETCH_ISSUE'
export const FETCH_PROJ_BY_ISSUE = 'FETCH_PROJ_BY_ISSUE'
export const SET_ISUUE_ID = "SET_ISUUE_ID"
export const CREATE_ISSUE_PROJECT = "CREATE_ISSUE_PROJECT"  
export const SIGN_IN_WITH_GOOGLE = "SIGN_IN_WITH_GOOGLE"
export const AUTH_FAIL = 'AUTH_FAIL'
export const CHECK_TOKEN_VALIDIDTY = 'CHECK_TOKEN_VALIDIDTY'
export const SIGN_IN_WITH_TWITTER = "SIGN_IN_WITH_TWITTER"
export const SIGN_IN_WITH_GIT = "SIGN_IN_WITH_GIT";
export const SIGN_OUT  = "SIGN_OUT";
export const FETCH_STARTED = "FETCH_STARTED"
export const UPDATE_ANSWER_WITH_IMAGE = "UPDATE_ANSWER_WITH_IMAGE"
export const CLEAR_ANSWER = "CLEAR_ANSWER";
export const CREATE_ISSUE_PROJECT_FAILED ="CREATE_ISSUE_PROJECT_FAILED"
export const CANCEL_PROJ_CREATION_ERROR = "CANCEL_PROJ_CREATION_ERROR"
export const CANCEL_PROJ_CREATION_SUCCESS = "CANCEL_PROJ_CREATION_SUCCESS"
export const FETCH_DETAILS_OF_EXPLAINED = "FETCH_DETAILS_OF_EXPLAINED"
export const CANCEL_SUCCESS ="CANCEL_SUCCESS"
export const  DELETE_SUCCESSFULL = "DELETE_SUCCESSFULL"
export const DELETE_FAILED = "DELETE_FAILED"
export const SET_ISSUE_ID_TO_NULL = "SET_ISSUE_ID_TO_NULL"
export const FILE_SIZE_TOO_LARGE = "FILE_SIZE_TOO_LARGE";
export const DECREASE_CALL_BY_MINUTE ="DECREASE_CALL_BY_MINUTE";
export const RETRY_UPDATE_NO_OF_MINUTES = "RETRY_UPDATE_NO_OF_MINUTES";
export const GET_ALL_ACTIVITES_USERS ="GET_ALL_ACTIVITES_USERS";
export const PROFLE_HANDLE_ON_EXPLAIN = "PROFLE_HANDLE_ON_EXPLAIN";
export const PROFILE_NOT_PRESENT_ON_TWITTER = "PROFILE_NOT_PRESENT_ON_TWITTER";
export const PROFILE_PRESENT_ON_TWITTER_NOT_EXPALIN = "PROFILE_PRESENT_ON_TWITTER_NOT_EXPALIN";
    




//Tool related

export const DISPLAY_SCREEN_RECORD = "DISPLAY_SCREEN_RECORD"
export const DISPLAY_SCREEN_SHARE ="DISPLAY_SCREEN_SHARE"
export const DISPLAY_FULL_SHARE ="DISPLAY_FULL_SHARE";
export const DISPLAY_FULL_SCREEN_RECORD = "DISPLAY_FULL_SCREEN_RECORD"

export const SCREEN_SHARE = "screenShare"
export const START_SHARING = "START_SHARING";
export const STOP_SHARING ="STOP_SHARING";

export const SCREEN_RECORD ="screenRecord";
export const START_RECORDING = "START_RECORDING";
export const STOP_RECORDING = "STOP_RECORDING"

export const SET_VIDEO_BLOB = "SET_VIDEO_BLOB"
export const DISCARD_RECORD_CHANGES ="DISCARD_RECORD_CHANGES"

export const FULL_SCREEN_SHARE ="fullScreenSharing";
export const FULL_START_SHARING = "FULL_START_SHARING";
export const FULL_STOP_SHARING ="FULL_STOP_SHARING";

export const FULL_SCREEN_RECORD ="fullScreenRecording";
export const FULL_START_RECORD = "FULL_START_RECORD";
export const FULL_STOP_RECORD ="FULL_STOP_RECORD";

export const RESET_TOOL_STATES = "RESET_TOOL_STATES";
export const  OPEN_EDIT_TEXT_MODAL = "OPEN_EDIT_TEXT_MODAL";
export const CLOSE_EDIT_TEXT_MODAL ="CLOSE_EDIT_TEXT_MODAL";
export const UPDATE_TEXT_EXPLAIN ="UPDATE_TEXT_EXPLAIN";


//Profile action

export const GET_PROFILE_DETAILS = "GET_PROFILE_DETAILS"
export const GET_PROFILE_DETAILS_FAIL ="GET_PROFILE_DETAILS_FAIL"
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export const UPDATE_USER_PROFILE_FAILED ="UPDATE_USER_PROFILE_FAILED";
export const  OPEN_EDIT_PROFILE = "OPEN_EDIT_PROFILE";
export const CLOSE_EDIT_PROFILE = "CLOSE_EDIT_PROFILE";
export const  CHANGE_ONLINE_STATUS = "CHANGE_ONLINE_STATUS";
export const CHANGE_ONLINE_STATUS_FAILED ="CHANGE_ONLINE_STATUS_FAILED";
export const GET_PROFILE_VIDEO_LINK ="GET_PROFILE_VIDEO_LINK";


//Extension Action
export const SAVE_EXTENSION_DETAILS="SAVE_EXTENSION_DETAILS"
export const GET_SOURCE_ID = "SAVE_SOURCE_ID"

//visitProfile Action

export const GET_PROFILE_BY_TWITTER_HANDLE = "GET_PROFILE_BY_TWITTER_HANDLE"
export const GOT_NULL_BY_TWITTWRHANDLE = "GOT_NULL_BY_TWITTWRHANDLE"
//callAction

export const CALL_DETAILS_ACCEPT = "CALL_DETAILS_ACCEPT"
export const ANSWER_CALL = "ANSWER_CALL" 
export const SET_NUMBER_MINUTES = "SET_NUMBER_MINUTES";
export const INCREASE_CALL_BY_MINUTE = "INCREASE_CALL_BY_MINUTE";
export const UPDATE_CURRENT_TIME = "UPDATE_CURRENT_TIME";
export const SAVE_TOPIC_OF_THE_CALL = "SAVE_TOPIC_OF_THE_CALL";
export const SET_PEER_ID = "SET_PEER_ID";
export const UPATE_CURRENT_TIME_TO_DISPLAY = "UPATE_CURRENT_TIME_TO_DISPLAY";
export const CALL_FAILED = "CALL_FAILED";
export const   GET_ALL_ACTIVITES = "GET_ALL_ACTIVITES";
export const GET_ALL_ACTIVITES_FAILED = "GET_ALL_ACTIVITES_FAILED";
export const RESET_CALL_ACTIONS = "RESET_CALL_ACTIONS";
export const INITIATE_SEND = "INITIATE_SEND";


//message Action

export const SEND_MESSAGE = "SEND_MESSAGE"
export const SEND_FAILED ="SEND_FAILED"
export const FETCH_MESSAGES = "FETCH_MESSAGES"
export const FETCH_FAILED ="FETCH_FAILED"
export const MISS_CALL = "MISS_CALL";
export const BASIC_INFO_OF_CALL = "BASIC_INFO_OF_CALL";
export const FAILURE_IN_CHNAGE_READ_STATE = "FAILURE_IN_CHNAGE_READ_STATE"
export const CANCEL_MESSAGE_STATE= "CANCEL_MESSAGE_STATE"
export const HIDE_TEXT_BOX_AFTER_RECORDONG = "HIDE_TEXT_BOX_AFTER_RECORDONG"
export const SHOW_TEXT_BOX_AFTER_RECORDONG = "SHOW_TEXT_BOX_AFTER_RECORDONG";
export const FROM_SHARE_TO_RECORD = "FROM_SHARE_TO_RECORD"
export const GET_TOTAL_UNREAD = "GET_TOTAL_UNREAD"
export const SUCCESS_IN_CHNAGE_READ_STATE ="SUCCESS_IN_CHNAGE_READ_STATE";
export const EXPLAIN_ISSUE ="EXPLAIN_ISSUE"
export const AUTH_FAIL_TWITTER = "AUTH_FAIL_TWITTER";
export const JUST_RECORD ="JUST_RECORD";
export const DISPLAY_INBOX = "DISPLAY_INBOX";
export const INBOX ="INBOX"

//Nav action

export const OPEN_HOME = "OPEN_HOME"
export const OPEN_CREATED = "OPEN_CREATED"
export const OPEN_PARTICIPATED = "OPEN_PARTICIPATED"
export const OPEN_INBOX ="OPEN_INBOX"
export const CANCEL_CREATION = "CANCEL_CREATION"

// tweet realted actions

export const GET_PROFILE_ID = "GET_PROFILE_ID";
export const GOT_NO_PROFILE ="GOT_NO_PROFILE"
export const SET_STREAM = "SET_STREAM"
export const SET_STREAM_TO_NULL = "SET_STREAM_TO_NULL";
export const RESET_TWITTER_API_VALUES = "RESET_TWITTER_API_VALUES"
export const SHOW_CANVAS = "SHOW_CANVAS"
export const HIDE_CANVAS ="HIDE_CANVAS"
export const SEND_TWEETS = "SEND_TWEETS"
export const SEND_TWEET_FAILED ="SEND_TWEET_FAILED"
export const GET_TWITTER_HANDLE = "GET_TWITTER_HANDLE"
export const GET_TWITTER_HANDLE_FAILED ="GET_TWITTER_HANDLE_FAILED"
export const GET_PROFILE_DETAILS_FAIL_ON_HOVER = "GET_PROFILE_DETAILS_FAIL_ON_HOVER"
export const GET_PROFILE_DETAILS_ON_HOVER = "GET_PROFILE_DETAILS_ON_HOVER"
export const SECOND_SHARE_START = "SECOND_SHARE_START"
export const SECOND_SHARE_END ="SECOND_SHARE_END"
export const SAVE_RECIEVER_DATA ="SAVE_RECIEVER_DATA"


//email actions
export const SEND_OTP = "SEND_OTP";
export const SEND_OTP_FAILED ="SEND_OTP_FAILED"
export const VARIFY_ACTIVATED ="VARIFY_ACTIVATED"
export const VARIFY_ACTIVATED_FAILED ="VARIFY_ACTIVATED_FAILED"
export const ACTIVATED_PROFILE ="ACTIVATED_PROFILE";
export const RE_SEND_OTP_FAILED = "RE_SEND_OTP_FAILED";
export const RE_SEND_OTP = "RE_SEND_OTP";
export const REPLY_EMAIL_SENT = "REPLY_EMAIL_SENT";
export const SAVE_REPLY_EMAIL_OPTION="SAVE_REPLY_EMAIL_OPTION";
export const CANCEL_EMAIL_OPTION = "CANCEL_EMAIL_OPTION";


//admin actions

export const CHNAGE_ADMIN_USERNAME = "CHNAGE_ADMIN_USERNAME";
export const CHANGE_ADMIN_PASSWORD = "CHANGE_ADMIN_PASSWORD"
export const USERNAME_EMPTY = "USERNAME_EMPTY";
export const PASSWORD_EMPTY = "PASSWORD_EMPTY";
export const AUTHENTICATE_ADMIN_DETAILS = "AUTHENTICATE_ADMIN_DETAILS";
export const AUTHENTICATE_ADMIN_FAILED = "AUTHENTICATE_ADMIN_FAILED";

//landing Action

export const CLICKED_SUBMIT = "CLICKED_SUBMIT";
export const CHANGE_FORM_INPUT = "CHANGE_FORM_INPUT";
export const INVALID_TWITTER_HANDLE ="INVALID_TWITTER_HANDLE";
export const CLICKED_SUBMIT_START = "CLICKED_SUBMIT_START";

export const   ACTIVATED_ACCOUNT = "ACTIVATED_ACCOUNT"
export const NOT_ACTIVATED_ACCOUNT = "NOT_ACTIVATED_ACCOUNT"


//explain Action 
export const EXPLIN_BY_RECORD ="EXPLIN_BY_RECORD"
export const EXPLAIN_BY_REFER ="EXPLAIN_BY_REFER"
export const RESET_EXPLAIN_ACTIONS = "RESET_EXPLAIN_ACTIONS"
export const RESET_LANDING_ACTION = "RESET_LANDING_ACTION"


//referral Action

export const SAVE_REFERRAL = "SAVE_REFERRAL";


//update Recorder 
export const SAVE_RECORDER = "SAVE_RECORDER"
export const CLEAR_SAVE_ACTIONS= "CLEAR_SAVE_ACTIONS";
export const RESET_ISSUE_ACTION = "RESET_ISSUE_ACTION";



export const SET_FLOATER_TIME ="SET_FLOATER_TIME";
export const SET_FLOATER_DISPLAY ="SET_FLOATER_DISPLAY";
export const DISABLE_CALL_ACTION ="DISABLE_CALL_ACTION";

export const ANSWERED_CALL ="ANSWERED_CALL"

export const MUTE_AUDIO = "MUTE_AUDIO";
export const UNMUTE_AUDIO ="UNMUTE_AUDIO";
export const UPDATE_LINK ="UPDATE_LINK";
export const GOT_NO_PROJECT = "GOT_NO_PROJECT";

export const CHANGE_TO_MUTE_STATE = "CHANGE_TO_MUTE_STATE";
export const CHANGE_TO_UN_MUTE_STATE = "CHANGE_TO_UN_MUTE_STATE";
export const REST_PROJECT_ACTION = "REST_PROJECT_ACTION";

//User store

export const ADD_USER_TO_STORE = "ADD_USER_TO_STORE"
export const EXPLIN_BY_SHARE ="EXPLIN_BY_SHARE";
export const PAUSE_RECORDER ="PAUSE_RECORDER";
export const RESUME_RECORDER ="RESUME_RECORDER";
export const START_RECORDER ="START_RECORDER";
export const UPDATE_CURRENT_TIME_RECORDER ="UPDATE_CURRENT_TIME_RECORDER";
export const RESET_RECORDER = "RESET_RECORDER";
export const GOT_ALL_REFERRALS = "GOT_ALL_REFERRALS";
export const FAILED_TO_GET_REFERRALS = "FAILED_TO_GET_REFERRALS"; 
export const SET_VISIT_PROFILE_DETAILS = "SET_VISIT_PROFILE_DETAILS";

export const TOGGLE_HOW_IT_WORKS_MODAL ="TOGGLE_HOW_IT_WORKS_MODAL";
export const STARTED_ADD_TO_CONTACT = "STARTED_ADD_TO_CONTACT";
export const SUCCESS_ADDED_CONTACT = "SUCCESS_ADDED_CONTACT";
export const FAILED_TO_ADD_CONTACT = "FAILED_TO_ADD_CONTACT";
export const ADD_TO_CONTACT_FAILED_OWN_CONT ="ADD_TO_CONTACT_FAILED_OWN_CONT";

export const CONTACT_EXIST = "CONTACT_EXIST"
export const CONTACT_DOESNT_EXIST = "CONTACT_DOESNT_EXIST";
export const  GOT_ALL_CONTACTS = "GOT_ALL_CONTACTS";
export const GOT_ALL_CONTACTS_FAILED = "GOT_ALL_CONTACTS_FAILED";

export const CHNAGE_SHARE_EXP = "CHNAGE_SHARE_EXP";
export const CHANGE_USABILITY = "CHANGE_USABILITY";
export const CHANGE_SUGGESTION = "CHANGE_SUGGESTION";
export const STOP_RECORDER ="STOP_RECORDER";
export const RECORD_CLICKED ="RECORD_CLICKED";
export const DISCARD_RECORDING ="DISCARD_RECORDING";
export const SAVED_RECORDING ="SAVED_RECORDING";
export const RESET_FEEDBACK_ACTIONS ="RESET_FEEDBACK_ACTIONS";
export const UPDATE_FEDDBACK_TEST ="UPDATE_FEDDBACK_TEST";
export const SAVE_FEEDBACK_INITIATED = "SAVE_FEEDBACK_INITIATED";
export const SAVED_FEEDBACK = "SAVED_FEEDBACK";
export const NOTHING_FILLED = "NOTHING_FILLED";

export const SHOW_ACTIVITY = "SHOW_ACTIVITY";
export const SHOW_PROFILE = "SHOW_PROFILE";
export const HIDE_LABEL = "HIDE_LABEL";

export const HIDE_ACTIVITY = "HIDE_ACTIVITY";
export const HIDE_PROFILE = "HIDE_PROFILE";
export const REDIAL_MISSED = "REDIAL_MISSED";
export const REDIAL_FAILED = "REDIAL_FAILED";
export const CANCEL_DIAL ="CANCEL_DIAL";
export const SECOND_SHARE_START_AGAIN ="SECOND_SHARE_START_AGAIN";


export const ADD_TO_LIST="ADD_TO_LIST";
export const SWITCH_TO_ADD_TO_CONTACT = "SWITCH_TO_ADD_TO_CONTACT";
export const SWITCH_TO_CONTACT_LIST = "SWITCH_TO_CONTACT_LIST";


export const UPDAT_CONTACT_LIST ="UPDAT_CONTACT_LIST";

//timer
export const TIMER_NO_TEXT = "TIMER_NO_TEXT";
export const TIMER_LIMIT_EXCEDED = "TIMER_LIMIT_EXCEDED";
export const TIMER_NEG_NUMBER = "TIMER_NEG_NUMBER";
export const TIMER_EMPTY = "TIMER_EMPTY";
export const TIMER_CLEAR_ERRORS ="TIMER_CLEAR_ERRORS";
export const TIMER_UPDATE_TIME ="TIMER_UPDATE_TIME";
//topic
export const TOPIC_LIMIT_EXCEDED = "TOPIC_LIMIT_EXCEDED";
export const TOPIC_CLEAR_CONTRAINTS = "TOPIC_CLEAR_CONTRAINTS";
export const UPDATE_TOPIC ="UPDATE_TOPIC";
export const  SHARE_TO_SELF = "SHARE_TO_SELF";
export const NO_INTERNET = "NO_INTERNET";

export const UPDATE_TWITTER_HANDLE ="UPDATE_TWITTER_HANDLE";
export const EMPTY_TWITTER_HANDLE ="EMPTY_TWITTER_HANDLE";
export const RESET_TWITTER_VLUES ="RESET_TWITTER_VLUES";
export const STARTED_TWEET_TEST ="STARTED_TWEET_TEST";
export const REST_VISIT_TWITTER_ACTION ="REST_VISIT_TWITTER_ACTION";
export const PERRMISSION_DENIED ="PERRMISSION_DENIED";
export const HIDE_CONTACTS ="HIDE_CONTACTS";
export const SHOW_CONTACTS ="SHOW_CONTACTS";
export const OPEN_SETTING ="OPEN_SETTING";
export const UPDATE_CONTACT_SEACRCHED_INPUTBOX ="UPDATE_CONTACT_SEACRCHED_INPUTBOX";

export const RE_RECORD_FAILED = "RE_RECORD_FAILED";
export const CANCEL_RECORD ="CANCEL_RECORD";

//cahat Action
export const INITIATOR_HI ="INITIATOR_HI";
export const INITIATOR_SEND_ACK_SCHEDULE ="INITIATOR_SEND_ACK_SCHEDULE";
export const INITIATOR_AGREE ="INITIATOR_AGREE";
export const RECEIVER_INITIAL_REPLY_AGREE ="RECEIVER_INITIAL_REPLY_AGREE";
export const RECEIVER_INITIAL_REPLY_SCHEDULE = "RECEIVER_INITIAL_REPLY_SCHEDULE";
export const RECEIVER_INITIAL_REPLY_SEND_RECORD ="RECEIVER_INITIAL_REPLY_SEND_RECORD";
export const RECEIVER_FINAL_AGREE ="RECEIVER_FINAL_AGREE";
export const INITIATOR_REJECT_REPLY = "INITIATORE_REJECT_REPLY";
export const INITIATOR_CHOOSE_SCHEDULE = "INITIATOR_CHOOSE_SCHEDULE";
export const SET_SHEDULE = "RECEIVER_FINAL_AGREE";
export const CHOOSE_SHEDULE ="CHOOSE_SHEDULE";
export const END_CALL_FROM_OTHER_PEER = "END_CALL_FROM_OTHER_PEER";
export const CREATE_SOCKET = "CREATE_SOCKET";
export const REDUCE_WIDTH ="REDUCE_WIDTH";
export const REDUCE_LITTLE_WIDTH ="REDUCE_LITTLE_WIDTH";
export const ADD_NEW_ACTIVITY ="ADD_NEW_ACTIVITY";
export const TOGGLE_CONTACT_DISPLAY = "TOGGLE_CONTACT_DISPLAY";
export const UPDATE_TWITTER_HANDLE_TEXT="UPDATE_TWITTER_HANDLE_TEXT";
export const SELF_REFERAL = "SELF_REFERAL";
export const ALREADY_EXPLAINED = "ALREADY_EXPLAINED";
export const ALREADY_REFERRED = "ALREADY_REFERRED";
export const START_TWITTER_ID_FETCH ="START_TWITTER_ID_FETCH";
export const RESET_ALL_REFERRAL_ACTION ="RESET_ALL_REFERRAL_ACTION";
export const LOAD_MORE_ACTIVITY ="LOAD_MORE_ACTIVITY";
export const ADD_NEW_ANSWER_PROJECT ="ADD_NEW_ANSWER_PROJECT";

export const ADD_MORE_CREATED ="ADD_MORE_CREATED";









   


