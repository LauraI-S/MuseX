// import React, { useContext, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import MyCard from "../components/MyCard";
// import "../styles/MyCard.css";
// import { AuthContext } from "../context/AuthContext";
// import landingPageImage from "../images/musician.Boti.jpg";

// type Musician = {
//   _id: string;
//   name: string;
//   genre: string;
//   occasion: string;
//   location: string;
//   availability: string;
// };

// const Home = () => {
//   const { user } = useContext(AuthContext);
//   const [musicians, setMusicians] = useState<Musician[]>([]);
//   const [filteredMusicians, setFilteredMusicians] =
//     useState<Musician[]>(musicians);

//   const getMusicians = () => {
//     fetch("http://localhost:4000/api/musicians/all")
//       .then((response) => response.json())
//       .then((result) => {
//         const myMusicians: Musician[] = result;
//         setMusicians(myMusicians);
//         setFilteredMusicians(myMusicians);
//       })
//       .catch((error) => console.log("error", error));
//   };

//   const handleSearch = (query) => {
//     if (query.trim() === "") {
//       // If search query is empty, display all musicians
//       setFilteredMusicians(musicians);
//     } else {
//       // Filter musicians based on the search query
//       const filtered = musicians.filter((musician) =>
//         musician.name.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredMusicians(filtered);
//     }
//   };

//   useEffect(() => {
//     getMusicians();
//   }, []);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if the user is logged in
//     if (!user) {
//       alert("Please log in first");
//       // If not logged in, redirect to the login page
//       navigate("/login");
//     } else {
//       // If logged in, fetch musicians
//       getMusicians();
//     }
//   }, [user, navigate]);

//   return (
//     <div className="landing-container">
//       <div className="landing-image-container">
//         <h1 className="landing-title">Muse-X - Find YOUR Musician</h1>{" "}
//         <img
//           src={landingPageImage}
//           alt="Landing Page"
//           className="landing-image"
//         />
//       </div>
//       <div className="landing-text">
//         <h1 className="landing-title">
//           Hi, {user.name}! Searching for a Musician or Band?
//         </h1>
//         <p className="landing-description">
//           We've got you covered! This is your backstage pass to creating an
//           unforgettable event.
//         </p>
//         {user ? (
//           <div>
//             <p className="landing-message">Email: {user.email}</p>
//             <Link to="/post" className="btn btn-primary landing-button">
//               Start Jamming!
//             </Link>
//           </div>
//         ) : (
//           <div>
//             <p className="landing-message">
//               To post a request and join the jam, please{" "}
//               <Link to="/signup">sign up</Link> or{" "}
//               <Link to="/login">log in</Link> now.
//             </p>
//             <p className="landing-message">
//               Ready to make some music magic? Let's get started!
//             </p>
//           </div>
//         )}
//       </div>
//       <div className="landing-musicians">
//         <input
//           type="text"
//           placeholder="Search Musicians..."
//           onChange={(e) => handleSearch(e.target.value)}
//         />
//         <p className="landing-message">
//           Check out our list of awesome musicians below:
//         </p>
//         <div className="cards-container">
//           {filteredMusicians &&
//             filteredMusicians.map((musician) => (
//               <MyCard
//                 key={`card-${musician._id}`}
//                 musician={musician}
//                 location={musician.location}
//               />
//             ))}
//         </div>
//         <div className="cards-container">
//           {musicians &&
//             musicians.map((musician) => (
//               <MyCard
//                 key={`card-${musician._id}`}
//                 musician={musician}
//                 location={musician.location}
//               />
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// It seems like you have two rendering blocks for musicians in your Home component. To fix the issue and have a single block for rendering musicians, you can remove the second rendering block that shows all musicians regardless of the search query. Here's the modified code with the unnecessary block removed:

// jsx
// Copy code
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyCard from "../components/MyCard";
import "../styles/MyCard.css";
import { AuthContext } from "../context/AuthContext";
import landingPageImage from "../images/musician.Boti.jpg";

type Musician = {
  _id: string;
  name: string;
  genre: string;
  occasion: string;
  location: string;
  availability: string;
};

const Home = () => {
  const { user } = useContext(AuthContext);
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const [filteredMusicians, setFilteredMusicians] =
    useState<Musician[]>(musicians);

  const getMusicians = () => {
    fetch("http://localhost:4000/api/musicians/all")
      .then((response) => response.json())
      .then((result) => {
        const myMusicians: Musician[] = result;
        setMusicians(myMusicians);
        setFilteredMusicians(myMusicians);
      })
      .catch((error) => console.log("error", error));
  };

  const handleSearch = (query) => {
    if (query.trim() === "") {
      // If search query is empty, display all musicians
      setFilteredMusicians(musicians);
    } else {
      // Filter musicians based on the search query
      const filtered = musicians.filter((musician) =>
        musician.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMusicians(filtered);
    }
  };

  useEffect(() => {
    getMusicians();
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    if (!user) {
      alert("Please log in first");
      // If not logged in, redirect to the login page
      navigate("/login");
    } else {
      // If logged in, fetch musicians
      getMusicians();
    }
  }, [user, navigate]);

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
        <h1 className="landing-title">
          Hi,{user ? user.name : "Guest"}! Searching for a Musician or Band?
        </h1>
        <p className="landing-description">
          We've got you covered! This is your backstage pass to creating an
          unforgettable event.
        </p>
        {user ? (
          <div>
            <Link to="/post" className="btn btn-primary landing-button">
              Search below or post Request Here!
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
        <input
          type="text"
          placeholder="Search Musicians by Name ..."
          onChange={(e) => handleSearch(e.target.value)}
        />
        <h2 className="landing-message">
          Check out our list of awesome Musicians below:
        </h2>
        <div className="cards-container">
          {filteredMusicians &&
            filteredMusicians.map((musician) => (
              <MyCard
                key={`card-${musician._id}`}
                musician={musician}
                location={musician.location}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
