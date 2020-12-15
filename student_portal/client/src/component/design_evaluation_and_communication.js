import React, { Component } from "react";
import "./interaction.css";
import SpecifyingCommunicatingFinalDesign from './SpecifyingCommunicatingFinalDesign';
import ImplementingDesignDecision from './ImplementingDesignDecision';
import VerifyingEvaluatingDesign  from './VerifyingEvaluatingDesign';
import DesignStrategy from './DesignStrategy';
import Navigateproject from './navigateproject';


class componentform extends Component {
  
  state = {
    designTeam: '',
    developTasks: '',
    marketResearch: '', 
    estimatedCost: '',
    pdf_designTeam: '',
    pdf_developTasks: '',
    pdf_marketResearch: '',
    pdf_estimatedCost: ''
  };
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  showDiv()
  {
    var y=document.getElementById("ps").getAttribute("href")
    if(y==="#class20"){
     document.getElementById("class20").style.display="block"
     document.getElementById("class21").style.display="none"
     document.getElementById("class22").style.display="none"
     document.getElementById("class23").style.display="none"
     document.getElementById("class10").style.display="none"
    }
  }
  showDiv1(){
    var y1=document.getElementById("s").getAttribute("href")
    if(y1==="#class21"){
      document.getElementById("class21").style.display="block"
      document.getElementById("class20").style.display="none"
     document.getElementById("class22").style.display="none"
     document.getElementById("class23").style.display="none"
     document.getElementById("class10").style.display="none"
    }
  }
  showDiv2(){
    var y2=document.getElementById("ig").getAttribute("href")
    if(y2==="#class22"){
      document.getElementById("class22").style.display="block"
      document.getElementById("class20").style.display="none"
     document.getElementById("class21").style.display="none"
     document.getElementById("class23").style.display="none"
     document.getElementById("class10").style.display="none"
    }
  }
  showDiv3(){
    var y3=document.getElementById("ds").getAttribute("href")
    if(y3==="#class23"){
      document.getElementById("class23").style.display="block";
      document.getElementById("class22").style.display="none"
     document.getElementById("class21").style.display="none"
     document.getElementById("class20").style.display="none"
     document.getElementById("class10").style.display="none"

    }
  }

  
  render() {
    const { designTeam, developTasks, marketResearch, estimatedCost, pdf_designTeam, pdf_developTasks, pdf_marketResearch, pdf_estimatedCost } = this.state;
    const values = { designTeam, developTasks, marketResearch, estimatedCost, pdf_designTeam, pdf_developTasks, pdf_marketResearch, pdf_estimatedCost};
    return (
      <div> 
      <div>
          {console.log("near navigation of project")}
          <Navigateproject/>
      </div>
      <div className="bar1">
        <a href="#class20" onClick={this.showDiv} id="ps">1.1: Specifying and Communicating the Final Design</a>
        <a href="#class21" onClick={this.showDiv1} id="s">1.2: Implementing the Design Decision</a>
        <a href="#class22" onClick={this.showDiv2} id="ig">1.3: Verifying and Evaluating the Design</a>
        <a href="#class23" onClick={this.showDiv3} id="ds">1.4: Design Strategy</a>
        </div>
          <div id = "class10" className="form-wrapper"> 
           <p>
          <h4>Specifying and Communicating the Final Design</h4>
            Once the final design is selected and evaluated, the next step will be to make sure that all 
            stakeholders (members of the design team, management, client, users, manufacturing, etc.) are 
            provided sufficient details on the development and implementation aspects. The design process 
            communication may be accomplished through oral presentations, face to face or telephone conversations, 
            progress reports, or formal project reports. Detailed documentation will need to be provided on the costs,
            material specifications, technical drawings of components or assembly, quality and reliability, and other 
            design specifications as needed.
            <br></br>
            <br></br>
            </p><p>
            <h4>Implementing the Design Decision</h4> 
            Before implementing a full-scale version of the final design, it may be helpful to develop and test a pilot model through rapid prototyping or working prototype or simulation to further identify technical specifications required to generate the best solution. Design projects being implemented in this day and age are increasingly requiring multidisciplinary interactions between engineers from various fields (business, electrical and computer engineering, chemical engineering, biomedical engineering). It is therefore important to keep in mind that communication skills are just as important to the success of a project as are technical skills.  
            <br></br>
            <br></br>

            <h4>Verifying and Evaluating the Design</h4> 
            The last step in the design process involves evaluating whether the design project met the required 
            design specifications and performance criteria. A variety of methods including focus groups and 
            satisfaction surveys may be used along with sampling or testing the product, process or system to 
            ensure achievement of the optimum design. Typically, modifications and further refinement of the 
            design will be required before the optimum design can be achieved. The closing step of the design 
            process often marks the start of a new design process in search of the next generation of products, 
            processes, and systems because technology changes so rapidly. 
            <br></br>
            <br></br>
            </p><p>
            <h4>Design Strategy</h4>
            Due to the complexity in product design and conflicting requirements, the final product design needs 
            to be selected based on tradeoffs among various requirements such as performance, cost, weight, 
            robustness, manufacturing, implementation, aesthetics, etc. Different tradeoffs will lead to a variety of designs. 
            </p>
          </div>        
          <div id = "class20"><SpecifyingCommunicatingFinalDesign
          nextStep={this.showDiv1}
          handleChange={this.handleChange}
          values={values}
          /></div>
          <div id = "class21"><ImplementingDesignDecision
          nextStep={this.showDiv2}
          prevStep={this.showDiv}
          handleChange={this.handleChange}
          values={values}
          /></div>
          <div id = "class22"><VerifyingEvaluatingDesign
          nextStep={this.showDiv3}
          prevStep={this.showDiv1}
          handleChange={this.handleChange}
          values={values}
          /></div>
          <div id = "class23"><DesignStrategy
          prevStep={this.showDiv2}
          handleChange={this.handleChange}
          values={values}
          /></div>

        </div>   

    );
  }
}
export default componentform;
