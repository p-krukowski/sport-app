import {API_BASE_URL} from "../../constants";
import {request} from "./Request";

const componentUrl = API_BASE_URL + '/sport/disciplines';

export function getAllDisciplines() {
    return request({
        url: componentUrl + "/all",
        method: 'GET'
    });
}