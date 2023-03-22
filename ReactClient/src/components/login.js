import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
export default function Login() {
    const navigate = useNavigate();
    const [inputValues, setInputValues ] = useState({
        username: "",
        password: "",
      });
  
      function handleChange(event) {
        const { name, value } = event.target;
        setInputValues((previnputValues) => {
          return {
            ...previnputValues,
            [name]: value,
          }
        });
      }
  
      function onLoginClick() {
        authenticateLogin()
      }
  
      async function sendJson(url, method, data) {
        const fetchOptions = {
          method: method,
          body: JSON.stringify(data), // Gör om data till json
          headers: {
            "Content-Type": "application/json" // Media type json
          }
        }
      
        return await fetch(url, fetchOptions);
    }

    async function authenticateLogin() {
        const user = {
            username: inputValues.username,
            password: inputValues.password
        }
    
        let response = await sendJson("/users/login", "POST", user)
        console.log(response.status);
        
        if(response.status === 200) {
            navigate("/Home")
        } else {
            return null
        }
    } 
    function dontHaveAnAccount() {
        navigate("/CreateAccount")
    }
    return (
        <div className="login-container">
        <h1>Promail Login</h1>

        <section>
            <div>
                <label>Username</label>
                <input onChange={handleChange} value={inputValues.username} name="username" type="text" className="username-field"/>
            </div>
            <div>
                <label>Password</label>
                <input onChange={handleChange} value={inputValues.password} name="password" type="password" className="password-field"/>
            </div>

            <button onClick={onLoginClick} className="home-btn">LOGIN</button>
        </section>
        <div>
            <h4>Dont have an account?</h4>
            <button className="home-btn" onClick={dontHaveAnAccount} >Create account</button>
        </div>
        
        </div>
    )
}