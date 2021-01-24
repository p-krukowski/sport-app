import {request} from "./Request";
import {API_BASE_URL} from "../../constants";

const componentUrl = API_BASE_URL + '/media/file/upload';

export function uploadNewsCover(image) {
  return request({
    url: componentUrl + "/news-cover",
    method: 'POST',
    data: image
  })
}

export function uploadNewsCoverFromUrl(imageUrl) {
  return request({
    url: componentUrl + "/news-cover/external-source",
    method: 'POST',
    data: imageUrl
  })
}

export function uploadEntryImage(image) {
  return request({
    url: componentUrl + "/entry-image",
    method: 'POST',
    data: image
  })
}

export function uploadEntryImageFromUrl(imageUrl) {
  return request({
    url: componentUrl + "/entry-image/external-source",
    method: 'POST',
    data: imageUrl
  })
}