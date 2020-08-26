import {API_BASE_URL} from "../../constants";
import {request} from "./Request";

const componentUrl = API_BASE_URL + '/news/';

export function getAllNews() {
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