import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import { auth } from "../firebase";
import { useState } from 'react';
import firebase from '../firebase';




const TutorMatchNavbar = () => {
    const navigate = useNavigate();
    const { user, mongoUser, signOutAuth } = useAuth()
    const [signOutError, setSignOutError] = useState("")

    const handleLogout = async (e) => {
        e.preventDefault();
        const signOutResult = signOutAuth()
        if (signOutResult.success){
            navigate("/")
        } else {
            setSignOutError(signOutResult.message)
        }
    }

    return (
        <Navbar bg="myColor" variant="dark" expand="lg" className="fixed-top-custom" style={{ backgroundColor: "#E07A5F", marginBottom: '20px'}}>
        <Container>
        <Navbar.Brand>
            <div className="d-inline-block align-top">
            <img
                src="/images/logo4.png"
                width="200"
                height="35"
                className="myImage"
                alt="Logo"
            />
            </div>
            {/* {' TutorMatch'} */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
        {user ? (
            <Nav className="ms-auto">
                {mongoUser && mongoUser.status === 'Student' && (
                <Nav.Link as={Link} to="/search">Search Tutors</Nav.Link>
                )}
            <Nav.Link as={Link} to={`/profile/${user.uid}`}>Profile</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
        ) : (
            <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/signup">SignUp</Nav.Link>
            </Nav>
        )}
        </Navbar.Collapse>
        </Container>
    </Navbar>
    );
};



export default TutorMatchNavbar;

