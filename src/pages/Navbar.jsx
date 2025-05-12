import React, { useState } from "react";
import "../style/navbar.scss";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import logo from "../images/ppe-logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" onClick={() => setIsOpen(false)}>
          <img src={logo} alt="PPE logo" />
        </Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <Menu size={28} color="#fff" />
      </div>

      <div className={`right ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>
          🏠 Bizning filiallar
        </Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>
          ℹ️ Biz haqimizda
        </Link>
      </div>
    </div>
  );
}
