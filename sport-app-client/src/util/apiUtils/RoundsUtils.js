import {API_BASE_URL} from "../../constants";
import {request} from "./Request";

const componentUrl = API_BASE_URL + '/sport/soccer/rounds/amount';

export function fetchRoundsAmountByLeagueId(leagueId) {
    return request({
        url: componentUrl + "/l=" + leagueId,
        method: 'GET'
    });
}