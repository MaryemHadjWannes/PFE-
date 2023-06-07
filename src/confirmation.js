import React from 'react';
import { Link } from 'react-router-dom';
import './confirmation.css';
import './styles/signin.css';

function ConfirmationPage() {
  return (
    <div className="backgroundSign">
    <div className='confirmation-container'>    
    <div className='confirmation-demande'>
      <h2 className='confirmation-demande-title'>Registration Demand Confirmed </h2>
      <p className='confirmation-demane-p'>
        Thank you for your registration request.<br></br>
        You will receive a confirmation Email within 7 days.
      </p>
      <p className='link-to-home'>
        <Link to="/">Go to Homepage</Link>
      </p>
    </div>
    </div>
    </div>

  );
}

export default ConfirmationPage;
