import React, { useEffect, useState } from 'react'

type MusicianDetails = {
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
            <div>
                <h1>Here you can see details about each musicians</h1>
                {console.log("%c JSX renders", "color:green")}
                {
                    musicians &&
                    musicians.map((musician) => (
                        <ul key={musician._id}>
                            <li>Name: {musician.name}</li>
                            <li>Img: <img src={musician.img} alt={musician.name} style={{ maxWidth: '100%' }} /></li>
            <li>Instrument: {musician.instrument.join(", ")}</li>
                            <li>Instrument: {musician.instrument}</li>
                            <li>Summary: {musician.summary}</li>
                            <li>Has Equipment: {musician.hasEquipment ? "Yes" : "No"}</li>
                        </ul>
                    ))
                }</div>
        )
    }
}
    export default Details;