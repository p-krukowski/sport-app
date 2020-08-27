import {API_BASE_URL} from "../../constants";
import {request} from "./Request";

const componentUrl = API_BASE_URL + '/';

export function addComment(commentData) {
    return request({
        url: componentUrl + 'entry/' + commentData.entryId + "/comments",
        method: 'POST',
        data: commentData
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