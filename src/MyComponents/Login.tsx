// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isRTL = i18n.language === "ar";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ username, password });
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          {isRTL ? "تسجيل الدخول" : "Sign in to your account"}
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isRTL ? "اسم المستخدم أو البريد" : "Username or email"}
            </label>
            <input
              dir={isRTL ? "rtl" : "ltr"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006F3C]"
              placeholder={isRTL ? "أدخل اسم المستخدم" : "Enter username or email"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isRTL ? "كلمة المرور" : "Password"}
            </label>
            <input
              dir={isRTL ? "rtl" : "ltr"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006F3C]"
              placeholder={isRTL ? "أدخل كلمة المرور" : "Enter password"}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-[#006F3C] to-[#00934D] text-white rounded-lg font-semibold hover:scale-[1.01] transition"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : null}
            {isRTL ? "تسجيل الدخول" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
