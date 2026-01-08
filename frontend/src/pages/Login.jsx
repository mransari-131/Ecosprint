// components/Login.js
import useLogin from "../hooks/useLogin";
import { NavLink } from "react-router-dom";

const Login = () => {
  const { formData, handleChange, handleSubmit, loading, status } = useLogin();

  return (
    <div className="flex justify-center items-center h-screen bg-white-900">
      <form 
        className="bg-white-800 p-8 rounded-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="white text-2xl mb-10 text-center">
          Welcome back! Step into your account and walk the path of style.
        </h2>

        {status.message && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            status.type === 'error' 
              ? 'bg-red-100 text-red-700 border border-red-200' 
              : 'bg-green-100 text-green-700 border border-green-200'
          }`}>
            {status.message}
          </div>
        )}

        <div className="mb-4">
          <label className="block white mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 bg-white-700 white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:bg-gray-50 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block white mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 bg-white-700 white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:bg-gray-50 focus:border-transparent"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md font-bold text-white ${
            loading 
              ? 'bg-emerald-400 cursor-not-allowed' 
              : 'bg-emerald-600 hover:bg-emerald-700'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center white-400 mt-4">
          Don't have an account?{' '}
          <NavLink to="/register" className="text-emerald-600 hover:text-emerald-700">
            Register
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;