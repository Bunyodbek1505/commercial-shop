import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the token to all requests
instance.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth?.token) {
      config.headers.Authorization = auth.token;
    }
    // Fayl yuklash uchun Content-Type ni sozlash, agar FormData bo'lsa "multipart/form-data" qo'shadi.
    if(config.data instanceof FormData){
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },


  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;

