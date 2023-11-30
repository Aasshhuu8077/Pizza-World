import React from "react";
// images
import logo from "../../assets/images/logo.png"
// stylesheet
import "../../css/common.css"

const Loadingscreen = () => {
  return (
    <section
      className="loading__section absolute flex justify-center items-center h-screen w-screen z-10" >
        <div className="loading__img-cont flex flex-col justify-center items-center">
            <img src={logo}/>
            <div className="loading__bar"></div>
        </div>
    </section>
  );
};

export default Loadingscreen;
