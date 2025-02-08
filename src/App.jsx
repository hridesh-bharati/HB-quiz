import React, { useState, useEffect } from "react";
import Intro from "./assets/Intro";

const questions = [
  { question: "What is the capital of India?", options: ["Mumbai", "Kolkata", "New Delhi", "Chennai"], answer: "New Delhi" },
  { question: "Who was the first Prime Minister of India?", options: ["Indira Gandhi", "Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Patel"], answer: "Jawaharlal Nehru" },
  { question: "Which is the national animal of India?", options: ["Lion", "Tiger", "Elephant", "Leopard"], answer: "Tiger" },
  { question: "What is the currency of India?", options: ["Dollar", "Euro", "Rupee", "Yen"], answer: "Rupee" },
];

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showAnswers, setShowAnswers] = useState(false);
  const [countdown, setCountdown] = useState(122220);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 2700);
      return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }
  }, [showIntro]);

  useEffect(() => {
    if (!showAnswers) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            setShowAnswers(true);
            clearInterval(timer);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showAnswers]);

  const handleSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowAnswers(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(null));
    setShowAnswers(false);
    setCountdown(10);
  };

  const score = answers.filter((answer, index) => answer === questions[index].answer).length;
  const progress = (answers.filter((a) => a !== null).length / questions.length) * 100;

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white">
      {showIntro ? (
        <Intro /> // Show Intro for 3 seconds
      ) : (
        <div className="card w-50 p-4 bg-secondary text-white">
          <div className="card-body">
            {!showAnswers ? (
              <>
                <h2 className="text-center">Time Left: {countdown} seconds</h2>
                <p className="card-text">{questions[currentQuestion].question}</p>
                <div className="d-grid gap-2">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelect(option)}
                      className={`btn ${answers[currentQuestion] === option ? 'btn-primary' : 'btn-light'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <button onClick={prevQuestion} disabled={currentQuestion === 0} className="btn btn-outline-light">Previous</button>
                  {currentQuestion + 1} of {questions.length}
                  <button onClick={nextQuestion} className="btn btn-primary">{currentQuestion === questions.length - 1 ? "Show Answers" : "Next"}</button>
                </div>
                <div className="mt-3">
                  <div className="progress">
                    <div className="progress-bar bg-info" role="progressbar" style={{ width: `${progress}%` }}></div>
                  </div>
                  <p className="text-center mt-2">{Math.round(progress)}% completed</p>
                </div>
              </>
            ) : (
              <>
                <h2 className="card-title">Quiz Completed!</h2>
                <h3 className="text-center">Your Score: {score} / {questions.length}</h3>
                <ul className="list-group">
                  {questions.map((q, index) => (
                    <li key={index} className="list-group-item bg-dark text-white">
                      <strong>Q{index + 1}: {q.question}</strong><br />
                      Correct Answer: <span className="text-success">{q.answer}</span>
                    </li>
                  ))}
                </ul>
                <div className="d-flex justify-content-center mt-3">
                  <button onClick={restartQuiz} className="btn btn-warning">Restart Quiz</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
