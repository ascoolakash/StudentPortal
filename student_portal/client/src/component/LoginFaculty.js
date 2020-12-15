import React, { Component } from "react";
import {Redirect} from "react-router-dom"
import "./form.css";

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

class LoginFaculty extends Component {

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
    let loggedIn = false
        
    const token = localStorage.getItem("token")
    if(token) loggedIn = true

    this.state = {
      email: null,
      password: null,
      formErrors: {
        email: "",
        password: "",
        loggedIn,
      }
  };
}
  handleSubmit = async e => {
    e.preventDefault();
    // validation and implementation of form (front end)
    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
    
    var response = await fetch('/api/LoginFaculty', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email:this.state.email,
        password:this.state.password})
    });
    console.log("Tokken value generated : "+response);
   // console.log("Tokken value generated : "+response.text());
    const body = await response.text();
    console.log("Tokken value generated : "+body);
    localStorage.setItem("token", body);
    this.setState({
      loggedIn: true
    })
    this.setState({ responseToPost: body });
 
    if(body)
    {
      const jwt = require('jsonwebtoken');
      const SECRETKEY = "myClientSecret"
      const token = localStorage.getItem("token")
      const realToken = token.split(":");
      const realtokenValue = realToken[1];
      const realToken1 = realtokenValue.split("}");
      const realtokenValue1 = realToken1[0];
      
      //console.log(realtokenValue1);
      var decode = jwt.verify(JSON.parse(realtokenValue1) , SECRETKEY);
      //console.log("JWT Akash"+ decode.user.email);
      const str = JSON.stringify(decode);
      //console.log("JWT verification"+ str);
      if(body)
      {
        this.props.history.push('/projectfaculty')
      } 
    } 
    else console.log("***********")

  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email= emailRegex.test(value)
          ? ""
          : "invalid emailaddress";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  
  render() {
    const { formErrors } = this.state;
    if(this.state.loggedIn === true){
      return <Redirect to="/NavigationFaculty" />
    }
    return (
      
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Login</h1>
          <form id="form_login" onSubmit={this.handleSubmit} noValidate>
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

            <div className="createAccount">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div> 
    );
  }
}

export default LoginFaculty;
