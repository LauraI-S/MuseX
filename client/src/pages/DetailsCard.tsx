import React, { useEffect, useState } from "react";
import "../styles/MyCard.css";
import { Button } from "react-bootstrap";

type MusicianDetails = {
  musician: any;
  name: string;
  instrument: string[];
  hasEquipment: boolean;
  img: string;
};

function Details() {
  const [musicians, setMusicians] = useState(null);

  const getMusicians = () => {
    fetch("http://localhost:4000/api/musicians/musicianDetails")
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

  {
    return (
      <>
        <h1>Here you can see details about each musician</h1>
        {console.log("%c JSX renders", "color:green")}
        <div className="my-card">
          {musicians &&
            musicians.map((musician) => (
              <div key={musician._id} className="myCard">
                <img
                  src={musician.img}
                  alt={musician.name}
                  style={{ maxWidth: "100%" }}
                />
                <div className="card-container">
                  <h4>Name: {musician.name}</h4>
                  <p>Instrument: {musician.instrument.join(", ")}</p>
                  <p>Summary: {musician.summary}</p>
                  <p>Has Equipment: {musician.hasEquipment ? "Yes" : "No"}</p>

                  <Button
                    variant="secondary"
                    className="like-button"
                    onClick={() => handleLike(musician._id)}
                    //TODO - create handelLike function!
                  >
                    {" "}
                    ♥️
                  </Button>
                  <div className="addCommentContainer">
                    <input
                      type="text"
                      placeholder="Commment..."
                      autoComplete="off"
                    />
                    <Button>Add Comment</Button>
                  </div>
                  <div className="listOfComments"></div>
                </div>
              </div>
            ))}
        </div>
      </>
    );
  }
}
export default Details;
