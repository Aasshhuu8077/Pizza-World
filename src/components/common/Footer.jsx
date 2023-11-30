import React from "react";
// images
import footer_background from "../../assets/images/footer_background.png";
import logo2 from "../../assets/images/logo.png";
// stylesheet
import "../../css/footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer__wrapper w-full py-14">
        <div className="footer__data-cont w-full flex flex-col items-center">
          <div className="flex flex-row w-full justify-evenly">
            <div className="list-none">
              <h4 className="footer__link-heading font-bold text-lg my-2">Important Links</h4>
              <li>Orders</li>
              <li>Login</li>
              <li>Register</li>
              <li>Our Items</li>
              <li>Search</li>
            </div>
            <div className="list-none">
              <h4 className="footer__link-heading font-bold text-lg my-2">Address</h4>
              <li>Ajmeri gate, jaipur</li>
              <li>Pratap nagar, jaipur</li>
              <li>Pincode:- 302022</li>
            </div>
            <div className="list-none">
              <h4 className="footer__link-heading font-bold text-lg my-2">Contact</h4>
              <li>ph:- +91-7891002011</li>
              <li>email:- aarryyyadav@gmail.com</li>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div>
              <img src={logo2} />
            </div>
            <div>
              <h1 className="footer__name my-3 font-black text-3xl tracking-widest cursor-pointer">Pizza World</h1>
            </div>
          </div>
          <div className="">
            <p>CopyRight Reservered By Aryan Yadav &#169;</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
