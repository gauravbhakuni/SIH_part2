import { useNavigate } from 'react-router-dom';
import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";


const Home = () => {
  const navigate = useNavigate();

  const navigateToValidation = () => {
    navigate('/Validation');
  };

  const navigateToGeneration = () => {
    navigate('/Generation');
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Beyond Doubt: Verifying Your Certificates
          </h1>
          <p className="primary-text">
            Rest easy, knowing your achievements are backed by our rigorous certificate verification
          </p>
          <div className="button-container">
            <button onClick={navigateToGeneration} className="secondary-button">
              Generation <FiArrowRight />
            </button>
            <button onClick={navigateToValidation} className="secondary-button">
              Validation <FiArrowRight />
            </button>
            <button className="secondary-button">
              Student Verify <FiArrowRight />
            </button>
          </div>
        </div>
        <div className="home-image-section">
          <img src="https://www.a2itsoft.com/assets/img/verify1.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;


