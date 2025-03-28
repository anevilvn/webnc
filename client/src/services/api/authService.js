import api from "./api"; // Sử dụng axios instance có sẵn

// Đăng ký người dùng mới
export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.response?.data || error.message);
    throw error;
  }
};

// Đăng nhập và lưu token
export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;
    }

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error;
  }
};

// Đăng xuất và xóa token
export const logout = () => {
  localStorage.removeItem("token");
  delete api.defaults.headers["Authorization"];
};

// Lấy thông tin người dùng hiện tại từ token
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error.response?.data || error.message);
    throw error;
  }
};

// Kiểm tra xem người dùng có đang đăng nhập không
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
