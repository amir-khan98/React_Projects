import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg rounded-2xl border border-white/40 bg-white/60 p-6 sm:p-10 shadow-sm shadow-black/5 backdrop-blur-xl `}
      >
        <div className="flex items-center justify-center">
          <span className="inline-flex items-center justify-center w-full `max-w-[100px]`">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-gray-700 text-[18px] font-medium leading-tight">
          Sign In to your account
        </h2>
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5 text-[13px] text-start font-light items-center justify-center">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
              <Input
                placeholder="Email"
                className="px-7 mx-0.5"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value,
                      ) || "Email address must be a valid address",
                  },
                })}
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
              <Input
                type="password"
                className="px-7 mx-0.5"
                placeholder="Password"
                {...register("password", {
                  required: true,
                })}
              />
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <p className="mt-1 mb-4  text-center text-[12px] text-base text-black/60">
              Don&apos;t have any account?&nbsp;
              <Link
                to="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
