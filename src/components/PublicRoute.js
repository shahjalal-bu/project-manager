import { Navigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import { useAuth } from "../contexts/authContext";
export default function PublicRoute({ children }) {
  // const isLoggedIn = useAuth();
  const { currentUser } = useAuth();
  return !currentUser ? children : <Navigate to="/teams" />;
}
