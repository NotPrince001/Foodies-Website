import { NavLink } from "react-router";
import { FaShoppingCart } from "react-icons/fa"; // cart icon
import "../styles/Header.css";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

const Header = () => {
  const onlineStatus = useOnlineStatus();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const handleLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    }
  };

  return (
    <nav className="header">
      <NavLink to={"/"}>
        <img
          className="logo"
          src="https://png.pngtree.com/png-clipart/20250218/original/pngtree-unique-food-logo-png-image_20457892.png"
          alt="Logo"
        />
      </NavLink>

      <div className="nav-links">
        <h3>Online Status: {onlineStatus ? "✅" : "❌"}</h3>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/about"}>About Us</NavLink>
        <NavLink to={"/contact"}>Contact Us</NavLink>
        <NavLink to={"/grocery"}>Grocery</NavLink>
        <NavLink to={"/cart"} className="cart-link">
          <FaShoppingCart className="cart-icon" />
          <span className="cart-text">Cart</span>
          <span className="cart-badge">3</span>
        </NavLink>

        {isLoggedIn ? (
          <NavLink to="/" onClick={handleLogout}>
            Logout
          </NavLink>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Header;
