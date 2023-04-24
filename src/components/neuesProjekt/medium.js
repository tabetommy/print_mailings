import React,{useState} from 'react';
import { v4 as uuidv4 } from 'uuid';


const Medium=()=>{
	const [medium,setMedium]= useState([{
		bezeichnung:"",
		kommentar:"",
		gesamtmenge:undefined,
		versionen:[{
			id:uuidv4(), 
			datei:null ,
			path:"" ,
			version: "", 
			menge:undefined
		}]
	}]);
	
	return(
		<div></div>
	)
}

export default Medium;