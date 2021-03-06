import React, { Component } from 'react'
import Countdown from 'react-countdown-now';
import RecordRTC from 'recordrtc'
import Dummy from './dummy'
import {StartedRecording,
    stopedRcording,discardAfterRecord} from'../../../actions/toolActions'
import {connect} from 'react-redux';
import PropType from  'prop-types'; 
import CopyToClipboard from '../CopytoClipboard';
import '../../css/shareScreen.css'


export class ScreenRecorder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recorder: null,
            downloadUrl:null,
            audioStream: null,
            canvasStream: null,
            blob: null,
            finalStream: null,
            percentage:"0%",
            copyStatus:"copy link",
            saveBtnClicked:false
        }
        this.recordScreenStop = this.recordScreenStop.bind(this);
        this.renderer = this.renderer.bind(this);
        this.startBar =  this.startBar.bind(this);
        this.startRecoding = this.startRecoding.bind(this);
        this.toggle = this.toggle.bind(this);
        this.savefile = this.savefile.bind(this);
        this.discardChanges = this.discardChanges.bind(this);
    }

    startRecoding(){
        var self = this
        this.props.StartedRecording();
        var mainBtn = document.querySelector('.mainBtn');
        mainBtn.style.backgroundColor="rgb(133, 39, 39)";
        this.convey.innerText="Stop"
        navigator.mediaDevices.getUserMedia({ audio: true }).then(function (audioStream) {
            var finalStream = new MediaStream();
            window.getTracks(audioStream, 'audio').forEach(function (track) {
                finalStream.addTrack(track);
            });
            var canvasStream = " "
            var canvas = document.querySelector('canvas');
            canvasStream = canvas.captureStream(25);
            window.getTracks(canvasStream, 'video').forEach(function (track) {
                finalStream.addTrack(track);
            });
            var recorder1 = RecordRTC(finalStream, {
                type: 'video'
            });
            recorder1.startRecording();
            self.setState({
                recorder:recorder1,
                audioStream: audioStream,
                canvasStream: canvasStream,
                finalStream: finalStream
            })
            self.props.startDraw()      
           
        }).catch(err => {
            console.log("error ouucres : ", err)
        })
    }
    
    startBar(){
       var self = this;
        var progressbar = document.querySelector('#pbar');
        var progresDiv = document.querySelector(".progresDiv")
        progresDiv.style.display = "block";
        var width = 0;
        var id = setInterval(frame, 2000);
        function frame() {
          if (width >= 100) {
            clearInterval(id);
          } else {
            width= width+(100/90); 
            progressbar.style.width=width+'%';
                  }
        }   
    }

    renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            this.recordScreenStop()
            return (<Dummy></Dummy>)

        } else {
            return <span>{hours}:{minutes}:{seconds}</span>;
        }
    };
    discardChanges(){
        this.props.clearCanvas();
        this.props.discardAfterRecord();

    }
    // copyToClipboard(){
    //     var copyText = document.querySelector('.myInput');
    //     copyText.select();
    //     document.execCommand("copy");
    //     this.setState({
    //         copyStatus:"link copied"
    //     })
    // }

    toggle(){
        if(this.props.isScreenRecording){
            this.recordScreenStop()
        }
        else{
            this.startRecoding()
        }
    }
    savefile(){
        this.setState({
            saveBtnClicked :  true
        })
    this.props.savefile(this.state.blob)

}
    recordScreenStop() {
        var self = this;
        var recordingElements= null;
        var recorder1 = this.state.recorder;
        var audioStream = this.state.audioStream;
        var canvasStream = this.state.canvasStream;
        if (recorder1) {
            recorder1.stopRecording(function () {
                var blob = recorder1.getBlob();
                self.setState({
                    downloadUrl: URL.createObjectURL(blob),
                    blob: blob
                })
                audioStream.stop();
                canvasStream.stop();
                self.props.stopedRcording()
            });
        }
       
        this.setState({
            recorder: null,
            audioStream: null,
            canvasStream: null,
        })
    }

    render() {
        var recordingEle = null;
        var recordingElements = null;
        var videoplayer = null;
        var linkElement = null;
        var convey = (<p ref={a=>this.convey=a}>Start</p>)
        var postShareElements = null
       
        if (this.state.downloadUrl) {
            videoplayer = (<video src={this.state.downloadUrl} controls={true}></video>)
           
        }
     

        if (this.props.isScreenRecording) {
            this.startBar()
            var timer = (<Countdown
                date={Date.now() + 180000}
                renderer={this.renderer}
            />)
            recordingEle = ( <p>Recording Screen</p>)
        }
        if(!this.props.isScreenRecording){
        recordingEle = ( null)
        }
        if(this.props.isRecordingCompleted ===false){
        recordingElements = (<div>
            <div className="progresDiv">
                 <div  className="progress" id="pbar" ></div>
             </div>
             {timer}
             {recordingEle}
            
             <div className="btDiv">
                     <button className="mainBtn" onClick={this.toggle}></button>
             </div>
             <div className="convey">
                 {convey}
             </div>
             </div>
        )
    }
        else{
            recordingElements = null;
        }
    
       
        // var timer = null;
        if(this.props.isRecordingCompleted === true && !this.state.saveBtnClicked  && this.props.isSaved===false){
            postShareElements= (<div className = "postRecord">
            {videoplayer}
                 <p>Do you want to save it?</p>
                 <button onClick={this.savefile} className="buttonLight save">
                   Save
                 </button>
                 <button onClick={this.discardChanges} className="buttonDark save">
                     Discard
                 </button>
             </div>)
         }
         else if(this.props.isSaved){
            // elseif {
            postShareElements= (<div className = "postRecord">
            
                 <p>Link to access your saved project</p>
                 <CopyToClipboard sharablelink = {this.props.sharablelink} />

             </div>)

         }
         else if(this.state.saveBtnClicked && !this.props.isSaved){
            postShareElements= (<div>
                 <p>Save processing..</p>
             </div>)
         }
       
        if (this.state.shareScreenLink) {
            linkElement = (<p>{this.state.shareScreenLink}</p>)
        }
        return (
            <div>
               {recordingElements}
                {postShareElements}
            </div>
        )
    }
}
ScreenRecorder.PropType={
    StartedRecording : PropType.func.isRequired,
    stopedRcording :PropType.func.isRequired,
    discardAfterRecord :PropType.func.isRequired,
    
}
const mapStateToProps = state =>({
    isScreenRecording :state.tools.isScreenRecording,
    isRecordingCompleted : state.tools.isRecordingCompleted,
    isSaved :state.issues.successCreation,
    newProject:state.issues.newissueItem,
    sharablelink : state.issues.sharablelink
}) 

export default connect(mapStateToProps,{StartedRecording,discardAfterRecord, stopedRcording})(ScreenRecorder)

