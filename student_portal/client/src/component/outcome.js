import React, { Component } from "react";
import "./interaction.css";
import { formatDistanceStrict } from "date-fns";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(this.props.values).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Outcome extends Component {

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
//       outcome: null,
//       file:null,
//       formErrors: {
//         stakeholders: "",
//         file:""
//       }  };
// }

back = e => {
  e.preventDefault();
  this.props.prevStep();
  console.log(this.props.values);
};
  handleSubmit = async e => {
    e.preventDefault();
    const { values, handleChange } = this.props;
     //Uploading data to form data
     const formData = new FormData();

     
     const fileField1 = document.querySelector('input[type="file"][name="pdf_project"]');
     console.log("AKASH    "+fileField1);
     const fileField2 = document.querySelector('input[type="file"][name="pdf_stakeholder"]');
     console.log("AKASH    "+fileField2);
     const fileField3 = document.querySelector('input[type="file"][name="pdf_info"]');
     console.log("AKASH    "+fileField3);
     const fileField4 = document.querySelector('input[type="file"][name="pdf_design"]');
     console.log("AKASH    "+fileField4);
     const fileField5 = document.querySelector('input[type="file"][name="pdf_outcome"]');
   //  this.props.values.pdf = fileField.files[0];
   console.log("AKASH    "+fileField5);
    formData.append('projectStatement', values.projectStatement);
    // Array.prototype.forEach.call(
    //   querySelectorAll('input[type=file]'),
    //   function (input, i) {
    //     // use the input name, don't invent another one
    //     if (input.value) formData.append(input.name, input.files[0]);
    //   })
    formData.append('stakeholders', values.stakeholders);
    formData.append('information', values.information);
    formData.append('informationgathering', values.informationgathering);
    formData.append('designBrief', values.designBrief);
    formData.append('outcome', values.outcome);
    formData.append('pdf_project', fileField1.files[0]);
    formData.append('pdf_stakeholder', fileField2.files[0]);
    formData.append('pdf_info', fileField3.files[0]);
    formData.append('pdf_design', fileField4.files[0]);
    formData.append('pdf_outcome', fileField5.files[0]);
    // Array.prototype.forEach.call(
    //   e.currentTarget.querySelectorAll('input[type=file]'),
    //   function (input, i) {
    //     // use the input name, don't invent another one
    //     if (input.value) formData.append(input.name, input.files[0]);
    //   })
    for (var key of formData.entries()) {
       console.log(key[0] + ', ' + key[1]);
     }
     console.log(fileField3.files[0]);
     console.log(formData);
     
     
    // validation and implementation of form (front end)
    // if (formValid(this.state)) {
    //   console.log(`
    //     --SUBMITTING--
    //     outcome: ${this.state.outcome}
    //     file:${this.state.file}
    //   `);
    // } else {
    //   console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    // }
    
    var response = await fetch('/api/design_need', {
      method: 'POST',
      body:formData
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
        formErrors.outcome =
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
    const { values, handleChange } = this.props;

    return (
      <div className="wrapper">
      <div className="form-wrapper">
      <form id="form" onSubmit={this.handleSubmit} noValidate>
      <div className="stakeholders">
              <label htmlFor="stakeholders">What are the expected outcomes and innovations?</label>
              <input
                placeholder="outcome and innovations"
                type="text"
                id="outcome"
                value={values.outcome}
                name="outcome"
                noValidate
                onChange={handleChange('outcome')}
              />
            </div>
            <div className="file">
            <input 
             id='file' 
             type="file" 
             name="pdf_outcome" 
             onChange={handleChange('pdf_outcome')}
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
    export default Outcome;
