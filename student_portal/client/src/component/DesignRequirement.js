import React, { Component } from "react";
import "./interaction.css";
import img2 from '../images/img2.png'
import EngineeringRequirement from './engineeringrequirement';
import OFDprocess from './ofdprocess';
import CustomerRequirement  from './customerRequirement';
import Navigateproject from './navigateproject';



class componentform extends Component {
  state = {
    customerReq: '',
    OFDpro: '',
    EngReq: '',
    pdf_customerReq: '',
    pdf_OFDprocess: '',
    pdf_EngReq: '',
  };
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };


  showDiv()
  {
    var y=document.getElementById("ps").getAttribute("href")
    if(y==="#class11"){
     document.getElementById("class11").style.display="block"
     document.getElementById("class12").style.display="none"
     document.getElementById("class13").style.display="none"
     document.getElementById("class10").style.display="none"
    }
  }
  showDiv1(){
    var y1=document.getElementById("s").getAttribute("href")
    if(y1==="#class12"){
      document.getElementById("class12").style.display="block"
      document.getElementById("class11").style.display="none"
      document.getElementById("class13").style.display="none"
     document.getElementById("class10").style.display="none"
    }
  }
  showDiv2(){
    var y2=document.getElementById("ig").getAttribute("href")
    if(y2==="#class13"){
      document.getElementById("class13").style.display="block"
      document.getElementById("class11").style.display="none"
     document.getElementById("class12").style.display="none"
     document.getElementById("class10").style.display="none"
    }
  }
  render() {

    const { customerReq, OFDpro, EngReq, pdf_customerReq, pdf_OFDprocess, pdf_EngReq} = this.state;
    const values = { customerReq, OFDpro, EngReq, pdf_customerReq, pdf_OFDprocess, pdf_EngReq};
  
    return (
      <div> 
      <div>
          {console.log("near navigation of project")}
          <Navigateproject/>
      </div>
      <div className="bar1">
        <a href="#class11" onClick={this.showDiv} id="ps">1.1: Customer Requirements</a>
        <a href="#class12" onClick={this.showDiv1} id="s">1.2: OFD Process</a>
        <a href="#class13" onClick={this.showDiv2} id="ig">1.3: Engineering Requirements/Target</a>
        </div> 
        <div id = "class10" className="form-wrapper"> 
            <p>
             In order to develop the best possible design, it is essential to develop a good understanding 
             of the design problem and generate a set of design criteria/engineering specifications. 
             Misunderstanding a design problem may result in bad design, higher cost, and delay in time to market.
             Therefore, it is very important to understand the design problem first before searching for any possible 
             solutions. The goal in understanding the design problem is to translate customer needs into engineering 
             specifications with specific target values.
             <br></br>
             <br></br>
             </p>
             <div className="imgsize">
             <img src={img2}></img>
             </div>
             <p>
             <br></br>
             Translation of customer requirements into engineering requirements
             </p>
             
              
          </div>        



          <div id = "class11"><CustomerRequirement
           nextStep={this.showDiv1}
           handleChange={this.handleChange}
           values={values}
          /></div>
          <div id = "class12"><OFDprocess
          nextStep={this.showDiv2}
          prevStep={this.showDiv}
          handleChange={this.handleChange}
          values={values}
          /></div>
          <div id = "class13"><EngineeringRequirement
          prevStep={this.showDiv2}
          handleChange={this.handleChange}
          values={values}
          /></div>
        </div>
        
      
        
    );
  }
}
export default componentform;
