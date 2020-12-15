import React,{Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import StudentProDetail from './studentProDetail';
//import ProjectList from 'project';
//import {projectList} from 'project';
export class Navigation extends Component{
    constructor(props) {
        super(props);
        let loggedIn = false
            
        const token = localStorage.getItem("token")
        if(token) loggedIn = true;
      
    }
    render(){
        const jwt = require('jsonwebtoken');
        const SECRETKEY = "myClientSecret"
        const token = localStorage.getItem("token")
        const realToken = token.split(":");
        const realtokenValue = realToken[1];
        const realToken1 = realtokenValue.split("}");
        const realtokenValue1 = realToken1[0];
        
        console.log(realtokenValue1);
        var decode = jwt.verify(JSON.parse(realtokenValue1) , SECRETKEY);
        const str = JSON.stringify(decode);
        console.log("JWT verification"+ str);
        //console.log("JWT verification"+ decode.user.userType);
        if(decode.user.userType === "Student"){
            console.log("Inside if condition for student")
            return(
                <div>
                <div className="sidenav">
                    <a>Student Portal</a>
                    <Nav.Link href="/studentProDetail">Project Details</Nav.Link>
                    <Nav.Link href="/studentTeamDetails">Team Details</Nav.Link>
                    <Nav.Link href="/studentMentorDetails">Mentor Details</Nav.Link>
                    <Nav.Link href="/studentCordinatorDetails">Coordinate Details</Nav.Link>
                </div> 
                </div>
            )
        }else if(decode.user.userType === "Faculty"){
            console.log("Inside if condition for faculty")
            return(
                <div>
                <div className="sidenav">
                    <a>Student Portal</a>
                    <Nav.Link href="/studentProDetail">Project Details</Nav.Link>
                    <Nav.Link href="/studentTeamDetails">Team Details</Nav.Link>
                    <Nav.Link href="/studentMentorDetails">Mentor Details</Nav.Link>
                    <Nav.Link href="/studentCordinatorDetails">Coordinate Details</Nav.Link>
                    <a>Faculty Portal</a>
                    <Nav.Link href="/facProDetail">Project Details</Nav.Link>
                    <Nav.Link href="/facTeamDetail">Team Details</Nav.Link>
                    <Nav.Link href="/#">Review</Nav.Link>
                    <Nav.Link href="/#">Summary</Nav.Link>
                </div> 

                </div>
            )
    
        }else if(decode.user.userType === "Admin"){
            return(
                <div>
                <div className="sidenav">
                <a>Student Portal</a>
                    <Nav.Link href="/studentProDetail">Project Details</Nav.Link>
                    <Nav.Link href="/studentTeamDetails">Team Details</Nav.Link>
                    <Nav.Link href="/studentMentorDetails">Mentor Details</Nav.Link>
                    <Nav.Link href="/studentCordinatorDetails">Coordinate Details</Nav.Link>
                    <a>Faculty Portal</a>
                    <Nav.Link href="/facProDetail">Project Details</Nav.Link>
                    <Nav.Link href="/facTeamDetail">Team Details</Nav.Link>
                    <Nav.Link href="/#">Review</Nav.Link>
                    <Nav.Link href="/#">Summary</Nav.Link>
                    <a>Admin Portal</a>
                    <Nav.Link href="/#">Project Details</Nav.Link>
                    <Nav.Link href="/#">Teams Details</Nav.Link>
                    <Nav.Link href="/#">Student Update</Nav.Link>
                    <Nav.Link href="/#">Faculty Update</Nav.Link>
                    <a>Summary Report</a>
                </div> 
                
                </div>
            )
    
        }else{
            console.log(decode.user.userType === "Student");
        }
    }
}
export default Navigation;
//ReactDOM.render(<ProjectList />, document.getElementById("react-div"));