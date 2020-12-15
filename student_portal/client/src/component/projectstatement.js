import React, { Component } from "react";
import "./interaction.css";




//const $ = window.$;

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

class ProjectStatement extends Component {

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

  


//   constructor(props) {
//     super(props);
//     this.state = {
//      projectStatement: null,
//      file:null,
//       formErrors: {
//         projectStatement: "",
//         file:""
//       }
//   };
//   console.log(this.state.file);
// }

continue = e => {
  e.preventDefault();
  this.props.nextStep();
  console.log(this.props.values);
};
  handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    
    const fileField = document.querySelector('input[type="file"]');
    this.state.file = fileField.files[0];
    formData.append('file', this.state.file);
    formData.append('projectStatement', this.state.projectStatement);
    
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
  }
    console.log(fileField.files[0]);
    console.log(formData)
    console.log("Akash")
    // validation and implementation of form (front end)
    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Project Statement: ${this.state.projectStatement}
        file:${this.state.file}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
    
    var response = await fetch('/api/design_need', {
      method: 'POST',
    
      body: formData
      // JSON.stringify({projectStatement:this.state.projectStatement,
      //   file:fileField.files[0]//'/home/ascoo/Pictures/new1.png'
      // })
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
      case "projectStatement":
        formErrors.projectStatement =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      default:
        break;
    }
    

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    
  };


  enable(){
  
    var v = document.getElementById("information").value;
    console.log(v)
    if( v == 0)
    {
        document.getElementById("file").disabled=false;
    } 

  }
  
  render() {
    const { values,handleChange } = this.props;
    return (
      <div className="wrapper">
      <div className="form-wrapper">
      <form id="form" onSubmit={this.continue} >
            <div className="projectStatement">
              <label htmlFor="projectStatement">What is the problem description and objectives?</label>
              <input
                placeholder="Project Statement"
                type="text"
                id="projectStatement"
                value={values.projectStatement}
                name="projectStatement"
                noValidate
                onChange={handleChange('projectStatement')}
              />
              </div>
            <div className="file">
            <input 
             id='file' 
             type="file" 
             name="pdf_project" 
             onChange={handleChange('pdf_project')}
            />
            </div>
            <div className="createAccount">
              <button type="submit">Continue</button>
              <small></small>
            </div>
        </form>
        </div>
        </div>
    );
              }
            }
    export default ProjectStatement;
