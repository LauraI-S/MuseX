import React from "react";
import "../styles/MyCard.css";
import { Link } from "react-router-dom";

type MyCardProps = {
  musician: {
    _id: any;
    name: string;
    genre: string[];
    occasion: string;
    location: string;
  };
};

const MyCard: React.FC<MyCardProps> = ({ musician }) => {
  return (
    <div className="my-card">
      <div className="musician-info">
        <h3 className="musician-name">🌟 {musician.name} 🌟</h3>
        <p className="musician-genre">Tunes in: {musician.location}</p>
      </div>
      <Link to={`/musicians/${musician._id}`}>Find out more!</Link>
    </div>
  );
};

export default MyCard;
