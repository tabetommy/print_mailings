import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import {UnterProjektSelect} from '../customSelect/customSelect';
import './unterprojekt.css';

const Unterprojekt=()=>{
  //const [unterprojekt, setUnterprojekt]=React.useState("");
  const data = [
				{id: 0, label: "Ratenkredit"}, 
				{id: 1, label: "Eigentümerkredit"},
				{id: 2, label: "Stopschild-Mailing"},
				{id: 3, label: "CBU"},
				{id: 4, label: "CB-GK"}
				];
  

  return (
	  <div className='unterprojekt'>
	  <p>Unterprojekt</p>
	  <UnterProjektSelect data={data}/>
	  <div className='neues-unterprojekt'>
		<AddIcon />
		<span>Neues Unterprojekt</span>
	  </div>
	  </div>
  )
}

export default Unterprojekt;
