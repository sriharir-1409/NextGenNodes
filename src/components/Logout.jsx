import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout logic
    if (onLogout) {
      onLogout();
    }

    // Redirect to the login page after a delay
    setTimeout(() => {
      navigate("/login");
    }, 2000); // Delay of 2 seconds
  }, [navigate, onLogout]);

  return (
    <div>
      <h2>Logging out...</h2>
      <p>You will be redirected to the login page shortly.</p>
    </div>
  );
};

export default Logout;
