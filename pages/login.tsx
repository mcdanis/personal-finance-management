import Link from "next/link";
// import React from "react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { useIsAuth } from "../hook/auth";
import ApiService from "../services/ApiService";

const apiService = new ApiService();

require("dotenv").config();

interface LoginResponse {
  token: string;
  message?: string;
}

const LoginPage = () => {
  useIsAuth();

  const [email, setEmail] = useState<string>("mcdani@gmail.com");
  const [pass, setPassword] = useState<string>("qwerty123");
  const [error, setError] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await apiService.login(email, pass);

    const data: LoginResponse = await response.json();

    if (response.ok) {
      if (rememberMe) {
        localStorage.setItem("token", data.token);
      } else {
        sessionStorage.setItem("token", data.token);
      }
      router.push("/");
    } else {
      setError(data.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            {/* <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          /> */}
            PFM
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Masuk dengan akunmu !
              </h1>
              <div>
                {error && (
                  <div
                    className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-yellow-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2L22 20H2L12 2z"
                        clipRule="evenodd"
                      />
                      <text
                        x="12"
                        y="16"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="bold"
                        fill="white"
                      >
                        !
                      </text>
                    </svg>
                    <div>{error}</div>
                  </div>
                )}

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Kata sandi
                </label>
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="text-center px-2 py-1 w-full font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
