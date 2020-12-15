import React,{Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import StudentProDetail from './studentProDetail';
import "./interaction.css";
import Projectstatement from './projectstatement';
//import ProjectList from 'project';
//import {projectList} from 'project';
export class navigateproject extends Component{
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
                <a>Student Menu</a>
                <a>Design Project Need </a>
                <Nav.Link href="/display">Step 1:Design Need</Nav.Link>
                <Nav.Link href="/project_planning">Step 2:Project Planning</Nav.Link>
                <Nav.Link href="/DesignRequirement">Step 3:Design Requirement</Nav.Link>
                <Nav.Link href="/design_concepts">Step 4:Design Concepts</Nav.Link>
                <Nav.Link href="/detail_design_evaluation">Step 5:Details Design Evaluation</Nav.Link>
                <Nav.Link href="/design_evaluation_and_communication">Step 6:Design evaluation and communication</Nav.Link>
            </div> 
            </div>
        )

    }
}
export default navigateproject;
//ReactDOM.render(<ProjectList />, document.getElementById("react-div"));