import {API_BASE_URL} from "../../constants";
import {request} from "./Request";

const componentUrl = API_BASE_URL + '/news/';

export function fetchAllNews() {
    return request({
        url: componentUrl + "all/1",
        method: 'GET'
    });
}

export function getNewsById(newsId) {
    return request({
        url: componentUrl + newsId,
        method: 'GET'
    });
}

export function getBestNews() {
    return request({
        url: componentUrl + "best",
        method: 'GET'
    });
}

export function addNews(news) {
    return request({
        url: componentUrl + "new",
        method: 'POST',
        data: news
    });
}

export function addNewsComment(newsId, comment) {
    return request({
        url: componentUrl + newsId + '/comments/new',
        method: 'POST',
        data: comment
    });
}

export function addPointToNews(newsId) {
    return request({
        url: componentUrl + newsId + "/upvote",
        method: 'POST'
    });
}