import React, { Component } from "react";
import "./interaction.css";
import Projectstatement from './projectstatement';
import Stakeholder from './stakeholder';
import Infogathering  from './infogathering';
import Designbrief from './designbrief';
import Outcomes from './outcome.js';
import Navigateproject from './navigateproject';



class componentform extends Component {

  state = {
    step: 1,
    projectStatement: '',
    stakeholders: '',
    information: '',
    informationgathering: '',
    designBrief: '',
    outcome: '',
    pdf_project: '',
    pdf_stakeholder: '',
    pdf_info: '',
    pdf_design: '',
    pdf_outcome: ''
  };
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  showDiv()
  {
    var y=document.getElementById("ps").getAttribute("href")
    if(y==="#class0"){
     document.getElementById("class0").style.display="block"
     document.getElementById("class1").style.display="none"
     document.getElementById("class2").style.display="none"
     document.getElementById("class3").style.display="none"
     document.getElementById("class4").style.display="none"
     document.getElementById("class10").style.display="none"
    }
  }
  showDiv1(){
    var y1=document.getElementById("s").getAttribute("href")
    if(y1==="#class1"){
      document.getElementById("class1").style.display="block"
      document.getElementById("class0").style.display="none"
     document.getElementById("class2").style.display="none"
     document.getElementById("class3").style.display="none"
     document.getElementById("class4").style.display="none"
     document.getElementById("class10").style.display="none"
    }
  }
  showDiv2(){
    var y2=document.getElementById("ig").getAttribute("href")
    if(y2==="#class2"){
      document.getElementById("class2").style.display="block"
      document.getElementById("class1").style.display="none"
     document.getElementById("class0").style.display="none"
     document.getElementById("class3").style.display="none"
     document.getElementById("class4").style.display="none"
     document.getElementById("class10").style.display="none"
    }
  }
  showDiv3(){
    var y3=document.getElementById("ds").getAttribute("href")
    if(y3==="#class3"){
      document.getElementById("class3").style.display="block";
      document.getElementById("class1").style.display="none"
     document.getElementById("class2").style.display="none"
     document.getElementById("class0").style.display="none"
     document.getElementById("class4").style.display="none"
     document.getElementById("class10").style.display="none"
    }

  }
  showDiv4(){
    var y4=document.getElementById("ot").getAttribute("href")
    if(y4==="#class4"){
      document.getElementById("class4").style.display="block";
      document.getElementById("class1").style.display="none"
     document.getElementById("class2").style.display="none"
     document.getElementById("class0").style.display="none"
     document.getElementById("class3").style.display="none"
     document.getElementById("class10").style.display="none"
    }
    
  }

  
  render() {
    const { projectStatement, stakeholders, information, informationgathering, designBrief, outcome, pdf_project, pdf_stakeholder, pdf_info, pdf_design, pdf_outcome } = this.state;
    const values = { projectStatement, stakeholders, information, informationgathering, designBrief, outcome, pdf_project, pdf_stakeholder, pdf_info, pdf_design, pdf_outcome};



    return (
      <div> 
        <div>
          {console.log("near navigation of project")}
          <Navigateproject/>
        </div>
        <div className="bar1">
          <a href="#class0" onClick={this.showDiv} id="ps">1.1: Project Description/Objective</a>
          <a href="#class1" onClick={this.showDiv1} id="s">1.2: Stakeholder/Target User</a>
          <a href="#class2" onClick={this.showDiv2} id="ig">1.3: Information Gathering</a>
          <a href="#class3" onClick={this.showDiv3} id="ds">1.4: Focus</a>
          <a href="#class4" onClick={this.showDiv4} id="ot">1.5: Outcomes/Innovations</a>
          </div> 
          <div id = "class10" className="form-wrapper"> 
              <p>
              <h3>Design Need</h3>
              Identifying a design need and defining the need in measurable terms is not as easy as it may seem. 
              Needs may be market-driven, or may come from private industry or introduction of new technology.
              Most design problems are not well defined and are open ended. The design project statement may not 
              give all the information needed to find the solution. Identifying the missing information will be the key 
              to fully understanding what needs to be designed. The goal in product design is to find the best solution 
              that leads to a quality product with minimal cost and limited resources. 
              <br></br>
              <br></br>
              It is the primary task of the designer/team to communicate closely with the clients and end users to 
              fully understand the need, and assist the clients in creating a product or service that most closely 
              meets that need. Clients, stakeholders, users and designers typically work together in teams in defining 
              and carrying out design related projects.
              <br></br>
              <br></br>
              During the design need identification step, the designer/team has to identify customer/stakeholder needs, 
              which in itself is a process. The following are the three methods commonly used to gather information to 
              determine customer/stakeholder requirements.
              <br></br>
              <br></br>
              <h6>• Observations:</h6>This method involves observing customers using the existing product in order to see 
              whether the product needs to be redesigned or develop a new design with improved properties and performance 
              that would compete with the products already available in the market. Many requirements can be found by 
              observing customers using the product since most new products are refinements of existing products.
              <br></br>
              <br></br>
              <h6> • Surveys: </h6> The survey method is generally used to gather specific information or ask people’s opinions 
              about a well-defined subject. Surveys make use of questionnaires that are carefully designed and applied 
              through the mail, over the telephone, or in face-to-face interviews. They are well-suited for collecting 
              requirements on products to be redesigned or on new, well-understood product domains.
              <br></br>
              <br></br>
              <h6> • Focus groups: </h6> These are used to capture customer requirements from a carefully sampled group of potential 
              customers. This technique is best suited for developing original products or to gather the customers’ views 
              on product/design improvement.
              </p>
            </div>        
            <div id = "class0"><Projectstatement
                nextStep={this.showDiv1}
                handleChange={this.handleChange}
                values={values}
              /></div>
            <div id = "class1"><Stakeholder
                nextStep={this.showDiv2}
                prevStep={this.showDiv}
                handleChange={this.handleChange}
                values={values}
              /></div>
            <div id = "class2"><Infogathering
                  nextStep={this.showDiv3}
                  prevStep={this.showDiv1}
                  handleChange={this.handleChange}
                  values={values}
                /></div>
            <div id = "class3"><Designbrief
                  nextStep={this.showDiv4}
                  prevStep={this.showDiv2}
                  handleChange={this.handleChange}
                  values={values}
                /></div>
            <div id = "class4"><Outcomes
                  handleChange={this.handleChange}
                  prevStep={this.showDiv2}
                  values={values}
                /></div>
        </div>
    );
  }
}
export default componentform;
