import React, { Component } from "react";
import "./form.css";



//const $ = window.$;

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

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
    const response = await fetch('/api/');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  constructor(props) {
    super(props);
    this.state = {
     firstName: null,
      lastName: null,
      email: null,
      password: null,
      studentID:null,
      //userType:null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        studentID:"",
        //userType:""
      }
  };
}
  handleSubmit = async e => {
    e.preventDefault();
    // validation and implementation of form (front end)
    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
        Student Id:${this.state.studentID}
        User Type:${this.state.userType}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
    
    var response = await fetch('/api/Componentfrom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({firstname:this.state.firstName,
        lastname:this.state.lastName,
        email:this.state.email,
        password:this.state.password,
        grouptype:this.state.grouptype,
        studentID:this.state.studentID,
        //userType:this.state.userType
      })
    });
    const body = await response.text();
    console.log(this.body)
    this.setState({ responseToPost: body });
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "studentID":
        formErrors.studentID =
          value.length < 6 ? "Cannot be empty" : "";
        break;
      // case "userType":
      //   formErrors.password =
      //     value.length < 1 ? "Cannot be empty" : "";
      // break;
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
          <h1>Create Account</h1>
          <form id="form" onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
                <input
                  className={formErrors.firstName.length > 0 ? "error" : null}
                  placeholder="First Name"
                  type="text"
                  id="firstName"
                  value={this.state.firstName}
                  name="firstName"
                  noValidate
                  onChange={this.handleChange}
                />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                id="lastName"
                value={this.state.lastName}
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                id="email"
                value={this.state.email}
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                id="password"
                value={this.state.password}
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="studentID">
              <label htmlFor="studentID">Student Id</label>
              <input
                className={formErrors.studentID.length > 0 ? "error" : null}
                placeholder="Student Id"
                type="text"
                name="studentID"
                value={this.state.studentID}
                id="studentID"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.studentID.length > 0 && (
                <span className="errorMessage">{formErrors.studentID}</span>
              )}
            </div>
            {/* <div className="userType">
              <label htmlFor="userType">User Type</label>
              <select name="userType" value={this.state.userType}  onChange={this.handleChange}>
                {console.log("to check the usertype form data : "+this.state.userType)}
                <option value="">Select</option>
                <option value="Faculty">Faculty/Mentor</option>
                <option value="student">Student</option>
                <option value="coordinator">Coordinator</option>
                
              </select>
            </div> */}

            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small><a href="/Login">Already Have an Account?</a></small>
            </div>

            <div>
                <p>{this.state.responseToPost}</p>
            </div>
          </form>
        </div>
      </div> 
    );
  }
}

export default componentform;
