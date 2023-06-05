import React,{useState} from 'react';
import Projekt from '../projekt/projekt';
import Unterprojekt from '../unterprojekt/unterprojekt';
import Pal from '../pal/pal';
import {FilteredValues} from '../filteredValues/filteredValues';
import FilteredDataView from '../filteredDataView/filteredDataView';
import './main.css';
import {FilteredValuesProvider} from '../globalState';
import axios from 'axios';
import EditNoteIcon from '@mui/icons-material/EditNote';
import {useNavigate} from 'react-router-dom';
//import HalbVersion from '../neuesProjekt/halbVersion';



const MainComponent=()=>{	
	const [alldata, setAlldata]= useState([]);
	const navigate=useNavigate();
	return(
		<div className='main-container'>
			<FilteredValuesProvider>
				<h1>Projekte auswählen</h1>
				<EditNoteIcon onClick={()=>navigate('/projektBearbeitung')} style={{ color: '#2600F2',fontSize: 40, cursor:'pointer'}}/>
				<div className='main-components'>
						<Projekt />
						<Unterprojekt />
						<Pal data={alldata}/>
				</div>
				<FilteredValues />
				<FilteredDataView setData={setAlldata}/>
			</FilteredValuesProvider>
			
		</div>
	)
}

export default MainComponent;