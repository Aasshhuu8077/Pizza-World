import React from 'react'
// images
import herosectionimg from "../../assets/images/herosectionimg.png";
import herosectionimg2 from "../../assets/images/herosectionimg2.jpg";

const Herosection = () => {
  return (
    <section className="herosection">
        <div className="herosection__cont grid grid-cols-2">
          <div className="herosection__content leading-10 flex flex-col justify-center ml-11">
            <h1 className="heading font-black text-6xl">
              Welcome To The{" "}
              <span className="herosection__content-span block">
                Pizza World
              </span>
            </h1>
            <div className="herosection__subcontent leading-7 my-7">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
              <p>
                Laborum maiores vero similique delectus! Nihil error placeat id
                veritatis? Mollitia
              </p>
              <p>
                rem maxime nesciunt pariatur illum esse laboriosam officia
                laborum maiores quasi.
              </p>
            </div>
            <div className="herosection__btn-cont flex flex-row justify-start">
              <button className="herosection__btn-1">
                Order Now
              </button>
              <button className="herosection__btn-2">Know More</button>
            </div>
          </div>
          <div className="herosection__image relative">
            <img
              src={herosectionimg}
              className="herosection__img1 float-right z-0"
            />
            <div className="herosection__img2-cont">
              <img src={herosectionimg2} />
              <div className="herosection__img-overlay"></div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Herosection