import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import {PalSelect} from '../customSelect/customSelect';
import './pal.css';

const Pal=()=>{
  //const [pal, setPal]= React.useState("");
  const data = [
				//{id: 0, label: new Date('2022-10-15').toLocaleDateString()},
				//{id: 1, label: new Date('2022-11-10').toLocaleDateString()},
				//{id: 2, label: new Date('2022-12-13').toLocaleDateString()},
				//{id: 3, label: new Date('2023-01-11').toLocaleDateString()},
				//{id: 4, label: new Date('2023-02-14').toLocaleDateString()},
				{id: 0, label: "2023-04-18"},
				{id: 1, label: "2023-04-19"},
				{id: 2, label: "2023-04-20"},
				];

  return (
	  <div className='pal'>
	  	<p>Pal</p>
	  	<PalSelect data={data}/>
	  	<div className='neues-pal'>
			<AddIcon />
			<span>Neues Pal</span>
	  	</div>
	  </div>
  )
}

export default Pal;