import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Versionen from './versionen';
import Medium from './medium';
import './neuesProjekt.css';
import * as Realm from 'realm-web';
import { v4 as uuidv4 } from 'uuid';


const Neuesprojekt=()=>{
	
  //set states of elements
  const [projektWerte, setProjektWerte]= useState("");
  const [unterProjektWerte, setUnterProjektWerte]= useState("");
  const [datum, setDatum]= useState(undefined);
  const [medium,setMedium]= useState([{
	  medium_id:uuidv4(),
	  bezeichnung:"",
	  kommentar:"",
	  gesamtmenge:0,
	  versionen:[{
		  version_id:uuidv4(), 
		  bezeichnung: "", 
		  datei:null ,
		  path:{},
		  menge:undefined
	  }]
  }]);
  
  // options for Oberprojekt and Unterprojekt
  const oberProjektOptionen=["Affinitätenbasierte Mailing Factory","Welcome Strecke","Dekorunde"];
  const unterProjektOptionen=["Ratenkredit", "Eigentümerkredit", "Stopschild-Mailing", "CBU ", "CB-GK "];

  
  const navigate=useNavigate();// navigate back to overview

  const today = new Date().toISOString().split('T')[0];// date limited to current date
  
 //reset inputs
  const clearInputs=()=>{
		setProjektWerte("");
		setUnterProjektWerte(" ");
		setDatum(undefined);
		setMedium([{
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
		}]);
	}
  
	
  //send data to database
  const handleSubmit= async (event)=>{
	event.preventDefault();
	const app = new Realm.App({ id: "mypracticeapp-zwwer"});
	const credentials = Realm.Credentials.anonymous();
	try {
	  const user = await app.logIn(credentials);
	  const sendData= user.functions.sendCompleteData(projektWerte, unterProjektWerte,datum, medium);
	  clearInputs();
	  console.log("submit was succesful")
	} catch(err) {
	  console.error("Failed to log in", err);
	}
  }
  

  return (
	<div className='form-con'>
		<form className='form'>
	  	<h1>Neues projekt erstellen</h1>
	  	<div className='main-con'>
			<label htmlFor='ober-project' >Oberprojekt</label><br/>
			<input list="ober-projekt" 
			value={projektWerte}
			name="ober-projekt" 
			onChange={event=>setProjektWerte(event.target.value)}
			placeholder="Bitte Oberprojekt eintragen oder auswählen"
			className='input'/>    
			<datalist id="ober-projekt">
				{oberProjektOptionen.map(option=><option key={option}>{option}</option>)}
			</datalist><br/>
	  	</div>
	  	<div className='main-con'>
			<label htmlFor='unter-projekt'>Unterprojekt</label><br/>
			<input list="unter-projekt" 
			value={unterProjektWerte}
			name="unter-projekt" 
			onChange={event=>setUnterProjektWerte(event.target.value)}
			placeholder="Bitte Unterprojekt eintragen oder auswählen"
			className='input'/>    
			<datalist id="unter-projekt">
		  	{unterProjektOptionen.map(option=><option key={option}>{option}</option> )}  
			</datalist><br/>
	  	</div>
	  	<div className='main-con'>
		  	<label htmlFor='pal'>PAL</label><br/>
		  	<input type="date" name="pal" id='pal' className='input' 
		  	max={today}
		  	value={datum===undefined?'':datum}
		  	onChange={event=>setDatum(event.target.value)}
		  	/>
	  	</div>
	  	<Medium medium={medium} setMedium={setMedium}/>
	  	<div className='main-con btn-con'>
			<button className='pr-speichern' onClick={handleSubmit}>Projekt speichern</button>
			<span className='verwerfen' onClick={clearInputs}>Verwerfen</span>
	  	</div>
		</form>
	</div>
	
  );
}

export default Neuesprojekt;
