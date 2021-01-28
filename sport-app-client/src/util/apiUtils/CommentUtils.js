import {API_BASE_URL} from "../../constants";
import {request} from "./Request";

const componentUrl = API_BASE_URL + '/';

export function postComment(commentValue, entryId) {
    return request({
        url: componentUrl + 'entry/' + entryId + "/comments/new",
        method: 'POST',
        data: commentValue
    });
}

export function fetchComments(entryId) {
    return request({
        url: componentUrl + 'entry/' + entryId + "/comments",
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
        url: componentUrl + 'entry/' + commentId + "/upvote",
        method: 'PATCH'
    });
}