import React from 'react';
import config from '../../../config/config';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { FiMail, FiSettings, FiArrowLeft } from "react-icons/fi";
import '../../css/nav.css';
import { Redirect } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { toggleHowWorksModal } from '../../../actions/modalAction'
import '../../css/issueDetails.css';
import { FiPower } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import { stillAuthenicated, signout } from '../../../actions/signinAction';
import { signInWithGoogle, twitterAuthFailure, signInWithTwitter } from '../../../actions/signinAction';
import { openHome, openInbox, openCreated, openParticipated } from '../../../actions/navAction'

class Navigationbar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isViewPage: false,
      isProjectPage: false,
      optionVisibe: "hidden",
      isReceiver: false,
      openHomeRed: false,
      openHomeRedVisit: false
    };
    this.googleResponse = this.googleResponse.bind(this);
    this.handleGit = this.handleGit.bind(this);
    this.openHome = this.openHome.bind(this);
    this.openParticipated = this.openParticipated.bind(this);
    this.openCreated = this.openCreated.bind(this);
    this.openVisitHome = this.openVisitHome.bind(this);
    this.logout = this.logout.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
  }

  logout = () => {
    const message = this.props.isSceenSharing ? "The call will get disconnected" : "The ongoing screen recording will end"
    if ((this.props.isSceenSharing || this.props.isFullScreenRecording)) {

      confirmAlert({
        title: "Are you sure?",
        message: message,
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
    else {
      this.handleConfirm()
    }
  }
  handleCancel = () => {

  }
  handleConfirm() {
    this.props.signout()
  }
  componentWillMount() {
    const { stillAuthenicated, page } = this.props
    stillAuthenicated();

    if (page !== undefined) {
      if (page === config.VISIT_PROFILE_PAGE) {
        this.setState({ isViewPage: true });
      }

      if (page === config.PEOJECT_PAGE)
        this.setState({ isProjectPage: true });
      if (page === "share")
        this.setState({ isReceiver: true })
    }

  }
  openParticipated() {
    this.props.openParticipated()
    this.setState({ state: this.state });
  }
  openCreated() {
    this.props.openCreated()
    this.setState({ state: this.state });
  }
  openHome() {
    var urlPath = window.location.pathname;
    const { isViewPage } = this.state;
    const { isSceenSharing, isFullScreenRecording, openHome, authTwitterHandle } = this.props;
    if ((urlPath).includes('activities')) {
      if (!isViewPage)
        this.setState({ openHomeRed: true })
      else
        this.setState({ openHomeRedVisit: true })

    }
    else {
      if (isSceenSharing || isFullScreenRecording)
        window.open(config.react_url + '/@' + authTwitterHandle, '_blank');
      else if ((urlPath).includes('share'))
        window.open(config.react_url + '/@' + authTwitterHandle, '_self')
      else {
        if (isViewPage || (urlPath).includes('project'))
          window.open(config.react_url + '/@' + authTwitterHandle, '_self')

        else
          openHome();



      }

    }
  }

  handleGit() {
    var url = `https://github.com/login/oauth/authorize?client_id=${config.gitHubClientId}&scope=user&redirect_uri=${config.react_url_git}`
    window.open(url, '_self')
  }
  googleResponse(response) {
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });
    this.props.signInWithGoogle(tokenBlob)
  }
  toggleDropDown() {
    if (this.state.optionVisibe === "hidden")
      this.setState({ optionVisibe: "visible" })
    else {
      this.setState({ optionVisibe: "hidden" })
    }
  }
  openVisitHome() {

    window.open(config.react_url + "/" + this.props.twitterHandle, '_self')

  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const redirectComponent = (this.state.openHomeRed) ? (<Redirect to={"../"} />) : (this.state.openHomeRedVisit ? (<Redirect to={"./"} />) : (null));

    var buttonColor = {
      borderColor: "white",
      backgroundColor: "#2b8b8f",
      color: "white"
    }
    const homeColor = this.props.Home ? buttonColor : null;
    var navItem1 = null;
    var navItem2 = null;
    var navItem3 = null;

    var profileImage = null;

    if ((this.props.Created || this.props.Participated)
      && this.state.isViewPage
      && !this.props.isAuthenticated) {
      profileImage = (null);
    }
    else {
      profileImage = (this.props.authAction) ? (!this.props.isAuthenticated) ? (null) : (
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav style={{ marginTop: "50px" }} >
            <FiSettings style={{ fontSize: "20px" }} />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={this.logout}>
              <span  > Logout</span>
              <span>     </span>
              <span ><FiPower /></span>
            </DropdownItem>
            <DropdownItem onClick={this.props.toggleHowWorksModal}>
              <span> How it works</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>) : null
    }
    var navBack = null
    const Brand = (this.props.inbox || this.props.Created || this.props.Participated) ? (null) :
      (
        <span>
          <img alt="open home" src={require('../../images/logo5.png')}
            width="35px"
            height="35px"></img>
        </span>)

    if (!this.state.isViewPage && (this.props.Created || this.props.Participated || this.props.inbox) && !(this.state.isProjectPage || this.state.isReceiver || this.props.isSceenSharing || this.props.callAction || this.props.isFullScreenRecording)) {
      navBack = (<button className="nextButton" style={homeColor} onClick={this.openHome}><FiArrowLeft style={{ marginTop: "-2px", marginLeft: "0px", fontSize: "18px" }} /></button>)

      navItem1 = (<span onClick={this.props.openCreated} style={{ color: this.props.Created ? "#40a8ac" : "rgba(42, 42, 42, 0.837)" }}>Created</span>);
      navItem2 = (<div><span><FiMail onClick={this.props.openInbox} fontSize="25px" style={{ marginTop: "-2px", color: this.props.inbox ? "#40a8ac" : "rgba(42, 42, 42, 0.837)" }} /></span></div>)
      navItem3 = (<span onClick={this.props.openParticipated} style={{ color: this.props.Participated ? "#40a8ac" : "rgba(42, 42, 42, 0.937)" }}>Participated</span>);

    }
    else if (this.state.isProjectPage || this.state.isReceiver) {
      navItem1 = null;
      navItem2 = null;
      navItem3 = null;
    }
    else if (this.state.isViewPage && (this.props.Created || this.props.Participated || this.props.inbox) && !(this.state.isProjectPage || this.state.isReceiver || this.props.isSceenSharing || this.props.callAction || this.props.isFullScreenRecording)) {
      navBack = (<button className="nextButton" style={homeColor} onClick={this.openHome}><FiArrowLeft style={{ marginTop: "-2px", marginLeft: "0px", fontSize: "18px" }} /></button>)
      navItem1 = (<span onClick={this.props.openCreated} style={{ color: this.props.Created ? "#40a8ac" : "rgba(42, 42, 42, 0.637)" }}>Created</span>);
      navItem2 = (<div><span><img src={require('../../images/logo5.png')} onClick={this.openHome} width="28px" height="28px" alt="home"></img></span></div>)
      navItem3 = (<span onClick={this.props.openParticipated} style={{ color: this.props.Participated ? "#40a8ac" : "rgba(42, 42, 42, 0.637)" }}>Participated</span>);

    }
    const content = (<Navbar color="white" light expand="md" style={{ textAlign: "center", height: "65px" }}>
      <NavbarBrand >
        <div className="logoContainer" onClick={this.openHome}>
          {Brand}
        </div>
      </NavbarBrand>

      {/* gridTemplateColumns:"" */}
      <div style={{ display: 'grid', gridTemplateColumns: "27% 16.5% 16.5% 16.5%", width: "780px", margin: "auto" }}>
        <div>{navBack}</div>
        <div>{navItem1}</div>
        <div>{navItem2}</div>
        <div> {navItem3}</div>


      </div>
      <div style={{ width: "150px", textAlign: "right" }}>

        {profileImage}
      </div>
    </Navbar>)

    return (
      <div>
        {redirectComponent}
        {content}
      </div>
    );
  }
}



Navigationbar.PropType = {
  stillAuthenicated: PropType.func.isRequired,
  signout: PropType.func.isRequired,
  signInWithGoogle: PropType.func.isRequired,
  signInWithTwitter: PropType.func.isRequired,
  twitterAuthFailure: PropType.func.isRequired,
  openHome: PropType.func.isRequired,
  openCreated: PropType.func.isRequired,
  openParticipated: PropType.func.isRequired,
  openInbox: PropType.func.isRequired,
  toggleHowWorksModal: PropType.func.isRequired

};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.auth.userName,
  isSceenSharing: state.tools.isFullScreenSharing,
  isFullScreenRecording: state.tools.isFullScreenRecording,
  screenAction: state.tools.screenAction,
  totalUnread: state.message.totalInboxNumber,
  isSharingCompleted: state.tools.isSharingCompleted,
  isFullSharingCompleted: state.tools.isFullSharingCompleted,
  profilePic: state.auth.profilePic,
  logoutSuccess: state.auth.logoutSuccess,
  userId: state.auth.id,
  callAction: state.call.callAction,
  Home: state.nav.openHome,
  Created: state.nav.openCreated,
  inbox: state.nav.openInbox,
  Participated: state.nav.openParticipated,
  authAction: state.auth.authAction,
  otherprofilePic: state.profile.profilePic,
  authTwitterHandle: state.auth.twitterHandle,
})
export default connect(mapStateToProps, { openHome, toggleHowWorksModal, openInbox, openCreated, openParticipated, stillAuthenicated, signInWithGoogle, twitterAuthFailure, signInWithTwitter, signout })(Navigationbar)




