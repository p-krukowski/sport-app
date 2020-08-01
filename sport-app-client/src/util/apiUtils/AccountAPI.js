import {API_BASE_URL} from '../../constants';
import {request} from "./Request";

export function getAccountInfo() {
    return request({
        url: API_BASE_URL + "/users/me/info",
        method: 'get'
    });
}
