import { useState } from "react";
import { Link } from "react-router";
import { UserRole } from "../types";
import { DEFAULT_WORKER_COINS, DEFAULT_BUYER_COINS } from "../constants";
import { uploadToImgbb } from "../services/imageUploader";

function RegisterPage({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(UserRole.Worker);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!name || !email || !password || !confirmPassword || !role) {
      setError("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    setError("");
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    setError("");

    try {
        let finalPhotoUrl = photoUrl;
      if (imageFile) {
        try {
          finalPhotoUrl = await uploadToImgbb(imageFile);
        } catch (uploadErr) {
          console.error("Image upload failed:", uploadErr);
          setError("Image upload failed. Try again.");
          setLoading(false);
          return;
        }
      }


      const baseUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

      const res = await fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          photoUrl: finalPhotoUrl,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed.");
        setLoading(false);
        return;
      }

      const expectedCoins =
        role === UserRole.Worker ? DEFAULT_WORKER_COINS : DEFAULT_BUYER_COINS;

      if (data.user && data.user.coins !== expectedCoins) {
        console.warn(
          "Coin mismatch: server:",
          data.user.coins,
          "expected:",
          expectedCoins
        );
      }

      onRegister(data.user, data.token);
    } catch (err) {
      console.error("Register error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl border border-indigo-100 animate-fade-in-up">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Create Your Account
        </h2>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name */}
          <div>
            <label className="label">Full Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="label">Email Address</label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Profile Picture */}
          <div className="form-control">
            <label className="label">Profile Picture</label>
            <div className="flex flex-col gap-2">
              <input
                type="url"
                className="input input-bordered w-full"
                placeholder="https://example.com/your-picture.jpg (Optional URL)"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                disabled={!!imageFile}
              />
              <span className="text-center text-sm">OR</span>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={(e) => {
                  setImageFile(e.target.files[0]);
                  if (e.target.files[0]) setPhotoUrl("");
                }}
                accept="image/*"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="label">Confirm Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Role Select */}
          <div>
            <label className="label">Select Role</label>
            <select
              className="select select-bordered w-full"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value={UserRole.Worker}>Worker</option>
              <option value={UserRole.Buyer}>Buyer</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;