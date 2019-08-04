import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import DisplatCreated from './diaplyissues/DisplayCreated';
import { Redirect } from 'react-router-dom';
import IssueDisplay from './diaplyissues/DisplayIssues';
import config from '../../../config/config';
import { FiGrid, FiList } from "react-icons/fi";
import Activity from './Activies/indexActivity';
import Setting from './newNav/setting';
import CallNotification from './container/CallNotification';
import { stillAuthenicated } from '../../../actions/signinAction';
import { getAllActivities } from '../../../actions/callAction'
import { openInbox, openCreated } from "../../../actions/navAction";
import { getProfileDetails } from '../../../actions/profileAction';
import MobNav from './newNav/index'
import { getProfileByTwitterHandle, setVisitProfile } from "../../../actions/visitProfileAction";
import {initiateSocket} from '../../../actions/homeAction'

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = { typeOfView: "list",socketinitiated:false,
         gotAllActivity: false, reducedWidth: false, reducedLittleWidth: false };
        this.resize = this.resize.bind(this);
        this.getAllActivitiesLoc = this.getAllActivitiesLoc.bind(this);
        this.changeViewToList = this.changeViewToList.bind(this);
        this.initiateSocketLoc = this.initiateSocketLoc.bind(this);
    }
    initiateSocketLoc(){
        console.log("initiating socket");
        this.props.initiateSocket();
        this.setState({socketinitiated : true});
    }
    resize() {
        this.setState({ reducedWidth: window.innerWidth <= 700 });
        this.setState({ reducedLittleWidth: window.innerWidth <= 1200 });
        if (window.innerWidth <= 700) {
            this.setState({ issuepercentage: "100%" })
        } else {
            this.setState({ issuepercentage: "59%" })
        }
    }
    changeViewToList() {
        if (this.state.typeOfView === "list") {
            this.setState({ typeOfView: "grid" })
        }
        else {
            this.setState({ typeOfView: "list" })
        }
    }
    componentWillUnmount() {
        window.removeEventListener('storage', this.reloadPage)
        window.removeEventListener("resize", this.resize());
    }
    componentWillMount() {
        console.log(" var urlPath =window.location.pathname : ", window.location.pathname);
        var arrayDeCons = (window.location.pathname).split('/');
        console.log("arrayDeCons : ", arrayDeCons);
        if (arrayDeCons[1] === "activities") {
            console.log("it is home page")
            this.setState({ isHome: true })
            if (!this.props.created)
                this.props.openInbox();
        }
        else {
            const twiHand = arrayDeCons[1].replace("@", "");
            this.setState({ isHome: false })
            this.props.openCreated();
            this.props.setVisitProfile(twiHand);
            this.props.getProfileByTwitterHandle(twiHand)
            localStorage.setItem("peerId", JSON.stringify(twiHand))
        }

        this.props.stillAuthenicated()


    }



    getAllActivitiesLoc() {
        this.props.getAllActivities();
        if (this.state.isHome)
            this.props.getProfileDetails(this.props.userId, config.SELF);
        else
            this.props.getProfileDetails(this.props.profileid, config.VISIT_PROF);
        this.setState({ gotAllActivity: true })
    }
    reloadPage(event) {
        if (event.key === 'token') {
            window.location.reload();
        }

    }
    componentDidMount() {

        window.addEventListener('storage', this.reloadPage)
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
        var socket = this.props.socket;
        console.log("socket before if : ",socket);
        if(socket!==null){
        
            socket.on(config.SAVED_NEW_PROJECT, data => {
                console.log("getting all the stuff")
                if (data.userId === this.props.userId) {
                    this.props.getProfileDetails(this.props.userId, config.SELF)
                }
            })

            socket.on(config.NEW_MESSAGE, data => {
                console.log("getting all the stuff")
                console.log("data.touser : ",data.touser);

                console.log("data.fromuser : ",data.fromuser);
                console.log("this.props.userId) : ",this.props.userId);
                if (data.touser === (this.props.userId) || data.fromuser === (this.props.userId)) {
                  
                    this.props.getAllActivities()
                }
            })
        }
    }
    render() {
        if(this.props.socket === null && !this.state.socketinitiated){
            this.initiateSocketLoc();
        }
        const issuepercentage = this.state.reducedWidth ? "100%" : "59%";
        var feedDiv = null;
        const callNotificationDiv = (<CallNotification />)
        const nav = (this.state.reducedWidth) ? (<MobNav page={!this.state.isHome ? config.VISIT_PROFILE_PAGE : config.HOME_PAGE} />) : (<Navbar page={!this.state.isHome ? config.VISIT_PROFILE_PAGE : config.HOME_PAGE} />)
        console.log()
        if (this.props.allprojects === null && this.props.userId !== null && !this.state.gotAllActivity) {
            if (this.state.isHome)
                this.getAllActivitiesLoc();
            else if (this.props.profileid !== null) {
                this.getAllActivitiesLoc();
            }
        }
        if (this.props.myissues !== null)
            var issuesCreated = (this.props.myissues)

        var listGrid = (window.innerWidth >= 1000) ? (<div style={{ position: "fixed", top: "90px", right: "30px" }} >
            <span className="hint--top" aria-label="List View">
                <FiList onClick={this.changeViewToList} className="listView" />
            </span>
            <span className="hint--top" aria-label="Grid View">
                <FiGrid onClick={this.changeViewToList} className="gridView" />
            </span>
        </div>) : (null);
        if ((this.props.participated || this.props.created)) {
            var participatedDiv = (this.state.typeOfView === "list") ? (

                <div className="issueContainer" style={{ width: issuepercentage }} >
                    <IssueDisplay home={config.HOME} />
                </div>
            ) : (<div className="issueContainer" style={{ width: "80%" }} >

                <div className="closeBtnHolder">
                </div>
                <DisplatCreated home={config.HOME} issueArray={(this.props.participated) ? this.props.participatedIssues : issuesCreated} />
            </div>)
            feedDiv = (<div>
                {listGrid}
                {participatedDiv}
            </div>)
        }

        else if (this.props.inbox) {
            feedDiv = (<div >
                <Activity userId={this.props.userId} />
            </div>)
        }
        else if (this.props.Setting) {
            feedDiv = (<Setting userId={this.props.userId} />)
        }


        return (this.props.authAction ? ((!this.props.isAauthenticated) ? (<Redirect to={"../"} />) : (
            ((this.props.gotAllActivities) ? (
                <div>
                    {nav}
                    <div className="containerHome">
                        {callNotificationDiv}
                        </div >

                            {feedDiv}
                        </div>
                        ):(null)))):(null))
                    }
                }
const mapStateToProps= state => ({
                            myissues: state.profile.myIssues,
                        participated: state.nav.openParticipated,
                        inbox: state.nav.openInbox,
                        authAction: state.auth.authAction,
                        isAauthenticated: state.auth.isAuthenticated,
                        home:state.nav.openHome,
                        profileid: state.visitProfile.id,
                        created: state.nav.openCreated,
                        allprojects:state.profile.myIssues,
                        participatedIssues: state.profile.participatedIssue,
                        userId: state.auth.id,
                        Setting: state.nav.openSetting,
                        gotAllActivities :state.call.gotAllActivities,
                        socket:state.home.socket
                    })
export default connect(mapStateToProps,{openInbox,getAllActivities,openCreated,initiateSocket,
      getProfileDetails,stillAuthenicated,getProfileByTwitterHandle,setVisitProfile})(Posts)