import {request} from "./Request";
import {API_BASE_URL} from "../../constants";

const componentUrl = API_BASE_URL + '/sport/teams';

export function getTableSoccer(id) {
    return request({
        url: componentUrl + "/l=" + id,
        method: 'GET'
    });
}

export function getTables(discipline) {
    return request({
        url: componentUrl + '/' + discipline + '/all',
        method: 'GET'
    })
}