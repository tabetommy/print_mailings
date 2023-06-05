import React,{useState, useEffect} from 'react';
import AddIcon from '@mui/icons-material/Add';
import {PalSelect} from '../customSelect/customSelect';
import {FilteredValuesContext} from '../globalState';
import './pal.css';

const Pal=({data})=>{//data is all the data from databank
 const [dates, setDates]=useState([]);
 
 useEffect(()=>{
	 data.map(data=>{
		 if(!dates.includes(data.pal)){
			 setDates(prevState=>[...prevState, data.pal])
		 }
		 
	 })
 },[data]);
  return (
	  <div className='pal'>
	  	<p>Pal</p>
	  	<PalSelect dates={dates} />
	  	<div className='neues-pal'>
			<AddIcon />
			<span>Neues Pal</span>
	  	</div>
	  </div>
  )
}

export default Pal;