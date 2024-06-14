import React from "react";
import petImage from "../assets/pets.jpeg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <p>Veterinary Management System</p>

      <p>
        <Link className="welcome" to="/customer">
          Welcome
        </Link>
      </p>

      <img src={petImage} alt="Pet" />
    </div>
  );
}

export default Home;
