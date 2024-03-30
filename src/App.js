import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/Navbar';
import IntroPage from './components/IntroPage';
import LoginPage from './components/LoginPage';
import ManagerDashboard from './components/ManagerDashBoard';
import StaffDashBoard from './components/StaffDashBoard';

function App() {
  return (
    <div className="App">
    
      <Routes>
        <Route path="/" element={<IntroPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/manager" element={<ManagerDashboard/>}/>
        <Route path='/staff' element={<StaffDashBoard/>}/>
      </Routes>
      
      {/* <IntroPage/> */}
      {/* <LoginPage/> */}
      {/* <ManagerDashboard/> */}
    </div>
  );
}

export default App;
