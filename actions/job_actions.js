//import axios from 'axios'
//import reverseGeoCode from 'latlng-to-zip'
import {
	FETCH_JOBS
} from './types'

import qs from 'qs'

const JOB_ROOT_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?-33.8670522,151.1957362&'
const JOB_QUERY_PARAMS = {
	
	
	
	
	radius:50,
	type:'restaurant',
	keyword:'cruise',

	
	key:'AIzaSyBWlbv65WQLb5g4SeibzAMWn_QBDN16Hyw'
}

const buildJobsUrl = (zip) =>{
	const query = qs.stringify({...JOB_QUERY_PARAMS})
	//return `${JOB_ROOT_URL}${query}`
	return `${JOB_ROOT_URL}${query}`
}
export const fetchJobs = (region) => async(dispatch) =>{
	try{
		//let zip = await reverseGeoCode(region)
		const url = buildJobsUrl(95063)
		console.log(url)

		const response = await fetch(url);
    	const json = await response.json();
    	//this.setState({ data: json.results });
		
		//let {data} = await axios.get(url)
		console.log(json.status)
		//dispatch({type: FETCH_JOBS,payload:data})
	}catch(e){
		console.error(e)
	}

}