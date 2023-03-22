import React from "react"
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()
    function sendEmail() {
        navigate("/SendEmail")
    }
    function logout() {
        authenticateLogout()
    }
    function getInbox() {
        navigate("/Inbox")
    }
    function getSent() {
        navigate("/SentEmails")
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

    async function authenticateLogout() {
    
        let response = await sendJson("/logout", "POST")
        console.log(response.status);
        
        if(response.status === 200) {
            navigate("/")
        } else {
            return null
        }
    } 


    return (
        <div className="home-container">
            <h2 className="home-title">PRO-MAIL</h2>
            <button onClick={getInbox} className="home-btn">Inbox</button>
            <button onClick={sendEmail} className="home-btn">Send Email</button>
            <button onClick={getSent} className="home-btn">Sent</button>
            <button onClick={logout} className="home-btn">Logout</button>
        </div>
    )
}