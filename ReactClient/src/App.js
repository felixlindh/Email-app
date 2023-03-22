import './App.css';
import CreateAccount from './components/createAccount';
import SendEmail from './components/sendEmail';
import Login from './components/login';
import Home from './components/home';
import Inbox from './components/inbox'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SentMails from './components/sentEmails';

function App() {
  return (
    <Router>
        
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/CreateAccount" element={<CreateAccount />} />
            <Route path="/SendEmail" element={<SendEmail />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Inbox" element={<Inbox />} />
            <Route path="/SentEmails" element={<SentMails />} />
          </Routes>
        </div>
      
    </Router>
  );
}

export default App;
