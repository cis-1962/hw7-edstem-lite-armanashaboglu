import React, { useState } from 'react';
import axios from 'axios';

function NewAnswerModal({ questionId }) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/questions/answer', { _id: questionId, answer });
      setAnswer('');
    } catch (error) {
      alert('Error submitting answer');
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Answer this question:</h3>
      <form onSubmit={handleSubmit}>
        <textarea className="card-text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your answer here"
          required
        />
        <button type="submit">Submit Answer</button>
      </form>
    </div>
  );
}

export default NewAnswerModal;
