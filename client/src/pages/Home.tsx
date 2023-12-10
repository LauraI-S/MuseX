import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyCard from "../components/MyCard";
import "../styles/MyCard.css";

type Musician = {
  _id: any;
  name: string;
  instrument: string[];
  hasEquipment: boolean;
  img: string;
  summary: string;
  musician: Musician;
};

function Home() {
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

  //       {  const greeting = (musician) => {
  //   const name = musician ? musician.name : "stranger";
  //   return `Howdy, ${name}`;
  // };

  // console.log(greeting({ name: "Alice" })); // "Howdy, Alice"
  // console.log(greeting(null));}

  console.log("musicians :>> ", musicians);

  return (
    <div className="container">
      <div className="row mx-md-auto"></div>
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
//   return (
//     <div>
//       <Link to="/signup">SignUp</Link> |
//       <Link to="/details"> Details</Link> |
//       <Link to="/login"> Login</Link> |

//       {console.log("%c JSX renders", "color:green")}
//       <p>This is the home page.</p>

{
  /* {musicians ? musicians.map((musician) => {
        return (
          <p>{musician.email}</p>
        )
      }) : <p>nomusicians to be dispalayed</p>} */
}

{
  /* <p> const myMusicians = result.musicians.map((musicians) => );
        console.log('myMusicians :>> ', myMusicians);

      </p> */
}

//       {musicians &&
//         musicians.map((musician) => (
//           <MyCard key={musician._id} name={musician.name} img={musician.img} instrument={musician.instrument} />
//         ))}
//     </div>
//   );
// }

//!
