import Table from 'react-bootstrap/Table'; 
import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import NavigationCoordinator from './navigateCoordinator'


      
export default class AddFaculty extends Component {
  constructor(props) {
    super(props);
    let loggedIn = false
    const jwt = require('jsonwebtoken');
    const SECRETKEY = "myClientSecret"       
    const token = localStorage.getItem("token")
    if(token) loggedIn = true
 
    const realToken = token.split(":");
    const realtokenValue = realToken[1];
    const realToken1 = realtokenValue.split("}");
    const realtokenValue1 = realToken1[0];
    var decode = jwt.verify(JSON.parse(realtokenValue1) , SECRETKEY);
    //console.log("JWT Akash"+ decode.user.email);
    this.state = {projectsdata:[], loggedIn,decode};
  }
  componentDidMount() {
    const token = localStorage.getItem("token")
    //console.log("Token value"+token)
    fetch('/api/faculty', {
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

  handleFetch =() => {
    const token = localStorage.getItem("token")
    fetch('/api/faculty', {
      method: 'GET',
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
  }
  handleUpdate = async data => {
    //data.preventDefault();
    const token = localStorage.getItem("token")
    var response = await fetch('/api/facultyUpdate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        id:data._id,
        faculty_name:data.faculty_name,
        faculty_email:data.faculty_email,
        faculty_dept:data.faculty_dept,
        coordinator_email:this.state.decode.user.email,
    })
    });
    const test = await response.text().then(this.handleFetch);
  
     // console.log("AKASH Test"+test)
     // return body;
    }

    handleDelete = async data => {
      //data.preventDefault();
      const token = localStorage.getItem("token")
      var response = await fetch('/api/facultyDelete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id:data._id,
        
         })
      });
      await response.text().then(this.handleFetch);
      
      }

      handleInsert = async data => {
        //data.preventDefault();
        const token = localStorage.getItem("token")
        var response = await fetch('/api/facultyInsert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            //id:data._id,
            faculty_name:data.faculty_name,
            faculty_email:data.faculty_email,
            faculty_dept:data.faculty_dept,
            coordinator_email:this.state.decode.user.email,
            })
        });
        await response.text().then(this.handleFetch);
        
        }
        
  // projectList() {
  //   return this.state.projectsdata.map(currentproject => {
  //     return <Project project={currentproject} />;
  //   })
  // }

  
  tableRef = React.createRef();
  render() {
    return (
        <div>
            <div>
                <NavigationCoordinator/>
            </div>
            <div className="wrapper1">
                {console.log(this.state.projectsdata)}
                
                    <MaterialTable 
                    localization={{
                    pagination: {
                        labelDisplayedRows: '4-6 of 10',
                        labelRowsPerPage:'{ 10, 25,100}'
                    },
                
                    }}
                    tableRef={this.tableRef}
                    key={this.state.projectsdata._id}
                    title="On Going Project"
                    columns={[
                    { title: "Mentor Name", field: "faculty_name" },
                    { title: "Mentor Email", field: "faculty_email" },
                    { title: "Mentor Department", field: "faculty_dept" },
                    ]}  
                    data={this.state.projectsdata
                    }
                    editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            this.setState(prevState => {
                            const data = [ ...prevState.projectsdata];
                            const str = JSON.stringify(data);
                            console.log("Akash"+str);
                            const newd=this.handleInsert(newData);
                            const str1 = JSON.stringify(newData);
                            console.log("to check "+str1)
                            data.push(newd);
                            return { ...prevState, data };
                            });
                        }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            console.log("AKASH SAURABH"+oldData+" 14   "+newData);
                            if (oldData) {
                            this.setState(prevState => {
                                const data = [...prevState.projectsdata]
                                console.log(data)
                                const newd=this.handleUpdate(newData);
                                const str1 = JSON.stringify(newd);
                                console.log("to check "+str1)
                                data[data.indexOf(oldData)] =this.handleUpdate(newData);
                                //console.log(newData)
                                
                                return { ...prevState, data };
                            });
                            }
                        }, 600);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            this.setState(prevState => {
                            const data = [...prevState.projectsdata];  
                            //this.handleDelete(oldData);
                            data.splice(data.indexOf(this.handleDelete(oldData)), 1);
                            return { ...prevState, data };
                            });
                        }, 600);
                        }),
                    }}
                ></MaterialTable>
                
                
            </div>
      </div>
    );
  }
}
 
//ReactDOM.render(<ProjectList />, document.getElementById("react-div"));
