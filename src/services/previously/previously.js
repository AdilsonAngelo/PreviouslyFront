import Axios from "axios"
import config from "../../config"
import qs from 'querystring'
import Auth from "../auth/auth"

const host = config.previouslyApi.host
const port = config.previouslyApi.port

const baseUrl = `http://${host}:${port}/api`

export default {
    search: (query, page = 1) => {
        let url = baseUrl + '/tvshows/search?' + qs.stringify({ q: query, page: page })
        let options = { headers: { Authorization: sessionStorage.getItem('previouslyAccessToken') } }
        return Auth.intercept(Axios.get(url, options))
    },

    list_episodes(show_code, season = 1) {
        let url = baseUrl + '/tvshows/episodes/list-imdb?' + qs.stringify({tvshow_code: show_code, season: season})
        let options = { headers: { Authorization: sessionStorage.getItem('previouslyAccessToken') } }
        return Auth.intercept(Axios.get(url, options))
    }
}