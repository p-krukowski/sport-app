import {ACCESS_TOKEN} from '../../constants/index';
import axios from 'axios';

export const request = (options) => {

    let myHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    if (localStorage.getItem(ACCESS_TOKEN)) {
        myHeaders = {
            'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }
    }

    const defaults = {'headers': myHeaders};
    const axiosConfig = Object.assign({}, defaults, options);

    return axios(axiosConfig)
        .then(response => {
            if (response.status > 299) {
                return Promise.reject(response);
            }
            else return response.data;
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

// const request1 = (options) => {
//     const headers = new Headers({
//         'Content-Type': 'application/json',
//     });
//
//     if(localStorage.getItem(ACCESS_TOKEN)) {
//         headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
//     }
//
//     const defaults = {headers: headers};
//
//     options = Object.assign({}, defaults, options);
//
//     return fetch(options.url, options)
//     .then(response => {
//             return response.json()
//                 .then(json => {
//                     if (!response.ok) {
//                         return Promise.reject(json);
//                     }
//                     else return json;
//                 });
//         })
//         .catch(error => {
//             console.log(error)
//         });
// };
