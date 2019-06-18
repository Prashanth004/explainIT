import React, { Component } from 'react'
import PropType from 'prop-types';
import { connect } from 'react-redux';
import config from '../../../../config/config'
import { deleteProjects, checkPublicValue } from '../../../../actions/projectActions';

import '../../../css/toggle.css'
import IssueCard from './issueCard'
import { confirmAlert } from 'react-confirm-alert'; // Import4




class DisplayIssue extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deleteItemId: null,
            issueArray: null,
        }
        this.deleteProjects = this.deleteProjects.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handlePublicPrives = this.handlePublicPrives.bind(this)
    }
    componentWillMount() {
        this.setState({
            issueArray: this.props.myissues

        })
    }
 
    deleteProjects(e) {
        this.setState({
            deleteItemId: e.target.id
        })
        confirmAlert({
            title: "Are you sure?",
            message: "You won't be able to revert this!",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.handleConfirm()
                },
                {
                    label: 'No',
                    onClick: () => this.handleCancel()
                }
            ]
        })
    }
    handleCancel() {

    }

    handleConfirm() {
        var id = this.state.deleteItemId
        this.props.deleteProjects(id);
        const newState = this.state;
        const index = newState.issueArray.findIndex(a => a.issueid === id);

        if (index === -1) {
            return;
        }
        
       
        newState.issueArray.splice(index, 1);

        this.setState(newState); // 

    }
    
    tweetWindow(e) {
        var sharableURL = config.react_url + '/project/' + e.target.id;
        var text = "Discussions happened on explain";
        var encSharableURL = encodeURI(sharableURL);
        var encText = encodeURI(text);

        var href = "https://twitter.com/intent/tweet?text=" + encText + "&url=" + encSharableURL
        var width = 555,
            height = 300,
            top = window.innerHeight / 4,
            left = window.innerWidth / 4,
            url = href,
            opts = 'status=1' +
                ',width=' + width +
                ',height=' + height +
                ',top=' + top +
                ',left=' + left;
        window.open(url, 'twitter', opts);

    }
    handlePublicPrives(e) {
        this.props.checkPublicValue(e.target.id)
    }
  


    render() {
        var issueItems = null;
            if(this.props.created){
                if(this.props.myissues!==null)
                    if(this.props.myissues.length===0)
                        issueItems = (<div className="emptyIssues">
                        <h4>Empty</h4>
                        <br/>
                        <h6>If you have initiated a screen share or record the screen, the recordings with respect to these will be found here</h6>
                        <br/>
                        <h6>You can have it hidden form others to view it or you can let others view it and contribute to the recorded content</h6>
                        </div>)
                    else{
                      
                        issueItems =this.state.issueArray.map((issue, index) => (
                            <IssueCard 
                            key={index+1000}
                            socket={this.props.socket}
                            itsHome={(this.props.home === config.HOME)?true:false}
                            deleteProjects={this.deleteProjects}
                            tweetWindow={this.tweetWindow}
                            handlePublicPrives={this.handlePublicPrives}
                            issue={issue}
                            explainTool={this.props.explainTool}/>
                        ))
                    }
            }
            else if(this.props.participated){
                if(this.props.participatedIssues!==null)
                    if(this.props.participatedIssues.length===0)
                        issueItems = (<div className="emptyIssues">
                            <h4>Empty</h4>
                            <br/>
                            <h6>If you have explained anyone by recording or sharing your screen, you will find the recordings related to them here</h6>
                            <br/>
                            </div>)
                    else
                    issueItems =this.props.participatedIssues.map((issue, index) => (
                        <IssueCard 
                        key={index+1000}
                        itsHome={(this.props.home === config.HOME)?true:false}
                        socket={this.props.socket}
                        deleteProjects={this.deleteProjects}
                        tweetWindow={this.tweetWindow}
                        handlePublicPrives={this.handlePublicPrives}
                        toggle={this.toggle}
                        issue={issue}
                     />
                    ))
        }
        
        return (
            <div>
                {issueItems}

            </div>
        )
    }
}

DisplayIssue.PropType = {
    deleteProjects: PropType.func.isRequired,
    checkPublicValue: PropType.func.isRequired

};
const mapStateToProps = state => ({
 participated: state.nav.openParticipated,
    created: state.nav.openCreated,
    myissues: state.profile.myIssues,
    participatedIssues: state.profile.participatedIssue,
})

export default connect(mapStateToProps, {
    deleteProjects, checkPublicValue
})(DisplayIssue)



