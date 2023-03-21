import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useTeamCheck from "./hooks/useTeamCheck";
import Login from "./pages/Login";
import { Projects } from "./pages/Projects";
import Register from "./pages/Register";
import Teams from "./pages/Teams";
function App() {
  const teamsCheked = useTeamCheck();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/teams"
          element={
            <PrivateRoute>
              <Teams />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects"
          element={<PrivateRoute>{teamsCheked && <Projects />}</PrivateRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;
