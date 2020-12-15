import React,{Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
//import ProjectList from 'project';
//import {projectList} from 'project';
export class NavigationCoordinator extends Component{
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
        return(
            <div>
            <div className="sidenav">

                <a>Coordinator Portal</a>
                <Nav.Link href="/project">Add Project</Nav.Link>
                <Nav.Link href="/addfaculty">Add Faculty</Nav.Link>
                <Nav.Link href="/#">Update Password</Nav.Link>
                <Nav.Link href="/#">Project Details</Nav.Link>
            </div> 
            
            </div>
        )
    }
}
export default NavigationCoordinator;
//ReactDOM.render(<ProjectList />, document.getElementById("react-div"));