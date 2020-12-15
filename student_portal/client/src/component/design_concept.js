import React, { Component } from "react";
import "./interaction.css";
import img3 from '../images/img3.png'
import img4 from '../images/img4.png'
import  FunctionalRequirement from './FunctionalRequirement';
import Brainstroming from './Brainstroming';
import Experts  from './experts';
import Patents from './Patents';
import Referencebooksandtradejournals from './Referencebooksandtradejournals'
import Navigateproject from './navigateproject';


class componentform extends Component {

  state = {
    functionalrequirement: '',
    brainstroming: '',
    experts: '',
    patents: '',
    refernce: '',
    pdf_functionalrequirement: '',
    pdf_brainstroming: '',
    pdf_experts: '',
    pdf_patents: '',
    pdf_refernce: ''
  };
  
  
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  showDiv()
  {
    var y=document.getElementById("ps").getAttribute("href")
    if(y==="#class14"){
     document.getElementById("class14").style.display="block"
     document.getElementById("class15").style.display="none"
     document.getElementById("class16").style.display="none"
     document.getElementById("class17").style.display="none"
     document.getElementById("class18").style.display="none"
     document.getElementById("class10").style.display="none"
    }
  }
  showDiv1(){
    var y1=document.getElementById("s").getAttribute("href")
    if(y1==="#class15"){
      document.getElementById("class15").style.display="block"
      document.getElementById("class14").style.display="none"
     document.getElementById("class16").style.display="none"
     document.getElementById("class17").style.display="none"
     document.getElementById("class18").style.display="none"
     document.getElementById("class10").style.display="none"
    }
  }
  showDiv2(){
    var y2=document.getElementById("ig").getAttribute("href")
    if(y2==="#class16"){
      document.getElementById("class16").style.display="block"
      document.getElementById("class14").style.display="none"
     document.getElementById("class15").style.display="none"
     document.getElementById("class17").style.display="none"
     document.getElementById("class18").style.display="none"
     document.getElementById("class10").style.display="none"
    }
  }
  showDiv3(){
    var y3=document.getElementById("ds").getAttribute("href")
    if(y3==="#class17"){
      document.getElementById("class17").style.display="block";
      document.getElementById("class14").style.display="none"
     document.getElementById("class15").style.display="none"
     document.getElementById("class16").style.display="none"
     document.getElementById("class18").style.display="none"
     document.getElementById("class10").style.display="none"
    }

  }
  showDiv4(){
    var y4=document.getElementById("ot").getAttribute("href")
    if(y4==="#class18"){
      document.getElementById("class18").style.display="block";
      document.getElementById("class14").style.display="none"
     document.getElementById("class15").style.display="none"
     document.getElementById("class16").style.display="none"
     document.getElementById("class17").style.display="none"
     document.getElementById("class10").style.display="none"
    }
    
  }

  
  render() {

    const { functionalrequirement, brainstroming, experts, patents, refernce, pdf_functionalrequirement, pdf_brainstroming, pdf_experts, pdf_patents, pdf_refernce } = this.state;
    const values = {functionalrequirement, brainstroming, experts, patents, refernce, pdf_functionalrequirement, pdf_brainstroming, pdf_experts, pdf_patents, pdf_refernce};



    return (
      <div> 
      <div>
          {console.log("near navigation of project")}
          <Navigateproject/>
      </div>
      <div className="bar1">
        <a href="#class14" onClick={this.showDiv} id="ps">1.1:Functional Requirement </a>
        <a href="#class15" onClick={this.showDiv1} id="s">1.2:Brainstroming </a>
        <a href="#class16" onClick={this.showDiv2} id="ig">1.3:Experts </a>
        <a href="#class17" onClick={this.showDiv3} id="ds">1.4:Patents </a>
        <a href="#class18" onClick={this.showDiv4} id="ot">1.5:Reference books and trade journals </a>
        </div> 
        <div id = "class10" className="form-wrapper"> 
            <p>
             In order to develop the best possible design, it is essential to develop a good understanding 
             of the design problem and generate a set of design criteria/engineering specifications. 
             Misunderstanding a design problem may result in bad design, higher cost, and delay in time to market.
             Therefore, it is very important to understand the design problem first before searching for any possible 
             solutions. The goal in understanding the design problem is to translate customer needs into engineering 
             specifications with specific target values.
             </p>
             <img src={img3}></img>
             <p>
             Translation of customer requirements into engineering requirements
             </p>
             <p>
             <h4> Concepts Evaluation:</h4>  In order to identify a “good” concept that meets all the customer/stakeholders requirements, 
             robust concept evaluation methods are required. The goal for the concept evaluation is to find a candidate concept
              that is customer focused, competitively designed, reduces time to production, and has buy-in from multiple 
              stakeholders. Listing all the advantages and disadvantages of various concepts can be helpful in identifying
               the best candidate concept. Also, several computer-based optimization techniques are also available for 
               evaluating concepts for complicated design problems. Figure 5.5 shows an overview of concept evaluation 
               as well as the techniques used during this step of the design process. 
             </p>
             <img src={img4}></img>
          </div>        



          <div id = "class14"><FunctionalRequirement
              nextStep={this.showDiv1}
              handleChange={this.handleChange}
              values={values}
          /></div>
          <div id = "class15"><Brainstroming
           nextStep={this.showDiv2}
           prevStep={this.showDiv}
           handleChange={this.handleChange}
           values={values}
         /></div>
          <div id = "class16"><Experts
             nextStep={this.showDiv3}
             prevStep={this.showDiv1}
             handleChange={this.handleChange}
             values={values}
          /></div>
          <div id = "class17"><Patents
                nextStep={this.showDiv4}
                prevStep={this.showDiv2}
                handleChange={this.handleChange}
                values={values}
          /></div>
          <div id = "class18"><Referencebooksandtradejournals
            handleChange={this.handleChange}
            prevStep={this.showDiv2}
            values={values}
          /></div>
        </div>
        
      
        
    );
  }
}
export default componentform;
