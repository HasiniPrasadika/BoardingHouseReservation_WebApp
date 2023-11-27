import React from "react";

export default function Home(){

    const containerStyle = {
        width: '200px', 
        height: '200px',
        overflow: 'hidden', 
        borderRadius: '50%', 
      };
    
      const imageStyle = {
        width: '100%', 
        height: 'auto', 
      };

    const backgroundStyles = {
        background: `url('./images/boarding.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        height: "640px",
         
      };


    return(
        <div >
        <header style={backgroundStyles}>
            <div style={{padding:"100px"}} >
            <div style={containerStyle} className="circular-image-container">
      <img
        src="/about.jpg"
        alt="logo"
        width="40"
        height="40"
        style={imageStyle}
      />
    </div>
                
                <p className="container" style={{color:"white",padding:"0px"}}>Welcome to BoardingEase, your trusted partner in finding comfortable and convenient lodging away from home. Our journey began with a simple yet powerful idea: to create a platform that bridges the gap between travelers, students, professionals, and the ideal boarding houses that cater to their unique needs.

At BoardingEase, we understand that finding the right place to stay is more than just a transaction; it's about creating a sense of belonging, comfort, and support. Our mission is to curate a collection of trusted boarding houses that offer a 'home away from home' experience, no matter where life's journey takes you.With a commitment to seamless reservations, transparent information, and exceptional customer support, we aim to redefine the way you think about accommodations. Whether you're exploring new horizons or seeking a peaceful haven to recharge, we're here to ensure that every stay is memorable.

Join us on this exciting adventure as we connect people with comfort, convenience, and community. BoardingEase is more than a platform; it's a promise to enhance your journey, one stay at a time.</p>
</div>
            
        </header>
       
            

        
      
    </div>
    )
}