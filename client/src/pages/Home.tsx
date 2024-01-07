import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyCard from "../components/MyCard";
import "../styles/MyCard.css";
import { AuthContext } from "../context/AuthContext";
import landingPageImage from "../images/musician.Boti.jpg";

function Home() {
  const { user } = useContext(AuthContext);
  const [musicians, setMusicians] = useState<[Musician] | null>(null);

  const getMusicians = () => {
    fetch("http://localhost:4000/api/musicians/all")
      .then((response) => response.json())
      .then((result) => {
        const myMuscians: [Musician] = result.musicians;
        setMusicians(myMuscians);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getMusicians();
  }, []);

  return (
    <div className="landing-container">
      <div className="landing-image-container">
        <h1 className="landing-title">Muse-X - Find YOUR Musician</h1>{" "}
        <img
          src={landingPageImage}
          alt="Landing Page"
          className="landing-image"
        />
      </div>
      <div className="landing-text">
        <h1 className="landing-title">Searching for a Musician or Band?</h1>
        <p className="landing-description">
          We've got you covered! This is your backstage pass to creating an
          unforgettable event.
        </p>
        {user ? (
          <div>
            <p className="landing-message">Email: {user.email}</p>
            <Link to="/post" className="btn btn-primary landing-button">
              Start Jamming!
            </Link>
          </div>
        ) : (
          <div>
            <p className="landing-message">
              To post a request and join the jam, please{" "}
              <Link to="/signup">sign up</Link> or{" "}
              <Link to="/login">log in</Link> now.
            </p>
            <p className="landing-message">
              Ready to make some music magic? Let's get started!
            </p>
          </div>
        )}
      </div>
      <div className="landing-musicians">
        <p className="landing-message">
          Check out our list of awesome musicians below:
        </p>
        {musicians &&
          musicians.map((musician) => (
            <MyCard
              key={musician._id}
              musician={musician}
              hasEquipment={musician.hasEquipment}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
