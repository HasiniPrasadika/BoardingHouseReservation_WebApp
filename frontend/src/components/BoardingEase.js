import React from "react";
import {useNavigate } from "react-router-dom"



function BoardingEase() {

    const backgroundStyles = {
        background: `url('./images/boarding.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        height: "640px",
         
      };

    const navigate = useNavigate();

    const handlebook = () => {
        navigate("/login");
    };

  return (
    <div >
      <header style={backgroundStyles}>
        <div style={{padding:"50px"}} >
          <strong><h1  className="container" style={{color:"white"}}>Discover Your Perfect</h1></strong>
          <strong><h1 className="container" style={{color:"white"}}>Stay with</h1></strong>
          <strong><h1 className="container"  style={{color:"white"}}>BoardingEase</h1></strong>
          <h3 className="container" style={{color:"white"}}>Welcome to BoardingEase, </h3>
          <h3 className="container" style={{color:"white"}}>your trusted partner in finding comfortable and convenient lodging away from home. </h3>
        </div>  
        <div className="container">
            
          <button  onClick={handlebook}
            style={{
              width: "100px",
              height: "40px",
              backgroundColor: "#000000",
              color: "white",              
              cursor: "pointer",
              }}>
              Book Now
          </button>
                            
        </div>
      </header>     
    </div>
  );
}

export default BoardingEase;