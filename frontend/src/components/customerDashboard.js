import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { UserContext } from "../UserContext";

export default function CustomerDash() {
  const { user } = useContext(UserContext);
  const [boardingHouses, setBoardingHouses] = useState([]);

  useEffect(() => {
    
    axios
      .get('http://localhost:8070/boardinghouse/')
      .then((response) => {
        setBoardingHouses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching boarding houses:', error);
      });
  }, []);
  const backgroundStyles = {
    background: `url('./images/boarding.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    
    
  };
  const boardingHouseContainerStyle = {
    border: '1px solid #ddd',
    padding: '30px',
    margin: '20px 0',
    backgroundColor: '#f9f9f9',
  };
  
  const titleStyle = {
    fontSize: '24px',
    color: '#3D0C02',
    textAlign: 'center',
  };
  
  const infoStyle = {
    fontSize: '16px',
    color: '#333',
  };
  
  const roomStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#fff',
  };
  
  const reserveButtonStyle = {
    backgroundColor: '#5C3317',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
  };
  
  const reservedButtonStyle = {
    backgroundColor: 'gray',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'not-allowed',
  };
  
  const imageStyle = {
    maxWidth: '400px',
    maxHeight: '400px',
    margin: '5px',
  };

  const handleRoomReservation = (boardingHouseId, roomNumber) => {
    
    axios
      .post(`http://localhost:8070/boardinghouse/reserve`, {
        boardingHouseId,
        selectedRooms: [roomNumber],
      })
      .then((response) => {
        
        const updatedBoardingHouses = boardingHouses.map((boardingHouse) => {
          if (boardingHouse._id === response.data.boardingHouse._id) {
            return response.data.boardingHouse;
          }
          return boardingHouse;
        });
  
        setBoardingHouses(updatedBoardingHouses);
  
        
      })
      .catch((error) => {
        console.error('Error reserving room:', error);
       
      });
  };

  return (
    <div>
      <header style={backgroundStyles}>
      {user ?(<h1 style={{ textAlign: 'center',background:"black" ,color:"white"}}>Welcome, {user.username}</h1>):(<h1 style={{ textAlign: 'center' }}>Welcome, customer</h1>)}
      <h2 style={{color:"black",textAlign:"center"}}>Your Boarding Houses</h2>
{boardingHouses.map((boardingHouse) => (
  <div key={boardingHouse._id} style={boardingHouseContainerStyle}>
    <strong><h3 style={titleStyle}>{boardingHouse.house_name}</h3></strong>
    
    <p style={infoStyle}>
      <strong>Owner Name:</strong> {boardingHouse.owner_name}
    </p>
    <p style={infoStyle}>
      <strong>Owner Contact:</strong> {boardingHouse.owner_contact}
    </p>
    <p style={infoStyle}>
      <strong>Location:</strong> {boardingHouse.location}
    </p>
    <p style={infoStyle}>
      <strong>Description:</strong> {boardingHouse.description}
    </p>
    <ul>
      {boardingHouse.rooms.map((room) => (
        <li key={room.roomNumber} style={roomStyle}>
          <p style={infoStyle}>
            <strong>Room Number:</strong> {room.roomNumber}
          </p>
          <p style={infoStyle}>
            <strong>Price:</strong> ${room.price}
          </p>
          <p style={infoStyle}>
            <strong>Availability:</strong>{' '}
            {room.availability ? (
              'Available'
            ) : (
              <span style={{ color: 'red' }}>
                Reserved by: {room.reservedby}
              </span>
            )}
          </p>
          <p style={infoStyle}>
            <strong>Room Details:</strong> {room.roomdetails}
          </p>
          <button
            type="button"
            onClick={() =>
              handleRoomReservation(boardingHouse._id, room.roomNumber)
            }
            style={room.availability ? reserveButtonStyle : reservedButtonStyle}
            disabled={!room.availability}
          >
            {room.availability ? 'Reserve' : 'Reserved'}
          </button>
        </li>
      ))}
    </ul>
    <div>
      {boardingHouse.images &&
        boardingHouse.images.map((image, index) => (
          <img
            key={image.filename}
            src={`http://localhost:8070/uploads/${image.filename}`}
            alt={image.filename}
            style={imageStyle}
          />
        ))}
    </div>
  </div>
))}

      </header>
    </div>
  );
}
