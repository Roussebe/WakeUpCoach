import React, { useState } from "react";
import axios from "axios";
import GoogleLogin from "react-google-login"


const googleAuthLocalUrl = `${process.env.REACT_APP_API_URL}/auth/google`

const SignInForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const responseSuccessGoogle = (response) => {
    console.log( "GoogleResponse" )
    console.log(response)
    axios({
      method: "POST",
      url: "http://localhost:8080/api/googlelogin",
      data: {tokenId: response.tokenId}
    }).then( response  => {
      console.log( response )
    })
  }

  const responseErrorGoogle = (response) => {

  }

  return (
    <>
    <div className="section">
        <p className="lead">Take good habits all day long</p>
    </div>
    <div className="divider"></div>
    <div className="section">


        <a href={googleAuthLocalUrl} className="btn red darken-1">
            <i className="fab fa-google left"></i> Log In With Google
        </a>
    </div>
    </>
  );
};

export default SignInForm;
