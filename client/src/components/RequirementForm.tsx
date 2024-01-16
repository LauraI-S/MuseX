import React, { useState } from "react";
import { useRequestsContext } from "../hooks/useRequests";
import { FaMusic, FaMapMarker, FaSmile, FaCalendarAlt } from "react-icons/fa"; // Import icons for better visuals

const RequirementForm = () => {
  const { dispatch } = useRequestsContext();

  const [occasion, setOccasion] = useState("");
  const [location, setLocation] = useState("");
  const [genre, setGenre] = useState("");
  const [availability, setAvailability] = useState("mostly");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = { occasion, location, genre, availability };

    const response = await fetch("http://localhost:4000/api/requests", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setOccasion("");
      setLocation("");
      setGenre("");
      setAvailability("mostly");
      console.log("new request added", json);
      dispatch({ type: "CREATE_REQUEST", payload: json });
    }
  };

  return (
    <div className="form-container">
      <form className="create" onSubmit={handleSubmit}>
        <h3>
          Add a New Request <FaMusic />
        </h3>

        <div className="form-group">
          <label htmlFor="occasion">
            <FaSmile /> Occasion:
          </label>
          <input
            id="occasion"
            type="text"
            onChange={(e) => setOccasion(e.target.value)}
            value={occasion}
            className={emptyFields.includes("occasion") ? "error" : ""}
            placeholder="E.g., Jamming, Gig, etc."
          />
          {emptyFields.includes("occasion") && (
            <div className="tooltip">Please enter the occasion.</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="location">
            <FaMapMarker /> Location:
          </label>
          <input
            id="location"
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            className={emptyFields.includes("location") ? "error" : ""}
            placeholder="E.g., Your City"
          />
          {emptyFields.includes("location") && (
            <div className="tooltip">Please specify the location.</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="genre">
            <FaMusic /> Genre:
          </label>
          <input
            id="genre"
            type="text"
            onChange={(e) => setGenre(e.target.value)}
            value={genre}
            className={emptyFields.includes("genre") ? "error" : ""}
            placeholder="E.g., Rock, Jazz, Pop, etc."
          />
          {emptyFields.includes("genre") && (
            <div className="tooltip">Please enter the genre.</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="availability">
            <FaCalendarAlt /> Availability:
          </label>
          <select
            id="availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className={emptyFields.includes("availability") ? "error" : ""}
          >
            <option value="mostly">Mostly</option>
            <option value="onlyNight">Only in the night</option>
            <option value="onlyWeekdays">Only on weekdays</option>
            <option value="contactMe">Contact me</option>
          </select>
          {emptyFields.includes("availability") && (
            <div className="tooltip">Please select your availability.</div>
          )}
        </div>

        <button>Add Request</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default RequirementForm;
