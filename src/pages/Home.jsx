import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-container">
      <h1 className="hero-title">Welcome to Your Language Assistant</h1>
      <p className="hero-text">
        Enhance your writing and communication with our powerful translation,
        spelling, and grammar check app.
      </p>
      <p className="hero-text">
        Whether you're drafting an email, writing a report, or communicating in
        a different language, our tool will help you ensure your text is clear,
        accurate, and free of errors.
      </p>
      <p className="hero-text">
        Get started by using the navigation above to access our tools!
      </p>
    </div>
  );
};

export default Home;
