import React, { useState } from 'react';

function Notification({ message, type }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className={`notification ${type}`}>
          <button className="close-button" onClick={handleClose}>
            X
          </button>
          <p>{message}</p>
        </div>
      )}
    </>
  );
}

export default Notification;