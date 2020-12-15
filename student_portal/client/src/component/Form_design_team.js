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

class Form_design_team extends Component {

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
//       stakeholders: null,
//       formErrors: {
//         stakeholders: "",
//       }
//   };
// }
continue = e => {
  e.preventDefault();
  this.props.nextStep();
  console.log(this.props.values);
};
  // handleSubmit = async e => {
  //   e.preventDefault();
  //   // validation and implementation of form (front end)
  //   if (formValid(this.state)) {
  //     console.log(`
  //       --SUBMITTING--
  //       designBrief: ${this.state.designBrief}
  //     `);
  //   } else {
  //     console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
  //   }
    
  //   var response = await fetch('/api/Componentfrom', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       stakeholders:this.state.stakeholders,
  //       })
  //   });
  //   const body = await response.text();
  //   console.log(this.body)
  //   this.setState({ responseToPost: body });
  // };

  // handleChange = e => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   let formErrors = { ...this.state.formErrors };

  //   switch (name) {
  //     case "stakeholders":
  //       formErrors.stakeholders =
  //         value.length < 3 ? "minimum 3 characaters required" : "";
  //       break;
  //     default:
  //       break;
  //   }
    

  //   this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    
  // };


  // enable(){
  
  //   var v = document.getElementById("information").value;
  //   console.log(v)
  //   if( v == 0)
  //   {
  //       document.getElementById("file").disabled=false;
  //   } 

  // }
  
  render() {
    const { formErrors } = this.state;
    const { values,handleChange } = this.props;
    return (
      <div className="wrapper">
      <div className="form-wrapper">
      <form id="form" onSubmit={this.continue} noValidate>
      <div className="stakeholders">
              <label htmlFor="stakeholders">Form design team</label>
              <input
                placeholder="Form design team"
                type="text"
                id="designTeam"
                value={values.designTeam}
                name="designTeam"
                noValidate
                onChange={handleChange('designTeam')}
              />
            </div>
            <div className="file">
            <input 
             id='file' 
             type="file" 
             name="pdf_designTeam" 
             onChange={handleChange('pdf_designTeam')}
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
    export default Form_design_team;
