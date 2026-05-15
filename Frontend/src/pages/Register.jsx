import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 5) {
      setError("Password must be at least 5 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setError("");

      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">

      <div className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-lg">

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-white text-center">
          💰 FinTrack
        </h1>

        <p className="text-gray-400 text-sm text-center mt-2 mb-6">
          Create your account and start tracking your finances
        </p>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-3">
            {error}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 rounded bg-slate-700 text-white"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-slate-700 text-white"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 rounded bg-slate-700 text-white pr-10"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-300"
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full p-3 rounded bg-slate-700 text-white"
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded text-white font-medium"
          >
            Create Account
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-sm text-gray-400 text-center mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}