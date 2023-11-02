// About.jsx
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2>About Us</h2>
        <p>
          Welcome to <span className="app-name">Food Explorer</span> – where culinary adventures
          come to life. We are passionate about connecting food enthusiasts with the
          most delightful dining experiences in your city.
        </p>
        <p>
          At <span className="app-name">Food Explorer</span>, we believe that exploring new
          flavors and discovering hidden gems should be an exciting journey for everyone.
        </p>
        <div className="highlight-box">
          <h3>What Sets Us Apart</h3>
          <p>
            <span className="feature">Curated Selection:</span> A handpicked collection of
            restaurants offering diverse and mouthwatering cuisines.
          </p>
          <p>
            <span className="feature">Real Reviews:</span> Honest and authentic reviews from
            our vibrant community to help you make informed choices.
          </p>
          <p>
            <span className="feature">Easy Access:</span> Seamless features for ordering, making
            reservations, and embarking on new culinary adventures.
          </p>
        </div>
  
        <p>
          Our vision is to create a world where everyone can easily discover and savor the rich
          tapestry of flavors our cities have to offer. Join us in making dining an experience to
          remember.
        </p>
        <h3>Contact Us</h3>
        <p>
          Have questions, suggestions, or just want to say hello? Reach out to us at{' '}
          <a href="mailto:info@Aniket.com">info@Aniket.com</a>.
        </p>
      </div>
    </div>
  );
};

export default About;
