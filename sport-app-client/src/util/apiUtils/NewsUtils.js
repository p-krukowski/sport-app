import {API_BASE_URL} from "../../constants";
import {request} from "./Request";

const componentUrl = API_BASE_URL + '/news';

export function getAllNews() {
    return request({
        url: componentUrl + "/all",
        method: 'GET'
    });
}

export function addNews(news) {
    return request({
        url: componentUrl + "/new",
        method: 'POST',
        data: news
    });
}