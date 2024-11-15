import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// axios 인스턴스 생성
const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 요청 인터셉터 - 토큰이 있으면 헤더에 추가
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 회원가입 API
export const register = async (userData) => {
  try {
    const response = await authApi.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '회원가입 중 오류가 발생했습니다.' };
  }
};

// 로그인 API
export const login = async (credentials) => {
  try {
    const response = await authApi.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '로그인 중 오류가 발생했습니다.' };
  }
};

// 로그아웃
export const logout = () => {
  localStorage.removeItem('token');
};

// 현재 로그인 상태 확인
export const checkAuth = () => {
  return !!localStorage.getItem('token');
};