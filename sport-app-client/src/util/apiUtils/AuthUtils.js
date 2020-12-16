import {ACCESS_TOKEN, API_BASE_URL} from '../../constants';
import {request} from "./Request";

export function signIn(loginRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/signin",
        method: 'POST',
        data: loginRequest,
        mode: 'cors'
    });
}


export function signUp(signupRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/signup",
        method: 'POST',
        data: signupRequest
    });
}

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/users/me",
        method: 'GET'
    });
}