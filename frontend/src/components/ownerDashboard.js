import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../UserContext";


function OwnerDashboard() {
  const { user } = useContext(UserContext);
  const [boardingHouses, setBoardingHouses] = useState([]);
  const [newBoardingHouse, setNewBoardingHouse] = useState({
    house_name: '',
    owner_name: '',
    owner_contact: '',
    location: '',
    description: '',
    rooms: [],
    images: [],
  });
  const [newRoom, setNewRoom] = useState({
    roomNumber: 0,
    price: 0,
    availability: false,
    roomdetails: '',
    reservedby: '',
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedBoardingHouse, setSelectedBoardingHouse] = useState(null);

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
    background: `url('./images/boarding2.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    
    
  };

  const boardingHouseStyle = {
    border: '1px solid #ccc',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
  };
  
  const buttonContainer = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  
  const deleteButton = {
    
      padding: '10px 20px',
      margin: '10px',
      backgroundColor: 'black',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    
  };
  
  const editButton = {
    padding: '10px 20px',
      margin: '10px',
      backgroundColor: 'black',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
  };
  
  const imageStyle = {
    maxWidth: '400px',
    maxHeight: '400px',
    margin: '5px',
  };

  const handleEdit = (boardingHouse) => {
    setEditMode(true);
    setSelectedBoardingHouse(boardingHouse);
    setNewBoardingHouse(boardingHouse);
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:8070/boardinghouse/update/${selectedBoardingHouse._id}`, newBoardingHouse)
      .then(() => {
        alert('Updated');
        const updatedBoardingHouses = boardingHouses.map((house) => {
          if (house._id === selectedBoardingHouse._id) {
            return newBoardingHouse;
          }
          return house;
        });
        setBoardingHouses(updatedBoardingHouses);

        setEditMode(false);
        setSelectedBoardingHouse(null);
        setNewBoardingHouse({
          house_name: '',
          owner_name: '',
          owner_contact: '',
          location: '',
          description: '',
          rooms: [],
          images: [],
        });
      })
      .catch((error) => {
        console.error('Error updating boarding house:', error);
      });
  };

  const addBoardingHouse = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('house_name', newBoardingHouse.house_name);
    formData.append('owner_name', newBoardingHouse.owner_name);
    formData.append('owner_contact', newBoardingHouse.owner_contact);
    formData.append('location', newBoardingHouse.location);
    formData.append('description', newBoardingHouse.description);
    formData.append('rooms', JSON.stringify(newBoardingHouse.rooms));
    for (let i = 0; i < imageFiles.images.length; i++) {
      formData.append('images', imageFiles.images[i]);
    }

    axios
      .post('http://localhost:8070/boardinghouse/add', formData)
      .then((response) => {
        alert('Boarding house added');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error adding boarding house:', error);
      });
  };

  const addRoom = () => {
    setNewBoardingHouse({
      ...newBoardingHouse,
      rooms: [...newBoardingHouse.rooms, newRoom],
    });

    setNewRoom({
      roomNumber: 0,
      price: 0,
      availability: false,
      roomdetails: '',
      reservedby: '',
    });
  };

  const handleImageChange = (e) => {
    const images = e.target.files;
    setImageFiles({
      ...imageFiles,
      images,
    });
  };

  const deleteBoardingHouse = (boardingHouseId) => {
    axios
      .delete(`http://localhost:8070/boardinghouse/delete/${boardingHouseId}`)
      .then(() => {
        setBoardingHouses(boardingHouses.filter((house) => house._id !== boardingHouseId));
      })
      .catch((error) => {
        console.error('Error deleting boarding house:', error);
      });
  };

  return (
    
    <div style={{background:"#CDA679",border: "1px solid #000000"}}>
      <header style={backgroundStyles}>
      
      
      {user ?(<h1 style={{ textAlign: 'center',background:"black" ,color:"white"}}>Welcome, {user.username}</h1>):(<h1 style={{ textAlign: 'center' }}>Welcome, owner</h1>)}
      <div style={{ display: 'flex' }}>
      <div style={{ width: '60%' }}>
  <h2 style={{textAlign:"center",color:"black"}}>Your Boarding Houses</h2>
  {boardingHouses.map((boardingHouse) => (
    <div key={boardingHouse._id} style={boardingHouseStyle}>
      <h2 style={{ color: 'white',background:"black" ,textAlign:"center",borderRadius: '10px',height:"50px" }}>{boardingHouse.house_name}</h2>
      <p>
        <strong>Owner Name:</strong> {boardingHouse.owner_name}
      </p>
      <p>
        <strong>Owner Contact:</strong> {boardingHouse.owner_contact}
      </p>
      <p>
        <strong>Location:</strong> {boardingHouse.location}
      </p>
      <p>
        <strong>Description:</strong> {boardingHouse.description}
      </p>
      
      <ul>
        {boardingHouse.rooms.map((room) => (
          <li key={room.roomNumber}>
            <p>
              <strong>Room Number:</strong> {room.roomNumber}
            </p>
            <p>
              <strong>Price:</strong> {room.price}
            </p>
            <p>
              <strong>Availability:</strong>{' '}
              {room.availability ? (
                <span style={{ color: 'green' }}>Available</span>
              ) : (
                <span style={{ color: 'red' }}>Not Available</span>
              )}
            </p>
            <p>
              <strong>Room Details:</strong> {room.roomdetails}
            </p>
            <p>
              <strong>Reserved By:</strong> {room.reservedby}
            </p>
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
      <div style={buttonContainer}>
        <button
          style={deleteButton}
          onClick={() => deleteBoardingHouse(boardingHouse._id)}
        >
          Delete
        </button>
        <button
          style={editButton}
          onClick={() => handleEdit(boardingHouse)}
        >
          Edit
        </button>
      </div>
    </div>
  ))}
</div>

        <div style={{ width: '40%'}}>
          <h2 style={{textAlign:"center",color:"black"}}>{editMode ? 'Edit Boarding House' : 'Add a New Boarding House'}</h2>
          <form encType="multipart/form-data" style={{  padding: '20px' }}>
  <label style={{ display: 'block', marginBottom: '10px' }}>
    <strong>House Name:</strong>
    <input
      type="text"
      value={newBoardingHouse.house_name}
      onChange={(e) =>
        setNewBoardingHouse({
          ...newBoardingHouse,
          house_name: e.target.value,
        })
      }
      style={{ width: '100%', padding: '5px',borderRadius: '10px' }}
    />
  </label>
  <label style={{ display: 'block', marginBottom: '10px' }}>
    <strong>Owner Name:</strong>
    <input
      type="text"
      value={newBoardingHouse.owner_name}
      onChange={(e) =>
        setNewBoardingHouse({
          ...newBoardingHouse,
          owner_name: e.target.value,
        })
      }
      style={{ width: '100%', padding: '5px',borderRadius: '10px'  }}
    />
  </label>
  <label style={{ display: 'block', marginBottom: '10px' }}>
    <strong>Owner Contact:</strong>
    <input
      type="text"
      value={newBoardingHouse.owner_contact}
      onChange={(e) =>
        setNewBoardingHouse({
          ...newBoardingHouse,
          owner_contact: e.target.value,
        })
      }
      style={{ width: '100%', padding: '5px',borderRadius: '10px'  }}
    />
  </label>
  <label style={{ display: 'block', marginBottom: '10px' }}>
    <strong>Location:</strong>
    <input
      type="text"
      value={newBoardingHouse.location}
      onChange={(e) =>
        setNewBoardingHouse({
          ...newBoardingHouse,
          location: e.target.value,
        })
      }
      style={{ width: '100%', padding: '5px',borderRadius: '10px'  }}
    />
  </label>
  <label style={{ display: 'block', marginBottom: '10px' }}>
    <strong>Description:</strong>
    <textarea
      value={newBoardingHouse.description}
      onChange={(e) =>
        setNewBoardingHouse({
          ...newBoardingHouse,
          description: e.target.value,
        })
      }
      style={{ width: '100%', padding: '5px' ,borderRadius: '10px' }}
    />
  </label>

  <label style={{ display: 'block', marginBottom: '10px' }}>
    <strong>Upload Images:</strong>
    <input
      type="file"
      name="images"
      accept="image/*"
      onChange={handleImageChange}
      multiple
      style={{ width: '100%' }}
    />
  </label>

  <label style={{ display: 'block', marginBottom: '10px' }}>
    <strong>Room Number:</strong>
    <input
      type="number"
      value={newRoom.roomNumber}
      onChange={(e) =>
        setNewRoom({
          ...newRoom,
          roomNumber: parseInt(e.target.value),
        })
      }
      style={{ width: '100%', padding: '5px' ,borderRadius: '10px' }}
    />
  </label>

  <label style={{ display: 'block', marginBottom: '10px' }}>
    <strong>Price:</strong>
    <input
      type="number"
      value={newRoom.price}
      onChange={(e) =>
        setNewRoom({
          ...newRoom,
          price: parseFloat(e.target.value),
        })
      }
      style={{ width: '100%', padding: '5px',borderRadius: '10px'  }}
    />
  </label>

  <label style={{ display: 'block', marginBottom: '10px' }}>
    <strong>Availability:</strong>
    <input
      type="checkbox"
      checked={newRoom.availability}
      onChange={(e) =>
        setNewRoom({
          ...newRoom,
          availability: e.target.checked,
        })
      }
      style={{ width: 'auto' }}
    />
  </label>

  <label style={{ display: 'block', marginBottom: '10px' }}>
    <strong>Room Details:</strong>
    <input
      type="text"
      value={newRoom.roomdetails}
      onChange={(e) =>
        setNewRoom({
          ...newRoom,
          roomdetails: e.target.value,
        })
      }
      style={{ width: '100%', padding: '5px',borderRadius: '10px'  }}
    />
  </label>

  <label style={{ display: 'block', marginBottom: '10px' }}>
    <strong>Reserved By:</strong>
    <input
      type="text"
      value={newRoom.reservedby}
      onChange={(e) =>
        setNewRoom({
          ...newRoom,
          reservedby: e.target.value,
        })
      }
      style={{ width: '100%', padding: '5px',borderRadius: '10px'  }}
    />
  </label>
</form>

<button
  type="button"
  onClick={addRoom}
  style={{
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }}
>
  Add Room
</button>

{editMode ? (
  <button
    type="button"
    onClick={handleUpdate}
    style={{
      padding: '10px 20px',
      margin: '10px',
      backgroundColor: 'black',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    }}
  >
    Update Boarding House
  </button>
) : (
  <button
    type="button"
    onClick={addBoardingHouse}
    style={{
      padding: '10px 20px',
      margin: '10px',
      backgroundColor: 'black',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    }}
  >
    Add Boarding House
  </button>
)}

        </div>
      </div>
      </header>
    </div>
    
  );
}

export default OwnerDashboard;
