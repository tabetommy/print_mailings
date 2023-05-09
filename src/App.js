import logo from './logo.svg';
import {Routes, Route} from 'react-router-dom';
import './App.css';
//import Main from './components/main/main';
import MainComponent from './components/main/main';
import NeuesProjekt from './components/neuesProjekt/neuesProjekte';


function App() {
  
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<MainComponent />} />
        <Route path='/neuesProjekt' element={<NeuesProjekt/>} />
      </Routes>
    </div>
  );
}

export default App;

