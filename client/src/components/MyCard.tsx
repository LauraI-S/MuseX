import React from "react";
import "..styles/MyCard.css"; 

type MusicianCardProps = {
  name: string;
  img: string;
  instrument: string[];
};

const MyCard: React.FC<MusicianCardProps> = ({ name, img, instrument }) => {
  return (
    <div className="my-card">
      <p>{name}</p>
      <div>
        <img className="card-image" src={musician.img} alt={musician.name} />
        <p className="card-details">Instruments: {instrument.join(", ")}</p>
      </div>
    </div>
  );
};

export default MyCard;




{/* <ul key={musician._id}>
                            <li>Name: {musician.name}</li>
                            <li>Img: <img src={musician.img} alt={musician.name} style={{ maxWidth: '100%' }} /></li>
            <li>Instrument: {musician.instrument.join(", ")}</li>
                            <li>Instrument: {musician.instrument}</li>
                            <li>Summary: {musician.summary}</li>
                            <li>Has Equipment: {musician.hasEquipment ? "Yes" : "No"}</li>
                        </ul>
                    )
                } */}