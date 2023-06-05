import React, {useState,useeffect} from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Version=({medium, updateVersion, mediumState, medium_index})=>{

   
   const [isFileselected, setIsFileSelected]=useState(false);
   
   
 

  const handleChange = (index, event) => {
	  let newMediumState=[...mediumState]//copy medium 
	  /*locate the medium element from medium state by index(medium_index)
	   then navigate to versionen and then index using index sent from onchange
	  */
	  let version=newMediumState[medium_index].versionen[index]
	  switch (event.target.name) {
		  case 'version':
		  version.bezeichnung = event.target.value;
		  //updateVersion([{...medium, versionen:neueVersion}]);
		  updateVersion(newMediumState)
		  break;
		  case 'menge':
		  version.menge=parseInt(event.target.value, 10)
		  updateVersion(newMediumState)
		  addMenge();
		  break;
		  case 'datei':
		  setIsFileSelected(true);
		  version.datei= event.target.files[0]; 
		  updateVersion(newMediumState)
		  updatePath(index);
		  break;
		  default:
		  console.log("No change");
	  }
  }
  
  const addMenge=()=>{
	  let versionMenge=0;
	  if(mediumState[0].versionen[0].menge){
		 mediumState[0].versionen.forEach(data=>{//using medium[0] because presumptously there will be only one medium
			  versionMenge +=data.menge;
		  });
		  const newMedium=[...mediumState];
		  newMedium[0].gesamtmenge=versionMenge;
		 updateVersion(newMedium)
	  }
  }
  
  //upload file and use the returned path to update the path object
  const updatePath=(index)=>{
		 const formData = new FormData();  //create new form object
			formData.append("myImage", mediumState[medium_index].versionen[index].datei);//add image to form object
			axios({
			  method: "post",
			  url: "http://localhost:5000/upload-image",
			  data: formData,  //send image to server
			})
			 .then((response) => {
			  const { data } = response; //return image url of uploaded img
			  /*
			  select version by medium and versionen index, 
			  then update path of that particular versionen,
			  then send to database
			  */
			  let newMediumState=[...mediumState]
			  let version=newMediumState[medium_index].versionen[index];
			  version.path= data; 
			  updateVersion(newMediumState);
			})
			 .catch((err) => {
			  console.log(err);
			});	  
	 }
  
  
  const handleFileDelete=(index)=>{
		/*
		delete file from server
		extract file name from medium state, and feed into delete url
		to locate file
		*/
		const {imageName}=mediumState[medium_index].versionen[index].path;
		axios.delete(`http://localhost:5000/delete-image/${imageName}`)
		.then((response)=>{
			console.log(response.data)
		})
		.catch((err)=>{
			console.log(err)
		});
		
		// clear datei and path in medium.versionen by indexes
		let newMediumState=[...mediumState]
		let version=newMediumState[medium_index].versionen[index];
		version.datei= null; 
		version.path={};
		updateVersion(newMediumState);
   }
   
   const addVersion=(event)=>{// add a new versionen
		 event.preventDefault();
		 //mediumState[medium_index].versionen;
		 const newMediumState=[...mediumState];
		 const newVersion=newMediumState[medium_index].versionen;
		 newVersion.push({ version_id:uuidv4(), bezeichnung: "", datei:null ,path:{} ,menge:undefined });
		 updateVersion(newMediumState);
	}
   
  return (
	<div className='main-con'>
		{medium.versionen.map((version,index)=>(
			<div  key={index}>
				<div className='versionen-input'>
					<div className='beleg'>
						<label htmlFor='datei'>Upload</label><br/> 
						   <div className='btn-upload'>                
							<IconButton sx={{color: "#FFF" }} component="label">
								<input hidden type="file" name='datei' 
								 onChange={event => handleChange(index, event)} />
								<AddIcon />
							</IconButton>
						   </div>
					</div>
					<div className='versionierung'>
						<label htmlFor='version'>Versionierung</label><br/>
						<input type="text" id="version" name="version" className='versionierung-input input-white'
						value={version.version}   onChange={event => handleChange(index, event)}/> 
					</div>
					<div className='versandmenge'>
						<label htmlFor='menge'>Versandmenge</label><br/>
						<input type="number" id="menge" name="menge" min="0" className='versandmenge-input input-white' 
						value={version.menge===undefined? '': version.menge}   onChange={event => handleChange(index, event)}/> 
					</div>
				</div>
				{medium.versionen[index].datei?
				<div className='file-detail'>
					<div className='file-detail-name'>
						<span><InsertDriveFileOutlinedIcon/></span>
						<span>{version.datei.name}</span>
					</div>
					<span 
					className='file-detail-delete'
					onClick={()=>handleFileDelete(index)}
					><DeleteOutlineIcon /></span>
				</div>
				:
				null}
				
			</div>
		
		))}
		{<button className='btn-add-version' onClick={addVersion}>
			<AddIcon fontSize='small' />
			Version hinzufügen
		</button>}
	</div>
  );
}

export default Version;