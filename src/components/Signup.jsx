import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSignup } from "../redux/actions";
import toast from "react-hot-toast";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser, error, loading } = useSelector((state) => state.userSlice);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    dispatch(userSignup(formData));
  };

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("token", authUser?.token);
      toast.success("Account Created successfully");
      navigate("/home");
    }
    if (error) {
      toast.error(error);
    }
  }, [authUser, error, navigate]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center border">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 m-4">
          <h2 className="text-lg md:text-2xl font-bold text-center text-gray-800 mb-6">
            SignUp on{" "}
            <span className="text-orange-600 italic">Abhishek's App</span>
          </h2>

          {loading ? (
            <div className="w-full h-40 flex justify-center items-center">
              <div className="w-6 h-6 border-2 border-t-0 border-green-800 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div>
              <Input
                label="Full Name"
                placeholder="Enter full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <Input
                label="Username"
                placeholder="Enter your username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                type="email"
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
              />
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password"
              />
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select your Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="w-full my-4">
                <Button
                  title={"Sign Up"}
                  className={"w-full"}
                  onclick={handleSubmit}
                />
              </div>
            </div>
          )}
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 italic underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
