

import React from 'react';
import config from '../../../../../config/config';
import ImageContainer from '../imageContainer'
import Timer from '../timer'

export default (props) => {
    const {activity, userData} = props
        var date = activity.time.slice(5, 7)
        var timetaken = activity.duration;
        return (
            <div className="activityContentWithDate">
                <div className="activityContent">
                <span className="dateNew Notify">{activity.time.slice(8, 10)}  {config.monthPicker[date]}, {activity.time.slice(0, 4)}</span>

                    <div style={{ textAlign: "left" }}>
                        <p>You were in all with <ImageContainer name={userData.userName} imgsrc={userData.profilePic}/> for the topic <b>{activity.subject}</b> for <Timer time={timetaken}/></p>
                        <p style={{fontSize:"45px",fontWeight:"normal"}}>The recording not saved due to network issues</p>
                    </div>
                </div>
            </div>
       )
    }
    

