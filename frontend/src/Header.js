import React, { useContext } from 'react'; // Import useContext
import {useNavigate, Link } from "react-router-dom"
import { UserContext } from "./UserContext";

function Header(){

    const { user, setUser } = useContext(UserContext);
    
    const navigate = useNavigate();

    const handleLogout = () => {
        
        setUser(null);
        
        navigate("/");
    };

    return(

        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container-fluid">
        <a className="navbar-brand" href="/">
        <img src="/support.png" alt="logo" width="40" height="40"/>
          BoardingEase
        </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item" style={{ borderRight: "1px solid #000000",borderLeft: "1px solid #000000", padding: "0 10px" }}>
                    <Link className="nav-link active"  aria-current="page" to="/home">About Us</Link>
                    </li>
                    <li className="nav-item" style={{ borderRight: "1px solid #000000", padding: "0 10px" ,color: "black"}}>
                    <Link style={{color:"black"}} className="nav-link" to="/aboutus">Contact Us</Link>
                    </li>
                    
                    
                </ul>
                
                <ul style={{listStyle:"none",display:"flex",justifyContent:"center",margin:"0",padding:"0"}} >
                
                       
                {user ? (
                        <>
                            <li className="nav-item">
                                {user.role === 'customer' ? (
                                    <Link style={{ borderRight: "1px solid #000000",borderLeft: "#000000", padding: " 10px" ,color:"black"}} className="nav-link" to="/cusdash">Dashboard</Link>
                                ) : (
                                    <Link style={{ borderRight: "1px solid #000000",borderLeft: "1px solid #000000", padding: " 10px",color:"black" }} className="nav-link" to="/owndash">Dashboard</Link>
                                )}
                            </li>
                            <li className="nav-item">
                                <button  style={{ borderRight: "1px solid #000000", padding: " 10px",color:"black" }} className="nav-link" onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <Link style={{color:"black"}}   className="nav-link active" aria-current="page" to="/login">
                            <button
                  style={{
                    width: "100px",
                    height: "40px",
                   
                    border: "1px solid #000000",
                    backgroundColor: "#FFFFFF",
                    
                    
                    cursor: "pointer",
                  }}
                >
                  Login
                </button>
                            </Link>
                        </li>
                    )}
                </ul>
        
                
            </div>
        </div>
        </nav>
  
    );
}

export default Header;