import React, { Component } from "react";
import '../App.css';
import "./interaction.css";
import {Carousel,Nav} from 'react-bootstrap'
import image1 from "../images/image1.jpg"
import image2 from "../images/image2.jpg"
import image3 from "../images/image3.webp"
import image4 from "../images/img8.png"
import image5 from '../images/img9.png'
import componentForm from './Componentfrom'
import NavigationStart from "./NavigationStart";


function car() {
  return (
    <div className="App">
      <div className="wrapper2">
      <Carousel>
          <Carousel.Item>
          <img
            className=""
            src={image4}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className=""
            src={image2}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className=""
            src={image1}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className=""
            src={image3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
     </div>
      <div className="sidenav">
        <NavigationStart/>  
     </div>
     <div > 
       <div>
        <p>
        Every engineering student engaged in design activities or courses, required to keep a design notebook or log that contains all the documentation related to 
        design. The documentation may include all the design project details, important ideas, and data/information. Each student’s contributions (all sketches, notes, 
        and design ideas) related to the design project will be entered into this e-book log and may serve to protect the intellectual property. In design curriculum 
        and engineering education, it is necessary to document student’s understanding of the design process and the decisions made during the project. This e-book log 
        can also be used for review/feedback and assessment purposes.  Instead of having all the design documentation in a design notebook (hard copy),
        this Design Engineering Journey e-Book log will help all the documentation in one place for all the stakeholders to access. 
        <br></br>
        </p>
        </div>
        <br></br>
        <div>
        <b>What is the Design Engineering Journey e-Book log (DEJL)?</b>
        <br></br>
        This web-based application which documents and guides through the design process to help students and faculty and design researchers. The e-book log will guide 
        through the design journey steps, and its documentation and allows faculty to provide review/feedback on student projects. This e-book log can be used in 
        sophomore and capstone design courses in any multidisciplinary projects in engineering education. 
        <br></br>
        </div>
        <div  >
        <img src={image5} ></img>
        </div>
        {/* <a href="/Componentfrom">Enter</a> */}
        </div>
   </div>
  );
}

export default car;
