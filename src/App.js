
import {Routes, Route, Link} from 'react-router-dom';
import './App.css';
//import Main from './components/main/main';
import MainComponent from './components/main/main';
import NeuesProjekt from './components/neuesProjekt/neuesProjekte';
import logo from './Image.svg';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';


function App() {
  
  return (
    
    <div>
      <div className="nav-main">
        <div className='nav'>
          <div className="home-icon">
            <Link to="/" style={{ textDecoration: 'none' }} className="link">
              <HomeOutlinedIcon style={{ color: "white", fontSize: 40  }}/>
              <span>Startseite</span>
            </Link>
          </div>
          <img src={logo} />
        </div>
      </div>
      <div className='app'>
        <Routes>
          <Route path='/' element={<MainComponent />} />
          <Route path='/neuesProjekt' element={<NeuesProjekt/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

