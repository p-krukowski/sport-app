import { API_BASE_URL, ACCESS_TOKEN} from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json'
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json()
        .then(json => {
            if(!response.ok) {
                
                return Promise.reject(json);
            }
            return json;
        })
    )
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}


export function signUp(signupRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getAllEntries() {
    return request({
        url: API_BASE_URL + "/entries",
        method: 'GET'
    });
}

export function addEntry(entry) {
    return request({
        url: API_BASE_URL + "/add-entry",
        method: 'POST',
        body: JSON.stringify(entry)
    });
}

export function getAccountInfo() {
    return request({
        url: API_BASE_URL + "/myaccount",
        method: 'GET'
    });
}

export function addPointToEntry(id) {
    return request({
        url: API_BASE_URL + "/plus-button",
        method: 'POST',
        body: JSON.stringify(id)
    })
}