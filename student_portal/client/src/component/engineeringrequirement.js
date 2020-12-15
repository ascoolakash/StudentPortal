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

class EnginneringRequirement extends Component {

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
//         engineering: null,
//       formErrors: {
//         engineering: "",
        
//       }
//   };
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

    //customerReq, OFDpro, EngReq, pdf_customerReq, pdf_OFDprocess, pdf_EngReq
    const fileField1 = document.querySelector('input[type="file"][name="pdf_customerReq"]');
    console.log("AKASH    "+fileField1);
    const fileField2 = document.querySelector('input[type="file"][name="pdf_OFDpro"]');
    console.log("AKASH    "+fileField2);
    const fileField3 = document.querySelector('input[type="file"][name="pdf_EngReq"]');
    console.log("AKASH    "+fileField3);
    formData.append('customerReq', values.customerReq);
    formData.append('OFDpro', values.OFDpro);
    formData.append('EngReq', values.EngReq);
    formData.append('pdf_customerReq', fileField1.files[0]);
    formData.append('pdf_OFDpro', fileField2.files[0]);
    formData.append('pdf_EngReq', fileField3.files[0]);
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }
    console.log(fileField3.files[0]);
    console.log(formData);
    
    var response = await fetch('/api/design_requirement', {
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
      case "projectStatement":
        formErrors.engineering =
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
            <div className="engineering">
              <label htmlFor="engineering">Enginnering Requirement</label>
              <input
                placeholder="Enginnering Requirement"
                type="text"
                id="engineering"
                value={values.EngReq}
                name="engineering"
                noValidate
                onChange={handleChange('EngReq')}
              />
            </div>
            <div className="file">
            <input 
             id='file' 
             type="file" 
             name="pdf_EngReq" 
             accept="*"
             onChange={handleChange('pdf_EngReq')}
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
export default EnginneringRequirement;
