import React from "react";

export default function AboutUs(){

    const backgroundStyles = {
        background: `url('./images/boarding.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        height: "640px",
        padding: "90px"
         
      };
      const containerStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        background: '#f7f7f7',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      };
    
      const headingStyle = {
        fontSize: '28px',
        color: '#333',
      };
    
      const paragraphStyle = {
        fontSize: '16px',
        color: '#555',
        marginBottom: '20px',
      };
    
      const contactInfoStyle = {
        marginBottom: '30px',
      };
    
      const strongStyle = {
        fontWeight: 'bold',
        color: '#000',
      };


    return(
        <div >
        <header style={backgroundStyles}>
        <div style={containerStyle}>
      
      <p style={paragraphStyle}>
        Feel free to get in touch with us for any inquiries, feedback, or
        support. We're here to assist you.
      </p>

      <div style={contactInfoStyle}>
        <h2 style={headingStyle}>Contact Information</h2>
        <p style={paragraphStyle}>
          <strong style={strongStyle}>Email:</strong> info@yourwebsite.com
        </p>
        <p style={paragraphStyle}>
          <strong style={strongStyle}>Phone:</strong> +1 (123) 456-7890
        </p>
      </div>

      <div style={contactInfoStyle}>
        <h2 style={headingStyle}>Our Location</h2>
        <p style={paragraphStyle}>
          <strong style={strongStyle}>Address:</strong> 123 Main Street, Your City, State, ZIP Code
        </p>
      </div>
    </div>
            
        </header>
       
            

        
      
    </div>
    )
}