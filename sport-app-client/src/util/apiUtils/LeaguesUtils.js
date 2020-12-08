import {API_BASE_URL} from "../../constants";
import {request} from "./Request";

const componentUrl = API_BASE_URL + '/sport';

export function getAllLeaguesByDiscipline(discipline) {
    return request({
        url: componentUrl + '/' + discipline + '/leagues',
        method: 'GET'
    });
}

export function getLeague(id) {
    return request({
        url: `${componentUrl}/soccer/leagues/${id}`,
        method: 'GET'
    });
}

export function setPanelLeagues(leaguesIds) {
    return request({
        url: componentUrl + '/soccer/leagues/panel/',
        method: 'POST',
        data: leaguesIds
    })
}

export function fetchRoundsAmountByLeagueId(leagueId) {
    return request({
        url: `${componentUrl}/soccer/leagues/${leagueId}/roundsAmount`,
        method: 'GET'
    });
}