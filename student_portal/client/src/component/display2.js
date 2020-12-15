import React, { Component } from "react";
import "./form.css";
import {Table} from "react-bootstrap"


const Project = props => (
    <tr>
      <td>{props.project.projectname}</td>
      <td>{props.project.projectdetails}</td>
      <td>{props.project.coordinator}</td>
      <td>{props.project.semester}</td>
      <td>{props.project.year}</td>
    </tr>
  )


class display extends Component {

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
      this.state = {value: ''};
      this.state = {min: ''};
      this.state = {max: ''};
      this.state = { disabled: true }; 
      this.state = { disabledzipcode: false }; 
      this.state = {projectsdata:[]};
      
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      
    }
  
    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
      
    }
  
    handleSubmit= async event => {
      event.preventDefault();
      console.log(`
        --SUBMITTING--
        value: ${this.state.value}
        max: ${this.state.max}
        min: ${this.state.min}
      `);
      var response = await fetch('/api/Check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            value:this.state.value,
            min:this.state.min,
            max:this.state.max,
            zipcode:this.state.zipcode
        })
      });
      const body = await response.text();
      console.log(this.body)
      this.setState({ responseToPost: body });
     
    }
    projectList() {
        return this.state.projectsdata.map(currentproject => {
          return <Project project={currentproject} />;
        })

        
      }
  
    render() {
        const { formErrors } = this.state;
      return (
        <div className="wrapper">
        <div className="form-wrapper">
        <h1>Filter Page</h1>
        <form id="form" onSubmit={this.handleSubmit}>
        <div className="search">
          <label htmlFor="search">Pick your filter:</label>
            
            <select name="value" value={this.state.value} onChange={this.handleChange}>
                <option value="0">Select</option>
                <option value="1">Income</option>
                <option value="2">Price</option>
                <option value="3">Student Score</option>
                <option value="4">Crime Rate</option>
                <option value="6">Zipcode</option>
            </select>
          </div>
          <div className="min">
          <label htmlFor="min">min value</label>
          <input 
                placeholder="Minimum"
                type="text"
                id="min"
                value={this.state.min}
                name="min"
                disabled= {(this.state.disabled)? "disabled" : ""}
                onChange={this.handleChange}
                
                />

          </div>
          <div className="max">
          <label htmlFor="max">max value</label>
          <input 
                placeholder="Maxmimun"
                type="text"
                id="max"
                value={this.state.max}
                name="max"
                onChange={this.handleChange}
                disabled={(this.state.disabled)? "disabled" : ""}
                />
          </div>
          <div className="zipcode">
          <label htmlFor="zipcode">zipcode</label>
          <input 
                placeholder="Zipcode"
                type="text"
                id="zipcode"
                value={this.state.zipcode}
                name="zipcode"
                onChange={this.handleChange}
                disabled = {(this.state.disabledzipcode)? "disabled" : ""}
                />
          </div>
          <div className="createAccount">
          <button type="submit">Search</button>
        </div>  
        </form>
        </div>
        <div className="table">
            <Table striped bordered hover variant="dark">
                    <thead> 
                        <tr>
                        <th>Project Name</th>
                        <th>Description</th>
                        <th>Mentor</th>
                        <th>semester</th>
                        <th>year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.projectList()}
                    </tbody>
            </Table>
            </div>
        </div>
      );
    }
}
export default display



