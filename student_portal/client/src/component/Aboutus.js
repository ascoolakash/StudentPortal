import React,{Component} from 'react';
import "./aboutus.css"
import ebook from "../images/image1.jpg"

class About extends Component{
    render(){
        return(
        <div className="wrapper1">
        <div className="wrapper2">
        <div className="Introduction">
            <h1>Introduction : </h1>
        <div className="para">
            <p>Understanding that 21st century engineers require more than technical knowledge, 
              we equip students with an understanding of the social and economic impact of their work, 
              the ability to communicate their ideas to a wide variety of people, 
              the ability to work effectively in teams, and the skills to provide leadership in solving society’s grand challenges. 
              Our students are immersed in hands-on learning through design-based classroom and field experiences, 
              undergraduate and graduate research, study abroad, co-ops and internships. 
              The UGA College of Engineering offers eight undergraduate and seven graduate degree programs. 
              We also offer a variety of dual degrees and combined bachelor’s and master’s degrees. </p>
        </div>
        <div className="ebook">
            <h1>About E-Book:</h1>
            <img src={ebook}  ></img>
        </div>
        </div>
        </div>
        </div>
        
        )
    }
}

export default About;