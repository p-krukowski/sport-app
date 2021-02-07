import {API_BASE_URL} from "../../constants";
import {request} from "./Request";

const componentUrl = API_BASE_URL + '/';

export function postEntryComment(commentValue, entryId) {
    return request({
        url: componentUrl + 'entries/' + entryId + "/comments/new",
        method: 'POST',
        data: commentValue
    });
}

export function fetchEntryComments(entryId) {
    return request({
        url: componentUrl + 'entries/' + entryId + "/comments",
        method: 'GET'
    });
}

export function fetchCommentsByNewsId(newsId) {
    return request({
        url: componentUrl + 'news/' + newsId + "/comments",
        method: 'GET'
    });
}

export function addPointToComment(commentId) {
    return request({
        url: componentUrl + 'comments/' + commentId + "/upvote",
        method: 'PATCH'
    });
}