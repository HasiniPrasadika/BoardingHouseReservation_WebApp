import React, { useState, useContext } from "react"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext"; 


export default function Signup(){
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

    function sendData(e){
        e.preventDefault();
        const newUser = {
            username,
            password,
            role
        }

        try{

            axios.post("http://localhost:8070/user/add", newUser)
            .then(res=>{
                if(res.data==="exist"){
                    alert("User already exists")
                }
                else if(res.data==="notexist"){
                    setUser({ username, role }); 
                    if (role === "customer") {
                        navigate("/cusdash");
                    } else if (role === "owner") {
                        navigate("/owndash");
                    }
                    
                }
            });
            

        }
        catch(e){
            console.log(e);

        }
        
    }

    return(
        <header style={backgroundStyles}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', 
        alignItems: 'center', minHeight: '80vh',backgroundImage: 'url("/home.jpg")',
        backgroundSize: 'cover',  backgroundPosition: 'center',backgroundRepeat: 'no-repeat' }}>
            <form style={{ width: '330px',height:"370px",margin: '15px 0',alignItems: 'center', 
  padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',background:"#CDA679" }}  onSubmit={sendData} >
                <div className="mb-3">
                    <label for="usename" className="form-label">Username</label>
                    <input type="text" className="form-control" id="usename" 
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }} />
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}/>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="customer" checked={role === 'customer'}
                    onClick={(e) => {
                        setRole('customer')
                    }}/>
                    <label class="form-check-label" for="flexRadioDefault1">
                        Customer Account
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="owner" checked={role === 'owner'}
                    onClick={(e) => {
                        setRole('owner')
                    }}/>
                    <label class="form-check-label" for="flexRadioDefault2">
                        Seller Account
                    </label>
                </div>
                <div className="mb-3">
                    <Link to="/login" style={{color:"black"}} >You already have an account?</Link>
                </div>
                <button style={{ borderColor: 'white',background: 'black' ,justifySelf:"center"}} type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
        </header>
    )
}