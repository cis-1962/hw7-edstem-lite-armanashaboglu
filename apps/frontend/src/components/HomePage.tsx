import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import NewQuestionModal from './NewQuestionModal';
import NewAnswerModal from './NewAnswerModal';
import {
  Link
} from 'react-router-dom';

const fetcher = (url) => axios.get(url).then((res) => res.data);

function HomePage() {
  const { data: questions, error } = useSWR('/api/questions', fetcher);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        console.log('checking login status');
        const response = await axios.get('/api/account');
        // console.log('got response from backend, username is: ', response.data.username);
        setUser(response.data.username);
      } catch (error) {
        setUser(null);
        console.log('error getting login status');
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/account/logout');
      navigate('/login');
    } catch (error) {
      alert('Logout failed');
    }
  };

  if (error) return <div>Failed to load questions.</div>;
  if (!questions) return <div>Loading...</div>;

  return (
    <div>
      <h1>Campuswire Lite</h1>
      <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
        <div style={{ width: '33%', borderRight: '2px solid black', padding: '10px' }}>
          {user && (
            <>
              <p>Welcome, {user}!</p>
              <button onClick={handleLogout}>Log Out</button>
              <button onClick={() => setShowQuestionModal(true)}>Add New Question</button>
              {showQuestionModal && <NewQuestionModal onClose={() => setShowQuestionModal(false)} />}
            </>
          )}
          {user === null && (
            <>
              <Link to="/login">Log in to submit a question</Link>
            </>
          )}
          <div>
            {questions.map((question) => (
                <p key={question._id} style={{ cursor: 'pointer', border: 'solid black 1px' }} onClick={() => setSelectedQuestion(question)}>
                  {question.questionText}
                </p>
            ))}
          </div>
          <p>refresh to see new questions...</p>
        </div>
        <div style={{ width: '67%', padding: '10px', overflowY: 'auto' }}>
          {selectedQuestion ? selectedQuestion && (
            <>
              <p>Question: {selectedQuestion.questionText}</p>
              <p>Author: {selectedQuestion.author}</p>
              <p>Answers: {selectedQuestion.answer}</p>
              {user && <NewAnswerModal questionId={selectedQuestion._id}/>}
            </>
          ) : <>
              <div style={{ width: '67%', padding: '180px', overflowY: 'auto' }}>
              </div>
              </>}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
