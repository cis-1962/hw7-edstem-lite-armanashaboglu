import React, { useState } from 'react';
import axios from 'axios';

function NewQuestionModal({ onClose }) {
  const [questionText, setQuestionText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/questions/add', { questionText });
      onClose();
    } catch (error) {
      alert('Error submitting question');
      console.error(error);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h3>Ask a question!</h3>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Enter your question here"
            required
          />
          <button type="submit">Submit Question</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
}

export default NewQuestionModal;
