import {request} from "./Request";
import {API_BASE_URL} from "../../constants";

const componentUrl = API_BASE_URL + '/sport/teams/table/';

export function getBasicTableSoccer(id) {
    return request({
        url: componentUrl + "basic&l=" + id,
        method: 'GET'
    });
}

export function getTableSoccer(id) {
    return request({
        url: componentUrl + "l=" + id,
        method: 'GET'
    });
}