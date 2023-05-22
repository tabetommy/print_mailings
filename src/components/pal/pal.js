import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import {PalSelect} from '../customSelect/customSelect';
import './pal.css';

const Pal=()=>{
  //const [pal, setPal]= React.useState("");
  const data = [
				{id: 0, label: "2023-04-18"},
				{id: 1, label: "2023-04-19"},
				{id: 2, label: "2023-04-20"},
				{id: 3, label: "2023-04-25"},
				{id: 4, label: "2023-05-12"},
				];

  return (
	  <div className='pal'>
	  	<p>Pal</p>
	  	<PalSelect data={data}/>
		{/*<label htmlFor="pal">Pal</label><br/> 
		<input type="date" id="pal" name="pal" />*/}
	  	<div className='neues-pal'>
			<AddIcon />
			<span>Neues Pal</span>
	  	</div>
	  </div>
  )
}

export default Pal;