import React, {useState} from 'react';
import * as Realm from 'realm-web';

const HalbVersion=()=>{

 const [versionWerten, setVersionWerten]=useState([{ version: "", menge:0}]);
 

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
    
  const sendenData= async (event)=>{
	  event.preventDefault();
	  const app = new Realm.App({ id: "place your PP ID" });
	  const credentials = Realm.Credentials.anonymous();
	  try {
		const user = await app.logIn(credentials);
		const sendData= user.functions.sendData(versionWerten[0].version,versionWerten[0].menge );
		setVersionWerten([{ version: "", menge:0}])
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
		
		))}
		<button onClick={sendenData} >Send data</button>
	</div>
  );
}

export default HalbVersion;