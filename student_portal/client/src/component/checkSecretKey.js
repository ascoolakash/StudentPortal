import React, { Component } from "react";
import {Redirect} from "react-router-dom"
import "./form.css";

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

class checkSecretKey extends Component {

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
      SecretToken: null,
      password: null,
      formErrors: {
        SecretToken: "",
        password: "",
      }
  };
}
  handleSubmit = async e => {
    e.preventDefault();
    // validation and implementation of form (front end)
    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Email: ${this.state.SecretToken}
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
    
    var response = await fetch('/api/checkSecretToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        SecretToken:this.state.SecretToken,
        password:this.state.password})
    });
    console.log("Tokken value generated : "+response);
   // console.log("Tokken value generated : "+response.text());
    const body = await response.text();
    console.log("Tokken value generated : "+body);
    this.setState({ responseToPost: body });
 
    if(body )
    {
        console.log("Learning and less time "+body)
      //console.log("JWT verification"+ str);
      /*if(body === "Secret Token does not match, Please check the secret token")
      {
        this.props.history.push('/checkSecretKey')
      }else*/ if(body === "updated"){

        this.props.history.push('/LoginFaculty')
      }
    } 
    else console.log("***********")

  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "SecretToken":
        formErrors.SecretToken= value.length < 6
          ? ""
          : "invalid secret token";
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
      return <Redirect to="/NavigationCoordinator" />
    }
    return (
      
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Reset Password</h1>
          <form id="form_login" onSubmit={this.handleSubmit} noValidate>
            <div className="password">
              <label htmlFor="Secret Token">Type Verification Key</label>
              <input
                className={formErrors.SecretToken.length > 0 ? "error" : null}
                placeholder="Secret Token"
                type="password"
                id="SecretToken"
                value={this.state.email}
                name="SecretToken"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.SecretToken.length > 0 && (
                <span className="errorMessage">{formErrors.SecretToken}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Reset Password</label>
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
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div> 
    );
  }
}

export default checkSecretKey;
