import { useState } from "react";
import { useRequestsContext } from "../hooks/useRequests";

const RequirementForm = () => {
  const { dispatch } = useRequestsContext();

  const [occasion, setOccasion] = useState("");
  const [location, setLocation] = useState("");
  const [genre, setGenre] = useState("");
  const [availability, setAvailability] = useState("");
  const [error, setError] = useState(null);

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
    <>
      <form className="postrequirements" onSubmit={handleSubmit}>
        {/* <form className="requirement-form" onSubmit={handleSubmit}> */}
        <h3>Add a new Request</h3>

        <label>Occasion:</label>
        <input
          type="text"
          onChange={(e) => setOccasion(e.target.value)}
          value={occasion}
        />
        {/* <label>
          Location:
          <input
            type="checkbox"
            onChange={() => setLocation(!location)}
            checked={location}
          />
        </label> */}
        <label>Location:</label>
        <input
          type="text"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />
        <label>Genre:</label>
        <input
          type="text"
          onChange={(e) => setGenre(e.target.value)}
          value={genre}
        />
        <label>Availability:</label>
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="">Select Availability</option>
          <option value="mostly">Mostly</option>
          <option value="onlyNight">Only in the night</option>
          <option value="onlyWeekdays">Only on weekdays</option>
          <option value="contactMe">Contact me</option>
        </select>
        {/* <label>
          Availability:
          <input
            type="checkbox"
            onChange={() => setAvailability(!availability)}
            checked={availability}
          />
        </label> */}
        <button>Add Request</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};
export default RequirementForm;
