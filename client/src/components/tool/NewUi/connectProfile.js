import React, { Component } from 'react'
import '../../css/newlanding.css';
import Profile from './Profile';
import PageNotFount from './NoMatch';
import DisplatCreated from './diaplyissues/DisplayIssues';
// import { FiGrid,FiList } from "react-icons/fi";
import Setting from './newNav/setting';
import MobNav from './newNav/index'
import { acceptCallDetails } from '../../../actions/callAction';
import Navbar from './Navbar';
import HomeProjects from './diaplyissues/displayVisitCards'
import { missCall } from '../../../actions/callAction';
import CallNotification from './container/CallNotification';
import AddtoContact from './contactlist/addToContact'
import FullScreenShare from './enitreScreenShare';
import FullScreenRecord from './FullScreenRecord';
import '../../css/NewSignin.css';
import { SCREEN_SHARE, SCREEN_RECORD, FULL_SCREEN_RECORD, FULL_SCREEN_SHARE } from '../../../actions/types';
import { displayFullScrenRecord, displayFullScreShare } from '../../../actions/toolActions'
import { creatAnsProject } from '../../../actions/projectActions'
import { resetCallAction} from '../../../actions/callAction'
import socketIOClient from "socket.io-client";
import TwitterLogin from 'react-twitter-auth';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { connect } from 'react-redux';
import {  setIssueId } from '../../../actions/issueActions';
import { fetchProjectbyIssue, clearAnswers } from '../../../actions/projectActions';
import { stillAuthenicated,twitterAuthFailure,signInWithTwitter } from '../../../actions/signinAction';
import { getProfileDetails } from '../../../actions/profileAction'
import PropType from 'prop-types';
import Swal from 'sweetalert2'
import config from '../../../config/config'
import ProfileCard from './ProfileCard'
import IssueDisplay from './diaplyissues/DisplayIssues'
import { saveExtensionDetails, saveSourceId } from "../../../actions/extensionAction";
import {restAllToolValue} from "../../../actions/toolActions";
import {cancelSuccess,fetchIssues} from "../../../actions/issueActions";
import {getProfileByTwitterHandle,setVisitProfile} from "../../../actions/visitProfileAction";
import {getRecpientId} from '../../../actions/twitterApiAction'
import {openInbox, openParticipated,openCreated } from "../../../actions/navAction";
import ProfileNotOnExplain from './ProfileNotOnTwitter/ProfileNotOnExplain'

class NewHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalTool: false,
            showDetails: false,
            openExplain: false,
            showCreatedIssue: false,
            showParticipatedIssue: false,
            showProjects: false,
            isHome : false,
            isVisitProfile:true,
            typeOfView:"list",
            socket: null,
            displayDetails:false,
            endedCallFromOtherPeer: false,
            currentAtionStatus: null,
            reducedWidth:false,
        }
        this.togglemodal = this.togglemodal.bind(this)
        this.explainTool = this.explainTool.bind(this)
        this.toggleModalCreate = this.toggleModalCreate.bind(this)
        this.toodleExplain = this.toodleExplain.bind(this);
        this.changeViewToList = this.changeViewToList.bind(this);
        this.changeViewToGrid = this.changeViewToGrid.bind(this);
        this.openDtailsTab = this.openDtailsTab.bind(this);
        this.toggleCreatedIssue = this.toggleCreatedIssue.bind(this);
        this.toggleParticipatedIssue = this.toggleParticipatedIssue.bind(this);
        this.closeParticipated = this.closeParticipated.bind(this);
        this.reStoreDefault = this.reStoreDefault.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.toggleInbox = this.toggleInbox.bind(this);
        this.saveVideoData = this.saveVideoData.bind(this);
        this.shareFullScreenShare = this.shareFullScreenShare.bind(this);
        this.recordFullScreen =  this.recordFullScreen.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
        this.resize = this.resize.bind(this);
    }
    resize() {
        this.setState({ reducedWidth: window.innerWidth <= 700 });
        
    }
    reloadPage(event) {
        if (event.key === 'token') {
            window.location.reload();
        }
        if (event.key === 'currentAction') {
            const currentAtionStatus = JSON.parse(localStorage.getItem('currentAction'));
            this.setState({ currentAtionStatus: currentAtionStatus })
        }
    }
    

    closeParticipated() {
        this.setState({
            showProjects: false,
            showParticipatedIssue: false,
            showCreatedIssue: false,
        })
    }
    changeViewToList() {
        this.setState({
            typeOfView: "list"
        })
    }
    changeViewToGrid() {
        this.setState({
            typeOfView: "grid"
        })
    }
    componentDidMount() {
        var socket = this.state.socket;
        this.setState({ reducedWidth: window.innerWidth <= 700 });
        var self = this;
        window.addEventListener("resize", this.resize.bind(this));
        socket.on('connect_failed', function () {
        })
        socket.on('error', function (err) {
        });
        socket.on('connect_timeout', function (err) {
        });
        socket.on("disconnect", () => {
        })
        socket.io.on("connect_error", () => {
        });
        
        socket.on(config.LINK_TO_CALL, data => {
            console.log("recieving the call")
            self.setState({ endedCallFromOtherPeer: false })
            setTimeout(() => {
                self.props.missCall();
            }, 18000)
            localStorage.setItem("profilePic", data.fromProfilePic)
            if (String(data.ToUserId) === this.props.profileid) {
                socket.emit(config.LINK_TO_CALL_ACK, {
                    "fromUserId": data.fromUserId,
                    "toUserId": data.toUserId
                })
                // this.setState({
                //     callerId: data.fromUserId
                // })
                this.props.acceptCallDetails(
                    data.link,
                    data.fromEmail,
                    data.fromUserName,
                    data.fromUserId,
                    data.fromProfilePic,
                    data.topicOfTheCall,
                    data.timeAloted

                )
            }
        });
        socket.on(config.END_WHILE_DIALING, data => {
            if (data.ToUserId === this.props.profileid) {
                this.setState({ endedCallFromOtherPeer: true })
            }
        })
        
    

        if(!this.props.isPresentInExplain){
            const twiHand = this.props.match.params.encrTwitterHandle.replace("@","")
            this.props.getRecpientId(twiHand)
        }
        var self = this
                function postMessageHandler(event) {
            if (event.data.sourceId !== undefined) {
              
                self.props.saveSourceId(event.data.sourceId)
            }
            if (event.data === 'rtcmulticonnection-extension-loaded') {
                self.setState({
                    source: event.source,
                    origin: event.origin,
                    gotmessage: true
                })
                self.props.saveExtensionDetails(event.source, event.origin)
            }
        }
        if (window.addEventListener) {
            window.addEventListener("message", postMessageHandler, false);
        } else {
            window.attachEvent("onmessage", postMessageHandler);
        }
    }
    componentWillUnmount(){

            window.removeEventListener("resize", this.resize());
            window.removeEventListener('storage', this.reloadPage)
    }
    componentWillMount() {
        this.props.stillAuthenicated();
        const currentAtionStatus = JSON.parse(localStorage.getItem('currentAction'));
        this.setState({ currentAtionStatus: currentAtionStatus })
        const socket = socketIOClient(config.base_dir);
        this.setState({socket: socket })       
        if(this.props.match.params.encrTwitterHandle===null){
            // alert("empty")
        }
        const twiHand = this.props.match.params.encrTwitterHandle.replace("@","");
        this.props.setVisitProfile(twiHand);
        this.props.getProfileByTwitterHandle(twiHand)
        localStorage.setItem("peerId",JSON.stringify(twiHand))
    }
    toodleExplain() {
        localStorage.setItem("issueId", null)
        this.setState({
            openExplain: !this.state.openExplain,
            showCreatedIssue: false,
            showParticipatedIssue: false
        })
    }

    toggleCreatedIssue() {
      this.setState({
          showProjects: true,
          openExplain: false
      })
     this.props.openCreated()
    }

    toggleParticipatedIssue() {
       this.setState({
            showProjects: true,
            openExplain: false
        })
       this.props.openParticipated()
    }

    toggleModalCreate = () => {
        if (this.props.isAauthenticated) {
            this.props.setIssueId(null)
            localStorage.setItem("issueId", null)
            window.open(config.react_url + '/explainIt', "_blank")
        }
        else {
            Swal.fire(
                'You should login'
            )
        }
    }

    togglemodal = (e) => {
        var idOfClicked = e.target.id;
        var classOfClicked = e.target.className
        if (classOfClicked !== "singleMember" && classOfClicked !== "explainAnswer" && classOfClicked !== "displayPeople" && classOfClicked !== "likes" && classOfClicked !== "numberOfPeople" && idOfClicked !== "explainIt" && idOfClicked !== "audio" && idOfClicked !== "tweet" && idOfClicked !== "shareScreen" && idOfClicked !== "imageOfPeople" && classOfClicked !== "buttonDark explainItBtn") {
            if (this.state.modal === false) {
                this.props.clearAnswers(e.target.id)
                this.props.fetchProjectbyIssue(e.target.id);
            }
            this.setState({
                modal: !this.state.modal
            });
        }
    }
  
    handleCancel(){
        
    }
    toggleInbox(){
        this.setState({
            showProjects: true,
            openExplain: false,
            displayDetails:false
        })
        this.props.openCreated()
    }
    openDtailsTab() {
        this.setState({
            showDetails: !this.state.showDetails,
        })
    }
    reStoreDefault = () => {
        if(this.props.screenAction!==null){
        confirmAlert({
            title: "Are you sure?",
            message: "You won't be able to revert this!",
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.handleConfirm()
              },
              {
                label: 'No',
                onClick: () => this.handleCancel()
              }
            ]
          }) 
        }
        else{
            this.handleConfirm()
        }
    }
    shareFullScreenShare() {
        this.setState({ showDetails: false, })
        if (!this.state.displayDetails) {
            this.setState({
                displayDetails: true
            })
            localStorage.setItem('issueId', null)
            this.props.displayFullScreShare()
        }
        else {
            this.setState({
                displayDetails: false
            })
        }
    }
    recordFullScreen() {
        this.setState({ showDetails: false })
        if (!this.state.displayDetails) {
            this.setState({
                displayDetails: true
            })
            this.props.displayFullScrenRecord()
        }
        else {
            this.setState({
                displayDetails: false
            })
        }
    }
    saveVideoData(videoData, audioData, isPublic, text, action) {
        var condition = this.props.issueId == null || this.props.issueId === undefined
        var issueId = (condition)?null:this.props.issueId;
        var imgData = "null";
        var items = {}
        const isquestion = (condition)?"true":"false"
        this.props.creatAnsProject(text, imgData, videoData, audioData, items, isquestion, issueId, isPublic, action)
    }

    handleConfirm(){
        this.props.resetCallAction();
        this.props.restAllToolValue();
        this.props.cancelSuccess();
        this.setState({
            openExplain: false,
            displayDetails: false
        })
    }
    explainTool = (e) => {
        if (this.props.isAauthenticated) {
            this.props.setIssueId(e.target.id)
            localStorage.setItem("issueId", e.target.id)
            window.open(config.react_url + '/explainIt', "_blank")
        }
        else {
            Swal.fire(
                'You should login'
            )
        }
    }

    render() {
        var sharabeLink = config.react_url + "/" + this.props.authTwitterHandle;
        if(this.props.authTwitterHandle===this.props.match.params.encrTwitterHandle)
            this.props.history.push("/");
        var homeProjects =null;
        const twiHand = this.props.match.params.encrTwitterHandle.replace("@","")
        var issuepercentage = "100%";
        var percentage="30%";
        var shareRecord = null;
        const nav=(this.state.reducedWidth)?(<MobNav page={config.VISIT_PROFILE_PAGE}/>):(<Navbar  page={config.VISIT_PROFILE_PAGE}
            twitterHandle={twiHand} />)
        const callNotificationDiv = (<CallNotification
            endedCallFromOtherPeer={this.state.endedCallFromOtherPeer}
            socket={this.state.socket} />);

        if(this.state.reducedWidth)
        percentage="90%";

            if (!this.props.inbox && !this.props.created && !this.props.participated) {
                if (this.props.screenAction === FULL_SCREEN_RECORD) {
                    shareRecord = (<FullScreenRecord
                        socket={this.state.socket}
                        closeImidiate={this.handleConfirm}
                        reStoreDefault={this.reStoreDefault}
                        savefile={this.saveVideoData}
                    />)
                }
                else if (this.props.screenAction === FULL_SCREEN_SHARE) {
                    shareRecord = (<FullScreenShare
                        toggleInbox={this.toggleInbox}
                        socket={this.state.socket}
                        closeImidiate={this.handleConfirm}
                        reStoreDefault={this.reStoreDefault}
                        savefile={this.saveVideoData}
                    />)
                }
                else {
                    shareRecord = (null)
                }
            }
            
        const activityDiv = (this.state.displayDetails) ? (
            <div style={{ width: percentage, margin:"auto",marginTop: "-25px"}}>
                {shareRecord}
            </div>
        ) : (null)


         const details = (this.state.showDetails) ?((this.props.inbox || this.props.created || this.props.participated)?(
            null
        ):(  <div style={{ marginTop: "-25px"}}>
             <Profile isHome ={this.state.isHome}/>
             </div>)):(null)
        var issuesCreated = this.props.myissues;

        var self = this
        window.addEventListener('storage', function (event) {
            if (event.key === 'token') {
                self.reloadPage()
            }
        })
        const setting = (this.props.settings)?(<Setting />):(null)
        var feedDiv = null;
        var loginButton = (this.props.isAauthenticated)?
        (null):((this.props.created || this.props.participated)? (null):(<TwitterLogin className="buttonDark twitterButton" loginUrl={config.base_dir+"/api/twitter/auth/twitter"}
        onFailure={this.props.twitterAuthFailure} onSuccess={this.props.signInWithTwitter}
        requestTokenUrl={config.base_dir+"/api/twitter/auth/twitter/reverse"} />))
     
            if (this.props.created ) {
                var createdDiv = (this.state.typeOfView === "list") ? (
                    <div className="issueContainer" style={{width:issuepercentage}}>
                    <div className="closeBtnHolder">
                    </div>
                    <IssueDisplay socket={this.state.socket} togglemodal={this.togglemodal} home={config.NOT_HOME} explainTool={this.explainTool} issueArray={(issuesCreated)} />
                </div>
                ):(
                    <div className="issueContainerMore" >
                    <div className="closeBtnHolder">
                    </div>
                    <DisplatCreated socket={this.state.socket}   home={config.NOT_HOME} issueArray={(issuesCreated)} />
                </div>
                )
                feedDiv = (<div>
                        {/* <div style={{ textAlign: "right" }}>
                            <span className="hint--top" aria-label="List View">
                            <FiList onClick={this.changeViewToList} className="listView"/>
                            </span>
                            <span className="hint--top" aria-label="Grid View">
                            <FiGrid onClick={this.changeViewToGrid} className="gridView"/>
                            </span>
                        </div> */}
                       {createdDiv}
                       </div>)
            }
            if (this.props.participated) {
                var participatedDiv = (this.state.typeOfView === "list") ? (
                    <div className="issueContainer" style={{ width: issuepercentage }} >
                        <div className="closeBtnHolder">
                        </div>
                        <IssueDisplay togglemodal={this.togglemodal} home={config.NOT_HOME} explainTool={this.explainTool} issueArray={this.props.participatedIssues} />
                    </div>
                ) : (<div className="issueContainer" style={{ width: "80%" }} >
        
                    <div className="closeBtnHolder">
                    </div>
                    <DisplatCreated home={config.NOT_HOME} issueArray={this.props.participatedIssues} />
                </div>)
                feedDiv = (
                    <div>
                    {/* <div style={{ textAlign: "right" }}>
                         <span className="hint--top" aria-label="List View">
                         <FiList onClick={this.changeViewToList} className="listView"/>
                         </span>
                         <span className="hint--top" aria-label="Grid View">
                         <FiGrid onClick={this.changeViewToGrid} className="gridView"/>
                         </span>
                     </div> */}
                     
                     {participatedDiv}
                     </div>)

            }
            if (this.props.screenAction === SCREEN_RECORD ||
                this.props.screenAction === SCREEN_SHARE ||
                this.props.participated ||
                this.props.inbox ||
                this.props.settings ||
                this.props.created) {
                var profileCardElement = null;
                homeProjects =null;
            }
            else {
              
               
                if(this.props.userId!==null){

                    profileCardElement = (  <ProfileCard
                    currentAtionStatus={this.state.currentAtionStatus}
                    isHome={this.state.isHome}
                    sharabeLink={sharabeLink}
                    toggleInbox={this.toggleInbox}
                    socket={this.state.socket}
                    userId={this.props.userId}
                    saveVideoData={this.saveVideoData}/>);
                homeProjects = ( <div className="issueContainer" style={{width:issuepercentage}}>
    
                <HomeProjects socket={this.state.socket} home={config.NOT_HOME}  issueArray={this.props.myissues} />
            </div>)


                //   profileCardElement = (
                //     <div className="ProfileDiv"><ProfileCard
                //     openDtailsTab={this.openDtailsTab}
                //     isHome={this.state.isHome}
                //     toggleInbox={this.toggleInbox}
                //     shareFullScreenShare={this.shareFullScreenShare}
                //     recordFullScreen={this.recordFullScreen}
                //     userId={this.props.userId}
                //     toggleCreatedIssue={this.toggleCreatedIssue}
                //     toggleParticipatedIssue={this.toggleParticipatedIssue} />
                //     </div>
                // )
                }
            }
    
        // var self = this
        
        return (this.props.authAction)?(
            (!!this.props.fetchProfile)?(
            (!!this.props.isPresentInExplain)?(
            <div className="fullHome">
                {nav}
               
                
                <div className="containerHome">
                {callNotificationDiv}
                    <div>
                        {profileCardElement}
                    </div>
                    <div className="twitterBtnDiv">
                   {loginButton}
                    </div>
                    <div>
                        {setting}
                    </div>
                    <div>
                        {feedDiv}
                    </div>
                    
                    {/* <div>
                        {details}
                    </div> */}
                    <div>
                        <AddtoContact contactid = {this.props.userId} />
                    </div>
                    {homeProjects}
                </div>
           

            </div>):(
                (this.props.doneGettingId)?(
                    (this.props.profilePresentOnTwitter)?(
                    <ProfileNotOnExplain
                    isVisitProfile={this.state.isVisitProfile}
                    twitterhandle={this.props.match.params.encrTwitterHandle}
                    source={config.VISIT_PROFILE_PAGE} />
             ):(
                 <PageNotFount />
             )
            ):(null)
               
            )
        ):(null)

               ):(null)
    }
}
NewHome.PropType = {
    fetchIssues: PropType.func.isRequired,
    issues: PropType.array.isRequired,
    fetchProjectbyIssue: PropType.func.isRequired,
    setIssueId: PropType.func.isRequired,
    getProfileDetails: PropType.func.isRequired,
    saveExtensionDetails: PropType.func.isRequired,
    saveSourceId: PropType.func.isRequired,
    restAllToolValue:PropType.func.isRequired,
    cancelSuccess:PropType.func.isRequired,
    getProfileByTwitterHandle:PropType.func.isRequired,
    openParticipated:PropType.func.isRequired,
    openCreated:PropType.func.isRequired,
    getRecpientId :PropType.func.isRequired,
    twitterAuthFailure: PropType.func.isRequired,
    signInWithTwitter: PropType.func.isRequired,
    openInbox:PropType.func.isRequired
};
const mapStateToProps = state => ({
    issues: state.issues.items,
    screenAction: state.tools.screenAction,
    newissueIem: state.issues.newissueIem,
    isAauthenticated: state.auth.isAuthenticated,
    profileid : state.auth.id,
    profilePic: state.auth.profilePic,
    userName: state.auth.userName,
    myissues: state.profile.myIssues,
    participatedIssues: state.profile.participatedIssue,
    twitterHandle :state.profile.twitterHandle,
    authTwitterHandle:state.auth.twitterHandle,
    email: state.auth.email,
    userId: state.visitProfile.id,
    fetchProfile:state.visitProfile.fetchProfile,
    isPresentInExplain:state.visitProfile.isPresent,
    participated : state.nav.openParticipated,
    created : state.nav.openCreated,
    inbox:state.nav.openInbox,
    settings:state.nav.openSetting,
    authAction:state.auth.authAction,
    doneGettingId : state.twitterApi.doneFetching,
    twitterId : state.twitterApi.twitterId,
    profilePresentOnTwitter:state.twitterApi.profilePresent,
    isSceenSharing: state.tools.isFullScreenSharing,
    isFullScreenRecording: state.tools.isFullScreenRecording,
    callAction: state.call.callAction,




})

// import {  } from '../../../actions/callAction';
export default connect(mapStateToProps, {openInbox,missCall,acceptCallDetails,resetCallAction,creatAnsProject,setVisitProfile,twitterAuthFailure,displayFullScrenRecord, displayFullScreShare,signInWithTwitter, restAllToolValue,getRecpientId, openCreated, openParticipated, getProfileByTwitterHandle,fetchIssues, cancelSuccess, saveExtensionDetails, saveSourceId, fetchProjectbyIssue, setIssueId, getProfileDetails, clearAnswers, stillAuthenicated })(NewHome)
