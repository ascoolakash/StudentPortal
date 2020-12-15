import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NavigateStudent from './NavigateStudent'
//import {Button} from 'react-native'

const useStyles = makeStyles({ 
  table: {
    minWidth: 650,
  },
});

export default class StudentProDetail extends Component {
  constructor(props) {
    super(props);
    let loggedIn = false
        
    const token = localStorage.getItem("token")
    if(token) loggedIn = true

    this.state = {projectsdata:[],loggedIn};
  }
  componentDidMount() {
    const token = localStorage.getItem("token")
    console.log("Token value"+token)
    fetch('/api/project', {
      method: 'GET',
      // header: 
      // {
      //   authorization : token
      // }
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then(response => response.json())
            .then(projectsdata => this.setState({ projectsdata})
          )
          .catch((error) => {
            alert("iam here")
            console.log(error);
          })

          this.callApi()
          .then(res => this.setState({ response: res.express }))
          .catch(err => console.log(err));
  };

  
  callApi = async () => {
    const response = await fetch('/api/ ');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };

  tableRef = React.createRef();
  render() {
    //const classes = useStyles();
    return (
      <div>
        <div>
          <NavigateStudent/>
        </div>  
      <div className="wrapper1">
          {console.log(this.state.projectsdata)}
          {console.log(this.state.projectsdata.projectname)}
          {/* <Link to = {`/studentProDetail/${this.state.projectsdata._id}`}>          */}
            <MaterialTable  

            tableRef={this.tableRef}
            key={this.state.projectsdata._id}
            title="Project available"
            columns={[
              { title: "Project Name", field: "projectname" },
              { title: "Description", field: "projectdetails" },
              { title: "Mentor", field: "coordinator" },
              { title: "Semester", field: "semester" },
              { title: "Year", field: "year", type: "numeric"}
            ]}  
            data={this.state.projectsdata}
            actions={[
              {
                icon: 'save',
                tooltip: 'Save User',
                onClick: (event, rowData) => this.props.history.push('/display')
              }
            ]}
            components={{
              Action: props => (
                <button
                  onClick={(event) => props.action.onClick(event, props.data)}
                  
                >
                  Choose Project
                </button>
              ),
            }}
          ></MaterialTable>
        {/* </Link> */}
        </div>
      </div>
    );
  }
}
 
//ReactDOM.render(<ProjectList />, document.getElementById("react-div"));


/** return (
        
      <div className="wrapper1">
          {console.log(this.state.projectsdata)}
          {console.log(this.state.projectsdata.projectname)}
          <Link to = {`/studentProDetail/${this.state.projectsdata._id}`}>          
            <MaterialTable 

            tableRef={this.tableRef}
            key={this.state.projectsdata._id}
            title="Project available"
            columns={[
              { title: "Project Name", field: "projectname" },
              { title: "Description", field: "projectdetails" },
              { title: "Mentor", field: "coordinator" },
              { title: "Semester", field: "semester" },
              { title: "Year", field: "year", type: "numeric"}
            ]}  
            data={this.state.projectsdata
              }
            editable={{

            }}
          ></MaterialTable>
        </Link>
        
      </div>
    ); */


/****
 * 
return (
      <div>
        <div>
          <NavigateStudent/>
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table  aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Project Name</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Mentor</TableCell>
                  <TableCell align="right">Semester</TableCell>
                  <TableCell align="right">Year</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.projectsdata.map(row => (
                    
                  <TableRow key={row._id}>
                    <Link to = {`/studentProDetail/${row._id}`} key = {row._id}> 
                    <TableCell component="th" scope="row">{row.projectname}</TableCell>
                    <TableCell align="right">{row.projectdetails}</TableCell>
                    <TableCell align="right">{row.coordinator}</TableCell>
                    <TableCell align="right">{row.semester}</TableCell>
                    <TableCell align="right">{row.year}</TableCell>
                    </Link>
                  </TableRow>
                
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );


 */