import React,{useEffect} from 'react';
import Version from './versionen';


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
	
	return(
		<div>
		{
			medium.map((data,index)=>{
				return(
					<div key={data.medium_id} >
						<div className='medium'>
							  <label htmlFor='medium'>Medium</label><br/>
							  <input type="text" name="medium" id='medium' className='medium-input'
							  placeholder='Bitte Medium eintragen'
							  value={data.bezeichnung}
							  onChange={event=>handleMediumChange(index, event)}
							  />
						</div>
						<Version medium={data} updateVersion={setMedium} mediumState={medium} medium_index={index}/>
						<div className='main-con textarea-con'>
							<label htmlFor='kommentar'>Kommentar</label><br/>
							<textarea cols="30" rows="10" name="kommentar"
							  id="kommentar" className="cm-style" placeholder='Hinweise zum Projekte eintragen'
							  value={data.kommentar}
							  onChange={event=>handleMediumChange(index, event)}
							  ></textarea>
						</div>
						<div className='main-con  gesamtmenge'>
							<label htmlFor='gesamtmenge'>Gesamtaussendemenge</label><br/>
							<input name='gesamtmenge' id='gesamtmenge' 
							type="number" min="0" 
							value={data.gesamtmenge}
							onChange={event=>handleMediumChange(index, event)}
							/><br/>
						</div>
					</div>
				)
			})
		}
		</div>
	)
}

export default Medium;