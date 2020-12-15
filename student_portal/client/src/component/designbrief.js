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

class DesignBrief extends Component {

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
//       designBrief: null,
//       file:null,
//       formErrors: {
//         stakeholders: "",
//         file:""
//       }
//   };
// }
continue = e => {
  e.preventDefault();
  this.props.nextStep();
  console.log(this.props.values);
};

back = e => {
  e.preventDefault();
  this.props.prevStep();
  console.log(this.props.values);
};
  handleSubmit = async e => {
    e.preventDefault();
    //Uploading data to form data
    const formData = new FormData();

    const fileField = document.querySelector('input[type="file"]');
    this.state.file = fileField.files[0];
    formData.append('file', fileField.files[0]);
    formData.append('designBrief', this.state.designBrief);
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }
    console.log(fileField.files[0]);
    console.log(formData);
    
    // validation and implementation of form (front end)
    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        designBrief: ${this.state.designBrief}
        file:${this.state.file}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
    
    var response = await fetch('/api/Componentfrom', {
      method: 'POST',
      body: formData
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
      case "designBrief":
        formErrors.designBrief = value.length < 3 ? "minimum 3 characaters required" : "";
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
    const { formErrors } = this.state;
    const { values, handleChange } = this.props;

    return (
      <div className="wrapper">
      <div className="form-wrapper">
      <form id="form" onSubmit={this.handleSubmit} noValidate>
      <div className="designBrief">
              <label htmlFor="designBrief">What is the focus within/outside of the scope of the project?</label>
              <input
                placeholder="focus"
                type="designBrief"
                id="designBrief"
                value={values.designBrief}
                name="designBrief"
                noValidate
                onChange={handleChange('designBrief')}
              />
            </div>
            <div className="file">
            <input 
             id='file' 
             type="file" 
             name="pdf_design" 
             onChange={handleChange('pdf_design')}
            />
            </div>
            <div className="createAccount">
                <button type="submit" onClick={this.continue} >Continue</button>
                <button type="submit" onClick={this.back} >Back</button>
            </div>
        </form>
        </div>
        </div>
    );
              }
            }
    export default DesignBrief;
