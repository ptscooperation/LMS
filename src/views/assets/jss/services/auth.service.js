import axios from 'axios'

const API_URL = 'https://anjinz-api.vercel.app/'
//const API_URL = "http://localhost:8082/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + 'users/login', {
        email,
        password,
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data))
          console.log('accTok: ', response.data.token)
        }
        console.log('Resp: ', response)
        console.log('accTok2: ', response.data.accessToken)
        console.log('accTok3: ', response.data.token)
        console.log('Login: ' + response.data)
        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }

  register(name, email, password) {
    return axios.post(API_URL + 'users', {
      name,
      email,
      password,
    })
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
  }
}

export default new AuthService()
