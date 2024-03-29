import axios from "axios";
const API_URL = "https://mernproject9.herokuapp.com/api/courses";

class CourseService {
  //post新增課程
  post(title, description, price) {
    //能否新增課程是根據token決定
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL,
      { title, description, price },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  //使用學生id，找到學生註冊的課程
  getEnrolledCourses(_id){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/student/" + _id,
    {
      headers: {
        Authorization: token,
      },
    })
  }

  //使用instructor id，找到講師擁有的課程
  get(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(
      API_URL + "/instructor/" + _id,      
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  

  getCourseByName(name){    
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }    
    return axios.get(API_URL + "/findByName/" + name,{
      headers: {
        Authorization: token,
      },
    })
  }

  
  enroll(_id){
    let token;
    if(localStorage.getItem("user")){
      token = JSON.parse(localStorage.getItem("user")).token;
    }else{
      token="";
    }   

    return axios.post(API_URL+"/enroll/"+_id,{},{
      headers: {
        Authorization: token,
      },
    })

  }
}



export default new CourseService();