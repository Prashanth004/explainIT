import React, { Component } from 'react'
import '../../css/newlanding.css'
import Navbar from './Navbar'
import socketIOClient from "socket.io-client";
import { Redirect } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { Button, Modal, ModalBody } from 'reactstrap';
import IssueDetils from '../../issueModal'
import { connect } from 'react-redux';
import { SCREEN_SHARE, SCREEN_RECORD } from '../../../actions/types';
import CopyToClipboard from '../CopytoClipboard'
import Explain from './Explainit'
import { setIssueId } from '../../../actions/issueActions';
import { fetchProjectbyIssue, clearAnswers } from '../../../actions/projectActions';
import { stillAuthenicated } from '../../../actions/signinAction';
import { getProfileDetails } from '../../../actions/profileAction'
import PropType from 'prop-types';
import LoginMadal from '../../LoginModal'
import Swal from 'sweetalert2'
import config from '../../../config/config'
import ProfileCard from './ProfileCard'
import IssueDisplay from './DisplayIssues'
import Content from './Content'
import { Animated } from "react-animated-css";
import { saveExtensionDetails, saveSourceId } from "../../../actions/extensionAction";
import { restAllToolValue } from "../../../actions/toolActions";
import { acceptCallDetails } from '../../../actions/callAction';
import { answerCall } from '../../../actions/callAction'



class NewHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalTool: false,
            openExplain: false,
            showCreatedIssue: false,
            showParticipatedIssue: false,
            showProjects: false,
            displayLink: false,
            isHome: true,
            socket: null

        }
        this.togglemodal = this.togglemodal.bind(this)
        this.explainTool = this.explainTool.bind(this)
        this.toggleModalCreate = this.toggleModalCreate.bind(this)
        this.toodleExplain = this.toodleExplain.bind(this);
        this.toggleCreatedIssue = this.toggleCreatedIssue.bind(this);
        this.toggleParticipatedIssue = this.toggleParticipatedIssue.bind(this);
        this.closeParticipated = this.closeParticipated.bind(this);
        this.reStoreDefault = this.reStoreDefault.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.toggleDisplayLink = this.toggleDisplayLink.bind(this);
        this.answerCall = this.answerCall.bind(this)

    }
    toggleDisplayLink() {
        this.setState({
            displayLink: !this.state.displayLink
        })
    }
    reloadPage() {
        window.location.reload();
    }


    closeParticipated() {
        this.setState({
            showProjects: false,
            showParticipatedIssue: false,
            showCreatedIssue: false,

        })
    }

    componentDidMount() {
        var self = this
        function postMessageHandler(event) {
            if (event.data.sourceId !== undefined) {
                console.log("We've got a message!");
                console.log("* Message:", event.data);
                console.log("* Origin:", event.origin);
                console.log("* Source:", event.source);
                console.log("*event.data.message__sourceId : ", event.data.sourceId)
                self.props.saveSourceId(event.data.sourceId)
            }

            if (event.data === 'rtcmulticonnection-extension-loaded') {
                console.log(" event.source :", event.source)
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

        var socket = this.state.socket
        console.log("sockets : ", socket)
        socket.on(config.LINK_TO_CALL, data => {
            console.log("data : ", data)
            if (data.ToUserId === this.props.userId) {
                this.props.acceptCallDetails(
                    data.link,
                    data.fromEmail,
                    data.fromUserName,
                    data.fromUserId,
                    data.fromProfilePic
                )
            }

        });


    }
    componentWillMount() {

        const socket = socketIOClient(config.base_dir);
        this.setState({
            socket: socket
        })

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
        var self = this
        this.setState({
            showProjects: true,
            showParticipatedIssue: false,

        })
        setTimeout(() => {
            self.setState({
                showCreatedIssue: true,
                openExplain: false
            })
        }, 200)
    }
    toggleParticipatedIssue() {
        var self = this
        this.setState({
            showProjects: true,
            showCreatedIssue: false,

        })
        setTimeout(() => {
            self.setState({
                showParticipatedIssue: true,
                openExplain: false
            })
        }, 200)
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
        console.log("e.target.id : ", e.target.id)

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
    answerCall(){
        window.open(this.props.callActionLink);
        this.props.answerCall();
    }


    
    handleCancel() {

    }
    reStoreDefault = () => {
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

    handleConfirm() {
        this.props.restAllToolValue();
        this.setState({
            openExplain: false
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
        var self = this
        var sharabeLink = config.react_url + "/profile/" + this.props.twitterHandle
        var deatilsModal = null
        var issuesCreated = this.props.myissues;
        var self = this
        var explainDiv = null;
        var feedDiv = null;

        window.addEventListener('storage', function (event) {
            if (event.key == 'token') {
                self.reloadPage()
            }
        })

        const callNotificationDiv = (this.props.incommingCall) ? (
            <div className="callNotification">
                <div>
                    <div className="callerProfileImage">
                        <img className="callerProfileImageElement" src={this.props.callerProfilePic}/>
                    </div>
                </div>
                <div>
                    <p>{this.props.callerName}</p>
                    <p onClick={this.answerCall}>click to answer</p>
                </div>
            </div>
        ) : (null)

        deatilsModal = (<IssueDetils />)


        if (this.props.isAauthenticated) {
            if (this.state.openExplain) {
                explainDiv = (<Explain reStoreDefault={this.reStoreDefault} />)
            }
            if (this.state.showCreatedIssue) {
                feedDiv = (
                    <Animated animationIn="slideInLeft" animationOut="zoomOut" isVisible={this.state.showCreatedIssue}>
                        <div className="issueContainer" >
                            <div className="closeBtnHolder">
                                <Button close onClick={this.closeParticipated} />
                            </div>
                            <IssueDisplay togglemodal={this.togglemodal} explainTool={this.explainTool} issueArray={issuesCreated} />
                        </div>
                    </Animated>)
            }
            if (this.state.showParticipatedIssue) {
                feedDiv = (
                    <Animated animationIn="slideInRight" animationOut="zoomOut" isVisible={this.state.showParticipatedIssue}>

                        <div className="issueContainer" >

                            <div className="closeBtnHolder">
                                <Button close onClick={this.closeParticipated} />
                            </div>
                            <IssueDisplay togglemodal={this.togglemodal} explainTool={this.explainTool} issueArray={this.props.participatedIssues} />
                        </div>
                    </Animated>)

            }
        }
        if (this.props.isAauthenticated) {
            if (this.props.screenAction === SCREEN_RECORD ||
                this.props.screenAction === SCREEN_SHARE ||
                this.state.showParticipatedIssue ||
                this.state.showCreatedIssue) {
                var profileCardElement = null
            }
            else {
                if (this.state.displayLink) {
                    var displayLinkDiv = (<div className="sharableLinkSection">
                        <p>Your sharabel Link</p>
                        <CopyToClipboard sharablelink={sharabeLink} />
                    </div>)
                }
                else {
                    var displayLinkDiv = null
                }
                if (this.state.openExplain) {
                    var explainItBtn = null
                }
                else {
                    var explainItBtn = (<button className="buttonDark explainBtn" onClick={this.toodleExplain}>Explain</button>)
                }

                var profileCardElement = (
                    <div className="ProfileDiv"><ProfileCard
                        isHome={this.state.isHome}
                        userId={this.props.userId}
                        toggleDisplayLink={this.toggleDisplayLink}
                        toggleCreatedIssue={this.toggleCreatedIssue}
                        toggleParticipatedIssue={this.toggleParticipatedIssue} />
                        {displayLinkDiv}
                        {explainItBtn}
                    </div>
                )
            }
        }
        else {
            var profileCardElement = (<Content />)
        }

        return ((this.props.isAauthenticated) ? (
            <div className="fullHome">
                <Navbar />

                <div className="containerHome">
                    {callNotificationDiv}
                    <div>
                        {profileCardElement}
                    </div>
                    <div >
                        {explainDiv}
                    </div>
                    <div>
                        {feedDiv}
                    </div>
                </div>

                <Modal isOpen={this.state.modal} toggle={this.togglemodal} className={this.props.className}>
                    <ModalBody className="modalBody">
                        {deatilsModal}
                    </ModalBody>
                </Modal>
            </div>
        ) : (<Redirect to={{ pathname: './login' }} />))


    }
}
NewHome.PropType = {
    issues: PropType.array.isRequired,
    fetchProjectbyIssue: PropType.func.isRequired,
    setIssueId: PropType.func.isRequired,
    getProfileDetails: PropType.func.isRequired,
    saveExtensionDetails: PropType.func.isRequired,
    saveSourceId: PropType.func.isRequired,
    restAllToolValue: PropType.func.isRequired,
    acceptCallDetails: PropType.func.isRequired,
    answerCall:PropType.func.isRequired
};
const mapStateToProps = state => ({
    issues: state.issues.items,
    screenAction: state.tools.screenAction,
    newissueIem: state.issues.newissueIem,
    isAauthenticated: state.auth.isAuthenticated,
    profilePic: state.auth.profilePic,
    userName: state.auth.userName,
    myissues: state.profile.myIssues,
    participatedIssues: state.profile.participatedIssue,
    twitterHandle: state.profile.twitterHandle,
    email: state.auth.email,
    userId: state.auth.id,
    callerName: state.call.userName,
    callerProfilePic: state.call.profilePic,
    callActionLink: state.call.link,
    incommingCall: state.call.incommingCall
})

export default connect(mapStateToProps, {answerCall, restAllToolValue, acceptCallDetails, saveExtensionDetails, saveSourceId, fetchProjectbyIssue, setIssueId, getProfileDetails, clearAnswers, stillAuthenicated, fetchProjectbyIssue, setIssueId })(NewHome)
