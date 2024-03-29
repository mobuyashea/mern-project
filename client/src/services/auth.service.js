import axios from "axios";
const API_URL = "https://mernproject9.herokuapp.com/api/user";

//建構類別
class AuthService {
  //設置登入登出的method
  login(email, password) {
    return axios.post(API_URL + "/login", {
      email,
      password,
    });
  }
  logout() {
    //直接移除JWTtoken
    localStorage.removeItem("user");
  }
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }  
  getCurrentUser(){
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
