import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://zenvorytradersllc.com/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Login successful:", result);
        // Store user info in localStorage for session
        localStorage.setItem("user", JSON.stringify(result.user.full_name));
        localStorage.setItem("user_id", JSON.stringify(result.user.id));
        console.log("User stored in localStorage:", localStorage.getItem("user"));
        navigate("/"); // Redirect to home or dashboard
      } else {
        setMessage("❌ " + (result.error || "Invalid login credentials"));
      }
    } catch (error) {
      setMessage("⚠️ Network error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
  <h2 className="text-2xl font-bold mb-6 text-center text-[#367588]">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#367588]"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#367588]"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#367588] text-white py-2 rounded-md hover:bg-[#111111] transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}

        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#367588] font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
