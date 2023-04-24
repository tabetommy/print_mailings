import React from 'react';
import {useNavigate} from 'react-router-dom';
import Versionen from './versionen';
import Medium from './medium';
import './neuesProjekt.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as Realm from 'realm-web';
import { v4 as uuidv4 } from 'uuid';


const Neuesprojekt=()=>{
	
  //set states of elements
  const [projektWerte, setProjektWerte]= React.useState("");
  const [unterProjektWerte, setUnterProjektWerte]= React.useState("");
  const [datum, setDatum]= React.useState(undefined);
  const [medium,setMedium]=React.useState("");
  const [versionWerten, setVersionWerten]=React.useState([{id:uuidv4(), datei:null ,path:"" ,version: "", menge:undefined}]);
  //const [selectedFile, setSelectedFile]=React.useState(null);
  const [kommentar, setKommentar]= React.useState("");
  const [gesamtmenge, setGesamtMenge] =React.useState(undefined);
  
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
		setMedium("");
		setVersionWerten([{ datei:null, version:" ", path:" ", menge:undefined}]);
		setKommentar("");
		setGesamtMenge(undefined);
	}
  
  
	
  //send data to database
  const handleSubmit= async (event)=>{
	event.preventDefault();
	const app = new Realm.App({ id: "place app id here" });
	const credentials = Realm.Credentials.anonymous();
	try {
	  const user = await app.logIn(credentials);
	  const sendData= user.functions.sendCompleteData(projektWerte, unterProjektWerte,datum, medium, versionWerten,kommentar,gesamtmenge);
	  clearInputs();
	  console.log("submit was succesful")
	} catch(err) {
	  console.error("Failed to log in", err);
	}
  }
  

  return (
	<form className='App-con'>
	  <div className='neuesprojekt-return' onClick={()=>navigate('/')}>
	    <ArrowBackIcon />
	    <p>züruck zur Übersicht</p>
	  </div>
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
	  

	  <div className='main-con pal-medium'>
		<div className='pal'>
		  <label htmlFor='pal'>PAL</label><br/>
		  <input type="date" name="pal" id='pal' className='pal-input' 
		  max={today}
		  value={datum===undefined?'':datum}
		  onChange={event=>setDatum(event.target.value)}
		  />
		</div>
		<div className='medium'>
		  <label htmlFor='medium'>Medium</label><br/>
		  <input type="text" name="medium" id='medium' className='medium-input' value={medium}
		  placeholder='Bitte Medium eintragen' onChange={event=>setMedium(event.target.value)}/>
		</div>
	  </div>

	  <Versionen 
	  versionWerten={versionWerten} 
	  setVersionWerten={setVersionWerten} 
	  />

	  <div className='main-con textarea-con'>
		<label htmlFor='kommentar'>Kommentar</label><br/>
		<textarea cols="30" rows="10" name="kommentar"
		  id="kommentar" className="cm-style" placeholder='Hinweise zum Projekte eintragen'
		  value={kommentar}
		  onChange={event=>setKommentar(event.target.value)}
		  ></textarea>
	  </div>

	 <div className='main-con  gesamtmenge'>
		<label htmlFor='gesamt-menge'>Gesamtaussendemenge</label><br/>
		<input name='gesamt-menge' id='gesamt-menge' 
		type="number" min="0" 
		value={gesamtmenge===undefined?'':gesamtmenge} onChange={event=>setGesamtMenge(event.target.value)}/><br/>
	 </div>
	  
	  <div className='main-con btn-con'>
		<button className='pr-speichern' onClick={handleSubmit}>Projekt speichern</button>
		<span className='verwerfen' onClick={clearInputs}>Verwerfen</span>
	  </div>
	  <Medium />
	</form>
	
  );
}

export default Neuesprojekt;
