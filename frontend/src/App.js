import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Header from './Header';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import AboutUs from './components/aboutUs';
import Home from './components/Home';
import OwnerDashboard from './components/ownerDashboard';
import CustomerDashboard from './components/customerDashboard';
import BoardingEase from './components/BoardingEase';

function App() {
  return (
    <Router>
      <div>
      <Header/>
      <Routes>
        <Route path='/signup' exact Component={Signup} />
        <Route path='/login' exact Component={Login} />
        <Route path='/aboutus' exact Component={AboutUs} />
        <Route path='/home' exact Component={Home} />
        <Route path='/owndash' exact Component={OwnerDashboard} />
        <Route path='/cusdash' exact Component={CustomerDashboard} />
        <Route path='/' exact Component={BoardingEase} />
      </Routes>
    </div>
    </Router>
    
  );
}

export default App;
