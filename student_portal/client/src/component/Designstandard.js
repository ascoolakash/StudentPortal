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

class DesignStandard extends Component {

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
    const { values, handleChange } = this.props;
    const formData = new FormData();
    
    const fileField = document.querySelector('input[type="file"]');
    this.state.file = fileField.files[0];
    formData.append('designstandard', values.designstandard);
    formData.append('pdf_designstandard', fileField.files[0]);
    
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
  }
    console.log(fileField.files[0]);
    console.log(formData)
    console.log("Akash")
    
    var response = await fetch('/api/detail_design_evaluation', {
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
        formErrors.designstandard =
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
      <form id="form" onSubmit={this.handleSubmit} >
            <div className="stakeholders">
              <label htmlFor="projectStatement">What are the design standards followed?</label>
              <input
                placeholder="Design Standards"
                type="text"
                id="desginstandard"
                value={values.designstandard}
                name="designstandard"
                noValidate
                onChange={handleChange('designstandard')}
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
            <button type="submit">Submit</button>
              <small></small>
            </div>
        </form>
        </div>
        </div>
    );
              }
            }
    export default DesignStandard;
