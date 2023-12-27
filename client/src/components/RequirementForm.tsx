import { useState } from "react";

const RequirementForm = () => {
  const [occasion, setOccasion] = useState("");
  const [location, setLocation] = useState(false);
  const [genre, setGenre] = useState("");
  const [availability, setAvailability] = useState(false);
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
      setLocation(false);
      setGenre("");
      setAvailability(false);
      console.log("new request added", json);
    }
  };

  return (
    <>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a new Request</h3>

        <label>Occasion:</label>
        <input
          type="text"
          onChange={(e) => setOccasion(e.target.value)}
          value={occasion}
        />
        <label>
          Location:
          <input
            type="checkbox"
            onChange={() => setLocation(!location)}
            checked={location}
          />
        </label>
        {/* <label>Location:</label>
        <input
          type="text"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        /> */}
        <label>Genre:</label>
        <input
          type="text"
          onChange={(e) => setGenre(e.target.value)}
          value={genre}
        />
        <label>
          Availability:
          <input
            type="checkbox"
            onChange={() => setAvailability(!availability)}
            checked={availability}
          />
        </label>
        <button>Add Request</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};
export default RequirementForm;
