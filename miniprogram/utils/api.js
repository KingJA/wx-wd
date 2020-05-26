import http from './https.js';


const api = {
  login: (param) => {
    return http.post('/user/login', param)
  },
  publish: (param) => {
    return http.post('/question/publish', param)
  },
  getQuestions: (param) => {
    return http.get('/question/questions', param)
  }
}
export default api;