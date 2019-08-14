import React, { Component } from 'react';
import { connect } from 'react-redux';
import './contacts.css';
import config from '../../../../config/config'
import { FiCopy,FiVideo} from "react-icons/fi";
import {addNewUser} from '../../../../actions/storeUserAction';
import {dialFromFail,recordFromFail} from '../../../../actions/dialActions'


class cntactCard extends Component {
    constructor(props){
        super(props)
        this.state={
            userName: ' ',
            profilePic: ' ',
        }
    }
  
  render() {
    console.log("this.props.contactData : ",this.props.contactData);
    const {profilepic,username,twitterhandle,bio,online} = this.props.contactData;
    const shareIcon = online?( <span className="hint--left" aria-label="Share Screen">
    <FiCopy onClick={()=>this.props.dialFromFail(twitterhandle,"")}style={{fontSize:"18px"}}/>
  </span>):(null)
   
    const emptyGoodAt = (<p className="contactHandle">Profile details incomplete</p>)
    const gootAtDiv = (bio!==null)?((bio.length!==0)?( <div className="goodAt"><b>Status : </b>{bio}</div>):(emptyGoodAt)):(emptyGoodAt)
    return (
      <div className="singleContact">
          <div className="contactImgContainer">
              <img src={profilepic} width="100%" height="100%"  className="contactImage" alt="profilePic"></img>
          </div>
          <div style={{textAlign:"left"}}>
            <a href={config.react_url+"/@"+twitterhandle}target="_blank"rel="noopener noreferrer" >
          <span>{username} </span></a>
          {gootAtDiv}
          </div>
          {/* <span style={{fontSize:"12px", color:"#333",marginTop:"-15px"}}>@{twitterhandle}</span> */}
          {/* <div style={{padding:"5px", marginTop:"5px",display:"grid", gridTemplateColumns:"50% 50%"}}>
         {shareIcon}
          
           <span className="hint--left" aria-label="Record screen and send">
            <FiVideo onClick={()=>this.props.recordFromFail(twitterhandle,"")}style={{fontSize:"18px"}}/>
            </span>
          </div> */}
      
      </div>
    )
  }
}

cntactCard.PropType = {
  
};
const mapStateToProps = state => ({
    userData : state.userStore.userData

})
export default connect(mapStateToProps, {addNewUser,recordFromFail,dialFromFail})(cntactCard)



