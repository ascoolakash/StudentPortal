import React,{Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
//import ProjectList from 'project';
//import {projectList} from 'project';
export class NavigationStart extends Component{
    constructor(props) {
        super(props);
        let loggedIn = false
            
        const token = localStorage.getItem("token")
        if(token) loggedIn = true;
      
    }
    render(){
        //console.log("JWT verification"+ decode.user.userType);
        return(
            <div>
            <div className="sidenav">

            <Nav.Link href="/display"><b>Project Portal</b></Nav.Link>
            <Nav.Link href="/Componentfrom"><b>Student Portal Login</b></Nav.Link>
            <Nav.Link href="/LoginFaculty"><b>Faculty Portal Login</b></Nav.Link>
            <Nav.Link href="/LoginCoordinate"><b>Coordinator Portal Login</b></Nav.Link>
            </div> 
            
            </div>
        )
    }
}
export default NavigationStart;
//ReactDOM.render(<ProjectList />, document.getElementById("react-div"));