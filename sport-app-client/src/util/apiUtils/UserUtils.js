import {request} from "./Request";
import {API_BASE_URL} from "../../constants";

const componentUrl = API_BASE_URL + '/user';

export function fetchUserLeaguesIds() {
    return request({
        url: componentUrl + "/props/leagues-ids",
        method: 'GET'
    });
}

export function fetchUserLeagues() {
    return request({
        url: componentUrl + "/props/leagues",
        method: 'GET'
    });
}