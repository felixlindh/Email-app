import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function SentMails() {
    useEffect(() => {
        fetchFromDb()
    }, [])
    const navigate = useNavigate()
    const [currentData, setCurrentData] = useState(undefined);

    async function fetchFromDb() {
        const response = await fetch("/sentMails")
        const data = await response.json();
        setCurrentData(data)
        console.log(data);
    }

    function backToHome() {
        navigate("/Home")
    }



    return (
        <div className="email-container">
            <div className="button-container">
            <button className="home-btn" onClick={backToHome}>Home</button>
            <button className="home-btn" onClick={fetchFromDb} >Refresh Sent Emails</button>
            </div>
            <h2>Sent Emails</h2>
            {currentData && currentData.map((mail, index) => {
                return (
                    <div key={index} className="email-item">
                        <h3 className="email-title">To: {mail.to}</h3>
                        <p className="email-content">Message: {mail.message}</p>
                    </div>
                )
            })}
        </div>
    )
}