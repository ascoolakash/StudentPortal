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

class Referencebooksandtradejournals extends Component {

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
//       refernce: null,
//       formErrors: {
//         refernce: "",
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
    const fileField1 = document.querySelector('input[type="file"][name="pdf_functionalrequirement"]');
    console.log("AKASH    "+fileField1);
    const fileField2 = document.querySelector('input[type="file"][name="pdf_brainstroming"]');
    console.log("AKASH    "+fileField2);
    const fileField3 = document.querySelector('input[type="file"][name="pdf_experts"]');
    console.log("AKASH    "+fileField3);
    const fileField4 = document.querySelector('input[type="file"][name="pdf_patents"]');
    console.log("AKASH    "+fileField4);
    const fileField5 = document.querySelector('input[type="file"][name="pdf_refernce"]');
   formData.append('functionalrequirement', values.functionalrequirement);
   formData.append('brainstroming', values.brainstroming);
   formData.append('experts', values.experts);
   formData.append('patents', values.patents);
   formData.append('refernce', values.refernce);
   formData.append('pdf_functionalrequirement', fileField1.files[0]);
   formData.append('pdf_brainstroming', fileField2.files[0]);
   formData.append('pdf_experts', fileField3.files[0]);
   formData.append('pdf_patents', fileField4.files[0]);
   formData.append('pdf_refernce', fileField5.files[0]);
   for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }
    console.log(fileField3.files[0]);
    console.log(formData);
    
    
    var response = await fetch('/api/design_concepts', {
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
      case "refernce":
        formErrors.refernce =
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
      <div className="refernce">
              <label htmlFor="refernce">Reference books and trade journals</label>
              <input
                placeholder="Reference books and trade journals"
                type="text"
                id="refernce"
                value={values.refernce}
                name="refernce"
                noValidate
                onChange={handleChange('refernce')}
              />
            </div>
            <div className="file">
            <input 
             id='file' 
             type="file" 
             name="pdf_refernce" 
             accept="*"
             onChange={handleChange('pdf_refernce')}
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
    export default Referencebooksandtradejournals;
