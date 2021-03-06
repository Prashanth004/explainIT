import React, { Component } from 'react'
import './css/newlanding.css'
import Navbar from '../../Navbar'
import { Modal, ModalBody } from 'reactstrap';
import IssueDetils from '../../issueModal'
import { connect } from 'react-redux';
import { fetchIssues, setIssueId } from '../../../actions/issueActions';
import { fetchProjectbyIssue ,clearAnswers } from '../../../actions/projectActions';
import { stillAuthenicated } from '../../../actions/signinAction';
import { getProfileDetails } from '../../../actions/profileAction'
import PropType from 'prop-types';
// import ImagesOfExplainers from './DisplayExplained'
import Swal from 'sweetalert2'
import config from '../../../config/config'
import ProfileCard from '../../ProfileCard'
import IssueDisplay from '../../DisplayIssues'



class NewHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalTool: false
        }
        this.togglemodal = this.togglemodal.bind(this)
        this.explainTool = this.explainTool.bind(this)
        this.toggleModalCreate = this.toggleModalCreate.bind(this)
    }
    reloadPage(){
        window.location.reload();
    }


    componentWillMount() {

        this.props.fetchIssues()
    }
  

    toggleModalCreate = () => {
        if (this.props.isAauthenticated) {
            this.props.setIssueId(null)
            localStorage.setItem("issueId", null)
            window.open(config.react_url+'/explainIt', "_blank")
        }
        else {
            Swal.fire(
                'You should login'
              )
        }
    }
    togglemodal = (e) => {
        var idOfClicked = e.target.id;
        var classOfClicked = e.target.className

        if (classOfClicked!=="singleMember" && classOfClicked!=="explainAnswer" && classOfClicked!=="displayPeople" && classOfClicked!=="likes" && classOfClicked!== "numberOfPeople" &&idOfClicked !=="explainIt" && idOfClicked !=="audio" && idOfClicked !=="tweet" && idOfClicked !=="shareScreen" && idOfClicked !=="imageOfPeople" && classOfClicked !=="buttonDark explainItBtn") {
            if (this.state.modal === false) {
                this.props.clearAnswers(e.target.id)
                this.props.fetchProjectbyIssue(e.target.id);
            }
            this.setState({
                modal: !this.state.modal
            });
        }
    }
    explainTool = (e) => {
        if (this.props.isAauthenticated) {
            this.props.setIssueId(e.target.id)
            localStorage.setItem("issueId", e.target.id)
            window.open(config.react_url+'/explainIt', "_blank")
        }
        else {
            Swal.fire(
                'You should login'
              )
        }
    }

    render() {
        var self = this
        window.addEventListener('storage', function(event){
            if (event.key == 'token') { 
                self.reloadPage()
            }
        })
        if(this.props.isAauthenticated){
            this.props.getProfileDetails(this.props.userId)
            var profileCardElement = ( 
            <div><ProfileCard  />
                <button className="buttonDark explainBtn" onClick={this.toggleModalCreate}>Explain</button>
                </div>
            )

        }
        else{
            var profileCardElement = null
        }
        var deatilsModal = null
        deatilsModal = (<IssueDetils />)
        var issueList = this.props.issues;
     
        var self = this
        const personalIssues = issueList.filter((issue)=>
            issue.email=== self.props.email
        )

        return (
            <div >
                <Navbar />
                <div className="containerHome">
                <div>
                        {profileCardElement}
                </div>
                                   
                    <div >
                    <IssueDisplay togglemodal={this.togglemodal} explainTool = {this.explainTool} issueArray={issueList}/>
                    {/* {issueItems} */}
                    </div>
                </div>


                 <Modal isOpen={this.state.modal} toggle={this.togglemodal} className={this.props.className}>

                    <ModalBody className="modalBody">
                        {deatilsModal}
                    </ModalBody>

                </Modal>


             

            </div>
        )
    }
}
NewHome.PropType = {
    fetchIssues: PropType.func.isRequired,
    issues: PropType.array.isRequired,
    fetchProjectbyIssue: PropType.func.isRequired,
    setIssueId: PropType.func.isRequired,
    getProfileDetails:PropType.func.isRequired
};
const mapStateToProps = state => ({
    issues: state.issues.items,
    newissueIem: state.issues.newissueIem,
    isAauthenticated: state.auth.isAuthenticated,
    profilePic:state.auth.profilePic,
    userName:state.auth.userName,
    email:state.auth.email,
    userId :state.auth.id
    
})

export default connect(mapStateToProps, {fetchProjectbyIssue,setIssueId, fetchIssues, getProfileDetails, clearAnswers, stillAuthenicated, fetchProjectbyIssue, setIssueId })(NewHome)
