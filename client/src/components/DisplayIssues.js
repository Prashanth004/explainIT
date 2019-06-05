import React, { Component } from 'react'
import PropType from 'prop-types';
import ImagesOfExplainers from './DisplayExplained';


class DisplayIssue extends Component {
   


    render() {
      
        const issueItems = this.props.issueArray.map((issue,index) => (
            <div key={index}  key={issue.issueid} className="issueCard">
                <div className="orginCard">
                    <div id={issue.issueid} onClick={this.props.togglemodal} className="topButtons">
                        <div id={issue.issueid}>
                            <button id="shareScreen" className="buttonLight sharBtn" ><i className="glyphicon glyphicon-duplicate"></i>
                            </button>
                        </div>
                        <div>
                            </div>
                        <div id={issue.issueid} className="twitterHolder">
                           <div id={issue.issueid} className="twitter">
                                <img width="100%" height="100%" src={require('./images/twitter3.png')}/>
                            </div>
                        </div>
                    </div >
                    <div id={issue.issueid} onClick={this.props.togglemodal} className="questionText">
                        <p id={issue.issueid} >{issue.textexplain}</p>
                    </div>
                    <div id={issue.issueid} onClick={this.props.togglemodal} className="questionImg">
                        <img id={issue.issueid} width="100%" height="100%"src={issue.imgurl} ></img>
                    </div>
                    
                </div>
                <div id={issue.issueid} className="explainAnswer">
                <ImagesOfExplainers issueid={issue.issueid} />
                    <div  className="explainIt">
                        <button id={issue.issueid} className="buttonDark explainItBtn" onClick={this.props.explainTool}>Explain it</button>
                    </div>
                </div>
            </div>
        ))
        return (
            <div>
{issueItems}
              
            </div>
        )
    }
}

export default DisplayIssue
