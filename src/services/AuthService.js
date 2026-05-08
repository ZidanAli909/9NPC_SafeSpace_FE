import { api } from "./API";

export const AuthService = {
<<<<<<< jihan
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
=======
    login: async (payload) => {
        const response = await api.post("/auth/sign-in", payload);
        return response.data;
    },
    register: async (payload) => {
        const response = await api.post("/auth/register", payload);
        return response.data;
    }
}
>>>>>>> dev
