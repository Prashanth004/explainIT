
var today = new Date();
var date = today.getFullYear()+'_'+(today.getMonth()+1)+'_'+today.getDate();

var time = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
var token = JSON.parse(localStorage.getItem("token"))



const conf = {
    base_dir:"http://localhost:9000",
    react_url:"http://localhost:3000",
    dataTime : date+"__"+time,
    token:token,
    googleClientId:"308795475823-1uvk577becdqe5dpekouia3juuu961f8.apps.googleusercontent.com",

    explainerVideo : "https://explain.bookmane.in/public/audio/2019_7_8__15_43_44video.mkv",
    // peerHost:window.location.hostname,
    peerHost:"bookmane.in",
    // peerPort : 9000,
    // peerPort:8080,
    peerPort :443,
    peerPath : '/peerjs',
    peerSecure:true,
    peerDebug:3,
    gitHubClientId:"5c7162c1bd8449fa8b00",
    EXMAIL_VALIDATE_TOKEN:"8d31cc402c99ec4e3d5545ae6a549c0f",
    gitHubClientSecret:"2dc2241f50794c71ded61545fd3d34cfc4338947",
    react_url_git:"https://explain.bookmane.in/git",
    canvBackground : "rgb(205, 243, 224)",
    peopleDisplayLength:6,
    null:"null",
    // EXTENSION_ID:"bpclgbfkeejifflggonjhmpeehdpocji",
    // EXTENSION_ID:"ljknohkmbbnpfpcpgaihbmiagabhinhl",
    // EXTENSION_ID:"egfmgeokjijeefalgllckhldjgjkgenc",
    EXTENSION_ID:"ljknohkmbbnpfpcpgaihbmiagabhinhl",
    
    EXTENSION_URL:"https://chrome.google.com/webstore/detail/explain/ljknohkmbbnpfpcpgaihbmiagabhinhl?authuser=2",
    SECRET : "thebookmaneisawesomeiguess",
    LINK_TO_CALL: "linkTocall",
    REJECT_REPLY:"rejectRepply",
    REPLY_TO_SHARE_REQ:"Please send me the recording.",
    CALL_ACK_MESSAGE : "callAckMessage",
    END_CALL : "endCall",
    CHECK_TOKEN_VALIDITY : "checkTokenValidity",
    COMFIRM_TOKEN_VALIDITY : "confirmTokenValidity",
    RETRYCALL : "reTryCall",
    ENDCALL_ACK:"endCallAck",
    CLOSE_NETWORK_ISSUE : "closeDueToNetworkIssue",
    SELF :"home",
    VISIT_PROF : "notHome",
    HOME : "home",
    NOT_HOME:"nothome",
    PROJECT_TEXT_LIMIT:100,
    MAX_VIDEO_TIME_LIMIT:20,
    RECORDING:"recording",
    SHARING : "sharing",
    RECORD_TIME: 3,
    LINK_EXPIRE_TIME:3,
    UPDATE_BADGE:"updateBadge",
    NEW_MESSAGE:"newMessage",
    LINK_TO_CALL_ACK:"lonkToCallAck",
    ENDING_RING:"endingRing",
    ENDING_RING_ACK:"endingRingAck",
    SAVED_NEW_PROJECT:"savedNewProject",
    SHARE_MY_SCREEN:"shareMyScreen",
    ACCEPT_SHARE_OTHRT_PEER_SCREEN : "acceptOtherPeerScreen",
    OTP_SECRET:"explainotpbookmane",
    FAILED_TO_GET_ISSUE_DETAILS:"failedToGetIssueDetails",
    FAILED_TO_GET_CREATOR_DETAILS:"failedToGetCreatorDetails",
    FAILED_TO_GET_REPLIER_DETAILS:"failedToGetReplierDetails",
    SEND_SHARABLE_LINK:"sendSharableLink",
    CALL_FAILED:"callFailed",
    CALL_SUCCESSFULL:"callSuccessful",
    EXPLAIN_SUCCESS : "explainSuccess",
    MESSAGE_ACTIVITY:"messageActivity",
    EXPLAIN_ACTIVITY:"explainActivity",
    ADD_NEW_CONTACT:"addnewContact",
    FROM_USER_ADMIN_ID:"1090895508699176960",
    monthPicker : {
        "01": "Jan",
        "02": "feb",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sept",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec"
    },
    START_CALL:"startCall",
    GET_SOURCE_ID_AUDIO_TAB:"audio-plus-tab",
    END_CALL_FROM_EXTENSION:"endCallFrmExtension",
    END_CALL_FROM_FLOATER:"endCallFrmFloater",
    END_CALL_PEER_FROM_EXTNESION:"endCallPeerFromExtension",
    ADD_EXTRA_MIUTE_TO_EXTENSION:"addExtraTimeToExtension",
    ADD_EXTRA_TIME_TO_FLOATER:"addExtraTimeToFloater",
    SHARE_MY_SCREEN_FROM_FLOATER:"shareMyScreenFromFloaterOnly",
    SHARE_MYSCREEN_FROM_EXTENSION:"shareMyScreenFromExtension",
    FULL_SCREEN_RECORD:"fullScreenRecord",
    FULL_SCREEN_SHARE:"fullScreenShare",
    RECIEVER_SCREEN_SHARE : "recieverScreenShare",
    END_RECORD_FROM_FLOATER:"endRecordFromFloater",
    END_RECORD_FROM_EXTENSION:"endRecordFromExtension",
    END_RECORD_TIMEOUT : "endRecordTimeOut",
    RECORD_SCREEEN_EXPLAIN:"recordScreenExpalin",
    REFER_EXPLAIN:"referExplain",
    SHARE_SCREEN_EXPALIN:"shareScreenExplain",
    ENVIRONMENT:"prod",
    DEV_ENV:true,
    CALL_LOGS:true,
    ACCEPT_SHARE_REQUEST:"acceptShareRequest",
    UPDATE_RECORDER_BLOB:"updateRecorderBlob",
    REFRESH_EXPLAIN_FLOATER:"refreshFloaterExpalin",
    SERVER_RECORDING:"serverRecording",
    SERVER_SHARING : "serverSharing",
    SELF_CLOSE_TIME:1,
    ERROR_CODE_FILE_TOO_LARGE:413,
    
    END_SCREED_RECORD_FROM_WEB:"endScreenRecordFromWEb",
    END_CALL_RECIEVER_FROM_FLOATER:"endCallReceiverFromFLoater",
    END_CALL_RECEIVER_TO_EXTENSION : "endCallReceiverToExtension",
    END_CALL_RECIEVER_TO_WEB:"endCallRecieverToWeb",
    END_CALL_RECIEVER_PEER_FROM_WEB:"endCallRecieverPeerFromExtension",
    DISPLAY_SHARE_ICON_TO_EXTENSION : "displayShareIconToExetesion",
    DISPLAY_SHARE_ICON_TO_FLOATER : "displayShareIconToFloater",
    HIDE_SHARE_ICON_TO_EXTENSION:"hideShareIconToExtension",
    HIDE_SHARE_ICON_TO_FLOATER:"hideShareIconToFloater",
    PEER_SHARE_SCREEN_REQUEST :"perrShareScreenRequest",
    MESSSAGE_FOR_CONNECTION_WITH_ID:"messageForConnectionWithId",
    UPDATE_INFO : "updateInfo",
    PERMISSION_DENIED :'PermissionDeniedError',
    END_WHILE_DIALING:'endWhileDialing',
    VIDEO_RECORDING_SAVE_LIMIT: 360,//seconds,
    ADD_EXTRA_MIUTE_TO_EXTENSION_RECIEVER:"addExtraMinuteToExtensionReceiver",
    ADD_EXTRA_MIUTE_TO_FLOATER_RECIEVER:"addExtraMinuteToFloaterReceiver",
    ADD_EXTRA_MINUTE_FROM_FLOATER:"addExtraMinuteFromFloater",
    ADD_EXTRA_MINUTE_TO_WEB_SITE:"addExtraMinuteToWebsite",
    SCREEN_FROM_OTHER_PEEER_TO_EXTENSION:"screebFromOtherPeerToExtension",
    MUTE_FROM_FLOATER:"muteFromFloater",
    MUTE_TO_WEB:"muteToWeb",
    MUTE_TO_FLOATER:"muteToFloater",
    UNMUTE_FROM_FLOATER:"unmuteFromFloater",
    UNMUTE_TO_WEB:"unMuteToWebsite",
    UNMUTE_TO_FLOATER:"unMuteToFloater",
    UN_MUTED:"unMuted",
    MUTED:"muted",
    PAUSE_FROM_FLOATER:"floaterFrom",
    RESUME_FROM_FLOATER:"resumeFromFloater",
    RESUME_TO_WEB:"resumeToWeb",
    RESUME_TO_FLOATER:"resumeToFloater",
    PAUSED_RECORDER:"pausedRecorder",
    RESUMED_RECORDER:"resumedRecorder",
    PAUSE_TO_WEB:"pauseToWeb",
    PAUSE_TO_FLOATER:"pauseToFloater",
    //floater info
    TOGGLE_FLOATER:"togglrFloater",
    ADDED_EXTRA_MINTUE_INFO:"Added extra minute", //one done another one to go
    YOU_SHARED_SCREEN_INFO:"You shared screen",  //done
    PEER_SHARE_SCREEN_INFO:"Peer Shared screen", //done
    RECORDING_ENDED_INFO:"Recording Ended info", 
    SCREEN_SHARE_ENDED_INFO:"Screen Share ended",//done
    PAUSED_RECORDER_INFO:"Paused Recorder",//done
    RESUMED_RECORDER_INFO:"Resumes Rcorder",//done
    SAVE_RECORD:"saveRecording",
    DECREASE_MINUTE_TO_WEB_SITE:"decreaseMinuteToWebSite",
    DECREASE_MIUTE_FROM_FLOATER:"decreaseMinuteFromWebsite",
    DECREASE_MINUTE_TO_FLOATER:"decreaseMinuteToFloater",
    DECREASE_MINUTE_TO_EXTENSION_RECIEVER : "decreaseMinuteToExtension",
    DECREASE_MIUTE_TO_EXTENSION : "decreaseMinuteToExtension",
    DECREASE_MINUTE_TO_FLOATER_RECIEVE:"decreaseMinuteToFloaterReciever",
    TIME_TWO_MIUTE_ERROR : "timeTwoMinuteError",
    GOOGLE_ANALYTICS_ID : "UA-142864750-1",
    INFORM_EXTENSION_USERID:"informExtensionUserId",
    INCOMING_CALL_AUDIO_PLAY:"incomingCallAudioPlay",
    INCOMING_CALL_AUDIO_STOP:"incomingCallAudioStop",
    OTHER_PEER_MUTE_UNMUTE_FROM_WEB:"otherPeerMuteUnmute",
    OTHER_PEER_MUTE_UNMUTE_FROM_FLOATER : "otherPersoneMutedUnmutedToFloater",
    MUTE_UMMUTE:"MUTE_UMMUTE",
    HOME_PAGE:"home",
    SCREEN_SHARE_PAGE:"screenSharePage",
    VISIT_PROFILE_PAGE:"visitProfile",
    PEOJECT_PAGE : "projectPage",
    ISSUE_PAGE:"issuePage",







}
export default conf
