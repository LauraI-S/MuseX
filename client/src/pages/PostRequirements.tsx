import React, { useEffect, useState } from "react";
import "../styles/index.css";
import RequirementDetails from "../components/RequirementDetails";

type Props = {};

const PostRequirements = () => {
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch("http://localhost:4000/api/requests");
      const json = await response.json();

      if (response.ok) {
        setRequests(json);
      }
    };
    fetchRequests();
  }, []); //-->dependency array makes sure the data is only fetched when the page first renders

  return (
    <div className="postrequirements">
      <div className="requests">
        {requests &&
          requests.map((request) => (
            <RequirementDetails key={request._id} request={request} />
          ))}
      </div>
    </div>
  );
};

export default PostRequirements;
