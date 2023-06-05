import React,{useContext} from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {FilteredValuesContext} from '../globalState';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './customSelect.css';
import moment from 'moment';

// custom select tag for project(seperate them because of need of seperate states)
export const ProjektSelect= ({data}) => {
  const [isOpen, setOpen] = React.useState(false);
  const [items, setItem] = React.useState(data);
  const [selectedItem, setSelectedItem] = React.useState(null);
  
  const {projektState}=useContext(FilteredValuesContext);
  const [projekt, setProjekt]=projektState;
  
  const toggleDropdown = () => setOpen(!isOpen);
  
  const handleItemClick = (id) => { 
	  //seperate state for different values
	selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
	updateItemValue(id);
	setOpen(!isOpen);
  }
  const updateItemValue=(id)=>{
		const newItem=items.find(item=>item.id==id).label;
		//updateState(newItem);
		setProjekt(newItem);
	}
    
  return (
	<div className='dropdown'>
	  <div className='dropdown-header' onClick={toggleDropdown}>
	  	{/* when item has been selected from dropdown, selectedItem state is updated, the 
			  item is found by id from the item(data) state and label of the found its displayed
			  */}
		{selectedItem ? items.find(item => item.id == selectedItem).label : "Projekt"}
		<ExpandMoreIcon />
		{/*<i className={`fa fa-chevron-right icon ${isOpen && "open"}`}></i>*/}
	  </div>
	  <div className={`dropdown-body ${isOpen && 'open'}`}>
		{items.map(item => (
		  <div className="dropdown-item" 
		  onClick={e=>handleItemClick(e.target.id)} 
		  id={item.id}
		  key={item.id}
		  >
			{item.label}
		  </div>
		))}
	  </div>
	</div>
  )
}


//custom select tag for sub project
export const UnterProjektSelect= ({data}) => {
  const [isOpen, setOpen] = React.useState(false);
  const [items, setItem] = React.useState(data);
  const [selectedItem, setSelectedItem] = React.useState(null);
  
  const {unterprojektState}=useContext(FilteredValuesContext);
  const [unterprojekt, setUnterprojekt]=unterprojektState;
	
  const toggleDropdown = () => setOpen(!isOpen);
  
  const handleItemClick = (id) => { 
	  //seperate state for different values
	selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
	updateItemValue(id);
	setOpen(!isOpen);
  }
  const updateItemValue=(id)=>{
		const newItem=items.find(item=>item.id==id).label;
		//updateState(newItem);
		//setProjekt(newItem);
		setUnterprojekt(newItem);
	}
	
  return (
	<div className='dropdown'>
	  <div className='dropdown-header' onClick={toggleDropdown}>
		  {/* when item has been selected from dropdown, selectedItem state is updated, the 
			  item is found by id from the item(data) state and label of the found its displayed
			  */}
		{selectedItem ? items.find(item => item.id == selectedItem).label : "Unterprojekt"}
		<ExpandMoreIcon />
		{/*<i className={`fa fa-chevron-right icon ${isOpen && "open"}`}></i>*/}
	  </div>
	  <div className={`dropdown-body ${isOpen && 'open'}`}>
		{items.map(item => (
		  <div className="dropdown-item" 
		  onClick={e=>handleItemClick(e.target.id)} 
		  id={item.id}
		  key={item.id}
		  >
			{item.label}
		  </div>
		))}
	  </div>
	</div>
  )
}

//custom pal select tag

export const PalSelect= ({dates}) => {
  const [isOpen, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  
  const {palState}=useContext(FilteredValuesContext);
  const [pal, setPal]=palState;
	
  const toggleDropdown = () => setOpen(!isOpen);
  
  //const dates=["2023-05-12","2023-05-23", "2023-05-25", "2023-05-30" ];
  return (
	<div className='dropdown'>
	  <div className='dropdown-header' onClick={toggleDropdown}>
		 
		{pal?moment(pal).format("YYYY-MM-DD"):"Pals"}
		<ExpandMoreIcon />
	  </div>
	  <div className={`dropdown-body-pal ${isOpen && 'open'}`}>
		<Calendar 
		value={pal}
		onChange={setPal} 
		  tileClassName={({date, view})=>{
			if(dates.find(x=>x===moment(date).format("YYYY-MM-DD"))){
			 return  'highlight'
			}
		  }}
		  />
	  </div>
	</div>
  )
}
