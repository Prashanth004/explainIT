import React from 'react'
import '../../css/callImage.css'

export default (props) => {
    const burProps = (props.action==="waiting")?
    "profileImageElementCall burImage":
    "profileImageElementCall"

      
  return (
    <div>
        <div className="imageOfPeersDisplay">
                        <div className="callerImage">
                            <div className="profileImageCall">
                                <img alt="caller profile pipc"className="profileImageElementCall" src={props.callerImageUrl}/>
                            </div>
                        </div>
                        <div className="loaderCall" >
                            <p>connecting...</p>
                        </div>
                        <div className="recieverImageDiv">
                        <div className="profileImageCall">
                                <img alt="reciever profile pic" className={burProps} src={props.recieverImageUrl}/>
                            </div>
                        </div>
         </div>
    </div>
  )
}
