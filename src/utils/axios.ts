// src/lib/axios.ts (또는 src/api/axios.ts)
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8071/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
// instance.interceptors.request.use(
//   (config) => {
//     // 요청 보내기 전 수행할 작업
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// 응답 인터셉터
// instance.interceptors.response.use(
//   (response) => {
//     // 응답 데이터 가공
//     return response;
//   },
//   (error) => {
//     // 에러 처리
//     if (error.response.status === 401) {
//       // 인증 에러 처리
//       localStorage.removeItem('token');
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;
