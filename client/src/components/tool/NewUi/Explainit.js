import React, { Component } from 'react';
import Form from '../Form';
import '../../css/explainit.css';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import ScreenShare from './ScreenShare'
import ScreenRecorder from './ScreenRecorder'
import FullScreenShare from './enitreScreenShare'
import FullScreenRecord from './FullScreenRecord'
import { SCREEN_SHARE, SCREEN_RECORD, FULL_SCREEN_SHARE, FULL_SCREEN_RECORD } from '../../../actions/types';
import Swal from 'sweetalert2';
import { setIssueId, cancelValidationErrors } from '../../../actions/issueActions'
import { creatAnsProject } from '../../../actions/projectActions'
import { displayFullScrenRecord, displayScrenRecord, displayFullScreShare, displayShareScreen } from '../../../actions/toolActions'

class Explainit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isInstalled: true,
      showRecordBtns: false,
      showShareBtns: false,
      reducedWidth:false
    }
    this.showErrorAlert = this.showErrorAlert.bind(this);
    this.showSuccessAlert = this.showSuccessAlert.bind(this);
    this.drawRect = this.drawRect.bind(this);
    this.savefile = this.savefile.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.shareFullScreenShare = this.shareFullScreenShare.bind(this);
    this.recordFullScreen = this.recordFullScreen.bind(this);
    this.saveVideoData = this.saveVideoData.bind(this);
    this.displayRecordBtn = this.displayRecordBtn.bind(this);
    this.displayShareBtn = this.displayShareBtn.bind(this);
    this.shareCanvasScreen = this.shareCanvasScreen.bind(this);
    this.recordCanvasScreen = this.recordCanvasScreen.bind(this);
    this.resize = this.resize.bind(this);
    this.openScreenShare = this.openScreenShare.bind(this)
  }
  // downloadExtension() {
  //   window.open(config.EXTENSION_URL, "_self")

  // }

  componentWillMount() {
 
  }


  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    var self = this
    this.setState({
      error:false,
      success:false
    })

  }

  resize(){
    this.setState({reducedWidth: window.innerWidth <= 700});
  }
  displayRecordBtn() {
    this.setState({
      showShareBtns: false,
      showRecordBtns: !this.state.showRecordBtns
    })
  }
  displayShareBtn() {
    this.setState({
      showRecordBtns: false,
      showShareBtns: !this.state.showShareBtns
    })
  }
  openScreenShare(){
    localStorage.setItem('issueId',null)
    this.props.screenShareWindow()
  }

  showErrorAlert() {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
   
    this.props.cancelValidationErrors()

  }
  shareCanvasScreen() {
    this.props.displayShareScreen()
  }
  recordCanvasScreen() {
    
    this.props.displayScrenRecord()
  }

  recordFullScreen() {
    this.props.displayFullScrenRecord()
  }
  shareFullScreenShare() {
    localStorage.setItem('issueId',null)
    this.props.displayFullScreShare()
  }

  clearCanvas() {
    this.child.clearAll();
  }

  savefile(data) {
    this.child.pushData(data);
  }
  // saveVideoData(data, isPublic,text) {
  //   console.log("the data whcih is gonna get saved : ", data)
  //   var issueId = JSON.parse(localStorage.getItem('issueId'))
  //   var textExplain = text
  //   var imgData = "null"
  //   var items = {}
  //   var isquestion = " "
  //   if (issueId == null || issueId === undefined) {
  //     isquestion = "true"
  //     issueId = null
  //   }
  //   else {
  //     isquestion = "false"
    
  //   }
  //   console.log("type of is public : ",typeof(isPublic))
  //   this.props.creatAnsProject(textExplain, imgData, data, items, isquestion, issueId,isPublic)
  // }
  saveVideoData(data,isPublic,text) {
    var issueId = null
    var textExplain = text
    var imgData = "null"
    var items = {}
    var isquestion = " "
    if (this.props.issueId == null || this.props.issueId === undefined) {
      isquestion = "true"
    }
    else {
      isquestion = "false"
      issueId = this.props.issueId
    }
    this.props.creatAnsProject(textExplain, imgData, data, items, isquestion, issueId,isPublic)
  }
  drawRect = () => {
    this.child.addReactFull();
  }
  showSuccessAlert() {

    Swal.fire({
      type: 'success',
      title: 'Successfully saved!',
      timer: 1500,
      showConfirmButton: false,

    })
  }
  render() {
    // var iframe = <Iframe url="https://explain.bookmane.in/sharescreen"
    // width="500px"
    // height="500px"
    // id="myId"
    // className="myClassname"
    // display="block"
    // scrolling="no"
    // style = {{overflow:"hidden"}}
    // position="relative"
    // />

    // allowFullScreen/>
   
   
    var percentage = "85%"
    var CanvasScreenButton = null;
    var formDiv = null;
    // if (this.state.showShareBtns) {
    //   CanvasScreenButton = (
    //     <div className="divRecordOrShare">
    //       <button className="buttonDark" onClick={this.shareCanvasScreen}>
    //         ShareCanvas
    //       </button>
    //       <button className="buttonDark" onClick={this.shareFullScreenShare}>
    //         ShareScreen
    //         </button>
    //     </div>
    //   )
    // }
    // else if (this.state.showRecordBtns) {
    //   CanvasScreenButton = (
    //     <div className="divRecordOrShare">
    //       <button className="buttonDark" onClick={this.recordCanvasScreen}>
    //         RecordCanvas
    //       </button>
    //       <button className="buttonDark" onClick={this.recordFullScreen}>
    //         RecordScreen
    //         </button>
    //     </div>
    //   )
    // }
    if (this.props.screenAction === SCREEN_RECORD ||
      this.props.screenAction === SCREEN_SHARE) {
        percentage = "85%";
      formDiv = (
        <div >
          <Form onRef={ref => (this.child = ref)} />
        </div>)
    }
    else {
      if (this.props.screenAction === FULL_SCREEN_SHARE ||
        this.props.screenAction === FULL_SCREEN_RECORD){
          formDiv = null
          if(this.state.reducedWidth || this.props.showCanvas || this.props.startSecodScreenShare){
            percentage = "100%";
          }
          else{
            percentage = "37%";
          }
        
        }
        else{
          if(this.state.reducedWidth || this.props.showCanvas || this.props.startSecodScreenShare){
           
            percentage = "100%";
          }
          else{
            percentage = "37%";
          }
        
          formDiv = (
            <div className="formContainer">
              <div className="imageBtns">
               
                <div className="RecordBtn">
                  <span className="hint--bottom" aria-label="Record screen!">
                    <img onClick={this.recordFullScreen} height="100%" width="100%" src={require('../../images/download.jpg')} />
                  </span>
                </div>
    
                <div className="screenShareBtn">
                  <span className="hint--bottom" aria-label="Share screen!">
                    <img alt="share screen"onClick={this.shareFullScreenShare} height="100%" width="100%" src={require('../../images/screensharing.png')} />
                  </span>
                </div>
              </div>
                {/* <button className="buttonLight" onClick={this.shareFullScreenShare}>Share Screen</button> */}
                {/* <button className="buttonLight" onClick={this.recordFullScreen}>Record Screen</button> */}
            
              <div>
                {/* {CanvasScreenButton} */}
              </div>
            </div>
          )

        }

    }




    if (this.props.error) {
      this.showErrorAlert()
    }
    // if (this.props.success) {
    //   this.showSuccessAlert()
    // }
    var shareElement = null;
    if (this.props.screenAction === SCREEN_SHARE) {
      shareElement = (
        <div className="shareControl">
          <ScreenShare 
          reStoreDefault={this.props.reStoreDefault}
          savefile={this.savefile} 
          startDraw={this.drawRect} />
        </div>)
    }
    else if (this.props.screenAction === SCREEN_RECORD) {
      shareElement = (
        <div className="shareControl">
          <ScreenRecorder clearCanvas={this.clearCanvas} savefile={this.savefile} startDraw={this.drawRect} />
        </div>)
    }
    else if (this.props.screenAction === FULL_SCREEN_SHARE) {
      shareElement = (<div className="shareControl">
      {/* {iframe} */}
        <FullScreenShare
        closeImidiate={this.props.closeImidiate}
        reStoreDefault={this.props.reStoreDefault}
          savefile={this.saveVideoData}
        />
      </div>)

    }

    else if (this.props.screenAction === FULL_SCREEN_RECORD) {
      shareElement = (<div className="shareControl">
        <FullScreenRecord
        closeImidiate={this.props.closeImidiate}
          reStoreDefault={this.props.reStoreDefault}
          savefile={this.saveVideoData}
        />
      </div>)
    }
   
    return(

      <div>
        {/* <div className="explainContainer"> */}

        {/* </div> */}
        <div className="explainContainer" style={{width : percentage}}>

       
          {formDiv}
          <div className="shareTime">

            <div className="shareElement">
              {shareElement}
            </div>

          </div>
        </div>
      </div>
    ) 
  }
}
Explainit.PropType = {
  setIssueId: PropType.func.isRequired,
  cancelValidationErrors: PropType.func.isRequired,
  displayFullScrenRecord: PropType.func.isRequired,
  displayFullScreShare: PropType.func.isRequired,
  creatAnsProject: PropType.func.isRequired,
  displayShareScreen: PropType.func.isRequired,
  displayScrenRecord: PropType.func.isRequired,



};
const mapStateToProps = state => ({
  error: state.issues.error,
  issueId: state.issues.currentIssueId,
  success: state.issues.successCreation,  
  screenAction: state.tools.screenAction,
  isSignedIn: state.auth.isAuthenticated,
  showCanvas:state.canvasActions.showCanvas,
  startSecodScreenShare: state.secondScreenShare.secondScreenShareStarted,


})
export default connect(mapStateToProps, { displayScrenRecord, displayShareScreen, creatAnsProject, setIssueId, displayFullScreShare, displayFullScrenRecord, cancelValidationErrors })(Explainit)

