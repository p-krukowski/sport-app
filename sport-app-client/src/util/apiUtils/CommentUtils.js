import {API_BASE_URL} from "../../constants";
import {request} from "./Request";

const componentUrl = API_BASE_URL + '/';

export function addComment(commentValue, entryId) {
    return request({
        url: componentUrl + 'entry/' + entryId + "/comments",
        method: 'POST',
        data: commentValue
    });
}

export function getComments(entryId) {
    return request({
        url: componentUrl + 'entry/' + entryId + "/comments",
        method: 'GET'
    });
}

export function getCommentsByNewsId(newsId) {
    return request({
        url: componentUrl + 'news/' + newsId + "/comments",
        method: 'GET'
    });
}