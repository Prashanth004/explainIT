import React, { Component } from 'react'
import DisplayIssueTopBtns from './DisplayIssueTpBtns'
import ImagesOfExplainers from './DisplayExplained';
import CopyToClipboard from '../CopytoClipboard'
import config from '../../../config/config';
import '../../css/toggle.css';
import axios from 'axios';
import {explainIssue} from '../../../actions/messageAction'
import EditReason from './EditReason'
import ReactModal from 'react-modal';
import ExplainPage from './ExplainPage';
import { setIssueId } from '../../../actions/issueActions';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import ExplainedStories from './explainedStories';
import TwitterLogin from './TwitterLogin'
import { FiX } from "react-icons/fi";
import {openEditModal,closeEditModal} from '../../../actions/projectActions'
import { cancelAllMessageAction } from '../../../actions/messageAction';
import { restAllToolValue } from "../../../actions/toolActions";
import { resetValues } from '../../../actions/twitterApiAction'





class issueCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            answerProjects: [],
            DetailsOfPeople: [],
            showModalExplain: false,
            showModalTwitterLogin: false,
            showAllPeople: false,
            questionProject: [],
            publicStatus:"public",
            thisProjectId:null,
            textexplain:""
        }
        this.changeVideo = this.changeVideo.bind(this);
        this.openEditReason = this.openEditReason.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.toggleAllPeopleList = this.toggleAllPeopleList.bind(this);
        this.changepublicStatus = this.changepublicStatus.bind(this)
    }
    openEditReason(){
        this.setState({
            showModalEditReason:true
        })
    }
  
    changepublicStatus(status){
        this.setState({
            publicStatus:status
        })
    }
    componentDidMount(){
        this.setState({
            thisProjectId:this.props.issue.projectid,
            textexplain:this.props.issue.textexplain
        })
       var test =  this.videoExplain
        test.addEventListener("mouseenter", function( event ) { 
            test.setAttribute("controls", "");
        })
        test.addEventListener("mouseleave", function(){
            test.removeAttribute("controls");
        })
       
    }
    handleOpenModal(e) {
        if (this.props.isAauthenticated) {
            this.props.explainIssue()
            this.props.setIssueId(e.target.id)
            localStorage.setItem("issueId", e.target.id)
            this.setState({ showModalExplain: true });
        }
        else {
            this.setState({ showModalTwitterLogin: true });
        }

    }
    toggleAllPeopleList() {
        this.setState({
            showAllPeople: !this.state.showAllPeople
        })
    }

    handleCloseModal() {

        this.setState({ showModalExplain: false });
        this.setState({ showModalTwitterLogin: false });
        this.props.cancelAllMessageAction();
        this.props.restAllToolValue();
        this.props.resetValues();
    }
    changeVideo(e) {
        var clickedProj = this.state.answerProjects.find(proj => proj.projectid === e.target.id)
        if (clickedProj.videofilepath) {
            if (this.videoExplain) {
                this.videoExplain.src = clickedProj.videofilepath;
            }
        }

    }
    componentWillMount() {
        var self = this;
      
        var token = JSON.parse(localStorage.getItem('token'))
        axios({
            method: 'get',
            url: config.base_dir + '/api/project/issues/' + self.props.issue.issueid,
            headers: {
                "Authorization": token,
            }
        }).then((response) => {
            if (response.status === 200 || response.status === 304) {
                var allProjects = response.data.data

                if (allProjects.length !== 0) {
                    allProjects.forEach(function (projects, index) {
                        axios({
                            method: 'get',
                            url: config.base_dir + '/api/users/email/' + projects.email,
                        }).then(response => {
                            if (response.status === 200) {
                                const newTestJson = JSON.parse(JSON.stringify(allProjects));
                                newTestJson[index]['profilepic'] = response.data.data.profilepic;
                                newTestJson[index]['username'] = response.data.data.username;
                                newTestJson[index]['id'] = response.data.data.id
                                newTestJson[index]['twitterhandle'] = response.data.data.twitterhandle
                                allProjects = newTestJson
                                var answerProject = allProjects.filter(project => project.isquestion !=="true")
                                var questionProject = allProjects.filter(projects => projects.isquestion === 'true')
                                self.setState({
                                    answerProjects: answerProject,
                                    DetailsOfPeople: answerProject,
                                    questionProject: questionProject
                                })
                            }
                        })
                            .catch(err => {
                                console.log("error : ", err)
                            })
                    })
                }

            }
        })
            .catch(err => {
                console.log("error while fetchinf projects : ", err)
            })

    }
    render() {
        
        const twitterBird = (this.state.publicStatus !== "private")?(
            <span id={this.props.issue.issueid} className="hint--top" aria-label="Tweet it">

            <img alt="tweet" id={this.props.issue.issueid} width="100%" height="100%" onClick={this.props.tweetWindow} src={require('../../images/twitter.png')} />
        </span >
        ):(null)
        const bottomImages=(  <ImagesOfExplainers
            toggleAllPeopleList={this.toggleAllPeopleList}
                answerProjects={this.state.answerProjects}
                issueid={this.props.issue.issueid}
                showAllPeople={this.state.showAllPeople}
                DetailsOfPeople={this.state.DetailsOfPeople} />)
        const tweetOption = (this.props.isAauthenticated) ? (
          
                <div style={{ display: this.state.displayTwitter }} id={this.props.issue.issueid} className="twitter">
                   {twitterBird}
                </div>
           
        ) : (null)
        const allPeopleImages = (this.state.showAllPeople) ? (
            <ExplainedStories
                toggleAllPeopleList={this.toggleAllPeopleList}
                DetailsOfPeople={this.state.DetailsOfPeople}
                 />
        ) : (null)

     
        return (
            <div className="cardWithDate">
               <div className="dateOfCard">
                         <div className="date">
                <span>{this.props.issue.date.slice(5,10)}</span>
                <br/>
                <span className="year">{this.props.issue.date.slice(0,4)}</span>
                </div>
               </div>
                <div key={this.props.issue.issueid} className="issueCard">
                    <div className="orginCard">
                        <DisplayIssueTopBtns
                        openEditReason = {this.openEditReason}
                        changepublicStatus={this.changepublicStatus}
                            issue={this.props.issue}
                            questionProject={this.state.questionProject[0]}
                            toggleDisplayLink={this.props.toggleDisplayLink}
                            handlePublicPrives={this.props.handlePublicPrives}
                            tweetWindow={this.props.tweetWindow}
                            deleteProjects={this.props.deleteProjects}
                            itsHome={this.props.itsHome} />
                        {/* {copyElement} */}
                        <div className="copyDisplay" id={"clipboard_" + this.props.issue.issueid} style={{ display: "none" }}>
                            <CopyToClipboard sharablelink={config.react_url + '/project/' + this.props.issue.issueid} />
                        </div>
                        <div id={this.props.issue.issueid} onClick={this.props.togglemodal}
                            className="questionText">
                            <span id={"text_"+this.props.issue.projectid} >{this.props.issue.textexplain}</span>
                        </div>
                        <div id={this.props.issue.issueid} onClick={this.props.togglemodal} className="questionImg">
                            <video id={this.props.issue.issueid}
                                autoPlay={true}
                                muted
                                className="explainVideo"
                                ref={vid => this.videoExplain = vid}
                                 width="100%" height="100%" src={this.props.issue.videofilepath} ></video>
                        </div>

                    </div>
                    <div id={this.props.issue.issueid} className="explainAnswer">

                      {bottomImages}


                        <div className="twitterContainer">
                         {tweetOption}
                        </div>

                        <div className="explainIt">
                            <button id={this.props.issue.issueid} className="buttonLight explainItBtn" onClick={this.handleOpenModal}>Explain it</button>
                        </div>

                          <ReactModal
                            isOpen={this.props.isopenEditModal}
                            contentLabel="Minimal Modal Example"
                            className="ModalEdit"
                            overlayClassName="OverlayEdit"
                        >
                            <div>

                                <div onClick={this.props.closeEditModal} className="closeModalBtn">
                                    <span>
                                        <FiX className="closeIcon" onClick={this.props.closeEditModal} />
                                    </span>
                                </div>
                               <EditReason 
                               initailText={this.state.textexplain}
                               projectId = {this.state.thisProjectId}/>
                            </div>

                        </ReactModal>
                        <ReactModal
                            isOpen={this.state.showModalTwitterLogin}
                            contentLabel="Minimal Modal Example"
                            className="ModalA"
                            overlayClassName="OverlayA"
                        >
                            <div>

                                <div onclick={this.handleCloseModal} className="closeModalBtn">
                                    <span>
                                        <FiX className="closeIcon" onClick={this.handleCloseModal} />
                                    </span>
                                </div>
                                <TwitterLogin 
                                 handleCloseModal={this.handleCloseModal} />
                            </div>

                        </ReactModal>

                        <ReactModal
                            isOpen={this.state.showModalExplain}
                            contentLabel="Minimal Modal Example"
                            className="ModalA"
                            overlayClassName="OverlayA"
                        >
                            <div >
                                <div onclick={this.handleCloseModal} className="closeModalBtn">
                                    <span>
                                        <FiX className="closeIcon" onClick={this.handleCloseModal} />
                                    </span>
                                </div>
                                <ExplainPage
                                    handleCloseModal={this.handleCloseModal} />
                            </div>
                            {/* <button onClick={this.handleCloseModal}>Close Modal</button> */}
                        </ReactModal>
                    </div>
                    {allPeopleImages}

                </div>
            </div>
        )
    }
}
issueCard.PropType = {
    setIssueId: PropType.func.isRequired,
    cancelAllMessageAction:PropType.func.isRequired,
    restAllToolValue:PropType.func.isRequired,
    resetValues:PropType.func.isRequired

};
const mapStateToProps = state => ({
    isAauthenticated: state.auth.isAuthenticated,
    isopenEditModal : state.projects.openEditModal

})

export default connect(mapStateToProps, { setIssueId,
    cancelAllMessageAction,
    restAllToolValue,
    explainIssue,
    openEditModal,
    closeEditModal,
    resetValues})(issueCard)




