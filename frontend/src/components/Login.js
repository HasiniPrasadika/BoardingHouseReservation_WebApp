import React, { useState, useContext } from "react"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext"; 


export default function Login(){
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("customer"); 

    const backgroundStyles = {
      background: `url('./images/boarding2.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      height: "640px",
       
    };
    function checkData(e) {
        e.preventDefault();
        const newUser = {
            username,
            password,
            role,
        };

        
        try {
            axios.post("http://localhost:8070/user/get/login", newUser).then((res) => {
                if (res.data === "exist") {
                    setUser({ username, role }); 
                    if (role === "customer") {
                        navigate("/cusdash");
                    } else if (role === "owner") {
                        navigate("/owndash");
                    }
                } else if (res.data === "notexist") {
                    alert("You have not signed up");
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    return(
      <header style={backgroundStyles}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
  <form style={{ width: '330px',height:"370px", margin: '20px 0', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',background:"#CDA679" }} onSubmit={checkData}>
    <div className="mb-3">
      <label htmlFor="username" className="form-label">
        Username
      </label>
      <input
        type="text"
        className="form-control"
        id="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">
        Password
      </label>
      <input
        type="password"
        className="form-control"
        id="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
    </div>
    <div  className="form-check">
      <input 
        className="form-check-input"
        type="radio"
        name="role"
        id="customer"
        checked={role === 'customer'}
        onClick={(e) => {
          setRole('customer');
        }}
      />
      <label className="form-check-label" htmlFor="customer">
        Customer Account
      </label>
    </div>
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name="role"
        id="owner"
        checked={role === 'owner'}
        onClick={(e) => {
          setRole('owner');
        }}
      />
      <label className="form-check-label" htmlFor="owner">
        Owner Account
      </label>
    </div>
    <div className="mb-3">
      <Link style={{color:"black"}} to="/signup">Don't have an account? Sign up here.</Link>
    </div>
    <button type="submit" className="btn btn-primary" style={{ borderColor: 'white',background: 'black' ,justifySelf:"center"}}>
      Login
    </button>
  </form>
</div>
</header>

    )
}