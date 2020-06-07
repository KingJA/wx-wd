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
  },
  changeFace: (imgUrl) => {
    return http.uploadFile('/user/changeFace', imgUrl)
  },
  publishQuestion: (imgUrl,param) => {
    return http.uploadFile('/question/publish', imgUrl,param)
  },
  getQuestionDetail: (param) => {
    return http.get('/question/detail', param)
  },
  collectQuestion: (param) => {
    return http.post('/question/collectQuestion', param)
  },
  comment: (param) => {
    return http.post('/question/comment', param)
  },
  searchQuestions: (param) => {
    return http.get('/question/search', param)
  },
  getCollectedQuestions: (param) => {
    return http.get('/question/collected', param)
  }
  
  
}
export default api;