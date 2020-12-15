import React, { Component } from "react";
import "./interaction.css";
import DesignReview from './DesignReview';
// import Stakeholder from './stakeholder';
// import Infogathering  from './infogathering';
// import Designbrief from './designbrief';
// import Outcomes from './outcome.js'
import img7 from '../images/img7.png'



class componentform extends Component {


  showDiv()
  {
    var y=document.getElementById("ps").getAttribute("href")
    if(y==="#class19"){
     document.getElementById("class19").style.display="block"
     document.getElementById("class10").style.display="none"
    }
  }
  


  
  render() {

    return (
        
      <div> 
       <div className="bar1">
        <a href="#class19" onClick={this.showDiv} id="ps">Design Review</a>
        {/* <a href="#class1" onClick={this.showDiv1} id="s">1.2: Stakeholder/Target User</a>
        <a href="#class2" onClick={this.showDiv2} id="ig">1.3: Information Gathering</a>
        <a href="#class3" onClick={this.showDiv3} id="ds">1.4: Focus</a>
        <a href="#class4" onClick={this.showDiv4} id="ot">1.5: Outcomes/Innovations</a> */}
        </div>  
        <div id = "class10" className="form-wrapper"> 
            <p>
            The designers and the design team should be able to clearly communicate with all stakeholders as well as management or manufacturing teams, or clients or vendors 
            following the development of a quality design.</p>
             <br></br>
             <br></br>
             <h4>Design Review</h4><p>  
             At critical steps of the design journey process, design reviews are conducted with all stakeholders to 
             ensure the design meets all the requirements related to the project. Usually, the design reviews are 
             comprehensive and document processes intended to evaluate the design from multiple stakeholder’s 
             perspective and at the same time to identify any potential problems/risks. Detection of errors early in the 
             design process may prevent unnecessary costs, failures, and the associate time spent on the projects.
             </p>
             <img src={img7}></img>
          </div>        



          <div id = "class19"><DesignReview/></div>
        </div>
        
      
        
    );
  }
}
export default componentform;
