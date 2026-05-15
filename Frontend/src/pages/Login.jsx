import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      // basic validation
      if (!form.email || !form.password) {
        setError("Email and password are required");
        return;
      }

      if (form.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      // API call
      const res = await loginUser(form);

      // Store token
      localStorage.setItem("token", res.data.token);

      // redirect after login
      navigate("/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.msg ||
        "Cannot connect to server. Is backend running?"
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">

      {/* CENTER */}
      <div className="flex-grow flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-lg">

          {/* TITLE */}
          <h1 className="text-2xl font-bold text-white text-center">
            💰 Fin Buddy
          </h1>

          <p className="text-gray-400 text-sm text-center mt-2 mb-6">
            Login to manage your finances
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit}>

            {error && (
              <p className="text-red-400 text-xs mb-4 text-center">
                {error}
              </p>
            )}

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-3 rounded bg-slate-700 text-white"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            {/* PASSWORD */}
            <div className="relative mb-2">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 rounded bg-slate-700 text-white pr-10"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              {/* TOGGLE */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-300 hover:text-white"
              >
                {showPassword ? "🙈" : "👁"}
              </button>

            </div>

            {/* FORGOT PASSWORD */}
            <div className="text-right mb-4">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded text-white font-medium"
            >
              Login
            </button>

          </form>

          {/* REGISTER */}
          <p className="text-sm text-gray-400 text-center mt-5">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="py-4 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Fin Buddy. All rights reserved.
      </footer>
    </div>
  );
}