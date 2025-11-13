import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("https://mejistify.com/api/signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setMessage("✅ Account created successfully!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage("⚠️ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#000000]">
          Create Account
        </h2>

        {["full_name", "email", "password", "phone", "address"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-gray-700 font-medium mb-1 capitalize">
              {field.replace("_", " ")}
            </label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required={["full_name", "email", "password"].includes(field)}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#000000]"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#000000] text-white py-2 rounded-md hover:bg-orange-500 transition"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        {message && (
          <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
        )}

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="text-orange-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
