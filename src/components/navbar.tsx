import { useEffect, useState } from "react";
import Logo from "../assets/logo.svg";
import axios from "../lib/axios";

export default function Navbar() {
  const [user, setUser] = useState<string>("");

  // fetch user
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get("/user");
      setUser(data?.username);
    };

    try {
      fetchUser();
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Logout function
  const HandleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <nav className="flex items-center justify-between py-4 ">
        <img src={Logo} alt="logo" width={200} />

        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <h5 className="font-semibold">{user}</h5>
            <img
              className="inline-block w-8 h-8 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt="profile"
            />
          </div>

          {/* <button
            type="submit"
            className="flex items-center justify-center px-3 py-2 text-sm font-semibold text-white bg-gray-900 rounded-md shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Logout
          </button> */}
          <button
            onClick={HandleLogout}
            className="flex items-center justify-center px-3 py-2 text-sm font-semibold text-gray-900 duration-150 bg-white border border-gray-900 rounded-md shadow-sm outline-1 hover:text-white hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
