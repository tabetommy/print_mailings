import React from 'react';
import Projekt from '../projekt/projekt';
import Unterprojekt from '../unterprojekt/unterprojekt';
import Pal from '../pal/pal';
import {FilteredValues} from '../filteredValues/filteredValues';
import './filter.css';
import {FilteredValuesProvider} from '../globalState';
import axios from 'axios';
//import HalbVersion from '../neuesProjekt/halbVersion';



const Filter=()=>{
	const[fileVal, setFileVal]=React.useState("")
	const [file, setFile]=React.useState(null)
	
	
	const handleChange=(e)=>{
		setFile(e.target.files[0])
	}
	const handleSubmit = (e) => {
		e.preventDefault()  //prevent browser to refresh
		const formData = new FormData();  //create new form object
		formData.append("myImage", file);//add image to form object
		axios({
		  method: "post",
		  url: "http://localhost:5000/upload-image",
		  data: formData,  //send image to server
		})
		 .then((response) => {
		  const { data } = response; //return image url of uploaded img
		  setFileVal(data.url); //set url to image variable
		})
		 .catch((err) => {
		  console.log(err);
		});
	  }
	console.log(fileVal)
	return(
		<div className='filter-con'>
			<FilteredValuesProvider>
				<h1>Projekte auswählen</h1>
				<div className='filter-components'>
						<Projekt />
						<Unterprojekt />
						<Pal />
				</div>
				<FilteredValues />
			</FilteredValuesProvider>
		</div>
	)
}

export default Filter;