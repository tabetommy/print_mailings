import React,{useContext} from 'react';
import {FilteredValuesContext} from '../globalState';
import {useNavigate} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import {ProjektSelect }from '../customSelect/customSelect';
import './projekt.css';

const Projekt=()=>{

  //const [projekt, setProjekt]= React.useState("");
  const data = [
                {id: 0, label: "Affinitätenbasierte Mailing Factory"}, 
                {id: 1, label: "Welcome Strecke"},
                {id: 2, label: "Dekorunde"}
                ];
                
  const navigate=useNavigate();
  
  return (
  	<div className='projekt'>
      <p>Projekt</p>
      <ProjektSelect data={data}/>
      <div className='neues-projekt' onClick={()=>navigate('/neuesProjekt')} >
        <AddIcon />
        <span>Neues Projekt</span>
      </div>
  	</div>
  )
}

export default Projekt;


