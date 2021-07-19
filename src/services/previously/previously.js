import Axios from "axios"
import config from "../../config"
import qs from 'querystring'
import Auth from "../auth/auth"

const host = config.previouslyApi.host
const port = config.previouslyApi.port

const baseUrl = `http://${host}:${port}/api/tvshows`

export default {
    search: (query, page = 1) => {
        let url = baseUrl + '/search?' + qs.stringify({ q: query, page: page })
        let options = { headers: { Authorization: sessionStorage.getItem('previouslyAccessToken') } }
        return Auth.intercept(Axios.get(url, options))
    },

    listEpisodes(show_code, season = 1) {
        let url = baseUrl + '/episodes/list-imdb?' + qs.stringify({tvshow_code: show_code, season: season})
        let options = { headers: { Authorization: sessionStorage.getItem('previouslyAccessToken') } }
        return Auth.intercept(Axios.get(url, options))
    },

    markEpisode(epCode) {
        let url = baseUrl + '/episodes/mark?'
        let payload = {episode_code: epCode}
        let options = { headers: { Authorization: sessionStorage.getItem('previouslyAccessToken') } }
        return Auth.intercept(Axios.post(url, payload, options))
    },

    unmarkEpisode(epCode) {
        let url = baseUrl + '/episodes/unmark?'
        let payload = {episode_code: epCode}
        let options = { headers: { Authorization: sessionStorage.getItem('previouslyAccessToken') } }
        return Auth.intercept(Axios.post(url, payload, options))
    },

    listMarkedEpisodes(show_code) {
        let url = baseUrl + '/episodes/marked?' + qs.stringify({tvshow_code: show_code})
        let options = { headers: { Authorization: sessionStorage.getItem('previouslyAccessToken') } }
        return Auth.intercept(Axios.get(url, options))
    }
}