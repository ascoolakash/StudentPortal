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

class Estimate_schedule_and_cost extends Component {

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
      stakeholders: null,
      formErrors: {
        stakeholders: "",
      }
  };
}
back = e => {
  e.preventDefault();
  this.props.prevStep();
  console.log(this.props.values);
};
  handleSubmit = async e => {
    e.preventDefault();
    const { values, handleChange } = this.props;
    //Uploading data to form data
    const fileField1 = document.querySelector('input[type="file"][name="pdf_designTeam"]');
    console.log("AKASH    "+fileField1);
    const fileField2 = document.querySelector('input[type="file"][name="pdf_developTasks"]');
    console.log("AKASH    "+fileField2);
    const fileField3 = document.querySelector('input[type="file"][name="pdf_marketResearch"]');
    console.log("AKASH    "+fileField3);
    const fileField4 = document.querySelector('input[type="file"][name="pdf_estimatedCost"]');
    const formData = new FormData();
    formData.append('designTeam', values.designTeam);
    formData.append('developTasks', values.developTasks);
    formData.append('marketResearch', values.marketResearch);
    formData.append('estimatedCost', values.estimatedCost);
    formData.append('pdf_designTeam', fileField1.files[0]);
    formData.append('pdf_developTasks', fileField2.files[0]);
    formData.append('pdf_marketResearch', fileField3.files[0]);
    formData.append('pdf_estimatedCost', fileField4.files[0]);
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }
    console.log(fileField3.files[0]);
    console.log(formData);
    
    // // validation and implementation of form (front end)
    // if (formValid(this.state)) {
    //   console.log(`
    //     --SUBMITTING--
    //     designBrief: ${this.state.designBrief}
    //   `);
    // } else {
    //   console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    // }
    
    var response = await fetch('/api/project_planning', {
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
      case "stakeholders":
        formErrors.stakeholders =
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
    const { formErrors } = this.state;
    const { values,handleChange } = this.props;
    return (
      <div className="wrapper">
      <div className="form-wrapper">
      <form id="form" onSubmit={this.handleSubmit} noValidate>
      <div className="stakeholders">
              <label htmlFor="stakeholders">Estimate schedule and cost</label>
              <input
                placeholder="Estimate schedule and cost"
                type="text"
                id="stakeholders"
                value={values.estimatedCost}
                name="stakeholders"
                noValidate
                onChange={handleChange('estimatedCost')}
              />
            </div>
            <div className="file">
            <input 
             id='file' 
             type="file" 
             name="pdf_estimatedCost" 
             accept="*"
             onChange={handleChange('pdf_estimatedCost')}
            />
            </div>
            <div className="createAccount">
              <button type="submit">Submit</button>
              <button type="submit" onClick={this.back} >Back</button>
              <small></small>
            </div>
        </form>
        </div>
        </div>
    );
              }
            }
    export default Estimate_schedule_and_cost;
