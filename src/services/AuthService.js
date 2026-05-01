import { api } from "./API";

export const AuthService = {
  login: async (email, password) => {
    const response = await api.post("/auth/sign-in", { email, password });
    return response.data;
  },
  
  register: async (email, password, confirmPassword) => {
    const response = await api.post("/auth/sign-up", { 
      email, 
      password, 
      confirmPassword 
    });
    return response.data;
  }
};