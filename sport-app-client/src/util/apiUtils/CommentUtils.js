import {API_BASE_URL} from "../../constants";
import {request} from "./Request";

const componentUrl = API_BASE_URL + '/entry/';

export function addComment(commentData) {
    return request({
        url: componentUrl + commentData.entryId + "/comments",
        method: 'POST',
        data: commentData
    });
}

export function getComments(entryId) {
    return request({
        url: componentUrl + entryId + "/comments",
        method: 'GET'
    });
}