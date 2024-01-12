import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/MyCard.css";

type MusicianDetailsProps = {
  musician: {
    _id: string;
    name: string;
    genre: string;
    occasion: string;
    location: string;
    availability: string;
  };
};

const MusicianDetails: React.FC<MusicianDetailsProps> = () => {
  const { _id } = useParams<{ id: string }>();
  console.log("ID from URL:", _id);

  const [musician, setMusician] = useState<Musician | null>(null);

  useEffect(() => {
    if (_id) {
      // Fetch musician details using the 'id' parameter from the URL
      fetch(`http://localhost:4000/api/musicians/${_id}`)
        .then((response) => response.json())
        .then((result) => {
          // Set the fetched musician data in the state
          setMusician(result);
        })
        .catch((error) => {
          console.error("Error fetching musician details: ", error);
        });
    } else {
      // Handle the case where 'id' is undefined
      console.error("ID is undefined. Handle this case.");
    }
  }, [_id]);

  if (!musician) {
    // Render some fallback UI or return null to render nothing
    return <div>Loading musician details...</div>;
  }
  return (
    <div className="my-card">
      {" "}
      {/* Apply the my-card class */}
      {/* You can include an image here if needed */}
      <h3 className="musician-name">🌟 {musician.name} 🌟</h3>
      <p className="musician-genre">Genre: {musician.genre}</p>
      <p className="musician-genre">Occasion: {musician.occasion}</p>
      <p className="musician-genre">Location: {musician.location}</p>
      <p className="musician-genre">Availability: {musician.availability}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default MusicianDetails;
