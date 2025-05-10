import "./NavBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../images/image.png";
import SignIn from "../signIn/SignIn";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig"; // Ensure correct path

export default function NavBar() {
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null); // Clear user context
      navigate("/"); // Redirect to homepage or login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="nav-bar">
      <Navbar expand="lg" className="nav-boot">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="nav-link home">
              <img className="logo-img" src={logo} alt="Logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav text-center">
            <Nav className="gap-5 mx-auto">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/about" className="nav-link">
                About
              </Link>
              <Link to="/services" className="nav-link">
                Services
              </Link>
              <Link to="/" className="nav-link">
                Pricing
              </Link>
              <Link to="/" className="nav-link">
                Team
              </Link>
              <Link to="/" className="nav-link">
                Blog
              </Link>
            </Nav>
            <div className="d-flex align-items-center justify-content-center gap-3">
              {currentUser ? (
                <>
                  <Link to="/dashboard" className="nav-link">
                    <button className="watch-video py-2">Dashboard</button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="watch-video py-2"
                    
                  >
                    Logout
                  </button>
                </>
              ) : (
                <SignIn />
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
