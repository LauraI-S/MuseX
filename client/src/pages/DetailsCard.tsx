// import React from "react";
// import "../styles/MyCard.css";

// type DetailsCardProps = {
//   musician: {
//     _id: any;
//     name: string;
//     instrument: string[];
//     hasEquipment: boolean;
//     img: string;
//     summary: string;
//   }
// };

// const DetailsCard: React.FC<DetailsCardProps> = ({ musician }) => {
//   return (
//     <div className="my-card">
//       {/* <img src={musician.img} alt={musician.name} /> */}
//       <div>
//         <h2>{musician.name}</h2>
//         <p>Instrument: {musician.instrument.join(", ")}</p>
//         <p>Has Equipment: {musician.hasEquipment ? "Yes" : "No"}</p>
//       </div>
//     </div>
//   );
// };

// export default DetailsCard;



import React, { useEffect, useState } from 'react';
import "../styles/MyCard.css";

type MusicianDetails = {
  musician: any;
  name: string;
  instrument: string[];
  hasEquipment: boolean;
  img: string;}

function Details() {
    
    const [musicians, setMusicians] = useState(null);

    const getMusicians = () => {
        fetch("http://localhost:4000/api/musicians/all")
            .then((response) => response.json())
            .then((result) => {
        
                console.log('result of fetch :>> ', result);
                console.log('result.musicians :>> ', result.musicians);
                const myMuscians: [Musician] = result.musicians
                setMusicians(myMuscians)
            })
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        console.log("%c useEffect runs", "color:orange");
        getMusicians()
    }, [])

    {


        return (
             <>
      <h1>Here you can see details about each musician</h1>
      { console.log("%c JSX renders", "color:green") }
  <div className='my-card'>
      {musicians &&
        musicians.map((musician) => (
          <div key={musician._id} className='my-card'>
            
            <img src={musician.img} alt={musician.name} style={{ maxWidth: '100%' }} />
            <div card-container>
              <h2>Name: {musician.name}</h2>
              <p>Instrument: {musician.instrument.join(", ")}</p>
              <p>Summary: {musician.summary}</p>
              <p>Has Equipment: {musician.hasEquipment ? "Yes" : "No"}</p>
            </div>
          </div>
        ))}
            </div>
            </>
        )
    }
}
    export default Details;