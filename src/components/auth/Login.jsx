import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// hooks
import { useDispatch, useSelector } from "react-redux"
// stylesheet
import "../../css/login.css";
//images
import loginback from "../../assets/images/foodbackground.png";

const Login = () => {
  const backendurl = useSelector(state => state.backendurlReducer)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messagestate, setmessage] = useState("");
  const dispatch = useDispatch()
  const userdata = useSelector((state) => {
    return state.userDataReducer
  })
  const navigator = useNavigate();

  useEffect(() => {
    if(userdata !== null){
      if(userdata.role === "user"){
        navigator("/profile")
      }
      else if(userdata.role === "admin"){
        navigator("/admin")
      }
    }
  })

  async function loginHandler(event) {
    var data = {
      email: email,
      password: password,
    };
    var req = new Request(`${backendurl}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    var responsedata = await fetch(req)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return "login failed";
      });
    if (responsedata.message === "user logged in successfully") {
      dispatch({type : "setuserdata", data : responsedata.data})
      dispatch({type : "setlogintrue"}) 
      dispatch({type : "SET_ADDRESS", data : responsedata.data.addresses})
    } else if (responsedata.message === "invalid request") {
      setmessage("*Fill the field correctly!");
    } else {
      setmessage("*Username or Password Incorrect");
    }
  }

  return (
    <section className="login__section">
      <div className="loginsection__cont flex flex-col justify-center items-center">
        <div className="login__form-cont flex items-center justify-center flex-col p-10 rounded-2xl relative">
          <img
            src={loginback}
            className="absolute top-0 w-full h-full right-0 rounded-2xl"
          />
          <div className="loginform rounded-2xl p-7 z-10">
            <div className="flex justify-center items-center flex-col z-10">
              <p className="text-rose-800">{messagestate}</p>
              <div>
                <input
                  placeholder="email"
                  type={"text"}
                  value={email}
                  className="my-4 border-solid border-2 p-2 rounded-xl"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  placeholder="password"
                  type={"password"}
                  value={password}
                  className="my-4 border-solid border-2 p-2 rounded-xl"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="z-10 flex flex-col items-center my-3">
              <button
                className="login__button px-2 py-1 rounded-lg"
                onClick={loginHandler}
              >
                Login
              </button>
              <p className="mt-2">
                Don't Have an account?{" "}
                <Link to="/register" className="login__signinLink">
                  Create One
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
