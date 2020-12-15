import React, { Component } from "react";
import "./form.css";



const $ = window.$;


const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class componentform extends Component {

  // calling api function
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  };
  
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };


  constructor(props) {
    super(props);
    this.state = {
      projectname: null,
      semester: null,
      year: null,
      formErrors: {
        projectname: "",
        semester: "",
        year: "",
        projectdetails: "",
        coordinator: "",
      }
  };
}
  handleSubmit = async e => {
    e.preventDefault();
    // validation and implementation of form (front end)
    

    
    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Project Name: ${this.state.projectname}
        Semester: ${this.state.semester}
        Year: ${this.state.year}
        projectdetails: ${this.state.projectdetails}
        coordinator: ${this.state.coordinator}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }


    
    var response = await fetch('/api/projectInsert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({projectname:this.state.projectname,
        semester:this.state.semester,
        year:this.state.year,
        projectdetails:this.state.projectdetails,
        coordinator:this.state.coordinator
        })
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "projectname":
        formErrors.projectname =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "semester":
        formErrors.semester =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "year":
        formErrors.coordinator =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  

  render() {
    const { formErrors } = this.state;

    return (
      
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Add Project</h1>
          <form id="form" onSubmit={this.handleSubmit} noValidate>
            <div className="projectname">
              <label htmlFor="projectname">Project Name</label>
              <input
                className={formErrors.projectname.length > 0 ? "error" : null}
                placeholder="Project Name"
                type="text"
                id="projectname"
                value={this.state.projectname}
                name="projectname"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.projectname.length > 0 && (
                <span className="errorMessage">{formErrors.projectname}</span>
              )}
            </div>
            <div className="semester">
              <label htmlFor="semester">Semester</label>
              <input
                className={formErrors.semester.length > 0 ? "error" : null}
                placeholder="Semester"
                type="text"
                id="semester"
                value={this.state.semester}
                name="semester"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.semester.length > 0 && (
                <span className="errorMessage">{formErrors.semester}</span>
              )}
            </div>
            <div className="coordinator">
              <label htmlFor="coordinator">Coordinator</label>
              <input
                className={formErrors.coordinator.length > 0 ? "error" : null}
                placeholder="Co-ordinator"
                type="text"
                id="coordinator"
                value={this.state.coordinator}
                name="coordinator"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.coordinator.length > 0 && (
                <span className="errorMessage">{formErrors.coordinator}</span>
              )}
            </div>
            <div className="year">
              <label htmlFor="year">Year</label>
              <input
                className={formErrors.year.length > 0 ? "error" : null}
                placeholder="Year"
                type=""
                id="year"
                value={this.state.year}
                name="year"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.year.length > 0 && (
                <span className="errorMessage">{formErrors.year}</span>
              )}
            </div>
            <div className="projectdetails">
              <label htmlFor="projectdetails">Project Details</label>
              <textarea
                className={formErrors.projectdetails.length > 0 ? "error" : null}
                placeholder="Project Details"
                id="projectdetails"
                value={this.state.projectdetails}
                name="projectdetails"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.projectdetails.length > 0 && (
                <span className="errorMessage">{formErrors.projectdetails}</span>
              )}
            </div>
            
            <div className="createAccount">
              <button type="submit">Add Project</button>
            </div>
          </form>
        </div>
      </div> 
    );
  }
}

export default componentform;
