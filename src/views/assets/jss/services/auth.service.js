import axios from 'axios'

const API_URL = 'https://api.lms.pts.asia/'
//const API_URL = 'http://localhost:8082/'

class AuthService {
  loginStudent(email, password) {
    return axios
      .post(API_URL + 'users/login/student', {
        email,
        password,
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data))
          //console.log('accTok: ', response.data.token)
          //console.log('accTok ID: ', response.data.user._id)
        }
        //console.log('Resp: ', response)
        //console.log('accTok2: ', response.data.accessToken)
        //console.log('accTok3: ', response.data.token)
        //console.log('Login: ' + response.data)
        return response.data
      })
  }

  loginTeacher(email, password) {
    return axios
      .post(API_URL + 'users/login/teacher', {
        email,
        password,
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }

  registerStudent(
    student_name,
    school,
    bod,
    student_phone_number,
    student_email,
    student_password,
    student_uid,
  ) {
    return axios.post(API_URL + 'users/signup/student', {
      student_name,
      school,
      bod,
      student_phone_number,
      student_email,
      student_password,
      student_uid,
    })
  }

  registerTeacher(
    teacher_name,
    institute_name,
    teacher_phone_number,
    nic,
    teacher_email,
    teacher_password,
  ) {
    return axios.post(API_URL + 'users/signup/teacher', {
      teacher_name,
      institute_name,
      teacher_phone_number,
      nic,
      teacher_email,
      teacher_password,
    })
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
  }
}

export default new AuthService()
