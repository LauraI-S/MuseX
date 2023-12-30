import { createContext, useReducer } from "react";

export const RequestsContext = createContext();

export const requestsReducer = (state, action) => {
  //action: object that we pass into the dispatch-function
  switch (action.type) {
    case "SET_REQUEST":
      return {
        requests: action.payload,
      };
    case "CREATE_REQUEST":
      return {
        requests: [action.payload, ...state.requests], //...we create a new array of requests and that will be one SINGLE new request to which we add to the array, (...(spread-operator)) //!this keeps the database insinc with the local state, no interaction with database!
      };
    default:
      return state;
  }
};

export const RequestsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(requestsReducer, {
    requests: null, //initial value of my state
  });
  // dispatch({type:'CREATE_REQUEST',payload:}) //-->property that describes the state-change we wanna make //!payload represents any data we need to make change (an array of requests-object of arrays)
  return (
    <RequestsContext.Provider value={{ ...state, dispatch }}>
      {" "}
      {/*creating a dynamic state value for the A.C-Provider*/}
      {children}
    </RequestsContext.Provider>
  );
};

//!useReducer: similar to useState= we get back a state - value and a function (dispatch) to update that value, we also specify the value (...=null).
//!dispatch:versenden
