import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const userIsAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }
  return context;
};
