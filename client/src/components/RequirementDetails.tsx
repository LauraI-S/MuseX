const RequirementDetails = ({ request }) => {
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
      <p>{request.createdAt}</p>
    </div>
  );
};

export default RequirementDetails;
