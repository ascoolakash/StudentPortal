import Table from 'react-bootstrap/Table'; 
import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";


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

      
class DesignReview extends Component {
  constructor(props) {
    super(props);
    this.state = {projectsdata:[]};
  }
  componentDidMount() {
    fetch('/api/project', {
      method: 'GET'
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
    fetch('/api/project', {
      method: 'GET'
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
    var response = await fetch('/api/Update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    await response.text().then(this.handleFetch);
  
     // console.log("AKASH Test"+body)
     // return body;
    }

    handleDelete = async data => {
      //data.preventDefault();
      var response = await fetch('/api/Delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id:data._id,
        
         })
      });
      await response.text().then(this.handleFetch);
      
      }
        
  projectList() {
    return this.state.projectsdata.map(currentproject => {
      return <Project project={currentproject} />;
    })
  }

  
  tableRef = React.createRef();
  render() {
    return (
      <div className="wrapper1">
        {console.log(this.state.projectsdata)}
          
            <MaterialTable 
            localization={{
              pagination: {
                labelDisplayedRows: '4-6 of 10',
                labelRowsPerPage:'{5, 10, 25,100}'
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
              // onRowAdd: newData =>
              //   new Promise(resolve => {
              //     setTimeout(() => {
              //       resolve();
              //       this.setState(prevState => {
              //         const data = [ ...prevState.currentproject];
              //         console.log("Akash"+data);
              //         data.push(newData);
              //         return { ...prevState, data };
              //       });
              //     }, 600);
              //   }),
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
    );
  }
}
 
//ReactDOM.render(<ProjectList />, document.getElementById("react-div"));
export default DesignReview;