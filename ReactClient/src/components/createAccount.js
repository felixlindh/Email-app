import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
export default function CreateAccount() {
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

    function onCreateClick() {
      authenticateCreate()
    }
    function backToLogin() {
      navigate("/")
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

  async function authenticateCreate() {
    const newUser = {
        username: inputValues.username,
        password: inputValues.password
    }

    let response = await sendJson("/user/createAccount", "POST", newUser)
    console.log(response);
    

    if(response.status === 200) {
        console.log("Created account");
        navigate("/")
    } else if (response.status === 400) {
        console.log("Bad request");
    }
}

    return (
      <div className="login-container">
            <h2>Create new account</h2>
        <section>
            <div>
                <label>Username</label>
                <input onChange={handleChange} value={inputValues.username} name="username" type="text" className="create-username-field"/>
            </div>
            <div>
                <label>Password</label>
                <input onChange={handleChange} value={inputValues.password} name="password" type="password" className="create-password-field"/>
            </div>

            <button onClick={onCreateClick} className="home-btn">Create account</button>
            <div>
              <h4>Allready have an acoount?</h4>
              <button onClick={backToLogin} className="home-btn">To login page</button>
            </div>
        </section>
      </div>
    )
  }

