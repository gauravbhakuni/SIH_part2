import React, { useState } from 'react';
import './style.css';

function Validation() {
  const [targetCID, setTargetCID] = useState('');
  const [showResult, setShowResult] = useState('');

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
          const response = await fetch('http://127.0.0.1:5000/api/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ target_cid: targetCID }),
        });

      const data = await response.json();
      setShowResult(data.exists ? 'CID exists' : 'CID does not exist');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h2>Input Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pwd">Certificate id</label>
          <input id="pwd" name="pwd" value={targetCID} onChange={(e) => setTargetCID(e.target.value)}/>
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>

      <div className="result">
        {showResult}
      </div>

    </div>
  );
}

export default Validation;
