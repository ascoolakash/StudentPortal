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

class Infogathering extends Component {

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
//       information:null,
//       informationgathering:null,
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
    console.log("Akash"+this.state.information);
    formData.append('file', fileField.files[0]);
    formData.append('information', this.state.information);
    formData.append('informationgathering', this.state.informationgathering);
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }
    console.log(fileField.files[0]);
    console.log(formData)
    //console.log("Akash")
    // validation and implementation of form (front end)
    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        information: ${this.state.information}
        designBrief: ${this.state.designBrief}
        informationgathering: ${this.state.informationgathering}
        file:${this.state.file}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
    
    var response = await fetch('/api/design_need', {
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
      case "information":
        formErrors.information = value.length < 1 ? "minimum 3 characaters required" : "";
        break;
      case "informationgathering":
        formErrors.informationgathering = value.length < 3 ? "minimum 3 characaters required" : "";
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
      <div className="information">
              <label htmlFor="information"> What are the key exploratory questions that need to be answered for various stakeholders through research, literature and benchmarking?</label>
              <select id ="information" name="information" value={values.information} onChange={handleChange('information')}>
                <option value="">Select</option>
                <option value="0">Observation</option>
                <option value="1">Survey</option>
                <option value="2">Form Groups</option>
              </select>
            </div>
            <div className="informationgathering">
            <input
                placeholder="Information Gathering"
                type="informationgathering"
                id="informationgathering"
                value={values.informationgathering}
                name="informationgathering"
                noValidate
                onChange={handleChange('informationgathering')}
              />
            </div>
            <div className="file">
            <input 
             id='file' 
             type="file" 
             name="pdf_info" 
             onChange={handleChange('pdf_info')}
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
    export default Infogathering;
