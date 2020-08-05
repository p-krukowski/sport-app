import {API_BASE_URL} from "../../constants";
import {request} from "./Request";

const componentUrl = API_BASE_URL + '/entries';

export function getAllEntries() {
    return request({
        url: componentUrl + "/all",
        method: 'GET'
    });
}

export function addEntry(entry) {
    return request({
        url: componentUrl + "/new",
        method: 'POST',
        data: entry
    });
}

export function addPointToEntry(entryId) {
    return request({
        url: componentUrl + "/" + entryId + "/like",
        method: 'POST',
        data: entryId
    });
}