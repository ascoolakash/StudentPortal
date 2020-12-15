import React,{Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import StudentProDetail from './studentProDetail';
import "./interaction.css";
import Projectstatement from './projectstatement';
//import ProjectList from 'project';
//import {projectList} from 'project';
export class NavigateStudent extends Component{
    constructor(props) {
        super(props);
        let loggedIn = false
            
        const token = localStorage.getItem("token")
        if(token) loggedIn = true;
      
    }
    render(){
        return(
            <div>
                <div className="sidenav">
                <a>Student Portal</a>
                <Nav.Link href="/addproject">Add Project</Nav.Link>
                <Nav.Link href="/studentProDetail">Project</Nav.Link>
                <Nav.Link href="/addTeamMember">Team</Nav.Link>
                <Nav.Link href="/studentMentorDetails">Mentor</Nav.Link>
                <Nav.Link href="/studentCordinatorDetails">Coordinate</Nav.Link>
            </div> 
            </div>
        )

    }
}
export default NavigateStudent;
//ReactDOM.render(<ProjectList />, document.getElementById("react-div"));