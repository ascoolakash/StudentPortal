import React, { Component } from "react";
import "./interaction.css";
import DesignStandards from './Designstandard';
// import Stakeholder from './stakeholder';
// import Infogathering  from './infogathering';
// import Designbrief from './designbrief';
// import Outcomes from './outcome.js'
import img5 from '../images/img5.png'
import Navigateproject from './navigateproject';


class componentform extends Component {

  state = {
    designstandard: '',
    pdf_designstandard: ''
  };
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  showDiv()
  {
    var y=document.getElementById("ps").getAttribute("href")
    if(y==="#class19"){
     document.getElementById("class19").style.display="block"
     document.getElementById("class10").style.display="none"
    }
  }


  
  render() {
    const { designstandard, pdf_designstandard } = this.state;
    const values = { designstandard, pdf_designstandard };


    return (
      <div> 
      <div>
          {console.log("near navigation of project")}
          <Navigateproject/>
      </div>
       <div className="bar1">
        <a href="#class19" onClick={this.showDiv} id="ps">Design Standards</a>
        {/* <a href="#class1" onClick={this.showDiv1} id="s">1.2: Stakeholder/Target User</a>
        <a href="#class2" onClick={this.showDiv2} id="ig">1.3: Information Gathering</a>
        <a href="#class3" onClick={this.showDiv3} id="ds">1.4: Focus</a>
        <a href="#class4" onClick={this.showDiv4} id="ot">1.5: Outcomes/Innovations</a> */}
        </div>  
        <div id = "class10" className="form-wrapper"> 
            <p>
             After design concepts have been generated and evaluated as discussed in the previous chapter, 
             the candidate/final concept should be refined into an actual product or final design. The design 
             realization and evaluation step emphasizes the importance of the concurrent design of the product
             and the manufacturing process as shown in Figure below.
             <br></br>
             <br></br>
             <img src={img5}></img>
             <h4>Design Standards</h4> 
             When designing, students need to be aware of various standards that need to be 
             followed in order for the design to be marketable and acceptable to customers. 
             These standards many involve rules, policies, guidelines and are recognized by professional 
             organizations, state and federal governments and agencies.  A number of national and 
             professional organizations require implementing standards in the designs that are applied 
             to specific applications.
             </p>
          </div>        



          <div id = "class19"><DesignStandards
           handleChange={this.handleChange}
           values={values}
          /></div>
          {/* <div id = "class1"><Stakeholder/></div>
          <div id = "class2"><Infogathering/></div>
          <div id = "class3"><Designbrief/></div>
          <div id = "class4"><Outcomes/></div>  */}
        </div>
        
      
        
    );
  }
}
export default componentform;
