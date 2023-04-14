import React, {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
//versionWerten[index].beleg

const Versionen=()=>{

	  const [versionWerten, setVersionWerten]=useState([{ beleg:null,version: "", menge:undefined}]);
	  const [isFileselected, setIsFileSelected]=useState(false)
	  
 

  const handleChange = (index, event) => {
	let neueVersionWerten = [...versionWerten];
  if (event.target.name==='version'){
		neueVersionWerten[index].version = event.target.value;
		setVersionWerten(neueVersionWerten);
	}else if(event.target.name==='menge'){
		neueVersionWerten [index].menge= event.target.value;
		setVersionWerten(neueVersionWerten);
	}else if(event.target.name==='beleg'){
		setIsFileSelected(true);
		neueVersionWerten[index].beleg= event.target.files[0]; 
		setVersionWerten(neueVersionWerten);
	}else{
		console.log("Jesus")
	}
  }

	

	 const hinzufügenHandler=(event)=>{
		 event.preventDefault();
		 setVersionWerten([...versionWerten, { beleg:null, version: "" ,  menge:undefined}])
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
						<label htmlFor='beleg'>Upload</label><br/>                 
							<IconButton color="primary" component="label" className='btn-upload'>
								<input hidden type="file" name='beleg' 
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
						value={version.menge}   onChange={event => handleChange(index, event)}/> 
					</div>
				</div>
				{versionWerten[index].beleg?
				<div className='file-detail'>
					<div className='file-detail-name'>
						<span><InsertDriveFileOutlinedIcon/></span>
						<span>{version.beleg.name}</span>
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

export default Versionen;