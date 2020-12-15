import React, { Component } from "react";
import "./interaction.css";
import Form_design_team from './Form_design_team';
import Research_the_market from './Research_the_market';
import Develop_tasks  from './Develop_tasks';
import Estimate_schedule_and_cost from './Estimate_schedule_and_cost';
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
    if(y==="#class4"){
     document.getElementById("class4").style.display="block"
     document.getElementById("class5").style.display="none"
     document.getElementById("class6").style.display="none"
     document.getElementById("class7").style.display="none"
     document.getElementById("class10").style.display="none"
    }
  }
  showDiv1(){
    var y1=document.getElementById("s").getAttribute("href")
    if(y1==="#class5"){
      document.getElementById("class5").style.display="block"
      document.getElementById("class4").style.display="none"
     document.getElementById("class6").style.display="none"
     document.getElementById("class7").style.display="none"
     document.getElementById("class10").style.display="none"
    }
  }
  showDiv2(){
    var y2=document.getElementById("ig").getAttribute("href")
    if(y2==="#class6"){
      document.getElementById("class6").style.display="block"
      document.getElementById("class4").style.display="none"
     document.getElementById("class5").style.display="none"
     document.getElementById("class7").style.display="none"
     document.getElementById("class10").style.display="none"
    }
  }
  showDiv3(){
    var y3=document.getElementById("ds").getAttribute("href")
    if(y3==="#class7"){
      document.getElementById("class7").style.display="block";
      document.getElementById("class6").style.display="none"
     document.getElementById("class5").style.display="none"
     document.getElementById("class4").style.display="none"
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
        <a href="#class4" onClick={this.showDiv} id="ps">1.1: Form design team</a>
        <a href="#class5" onClick={this.showDiv1} id="s">1.2: Develop tasks</a>
        <a href="#class6" onClick={this.showDiv2} id="ig">1.3: Research the market</a>
        <a href="#class7" onClick={this.showDiv3} id="ds">1.4: Estimate schedule and cost</a>
        </div>
          <div id = "class10" className="form-wrapper"> 
            <p>
            <h3>Design Project Planning :</h3>
            The project planning step of the design journey process includes developing a plan 
            for the design process with respect to scope and resources available at hand to accomplish 
            the design activities of the problem identified in step #1. There are various reasons for 
            project planning, including obtaining better understanding the project objectives, eliminating 
            the uncertainty and improving the efficiency of operations, and providing/guiding the project teams 
            and minimizing the risk for project completion. 
            <br></br>
            <br></br>
            The resources may be categorized in terms of time, money, people, and manufacturing and testing capabilities. 
            The main activities in the project/design planning step are:
            <br></br>
            ◦ Form a design team
            <br></br>
            ◦ Develop tasks
            <br></br>
            ◦ Research the market
            <br></br>
            ◦ Estimate schedule and cost
            </p>
            <p>
            <h4>Project Planning and Management – Gantt chart :</h4>
            Generally, a project plan is developed to meet the project deadline, and manage various tasks involved in 
            the design project. Gantt charts are used to represent the timing of various tasks planned in the design project.  
            The horizontal axis shows the time line and the vertical axis shows various tasks to be completed. 
            The start and end of a task is usually represented by a horizontal bar. If the task is completed, then it is 
            represented by a completely filled bar. The unfilled bars represent the fraction of the task that is completed.
            </p>
          </div>        
          <div id = "class4"><Form_design_team
          nextStep={this.showDiv1}
          handleChange={this.handleChange}
          values={values}
          /></div>
          <div id = "class5"><Develop_tasks
          nextStep={this.showDiv2}
          prevStep={this.showDiv}
          handleChange={this.handleChange}
          values={values}
          /></div>
          <div id = "class6"><Research_the_market
          nextStep={this.showDiv3}
          prevStep={this.showDiv1}
          handleChange={this.handleChange}
          values={values}
          /></div>
          <div id = "class7"><Estimate_schedule_and_cost
          prevStep={this.showDiv2}
          handleChange={this.handleChange}
          values={values}
          /></div>

        </div>   

    );
  }
}
export default componentform;
