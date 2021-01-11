import {request} from "./Request";
import {API_BASE_URL} from "../../constants";

const componentUrl = API_BASE_URL + '/media/file/delete';

export function deleteNewsCoverFromUrl(imageUrl) {
  return request({
    url: componentUrl + "/news-cover",
    method: 'DELETE',
    data: imageUrl
  })
}