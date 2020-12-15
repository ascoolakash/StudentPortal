import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './index.css';
import form from './component/Componentfrom';
import formCoordinate from './component/ComponentFormCoordinate';
import Aboutus from './component/Aboutus';
import Contact from './component/Contact';
import Stakeholder from './component/stakeholder';
import Infogathering  from './component/infogathering';
import Designbrief from './component/designbrief';
import * as serviceWorker from './serviceWorker';
import Login from './component/Login';
import LoginCoordinate from './component/LoginCoordinate';
import project_form from './component/project_form';
import project from './component/project'
import ProjectList from './component/project'
import interaction from './component/interaction'
import carousel from './component/carousel'
import project_planning from './component/projectplanning'
import designrequirement  from './component/DesignRequirement'
import design_concepts  from './component/design_concept'
import detail_design_evaluation from './component/detail_design_evaluation'
import design_evaluation_and_communication from './component/design_evaluation_and_communication'
import DesignCommunication from './component/DesignCommunication'
import StudentProDetail from './component/studentProDetail'
import studentTeamDetails from './component/studentTeamDetails'
import studentMentorDetails from './component/studentMentorDetails'
import studentCordinatorDetails from './component/studentCordinatorDetails'
import facProDetail from './component/facProDetail'
import facTeamDetail from './component/facTeamDetail'
import {Navigation}  from './component/Navigation';
import {NavigationStart}  from './component/NavigationStart';
import NavigationCordinator  from './component/navigateCoordinator';
import AddFaculty  from './component/addfaculty';
import checkSecretKey from './component/checkSecretKey';
import LoginFaculty from './component/LoginFaculty';
import projectFaculty from './component/projectFaculty';
import navigateStudent from './component/NavigateStudent';
import addTeamMember from './component/addTeamMember';
import addProject from './component/addProject'

const routing = (
<Router>
<Navbar bg="light">
              {/* <Navbar.Brand href="/">Student Panel</Navbar.Brand> */}
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/About">About DE e-book</Nav.Link>
                  <Nav.Link href="/Contact">Contact</Nav.Link>
                </Nav>
                {/* <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
              </Navbar.Collapse>
              </Navbar>
      
      {/* <div className="sidenav">
            <Nav.Link href="/display"><b>Prject Portal</b></Nav.Link>
            <Nav.Link href="/project_planning"><b>Student Portal Login</b></Nav.Link>
            <Nav.Link href="/DesignRequirement"><b>Faculty Portal Login</b></Nav.Link>
            <Nav.Link href="/LoginCoordinate"><b>Coordinator Portal Login</b></Nav.Link>
        </div> */}
      <Container className="pages" >
      <Row>  
        <Col>

            <Route path="/" exact component={carousel} />
            <Route path="/About" component={Aboutus} />
            <Route path="/Componentfrom" component={form} />
            <Route path="/ComponentfromCoordinate" component={formCoordinate} />
            <Route path="/Login" component={Login}/>
            <Route path="/LoginCoordinate" component={LoginCoordinate}/>
            <Route path="/project" component={project}/>
            <Route path="/projectfaculty" component={projectFaculty}/>
            <Route path="/Navigation/project" component={project}/>
            <Route path="/Contact" component={Contact}/>
            <Route path="/display" component={interaction} />
            <Route path="/stakeholder" component={Stakeholder} />
            <Route path="/infogathering" component={Infogathering} />
            <Route path="/designbrief" component={Designbrief} />
            <Route path="/project_planning" component={project_planning} />
            <Route path="/DesignRequirement" component={designrequirement} />
            <Route path="/design_concepts" component={design_concepts} />
            <Route path="/detail_design_evaluation" component={detail_design_evaluation} />
            <Route path="/design_evaluation_and_communication" component={design_evaluation_and_communication} />
            <Route path="/project_form" component={project_form} />
            <Route path="/DesignCommunication" component={DesignCommunication} />
            <Route path="/studentProDetail" exact component={StudentProDetail} />
            <Route path="/studentProDetail/:id" component={interaction} />
            <Route path="/Navigation" component={Navigation} />
            <Route path="/NavigationCordinator" component={NavigationCordinator} />
            <Route path="/NavigationStart" component={NavigationStart} />
            <Route path="/studentTeamDetails" component={studentTeamDetails} />
            <Route path="/studentMentorDetails" component={studentMentorDetails} />
            <Route path="/studentCordinatorDetails" component={studentCordinatorDetails} />
            <Route path="/facProDetail" component={facProDetail} />
            <Route path="/addfaculty" component={AddFaculty} />
            <Route path="/facTeamDetail" component={facTeamDetail} />
            <Route path="/checkSecretKey" component={checkSecretKey} />
            <Route path="/LoginFaculty" component={LoginFaculty} />
            <Route path="/navigatestudent" component={navigateStudent} />
            <Route path="/addTeamMember" component={addTeamMember} />
            <Route path="/addproject" component={addProject} />
          </Col>
        </Row>
      </Container>  
    </Router>
    
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
