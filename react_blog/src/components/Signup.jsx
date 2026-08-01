import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`mx-auto w-full max-w-lg rounded-2xl border border-white/40 bg-white/60 p-10 shadow-sm shadow-black/5 backdrop-blur-xl `}>
        <div className="mb-1 flex items-center justify-center">
          <span className="inline-flex items-center justify-center w-full `max-w-[100px]`">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-gray-700 pb-5 text-[18px] font-medium leading-tight">
          Sign Up to your account
        </h2>
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5 text-[13px] text-start font-light">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
              <Input
                type="text"
                placeholder="Name"
                className="px-7 mx-0.5"
                {...register("name", {
                  required: true,
                })}
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
              <Input
                type="text"
                className="px-7 mx-0.5"
                placeholder="Email"
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
                type="text"
                className="px-7 mx-0.5 "
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                })}
              />
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <p className="mt-1 mb-4  text-center text-[12px] text-base text-black/60">
              Already have an account?&nbsp;
              <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
