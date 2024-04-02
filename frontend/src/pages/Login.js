import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

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

      <div className="flex justify-center">
        <button className="bg-[#a855f7] w-fit  px-20 py-3" disabled={isLoading}>
          Log in
        </button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
