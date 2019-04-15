import React, { Component } from 'react'
import axios from 'axios';
import Toggle from 'react-toggle';
import '../../css/issueDetails.css';
import config from '../../../config/config'
import ImagesOfExplainers from './DisplayExplained'
import { GoChevronDown } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";


export default class componentName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      answerProjects: [],
      questionProject: [],
      DetailsOfPeople: [],
      optionVisibe: false,
      toolTipValue: null,
      toolTipsimple: null,
      optionVisibe: "hidden"
    }
    this.onOptClick = this.onOptClick.bind(this);
    this.changeToggle = this.changeToggle.bind(this);
    this.openProjectDetails = this.openProjectDetails.bind(this)
  }

  componentDidMount() {
    var test = document.querySelector('.explainVideo')
    test.addEventListener("mouseenter", function( event ) { 
        test.setAttribute("controls", "");
    })
    test.addEventListener("mouseleave", function(){
        test.removeAttribute("controls");
    })
    if (Number(this.props.issue.public)) {
      this.setState({
        displayTwitter: "block",
        toolTipValue: "Public - anyone can see this card",
        toolTipsimple: "public"
      })
    }
    else {
      this.setState({
        displayTwitter: "none",
        toolTipValue: "Private - only you can see this card",
        toolTipsimple: "private"
      })
    }
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
              console.log("final response: ", response)
              if (response.status == 200) {
                const newTestJson = JSON.parse(JSON.stringify(allProjects));
                newTestJson[index]['profilepic'] = response.data.data.profilepic;
                newTestJson[index]['username'] = response.data.data.username;
                newTestJson[index]['id'] = response.data.data.id
                newTestJson[index]['twitterhandle'] = response.data.data.twitterhandle
                allProjects = newTestJson
                console.log("newTestJson : ", newTestJson)
                var answerProject = allProjects.filter(project => project.isquestion != "true")
                var questionProject = allProjects.filter(projects => projects.isquestion == 'true')
                console.log("questionProject :", questionProject)
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

  onOptClick() {
    if (this.state.optionVisibe === "hidden")
      this.setState({
        optionVisibe: "visible"
      })
    else {
      this.setState({
        optionVisibe: "hidden"
      })
    }
  }
  openProjectDetails(e){
    window.open(config.react_url+"/issue/"+e.target.id, "_blank")
  }
  changeToggle(e) {
    if (this.state.displayTwitter === "block") {
      this.setState({
        displayTwitter: "none",
        toolTipValue: "Private - only you can see this card",
        toolTipsimple: "Private"
      })
    }
    else {
      this.setState({
        displayTwitter: "block",
        toolTipValue: "Public - anyone can see this card",
        toolTipsimple: "Public"
      })
    }
    this.props.handlePublicPrives(e)
  }
  render() {

    const publictoggle = (this.props.itsHome) ? (
      <label id={this.props.issue.projectid}>
        <span className="hint--top" aria-label={this.state.toolTipValue}>
          <Toggle
            id={this.props.issue.projectid}
            defaultChecked={Number(this.props.issue.public)}
            className='custom-classname'
            icons={false}
            onChange={this.changeToggle} />
        </span>
      </label>) : (null)


    
const otpDrop = (!this.props.itsHome)?(null):(
  <div className="iconsright" >
  <span>
    <GoChevronDown style={{ float: "right" }} onClick={this.onOptClick} />
    </span> 
  </div>)
      console.log("this.props.issue : ", this.props.issue)
    console.log("@@this.state.questionProject : ", this.state.questionProject)
    if ((this.state.questionProject).length > 0 && this.state.questionProject !== undefined) {
      var profilePic = this.state.questionProject[0].profilepic
      var proflileName = this.state.questionProject[0].username
    }
    else {
      var profilePic = null
      var proflileName = null
    }
    return (
      <div className="cardNew">
        <div className="cardName" id={this.props.issue.issueid} >
       
          <img src={profilePic}
            style={{
              width: "25px",
              height: "25px",
              borderRadius: "50%",

            }} />
          <span id={this.props.issue.issueid}
            className="cardProfileName" onClick={this.openProjectDetails}>
            <b>{proflileName}</b></span>
         {otpDrop}
          <div className="dropDownForOptionCard" id={this.props.issue.issueid} style={{ visibility: this.state.optionVisibe }}>
            <div onClick={this.props.deleteProjects} className="menuItem">
              <button id={this.props.issue.issueid} className="dropDownBtn">Delete</button>
              <span>  <FiTrash id={this.props.issue.issueid} className="menuIcon" /></span>
            </div>
            <div className="menuItem">
              <button id={this.props.issue.issueid} className="dropDownBtn">Edit</button>
              <span>  <FiEdit id={this.props.issue.issueid} className="menuIcon" /></span>
            </div>
            <div className="menuItem">
              <div className="privateOpt">
                <span style={{
                  display: "inline-block",
                  margin: "8px",
                  marginTop: "-10px",
                }}>{this.state.toolTipsimple}</span>
                {publictoggle}
              </div>

            </div>
          </div>
        </div>
        <div id={this.props.issue.issueid} onClick={this.openProjectDetails}className="cardText">
          <p id={this.props.issue.issueid} onClick={this.openProjectDetails} >{this.props.issue.textexplain}</p>

        </div>
        <div id={this.props.issue.issueid} className="cardVideo">
          <video controls id={this.props.issue.issueid}
            autoPlay="true"
            className="explainVideo"
            muted
            ref={vid => this.videoExplain = vid}
            video width="100%" height="100%" src={this.props.issue.videofilepath} ></video>
        </div>
        <div id={this.props.issue.issueid} className="cardLiked">
        
<ImagesOfExplainers
  showAllPeople={this.state.showAllPeople}
  toggleAllPeopleList={this.toggleAllPeopleList}
  changeVideo={this.changeVideo}
  answerProjects={this.state.answerProjects}
  issueid={this.props.issue.issueid}
  DetailsOfPeople={this.state.DetailsOfPeople} />
</div>
      
       
      </div>
    )
  }
}
