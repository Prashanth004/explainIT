import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addNewUser } from '../../../../../actions/storeUserAction';
import config from '../../../../../config/config';
import ImageContainer from '../imageContainer';
import { FiUsers } from "react-icons/fi";


class Fromref extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topicName: null,
            problemOwnerTwitterhandle: null,
            problemOwnerProfilePic: null
        }
    }
    componentDidMount() {
        const { referralAct, userData } = this.props;
        console.log("referalAct : ",referralAct);
        var token = JSON.parse(localStorage.getItem('token'))
        var newData = userData.filter(user => user.key === referralAct.problemowner);
        if (newData.length === 0) {
            axios({
                method: 'get',
                url: config.base_dir + "/api/users/id/" + referralAct.problemowner,
                headers: {
                    "Authorization": token,
                }
            }).then(res => {
                if (res.status === 200 || res.status === 304) {
                    this.setState({
                        problemOwnerTwitterhandle: res.data.data.twitterhandle,
                        problemOwnerProfilePic: res.data.data.profilepic,
                    })
                    this.props.addNewUser(res.data.data)
                }
            }).catch(error=>{console.log("fromRef.js : ComponentDidMount : error : ",error)});
        }
        else {
            this.setState({
                problemOwnerTwitterhandle: newData[0].data.twitterhandle,
                problemOwnerProfilePic: newData[0].data.profilepic
            })
        }
        axios({
            method: 'get',
            url: config.base_dir + "/api/project/" + referralAct.issue,
            headers: {
                "Authorization": token,
            }
        }).then(res2 => {
            if (res2.status === 200 || res2.status === 304) {
                this.setState({
                    topicName: res2.data.data.textexplain
                })
            }
        }).catch(error=>{
            console.log("fromRef : componentDidMount : error : ",error)
        })

    }
    render() {
        const { referralAct } = this.props;
        var date = referralAct.time.slice(5, 7)
        const { problemOwnerTwitterhandle, problemOwnerProfilePic, topicName } = this.state
        return (

            <div className="activityContentWithDate">
                <div className="activityContent">

                    <div className="callIconDiv"> <FiUsers className="callIcon" /></div>
                    <div>
                        <span className="dateNew Notify">{referralAct.time.slice(8, 10)}  {config.monthPicker[date]}, {referralAct.time.slice(0, 4)}</span>
                        
                        <div style={{ textAlign: "left" }}>
                            <p>You referred <a href={config.react_url + '/@' + referralAct.referreetwitter.toLowerCase()}>@{referralAct.referreetwitter.toLowerCase()}</a> to solve issue with topic <a href={config.react_url + '/project/' + referralAct.issue}><b>{topicName}</b></a> for <ImageContainer name={problemOwnerTwitterhandle} imgsrc={problemOwnerProfilePic} /> </p>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
const mapStateToProps = state => ({
    userData: state.userStore.userData

})
export default connect(mapStateToProps, { addNewUser })(Fromref)




