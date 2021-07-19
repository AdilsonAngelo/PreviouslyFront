import Axios from 'axios';
import config from '../../config'

class Auth {

    // note: sessionStorage/localStorage is not safe but my time is short

    static baseUrl() {
        let api = config.previouslyApi
        return `http://${api.host}:${api.port}/api`
    }

    static isAuthenticated() {
        return !!sessionStorage.getItem("previouslyAccessToken")
    }

    static logIn(data) {
        let payload = { user: data }

        return Axios.post(this.baseUrl() + '/session', payload)
            .then(response => {
                sessionStorage.setItem('previouslyAccessToken', response.data.data.access_token)
                localStorage.setItem('previouslyUserEmail', data.email)
            })
    }

    static logOut() {
        console.log(sessionStorage.getItem("previouslyAccessToken"))
        sessionStorage.removeItem("previouslyAccessToken")
        window.location.reload();
    }

    static register(data) {

        let payload = { user: data }

        return Axios.post(this.baseUrl() + '/registration', payload)
            .then(response => {
                sessionStorage.setItem('previouslyAccessToken', response.data.data.access_token)
                localStorage.setItem('previouslyUserEmail', data.email)
            })
    }

    static intercept(request) {
        return request
            .catch(err => {
                if (err.response.status === 401) this.logOut()
                console.log(err.response)
            })
    }
}

export default Auth