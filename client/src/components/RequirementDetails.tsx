import { useRequestsContext } from "../hooks/useRequests";
//!date fns from https://date-fns.org/ to make the date look more readable
import { formatDistanceToNow, formatRelative, subDays } from "date-fns";

const RequirementDetails = ({ request }) => {
  const { dispatch } = useRequestsContext();

  const handleClick = async () => {
    const response = await fetch(
      "http://localhost:4000/api/requests/" + request._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_REQUEST", payload: json });
    }
  };
  return (
    <div className="request-details">
      <h4>Occasion: {request.occasion}</h4>
      <p>
        <strong> Location (city): </strong>
        {request.location}
      </p>
      <p>
        <strong> Genre : </strong>
        {request.genre}
      </p>
      <p>
        <strong>Availability: </strong>
        {request.availability}
      </p>
      {/* <p>{request.createdAt}</p> */}
      <p>
        {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
      </p>
      {/* means: invocing the functn. integrated into react sais using the new
      Date and addSuffix basically saying "ago" */}
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default RequirementDetails;
