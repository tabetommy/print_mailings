import React,{useEffect} from 'react';
import Version from './versionen';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveIcon from '@mui/icons-material/Remove';
import { v4 as uuidv4 } from 'uuid';


const Medium=({medium, setMedium})=>{
	
	const handleMediumChange=(index, event)=>{
		let neueMedium = [...medium];
		switch (event.target.name) {
			case 'medium':
			neueMedium[index].bezeichnung = event.target.value;
			setMedium(neueMedium);
			break;
			case 'kommentar':
			neueMedium[index].kommentar = event.target.value;
			setMedium(neueMedium);
			break;
			case 'gesamtmenge':
			neueMedium[index].gesamtmenge = event.target.value;
			setMedium(neueMedium);
			break;
			default:
			console.log("No change");
		}
		  
	}
	
	// add new element to medium state array
	const addMedium=(event)=>{
		 event.preventDefault();
		 const newMedium=[...medium];
		 newMedium.push(
			 {
			 medium_id:uuidv4(),
			 bezeichnung:"",
			 gesamtmenge:0,
			 versionen:[{
				   version_id:uuidv4(), 
				   bezeichnung: "", 
				   datei:null ,
				   path:{} ,
				   menge:undefined
			   }]
			  } 
		 );
		 
		 setMedium(newMedium);
	}
	
	// remove element from medium state array by index
	const removeMedium=(event,index)=>{
		event.preventDefault();
		const newMedium=[...medium];
		newMedium.splice(index, 1);
		setMedium(newMedium);
	}
	
	return(
		<div>
		{
			medium.map((data,index)=>{
					return (
						<div key={data.medium_id} className="medium">
						    <div className="medium-first" onClick={(event)=>removeMedium(event,index)}>
								<RemoveIcon/>
							</div>
							<div>
								  <label htmlFor='medium'>Medium</label><br/>
								  <input type="text" name="medium" id='medium' className='input-white'
								  placeholder='Bitte Medium eintragen'
								  value={data.bezeichnung}
								  onChange={event=>handleMediumChange(index, event)}
								  />
							</div>
							<Version medium={data} updateVersion={setMedium} mediumState={medium} medium_index={index}/>
							<div className='main-con'>
								<label htmlFor='kommentar'>Kommentar</label><br/>
								<textarea  
								  rows="4" cols="50"
								  name="kommentar"
								  id="kommentar" className="cm-style input-white" placeholder='Hinweise zum Projekte eintragen'
								  value={data.kommentar}
								  onChange={event=>handleMediumChange(index, event)}
								  ></textarea>
							</div>
							<div className='main-con  gesamtmenge'>
								<label htmlFor='gesamtmenge'>Gesamtaussendemenge</label><br/>
								<input 
								name='gesamtmenge' 
								id='gesamtmenge' 
								type="number" min="0" 
								value={data.gesamtmenge}
								onChange={event=>handleMediumChange(index, event)}
								className="input-white input-gesamtmenge"
								/><br/>
							</div>
							<button className='btn-add-medium' onClick={addMedium}>
								<AddIcon fontSize='small' />
								Medium hinzufügen
							</button>
						</div>
					)
				
			})
		}
		</div>
	)
}

export default Medium;