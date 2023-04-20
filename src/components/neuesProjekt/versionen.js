import React, {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const HalbVersion=({versionWerten, setVersionWerten, selectedFile, setSelectedFile})=>{

   
   const [isFileselected, setIsFileSelected]=useState(false)
 

  const handleChange = (index, event) => {
	let neueVersionWerten = [...versionWerten];
  if (event.target.name==='version'){
		neueVersionWerten[index].version = event.target.value;
		setVersionWerten(neueVersionWerten);
	}else if(event.target.name==='menge'){
		neueVersionWerten [index].menge= event.target.value;
		setVersionWerten(neueVersionWerten);
	}else if(event.target.name==='datei'){
		setIsFileSelected(true);
		neueVersionWerten[index].datei= event.target.files[0]; 
		setVersionWerten(neueVersionWerten);
		updatePath(index)
		console.log("Jesus")
	}
  }
  
  
  
  const updatePath=(index)=>{
	   const formData = new FormData();  //create new form object
		  formData.append("myImage", versionWerten[index].datei);//add image to form object
		  axios({
			method: "post",
			url: "http://localhost:5000/upload-image",
			data: formData,  //send image to server
		  })
		   .then((response) => {
			const { data } = response; //return image url of uploaded img
			//update path in versionWerten state with url
			let neueVersionWerten = [...versionWerten];
			neueVersionWerten[index].path= data.url; 
			setVersionWerten(neueVersionWerten);
		  })
		   .catch((err) => {
			console.log(err);
		  });	  
   }
    
   //add the version element with pdf upload and amount
   const hinzufügenHandler=(event)=>{
		event.preventDefault();
		setVersionWerten([...versionWerten, { id:uuidv4(), datei:null, path:"", version: "" ,  menge:undefined}])
   }
   
   const handleFileDelete=(index)=>{
	   let neueVersionWerten=[...versionWerten];
	   neueVersionWerten[index].beleg= null;
	   setVersionWerten(neueVersionWerten);
	   console.log(versionWerten)
	   //delete then turn isFileSelected back to false
   }
   
  return (
	<div className='main-con'>
		{versionWerten.map((version,index)=>(
			<div  key={index}>
				<div className='versionen-input'>
					<div className='beleg'>
						<label htmlFor='datei'>Upload</label><br/>                 
							<IconButton color="primary" component="label" className='btn-upload'>
								<input hidden type="file" name='datei' 
								 onChange={event => handleChange(index, event)} />
								<AddIcon />
							</IconButton>
					</div>
					<div className='versionierung'>
						<label htmlFor='version'>Versionierung</label><br/>
						<input type="text" id="version" name="version" className='versionierung-input'
						value={version.version}   onChange={event => handleChange(index, event)}/> 
					</div>
					<div className='versandmenge'>
						<label htmlFor='menge'>Versandmenge</label><br/>
						<input type="number" id="menge" name="menge" min="0" className='versandmenge-input' 
						value={version.menge===undefined? '': version.menge}   onChange={event => handleChange(index, event)}/> 
					</div>
				</div>
				{versionWerten[index].datei?
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
		<button className='btn-add' onClick={hinzufügenHandler}>
			<AddIcon fontSize='small' />
			Version hinzufügen
		</button> 
	</div>
  );
}

export default HalbVersion;