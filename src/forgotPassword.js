import React, { useState } from "react";
import emailjs from "emailjs-com";
import './forgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");


  const sendCode = (e) => {
    e.preventDefault();
    const generatedCode = Math.floor(1000 + Math.random() * 9000).toString(); // generate 4-digit code
    const templateParams = {
      to_email: email,
      code: generatedCode,
    };
    emailjs
      .send('service_p5x1xzo', 'template_n9d91g4', templateParams, 'Eted1PavUtADO0gkG')
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          setGeneratedCode(generatedCode); // set the generated code in state
          setStep(2);
        },
        (error) => {
          console.log("Email sending failed:", error);
          setError("Error sending email. Please try again later.");
        }
      );
  };
  

  const checkCode = (e) => {
    e.preventDefault();
    if (code === "") {
      setError("Please enter the 4-digit code sent to your email.");
      return;
    }
    // check if the entered code matches the generated code
    if (code === generatedCode) { // compare with generated code in state
      // redirect to password reset page
      window.location.href = "/reset-password";
    } else {
      setError("Incorrect code. Please try again.");
    }
  };
  

  return (
    <div className="ContainerPassword">
    <div className="ForgotPassword">
      <h2>Forgot Password</h2>
      {step === 1 ? (
        <form onSubmit={sendCode}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <button type="submit">Send Code</button>
          {error && <div className="error">{error}</div>}
        </form>
      ) : (
        <form onSubmit={checkCode}>
          <label>
            Enter the 4-digit code sent to your email:
            <input type="text" maxLength="4" value={code} onChange={(e) => setCode(e.target.value)} />
          </label>
          <button type="submit">Confirm</button>
          {error && <div className="error">{error}</div>}
        </form>
      )}
    </div>
    </div>
  );
};

export default ForgotPassword;
