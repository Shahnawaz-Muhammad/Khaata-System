import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useAuth0 } from "@auth0/auth0-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  const { loginWithRedirect } = useAuth0();

  return (
    <form
      className="w-full max-w-screen-sm rounded-lg flex flex-col gap-5 p-10 bg-slate-400"
      onSubmit={handleSubmit}
    >
      <h3 className="text-xl">Log In</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 "
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 "
      />

      <div className="flex justify-center flex-col gap-5">
        <button
          type="submit"
          className="bg-[#a855f7]   px-20 py-3"
          disabled={isLoading}
        >
          Log in
        </button>

        <button
          type="button"
          className="bg-white flex gap-5 justify-center items-center px-20 py-3"
          onClick={() => loginWithRedirect()}
        >
          <FcGoogle className="text-3xl" />
          Sign in with Google
        </button>

        <button
          type="button"
          className="bg-white flex gap-5 justify-center items-center px-20 py-3"
          onClick={() => loginWithRedirect()}
        >
          {" "}
          <FaFacebook className="text-3xl text-blue-500" />
          Sign in with Google
        </button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
