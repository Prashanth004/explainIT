import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { Redirect} from 'react-router-dom';
import '../../css/emailvarify.css';
import OTP from 'otp-client';
import config from '../../../config/config';
import {varifyActivation,activateProfile,resendOtp, sendOtp} from '../../../actions/emailAction'

class EmailVarify extends Component {
  constructor(props){
    super(props)
    this.state={
        submitPressed:false,
        emailFlieldValue:null,
        enteredOtp:null,
        taken:null,
        otpVarified:false,
        optIncorrect:true,
        valdatingMessage:false,
        invalidOTP:false,
        resendClick:false
    }
    this.pressSubmit = this.pressSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.changeOtpValue = this.changeOtpValue.bind(this);
    this.varifyOtpValue = this.varifyOtpValue.bind(this);
    this.resend = this.resend.bind(this)
  }
  componentWillMount(){
    this.props.varifyActivation()
  }
 onEmailChange(e){
     this.setState({
        emailFlieldValue:e.target.value
     })
 }
 changeOtpValue(e){
    this.setState({
        enteredOtp:e.target.value,
        valdatingMessage:false,
        invalidOTP:false
    })
 } 
 varifyOtpValue(){
     this.setState({
        valdatingMessage:true
     })
   
     if(this.state.token === this.state.enteredOtp)
     {
         this.setState({
             otpVarified : true,
             optIncorrect:false})
             this.props.activateProfile(this.state.emailFlieldValue)
     }
     else{
        this.setState({
            optIncorrect : true,
            invalidOTP:true,
            valdatingMessage:false,
            otpVarified:false})            
     }
 }
 resend(){
     this.setState({
         resendClick:true
     })
     this.props.resendOtp(this.state.emailFlieldValue)
 }
  pressSubmit(){
    
    const secret = config.OTP_SECRET
    const options = {
        algorithm: "sha256",
        digits: 6,
        period: 50
      }
    const otp = new OTP(secret,options)
    const token = otp.getToken()
    this.props.sendOtp(this.state.emailFlieldValue,token )
 
      this.setState({
        submitPressed:true,
        token:token
      })
  }
  render() {
    var otpAction =null;
    var validateOtp = (this.state.valdatingMessage)?(
<p>validating Passcode</p>
    ):(null)
    var invalidOTP = (this.state.invalidOTP)?(
        <p>incorrect passcode</p>
    ):(null)
    if(this.state.resendClick!==true){
        otpAction=(this.state.submitPressed)?(
            (this.props.otpSent)?(
                <div>
                    <p>passcode is sent to {this.state.emailFlieldValue}</p>
                    <h5>Enter passcode to verify</h5>
                    <br />
                    <input type="text" className="emailInput OTP" onChange={this.changeOtpValue}></input>
                    <button className="buttonDark" onClick={this.varifyOtpValue}>Submit</button>
                    <br/>
                    <br/>
                    {/* <button className="buttonLight">Edit email</button> */}
                    <button className="buttonLight" onClick={this.resend}>Resend</button>
                </div>
            ):(
                <h4>Sending passcode to your mail</h4>
            )
        ):( 
            <div>
                <h5>Enter an email id for us to contact you and update you when needed </h5>
                <br/>
                <input type="text" className="emailInput" onChange={this.onEmailChange}></input>
                <button className="buttonDark" onClick={this.pressSubmit}>Submit</button>
            </div>)
    }
    else{
        otpAction = (this.props.reSentOtp)?(
            <div>
                <p>passcode is sent to {this.state.emailFlieldValue}</p>
                <h5>Enter passcode to verify</h5>
                <br />
                <input type="text" className="emailInput OTP" onChange={this.changeOtpValue}></input>
                <button className="buttonDark" onClick={this.varifyOtpValue}>Submit</button>
                <br/>
                <br/>
              
            </div>
        ):(
            <h4>Resending passcode to your mail</h4>
        )

    }



    return (this.props.doneVarification)?((this.props.isVarified || this.props.profileActivated)?(
        <Redirect to={{ pathname: './' }} />
    ):(
        <div className="emailVarify">
        <div className="emailboxCotainer">
        <div className="logoEmail">
            <span>
              <img alt="logo" onClick={this.logout} height="100%" width="100%" src={require('../../images/logo5.png')} />
            </span>
        </div>
        <br/>
        <br/>
       {otpAction}  
       {validateOtp}  
       {invalidOTP}  

        </div>
      </div>)):(null)
  }
}
EmailVarify.PropType = {
    varifyActivation:PropType.func.isRequired,
    sendOtp:PropType.func.isRequired,
    activateProfile:PropType.func.isRequired,
    resendOtp:PropType.func.isRequired
   };

const mapStateToProps = state => ({
    doneVarification : state.email.doneVarification,
    isVarified:state.email.isVarified,
    otpSent:state.email.sentOtp,
    profileActivated:state.email.profileActivated,
    reSentOtp:state.email.reSentOtp,
    reSendOtpFailed:state.email.reSendOtpFailed,
  
})

export default connect(mapStateToProps, { 
    varifyActivation,sendOtp,activateProfile,
    resendOtp
})(EmailVarify)
