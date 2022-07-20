import authApi from "../apis/authApi";

const authUtils = {
  isAuthenticated: async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      const res: any = await authApi.verifyToken();
      return res.user;
    } catch (err) {
      return false;
    }
  }
};

export default authUtils;
