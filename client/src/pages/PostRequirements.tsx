import React, { useEffect } from "react";
import { useRequestsContext } from "../hooks/useRequests";

import "../styles/index.css";
import RequirementDetails from "../components/RequirementDetails";
import RequirementForm from "../components/RequirementForm";

type Props = {};

const PostRequirements = () => {
  // const [requests, setRequests] = useState(null);
  const { requests, dispatch } = useRequestsContext();

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch("http://localhost:4000/api/requests");
      const json = await response.json();

      if (response.ok) {
        // setRequests(json);
        dispatch({ type: "SET_REQUESTS", payload: json });
      }
    };
    fetchRequests();
  }, [dispatch]); //-->dependency array makes sure the data is only fetched when the page first renders

  return (
    <div className="postrequirements">
      <div className="requests">
        {requests &&
          requests.map((request) => (
            <RequirementDetails key={request._id} request={request} />
          ))}
      </div>
      <RequirementForm />
    </div>
  );
};

export default PostRequirements;
