import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI, logoutAPI } from "../api/auth.api";
import { useAuthContext } from "../context/AuthContext";

const useAuth = () => {
  const { login, logout } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
  setLoading(true);
  setError(null);
  try {
    const res = await loginAPI({ email, password });
    login(res.data.data.user, res.data.data.token); 
    navigate("/home");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  const handleRegister = async (name, email, password) => {
  setLoading(true);
  setError(null);
  try {
    const res = await registerAPI({ name, email, password });
    login(res.data.data.user, res.data.data.token); 
    navigate("/home");
  } catch (err) {
    setError(err.response?.data?.message || "Registration failed");
  } finally {
    setLoading(false);
  }
};

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutAPI();
    } catch {
      // Even if API fails, clear local session
    } finally {
      logout();
      navigate("/login");
      setLoading(false);
    }
  };

  return { handleLogin, handleRegister, handleLogout, loading, error };
};

export default useAuth;