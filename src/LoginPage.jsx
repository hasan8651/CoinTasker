import { useState } from "react";
import { UserRole } from "./types"; // JS এ UserRole object/export ধরে নিচ্ছি
import { DEFAULT_WORKER_COINS } from "./constants";
import { Link } from "react-router";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Dummy user data for demonstration
  const dummyUsers = [
    {
      id: "worker-1",
      name: "Worker One",
      email: "worker@example.com",
      photoUrl: "https://picsum.photos/50/50?worker",
      role: UserRole.Worker,
      coins: 150,
    },
    {
      id: "buyer-1",
      name: "Buyer One",
      email: "buyer@example.com",
      photoUrl: "https://picsum.photos/50/50?buyer",
      role: UserRole.Buyer,
      coins: 500,
    },
    {
      id: "admin-1",
      name: "Admin One",
      email: "admin@example.com",
      photoUrl: "https://picsum.photos/50/50?admin",
      role: UserRole.Admin,
      coins: 9999,
    },
  ];

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate API call for login
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const userFound = dummyUsers.find(
      (u) => u.email === email && password === "password123" // Simple dummy password check
    );

    if (userFound) {
      const token = `dummy-jwt-token-${userFound.id}`; // Dummy token
      onLogin(userFound, token);
    } else {
      setError("Invalid email or password.");
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    // Simulate Google Sign-In
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For demo, assume a successful Google sign-in creates a new user or logs in an existing one
    const googleUser = {
      id: `google-user-${Date.now()}`,
      name: "Google User",
      email: `googleuser${Date.now()}@gmail.com`,
      photoUrl:
        "https://lh3.googleusercontent.com/a/AGNmyxZ1_0C0C0C0C0C0C0C0C0C0C0C0C0C0C0C0C0=s96-c", // Dummy Google profile pic
      role: UserRole.Worker, // Default role for Google sign-in
      coins: DEFAULT_WORKER_COINS, // Default coins
    };
    const token = `dummy-jwt-token-google-${googleUser.id}`;
    onLogin(googleUser, token);

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-indigo-100 animate-fade-in-up">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Login to MicroTasker Hub
        </h2>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 disabled:opacity-50"
            disabled={loading}
          >
            <img
              className="h-6 w-6 mr-2"
              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_of_Google__G__Square.svg"
              alt="Google logo"
            />
            {loading ? "Signing In..." : "Sign in with Google"}
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;