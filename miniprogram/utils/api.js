import http from './https.js';


const api={
  login:(param)=>{
    return http.post('/user/login',param)
  }
}
export default api;