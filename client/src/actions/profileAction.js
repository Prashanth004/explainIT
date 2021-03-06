import { GET_PROFILE_DETAILS,
     GET_PROFILE_DETAILS_FAIL,
     UPDATE_USER_PROFILE_FAILED,
     OPEN_EDIT_PROFILE,
     CLOSE_EDIT_PROFILE,
     UPDATE_USER_PROFILE } from './types'
import config from '../config/config';
import axios from 'axios';


export const getProfileDetails = (userId, profilePrivacy) => (dispatch) => {
    var token = JSON.parse(localStorage.getItem('token'))
    var email = null;
    var userName = null;
    var profilepic = null;
    var twitterHandle = null;
    var cost =null
    var bio = null
    var twitterLink = null;
    var angelLink = null;
    var linkinLink = null;
    var githubLink = null;
    var goodat = null;
    var works = null;

    axios({
        method: 'get',
        url: config.base_dir + '/api/users/id/' + userId,
        headers: {
            "Authorization": token,
        }
    }).then((response1) => {
        var myProjects =null;
        if (response1.status === 200 || response1.status === 304) {
            email = response1.data.data.email;
            userName = response1.data.data.username;
            profilepic = response1.data.data.profilepic;
            twitterHandle = response1.data.data.twitterhandle;
            cost = response1.data.data.cost;
            bio = response1.data.data.bio;
            twitterLink = response1.data.data.bio;
            angelLink = response1.data.data.angellist;
            linkinLink = response1.data.data.linkedin;
            githubLink = response1.data.data.github;
            goodat=response1.data.data.goodat;
            works=response1.data.data.works;
            axios({
                method: 'get',
                url: config.base_dir + '/api/project/',
                headers: {
                    "Authorization": token,
                }
            }).then((response2) => {
                var participated = []
                if (profilePrivacy === config.SELF)
                    myProjects = (response2.data.data).filter(project => (
                        project.email === response1.data.data.email

                    ))
                else if (profilePrivacy === config.VISIT_PROF) {
                    myProjects = (response2.data.data).filter(project => (
                        project.email === response1.data.data.email &&
                        project.public === "1"

                    ))


                }

                var myIssue = myProjects.filter(project => (
                    project.isquestion === "true"

                ))

                // var issuIDMyProject = myProjects.map(project=>project.issueid)
                const distinctIssueId = [...new Set(myProjects.map(proj => proj.issueid))]
                response2.data.data.forEach(proj => {
                    if (distinctIssueId.includes(proj.issueid) && proj.isquestion === "true") {
                        participated.push(proj)
                    }
                });
                participated = participated.filter(x => !myIssue.includes(x));
                var noOdprojectsCreated = myIssue.length
                // var noOfProj = myProjects.length
                var noOfparticipation = participated.length
                // var noOfparticipation = noOfProj - noOdprojectsCreated

                dispatch({
                    type: GET_PROFILE_DETAILS,
                    userName: userName,
                    email: email,
                    cost : cost,
                    bio : bio,
                    twitterLink : twitterLink,
                    angelLink : angelLink,
                    linkinLink : linkinLink,
                    githubLink : githubLink,
                    goodat:goodat,
                    works:works,
                    twitterHandle: twitterHandle,
                    myIssue: myIssue,
                    participatedIssue: participated,
                    profilePic: profilepic,
                    noParticipated: noOfparticipation,
                    noCreated: noOdprojectsCreated
                })
            }).catch((error) => {
                dispatch({
                    type: GET_PROFILE_DETAILS_FAIL,
                    error: error
                })
            })
        }
        else {
            dispatch({
                type: GET_PROFILE_DETAILS_FAIL,
                error: null
            })
        }
    }).catch((error) => {
        dispatch({
            type: GET_PROFILE_DETAILS_FAIL,
            error: error
        })

    })
}
export const openEditProfile=()=>(dispatch)=>{
    dispatch({
        type:OPEN_EDIT_PROFILE
    })
}
export const closeEditProfile=()=>(dispatch)=>{
    dispatch({
        type:CLOSE_EDIT_PROFILE
    })
}
export const updateUserProfile=(bio, cost,linkedin,angellist,github,goodat,works)=>(dispatch)=>{
    var token = JSON.parse(localStorage.getItem('token'))
    
   
    var postData = {
        bio: bio,
        cost:cost,
        angellist: angellist,
        linkedin:linkedin,
        github:github,
        goodat:goodat,
        works:works
      };
      let axiosConfig = {
        headers: {
            "Authorization":token,
        }
      };

    axios.post(config.base_dir+'/api/users/updateprofile',
       postData,
       axiosConfig
    ).then(response=>{
        if(response.status ===200 || response.status ===304){
            dispatch({
                type:UPDATE_USER_PROFILE,
                cost : response.data.data.cost,
                bio : response.data.data.bio,
                angelLink : response.data.data.angellist,
                linkinLink : response.data.data.linkedin,
                githubLink : response.data.data.github,
                goodat:response.data.data.goodat,
                works:response.data.data.works
            })
        }
        else{
            dispatch({
                type:UPDATE_USER_PROFILE_FAILED
            })
        }
    })
    .catch(error=>{
        console.error("error : ",error)
        dispatch({
            type:UPDATE_USER_PROFILE_FAILED
        })
    })


}




