import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink className="link" to="/">
        Home
      </NavLink>
      <NavLink className="link" to="/customer">
        Client
      </NavLink>
      <NavLink className="link" to="/animal">
        Pet
      </NavLink>
      <NavLink className="link" to="/doctor">
        Vet Team
      </NavLink>
      <NavLink className="link" to="/appointment">
        Appointment
      </NavLink>
      <NavLink className="link" to="/report">
        Report
      </NavLink>
      <NavLink className="link" to="/vaccine">
        Vaccination
      </NavLink>
    </nav>
  );
}

export default Navbar;
