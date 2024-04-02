import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { URL } from "../Utils";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

const Login = () => {
  const userRef = useRef(null);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.trim().length === 0 || pwd.trim().length === 0) {
      //TODO add toast
      setErrMsg("Invalid");
      setTimeout(() => {
        setErrMsg("");
      }, 5000);
      return;
    }

    await axios
      .post(`${URL}/login`, {
        username: user,
        password: pwd,
      })
      .then((res) => {
        if (res.status === 200) {
          handleLogin(res.data);
          setSuccess("Login successful! Redirecting to Dashboard!");
          setTimeout(async () => {
            setSuccess("");
            await navigate("/");
          }, 1000);
          return;
        } else {
          setErrMsg("Invalid");
          setTimeout(() => {
            setErrMsg("");
          }, 5000);
          return;
        }
      })
      .catch((e) => {
        console.log(e);
        setErrMsg("Invalid");
        setTimeout(() => {
          setErrMsg("");
        }, 5000);
        return;
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full grid place-content-center bg-white">
        <section className="text-[1.5rem] py-14 px-6 sm:px-10 border rounded-lg border-gray-400 bg-zinc-100 max-w-screen-md">
          <h1 className="font-bold text-[2rem] text-blue-800 mb-8">
            Login
            <br />
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label htmlFor="username" className="flex items-center">
              Username
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              className="outline-none border border-gray-400 pl-2 rounded-sm"
            />
            <label htmlFor="password" className="flex items-center">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              className="outline-none border border-gray-400 pl-2 rounded-sm"
            />
            <button
              className={`bg-black cursor-pointer text-white mt-8 btn p-1 rounded-lg`}
            >
              Login
            </button>
          </form>
        </section>
        <div className="py-4 flex flex-row justify-between items-start ">
          <p className="pt-2 pb-4">Don't have an account?</p>
          <button
            className="py-2 px-4 inline-flex justify-center items-center gap-x-2 text-md font-bold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            onClick={() => navigate("/register")}
          >
            Create One!
          </button>
        </div>
      </div>
      {errMsg && errMsg.length > 0 && (
        <div
          id="dismiss-toast"
          className="absolute bottom-4 start-4 max-w-xs bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
          role="alert"
        >
          <div className="flex p-4">
            Please enter valid credentials!
            <div className="ms-auto">
              <button
                type="button"
                className="pl-4 inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-red-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-red-200"
                onClick={() => setErrMsg("")}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      {success && success.length > 0 && (
        <div
          id="dismiss-toast"
          className="absolute bottom-4 start-4 max-w-xs bg-green-100 border border-green-200 text-sm text-green-800 rounded-lg dark:bg-green-800/10 dark:border-green-900 dark:text-green-500"
          role="alert"
          style={{ whiteSpace: "nowrap" }}
        >
          <div className="flex p-4">
            {success}
            <div className="ms-auto">
              <button
                type="button"
                className="pl-4 inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-green-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-green-200"
                onClick={() => setSuccess("")}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
