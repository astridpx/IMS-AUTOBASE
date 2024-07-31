import { useState } from "react";
import Logo from "./assets/logo.svg";
import Bg from "./assets/bg.jpg";
import axios from "./lib/axios";
// import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

interface ReponseInterface {
  success: boolean;
  user: {
    username: string;
    token: string;
  };
}
export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  // const navigate = useNavigate();

  // Form submit
  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data }: { data: ReponseInterface } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        {
          username,
          password,
        }
      );

      if (data) {
        localStorage.setItem("token", data.user.token);
        // navigate("/");
        setLoading(false);
        // <Navigate to="/" replace={true} />;
        // window.location.reload();
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <div className="relative flex items-center justify-center w-full min-h-screen bg-gray-300">
        {/* bg image */}
        <img src={Bg} alt="bg" className="object-cover w-full h-screen" />

        {/* FORM BOX */}
        <div className=" absolute bg-white/90 rounded-xl p-4 w-96 h-[27rem]">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="w-auto h-6 mx-auto" src={Logo} alt="Logo" />
            <h2 className="mt-8 text-xl font-bold leading-9 tracking-tight text-center text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
            {loading && <p className="text-sm text-center">Loading...</p>}
            {error && (
              <p className="text-sm text-center text-red-500">
                Invalid Credentials
              </p>
            )}
            <form className="space-y-6" onSubmit={(e) => HandleSubmit(e)}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-insest focus:ring-blue-500 sm:text-sm sm:leading-6"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center w-full py-2 text-sm font-semibold text-white duration-150 bg-gray-900 rounded-md shadow-sm outline-1 hover:bg-gray-700 "
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
