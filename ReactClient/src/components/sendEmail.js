import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SendEmail() {
    const navigate = useNavigate();
    const [ emailValues, setemailValues ] = useState({
        to: "",
        message: ""
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setemailValues((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    function onSendClick() {
        sendEmail()
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
    
    async function sendEmail() {
        const mail = {
            to: emailValues.to,
            message: emailValues.message
        }
    
        let response = await sendJson("/user/send", "POST", mail)
        console.log(response);

        if(response.status === 200) {
            alert("Email was sent")
            setemailValues({
                to: "",
                message: "",
            })
        } else if (response.status === 401) {
            navigate("/")
        } else if (response.status === 400) {
            alert("User was not found")
        }
        
    
    }
    return (
        <div>
            <h1>Send New Message</h1>

            <section className="send-email-container">
                <div>
                    <label className="to-label">TO</label>
                    <input onChange={handleChange} value={emailValues.to} name="to" className="to-field" type="text"/>
                </div>
                <div>
                    <label className="message-label">Message</label>
                    <textarea onChange={handleChange} value={emailValues.message} name="message" className="message-field" cols="30" rows="10"></textarea>
                </div>

                <button onClick={onSendClick} className="send-btn">Send</button>
            </section>
        </div>
    )
}