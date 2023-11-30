import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setrePassword] = useState("");
  const navigator = useNavigate()
  const backendurl = useSelector(state => state.backendurlReducer)

  function passwordChecker() {
    /**
     * check if the password and the retyped password are same or not
     * there are different type invalidations
     * @TODO so we create the error for those validations 
     * @return boolean
     */
    if (password === repassword && password !== "" && repassword !== "") {
      return true;
    }
  }
  
  function emailChecker() {
    /**
     * check if the email is empty of filled
     * if filled check for the valid email
     * there are different type invalidations
     * @TODO so we create the error for those validations 
     * @return boolean
     */
    if (email !== "") {
      return true;
    }
  }

  function validateForm() {
    if (passwordChecker() || emailChecker() || username !== "") {
      return true;
    }
    return false;
  }

  async function signupHandler(event) {
    if (validateForm()) {
      var data = {
        username: username,
        email: email,
        password: password,
      };
      setusername("")
      setPassword("")
      setEmail("")
      setrePassword("")
      var responsedata = await fetch(`${backendurl}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        });
      console.log(responsedata);
      if(responsedata.message === "User Successfully Created"){
        navigator("/login", {replace : true})
      }
      else{
        alert("user not registered")
      }
    } else {
      alert("Please fill the correct data");
    }
  }

  return (
    <section>
      <div>
        <div>
          <input
            placeholder="Username"
            type={"text"}
            value={username}
            onChange={(event) => {
              setusername(event.target.value);
            }}
          />
        </div>
        <div>
          <input
            placeholder="Email"
            type={"text"}
            value={email}
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
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div>
          <input
            placeholder="Re-type password"
            type={"password"}
            value={repassword}
            onChange={(event) => {
              setrePassword(event.target.value);
            }}
          />
        </div>
        <div>
          <button onClick={signupHandler}>Sign up</button>
        </div>
      </div>
    </section>
  );
};

export default Register;
