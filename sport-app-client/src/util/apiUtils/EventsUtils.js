import {API_BASE_URL} from "../../constants";
import {request} from "./Request";

const componentUrl = API_BASE_URL + '/sport/soccer/events';

export function fetchRecentEventsByLeagueId(leagueId) {
    return request({
        url: componentUrl + "/recent/l=" + leagueId,
        method: 'GET'
    });
}

export function fetchNextEventsByLeagueId(leagueId) {
    return request({
        url: componentUrl + "/next/l=" + leagueId,
        method: 'GET'
    });
}

export function fetchEventsByLeagueIdAndRoundNr(leagueId, roundNr) {
    return request({
        url: componentUrl + "/l=" + leagueId + "&r=" + roundNr,
        method: 'GET'
    });
}