import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
// component
import Home from "./components/Home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import About from "./components/infopages/About";
import Contact from "./components/infopages/Contact";
import Profile from "./components/profile/Profile";
import Cart from "./components/Cart/Cart";
import Orderpage from "./components/orderpage/Orderpage";
import Orderdetailpage from "./components/orderpage/Orderdetailpage";
import Webpages from "./components/Webpages";
import Loadingscreen from "./components/common/Loadingscreen";
import Admin from "./components/admin/Admin";
import Adminpages from "./components/admin/Adminpages";
import Fooditems from "./components/admin/Fooditems";
import Searchresultpage from "./components/search/Searchresultpage";
import Checkout from "./components/search/Checkout";
import Placedorder from "./components/search/Placedorder";
import Checkoutpage from "./components/search/Checkoutpage";
// hooks
import { useDispatch, useSelector } from "react-redux";

export const App = () => {
  const dispatch = useDispatch();
  const backendurl = useSelector(state => state.backendurlReducer)
  const loadingscreen = useSelector((state) => {
    return state.showloadingScreenReducer;
  });

  async function getUserprofile() {
    var req = new Request(`${backendurl}/auth/profile`, {
      credentials: "include",
      method: "GET",
    });
    var userdata = await fetch(req)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    if (userdata.message === 'successfully found') {
      console.log("data found")
      dispatch({ type: "setuserdata", data: userdata.data });
      dispatch({ type: "SET_ADDRESS", data: userdata.data.addresses })
      dispatch({type : "SET_USER_ORDER", data : userdata.data.orders})
      dispatch({ type: "setlogintrue" });
      dispatch({ type: "setLoadingscreenfalse" })
    }
    else{
      dispatch({ type: "setLoadingscreenfalse" })
      redirect("/")
    }
  }
  
  useEffect(() => {
    getUserprofile()
  }, []);

  return (
    <>
      {loadingscreen ? (
        <Loadingscreen />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Webpages />}>
              <Route path="" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about" element={<About />} />
              <Route path="orders" element={<Orderpage />}/>
            </Route>
            <Route path="/orders" element={<Webpages />}>
              <Route path="" element={<Orderpage />} />
              <Route path="details/:id" element={<Orderdetailpage />} />
            </Route>
            <Route path="/food" element={<Webpages />}>
              <Route path="search" element={<Searchresultpage />} />
              <Route path="cart" element={<Cart />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Adminpages />}>
              <Route path="" element={<Admin />} />
              <Route path="fooditem" element={<Fooditems />} />
            </Route>
            <Route path="/checkout" element={<Checkoutpage />}>
              <Route path="" element={<Checkout />} />
              <Route path="placedorder" element={<Placedorder />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};
