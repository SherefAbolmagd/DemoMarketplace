import { trackPromise } from 'react-promise-tracker';
import qs from 'query-string';

export async function GET(url, body = {}, headers = {}){
	try{
		console.log(body)
		const query = qs.stringify(body, {arrayFormat: 'bracket'});

		var respond = await trackPromise(fetch(`${url}?${query}`,{
			method:"GET",
			headers:{
				'Content-Type':"application/json;charset=UTF-8",
				"Accept":"application/json, text/plain, */*",
				"Cache-Control":"no-cache",
				...headers
			}
		}));
		
		let text = await respond.text();
		let json = validJson(text);
		
		if (respond.ok){
			if(json.success)
				return json.data;

			return json;
		} else if(json.errors) {
			let {errors} = json;
				
			if(errors){
				var key = Object.keys(errors)[0];
				throw new FetchError(errors[key][0], respond.status, url );
			}
		} else if(json.error) {
			throw new FetchError(json.error, respond.status, url );
		} else {
			throw new FetchError(text, respond.status, url);
		}
	} catch(err) {
		/*if(err.status !== 401 && err.status !== 500)
			var error = JSON.parse(err.message)
			toast.error(error.message);*/
		throw err;
	}
}

export async function GETUNTRACKED(url, body = {}, headers = {}){
	try{
		const query = qs.stringify(body);

		var respond = await fetch(`${url}?${query}`,{
			method:"GET",
			headers:{
				'Content-Type':"application/json;charset=UTF-8",
				"Accept":"application/json, text/plain, */*",
				"Cache-Control":"no-cache",
				...headers
			}
		});
		
		let text = await respond.text();
		let json = validJson(text);
		
		if (respond.ok){
			if(json.success)
				return json.data;

			return json;
		} else if(json.errors) {
			let {errors} = json;
				
			if(errors){
				var key = Object.keys(errors)[0];
				throw new FetchError(errors[key][0], respond.status, url );
			}
		} else if(json.error) {
			throw new FetchError(json.error, respond.status, url );
		} else {
			throw new FetchError(text, respond.status, url);
		}
	} catch(err) {
		/*if(err.status !== 401 && err.status !== 500)
			var error = JSON.parse(err.message)
			toast.error(error.message);*/
		throw err;
	}
}

export async function POST(url, data, headers = {}){
	try{
		var respond = await trackPromise(fetch(url,{
			method:"POST",
			body:JSON.stringify(data),
			headers:{
				'Content-Type':"application/json;charset=UTF-8",
				"Accept":"application/json, text/plain, */*",
				"Cache-Control":"no-cache",
				...headers
			}
		}));

		let text = await respond.text();
		let json = validJson(text);

		if (respond.ok){
			return JSON.parse(text);
		} else if(json.errors) {
			let {errors} = json;
			
			if(errors){
				var key = Object.keys(errors)[0];
				throw new FetchError( errors[key][0], respond.status, url );
			}
		} else if(json.error) {
			throw new FetchError(json.error, respond.status, url );
		} else {
			throw new FetchError(text, respond.status, url);
		}    
	}  catch (err) {
		throw err;
	}
}

export async function DELETE(url, data, headers = {}){
	try{
		var respond = await trackPromise(fetch(url,{
			method:"DELETE",
			body:JSON.stringify(data),
			headers:{
				'Content-Type':"application/json;charset=UTF-8",
				"Accept":"application/json, text/plain, */*",
				"Cache-Control":"no-cache",
				...headers
			}
		}));

		let text = await respond.text();
		let json = validJson(text);

		if (respond.ok){
			return JSON.parse(text);
		} else if(json.errors) {
			let {errors} = json;
			
			if(errors){
				var key = Object.keys(errors)[0];
				throw new FetchError( errors[key][0], respond.status, url );
			}
		} else if(json.error) {
			throw new FetchError(json.error, respond.status, url );
		} else {
			throw new FetchError(text, respond.status, url);
		}    
	}  catch (err) {
		throw err;
	}
}

export async function POSTFORM(url, form, headers = {}){
	try{

		var respond = await trackPromise(fetch(url,{
			method:"POST",
			body:form,
			headers: {
			'Accept': 'application/json',
			//'Content-Type': 'multipart/form-data',
			...headers
			},
		}));

		let text = await respond.text();
		let json = validJson(text);
		
		if (respond.ok){
			if(json.success)
				return json.data;
	
			return json;
		} else if(json.errors) {
			let {errors} = json;
				
			if(errors){
				var key = Object.keys(errors)[0];
				throw new FetchError(errors[key][0], respond.status, url );
			}
		} else if(json.error) {
			throw new FetchError(json.error, respond.status, url );
		} else {
			throw new FetchError(text, respond.status, url);
		}
	} catch (err) {
		// if(err.status !== 401 && err.status !== 500)
		// 	toast.error(err.message);
		throw err;
	}
}

function validJson(str) {
	try {
		return JSON.parse(str);
	} catch (e) {
		return false;
	}
}

class FetchError extends Error {
	constructor(message, status, url){
		super();
		
		this.name = "Fetch";
		this.message = message;
		this.status = status;
		this.url = url;
	}
}