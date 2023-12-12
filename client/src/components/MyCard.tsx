import React from "react";
import "../styles/MyCard.css";

type MyCardProps = {
  musician: MyCardProps;
  _id: any;
  name: string;
  instrument: string[];
  hasEquipment: boolean;
  image: string;
  summary: string;
};

const MyCard: React.FC<MyCardProps> = ({ musician }) => {
  return (
    <div className="my-card">
      <img src={musician.image} alt={musician.name} />
      <div>
        <p>{musician.name}</p>
        <p>{musician.instrument.join(", ")}</p>
      </div>
    </div>
  );
};

export default MyCard;

// import React from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// type MyCardProps = {
//   name: string;
//   img: string;
//   instrument: string[];
//   musician: MyCardProps;
//   hasEquipment: boolean;
//   signUpLink: string;
//   detailsLink: string;
//   loginLink: string;
// };

// const MyCard: React.FC<MyCardProps> = ({
//   musician,
//   signUpLink,
//   detailsLink,
//   loginLink,
// }) => {
//   return (
//     <div className="col-md-4 mb-4 mx-md-auto">
//       <div className="card">
//         <img src={musician.img} alt={musician.name} className="card-img-top" />
//         <div className="card-body">
//           <h5 className="card-title">{musician.name}</h5>
//           <p className="card-text">Instruments: {musician.instrument.join(", ")}</p>
//           <p className="card-text">Has Equipment: {musician.hasEquipment ? "Yes" : "No"}</p>
//           <Link to={signUpLink} className="btn btn-dark mr-2">SignUp</Link>
//           <Link to={detailsLink} className="btn btn-dark mr-2">Details</Link>
//           <Link to={loginLink} className="btn btn-dark">Login</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyCard;

// import React from "react";
// // import "../styles/MyCard.css"
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";

// type MyCardProps = {
//   name: string;
//   img: string;
//   instrument: string[];
//   musician: MyCardProps;
//   hasEquipment: boolean;
// };

// const MyCard: React.FC<MyCardProps> = ({ musician }) => {
//   return (
//     <div className="col-md-4 mb-4">
//       <div className="card">
//         <img src={musician.img} alt={musician.name} className="card-img-top" />
//         <div className="card-body">
//           <h5 className="card-title">{musician.name}</h5>
//           <p className="card-text">Instruments: {musician.instrument.join(", ")}</p>
//           <p className="card-text">Has Equipment: {musician.hasEquipment ? "Yes" : "No"}</p>
//           <Link to="/login" className="btn btn-dark mr-2">Login</Link>
//           <Link to="/signup" className="btn btn-dark">Sign Up</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyCard;

{
  /* <ul key={musician._id}>
                            <li>Name: {musician.name}</li>
                            <li>Img: <img src={musician.img} alt={musician.name} style={{ maxWidth: '100%' }} /></li>
            <li>Instrument: {musician.instrument.join(", ")}</li>
                            <li>Instrument: {musician.instrument}</li>
                            <li>Summary: {musician.summary}</li>
                            <li>Has Equipment: {musician.hasEquipment ? "Yes" : "No"}</li>
                        </ul>
                    )
                } */
}
