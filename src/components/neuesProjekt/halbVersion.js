import React, {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import * as Realm from 'realm-web';


const Versionen=({versionWerten, setVersionWerten})=>{  

  const handleChange = (index, event) => {
	let neueVersionWerten = [...versionWerten];
  if (event.target.name==='version'){
		neueVersionWerten[index].version = event.target.value;
		setVersionWerten(neueVersionWerten);
	}else if(event.target.name==='menge'){
		neueVersionWerten [index].menge= event.target.value;
		setVersionWerten(neueVersionWerten);
	}else{
		console.log("Jesus")
	}
  }
   //testing serverless function sending data  
	 const sendenData= async (event)=>{
		 event.preventDefault();
		 const app = new Realm.App({ id: "mypracticeapp-zwwer" });
		 const credentials = Realm.Credentials.anonymous();
		 try {
		   const user = await app.logIn(credentials);
		   const sendData= user.functions.sendData(versionWerten[0].version,versionWerten[0].menge );
		   setVersionWerten([{ version: "", menge:undefined}])
		 } catch(err) {
		   console.error("Failed to log in", err);
		 }
	   }
  
  return (
	
	<div className='main-con'>
		{versionWerten.map((version,index)=>(
			<div  key={index}>
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
		))
		}
	</div>
  );
}

export default Versionen;


//mongo function sendComplete Data

const versionen=[].push({id:String,
	  bezeichnung:String,
	  menge:Int8Array,
	  datei:String
	})

const pals=[{
  id:String,
  datum:Date,
  medium:[{
	id:String,
	bezeichnung:String,
	gesamtMenge:Int8Array,
	kommentar:String,
	versionen:versionen
  },]
},
  ]

exports = async function(projekt,unterprojekt,pals){

  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "printMedien";
  var collName = "projekt";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
   collection.insertOne({"bezeichnung": projekt, "versandMenge": unterprojekt, "pals":pals})

};

//pals from neueVersion component
const pals=[{
id:uuidv4(),  
datum:datum,
medium:[{
  id:uuidv4(),	
  bezeichnung:medium,
  gesamtMenge:gesamtmenge,
  kommentar:kommentar,
  versionen:[{
	id:uuidv4(),  
	bezeichnung:versionWerten[0].version,
	menge:versionWerten[0].menge,  
	datei:selectedFile
	  }]
	}]
}
]

//upload file to server and retrieve a url (from versionen component)
  
	 
	 React.useEffect(()=>{
		  const formData = new FormData();  //create new form object
		  formData.append("myImage", versionWerten[0].datei);//add image to form object
		  axios({
			method: "post",
			url: "http://localhost:5000/upload-image",
			data: formData,  //send image to server
		  })
		   .then((response) => {
			const { data } = response; //return image url of uploaded img
			setSelectedFile(data.url); //set url to selectedFile var in neuesprojekt component
		  })
		   .catch((err) => {
			console.log(err);
		  });
		  
	  },[versionWerten[0].datei]);
	  
	  
	// function to send data to database
	exports = async function(oberprojekt,unterprojekt,pal,medium,versionen, kommentar, gesamtmenge){
	
	  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
	  var serviceName = "mongodb-atlas";
	
	  // Update these to reflect your db/collection
	  var dbName = "printMedien";
	  var collName = "projekt";
	
	  // Get a collection from the context
	  var collection = context.services.get(serviceName).db(dbName).collection(collName);
	  
	   collection.insertOne({"oberprojekt": oberprojekt, "unterProjekt": unterprojekt, "pal":pal, "medium":medium, "versionen":versionen, "kommentar":kommentar, "gesamtmenge":gesamtmenge})
	
	};
	
	//send path from server
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
	
	  
		 
		
		 
		 
		 let neueVersion = [...medium.versionen];
		 if (event.target.name==='version'){
			 neueVersion[index].bezeichnung = event.target.value;
			 updateVersion([{...medium, versionen:neueVersion}]);
			 console.log(neueVersion)
		 }else if(event.target.name==='menge'){
			 neueVersion[index].menge= event.target.value;
			 updateVersion([{...medium, versionen:neueVersion}]);
		 }else if(event.target.name==='datei'){
			 setIsFileSelected(true);
			 neueVersion[index].datei= event.target.files[0]; 
			 updateVersion([{...medium, versionen:neueVersion}]);
			 //updatePath(index)
		 }