import LoginForm from "@/components/public/User-Login/LoginForm";
import { useNavigate } from "react-router-dom";
import { AuthService } from "@/services/AuthService";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);

    try {
      const responseData = await AuthService.login(data);

      const token = responseData.data?.token || responseData.token;
      const user = responseData.data?.user || responseData.user;

      if (!token) {
        console.error("Token tidak ditemukan");
        return;
      }

      login(user, token);
      navigate("/");

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1">
      <LoginForm onSubmit={handleSubmit} loading={loading} />
    </main>
  );
}