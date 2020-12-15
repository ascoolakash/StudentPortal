import Table from 'react-bootstrap/Table'; 
import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import Navigation from './Navigation'

// //const $ = window.$;


    const Project = props => (
        <tr>
          <td>{props.project.projectname}</td>
          <td>{props.project.projectdetails}</td>
          <td>{props.project.coordinator}</td>
          <td>{props.project.semester}</td>
          <td>{props.project.year}</td>
        </tr>
      ) 

      
export default class ProjectList extends Component {
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

  handleFetch =() => {
    const token = localStorage.getItem("token")
    fetch('/api/project', {
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
    var response = await fetch('/api/Update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        id:data._id,
        name: data.projectname, 
        Description: data.projectdetails, 
        Mentor:data.coordinator,
        Semester: data.semester,
        Year: data.year
       })
    });
    const test = await response.text().then(this.handleFetch);
  
      console.log("AKASH Test"+test)
     // return body;
    }

    handleDelete = async data => {
      //data.preventDefault();
      const token = localStorage.getItem("token")
      var response = await fetch('/api/Delete', {
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
        var response = await fetch('/api/projectInsert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            //id:data._id,
            projectname:data.projectname,
            semester:data.semester,
            year:data.year,
            projectdetails:data.projectdetails,
            coordinator:data.coordinator
          
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
            <Navigation/>
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
            { title: "Project Name", field: "projectname" },
            { title: "Description", field: "projectdetails" },
            { title: "Mentor", field: "coordinator" },
            { title: "Semester", field: "semester" },
            { title: "Year", field: "year", type: "numeric"}
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
