import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyCard from "../components/MyCard";
import "../styles/MyCard.css";
import { AuthContext } from "../context/AuthContext";

type Musician = {
  _id: any;
  name: string;
  instrument: string[];
  hasEquipment: boolean;
  img: string;
  summary: string;
  musician: Musician;
};
type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
  password: string;
};

function Home() {
  const { user } = useContext(AuthContext);
  console.log("user :>> ", user);
  console.log("component run");
  const [musicians, setMusicians] = useState<[Musician] | null>(null);

  const getMusicians = () => {
    fetch("http://localhost:4000/api/musicians/all")
      .then((response) => response.json())
      .then((result) => {
        console.log("result of fetch :>> ", result);
        console.log("result.musicians :>> ", result.musicians);
        const myMuscians: [Musician] = result.musicians;
        setMusicians(myMuscians);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    console.log("%c useEffect runs", "color:orange");
    getMusicians();
  }, []);

  console.log("musicians :>> ", musicians);

  return (
    <div className="container">
      <div className="row mx-md-auto"></div>
      <h2>Welcome {user?.name}!</h2>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          {/* Add other user information as needed */}
        </div>
      ) : (
        <p>Please log in to see your profile.</p>
      )}
      <p>This is the home page.</p>
      {musicians &&
        musicians.map((musician) => (
          <MyCard
            key={musician._id}
            musician={musician}
            hasEquipment={musician.hasEquipment}
          />
        ))}
    </div>
  );
}

export default Home;
