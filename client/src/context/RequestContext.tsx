import { createContext, useReducer } from "react";

export const RequestsContext = createContext();

export const requestsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_REQUEST':
            return {
                requests.action.payload
            }
        case 'CREATE_REQUEST':
            return {
                requests: [action.payload, ...state.requests]
            }
        default:
            return state
    }
}

export const RequestsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(requestsReducer, {
       requests: null
    })
    // dispatch({type:'CREATE_REQUEST',payload:}) //-->property that describes the
  return (
    <RequestsContext.Provider value={{...state,dispatch}}>
      {children}
    </RequestsContext.Provider>
  );
};
