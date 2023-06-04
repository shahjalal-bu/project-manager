import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImage from "../../assets/images/lws-logo-light.svg";
import Error from "../shared/Error";

import { useAuth } from "../../contexts/authContext";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, errors, handleSubmit } = useForm();

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await login(data?.email, data.password);
    if (res) navigate("/teams");
  };

  return (
    <div className="grid place-items-center h-screen bg-[#F9FAFB">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link to="/">
              <img className="" src="./logo.png" alt="logo" />
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              htmlFor="email"
              name="email"
              className="input rounded-md"
              {...register("email", { required: true })}
            />
            <input
              type="password"
              htmlFor="password"
              className="input rounded-b-md"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors?.email && <Error message={"Email is require"} />}
            {errors?.password && <Error message={"Password is require"} />}
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link
                  to="/register"
                  className="font-medium text-violet-600 hover:text-violet-500"
                >
                  Register
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
