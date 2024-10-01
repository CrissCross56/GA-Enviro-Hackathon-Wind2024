import { getToken } from './tokenService'

// This is the base path of the Express route we'll define
export default async function sendRequest(url, method = 'GET', payload = null) {
    console.log("SEND REQEST", url, payload, method)
    // Fetch accepts an options object as the 2nd argument
    // used to include a data payload, set headers, etc. 
    const options = { method };
    if (payload) {
        console.log("PAYLOAD", payload)
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(payload);
        console.log("Options PAYLOAD", options.body)

    }
    const token = getToken();
    if (token) {
        console.log("TOKEN", token)
        // Ensure the headers object exists
        options.headers = options.headers || {};
        // Add token to an Authorization header
        // Prefacing with 'Bearer' is recommended in the HTTP specification
        options.headers.Authorization = `Bearer ${token}`;
        console.log("HEADER", options.headers)
        console.log("AUTHORIZATION", options.headers.Authorization)

    }

    const res = await fetch(url, options);
    console.log("RES", res)
    // res.ok will be false if the status code set to 4xx in the controller action
    if (res.ok) return res.json();
    throw new Error('Bad Request at SEND REQUEST');
}
