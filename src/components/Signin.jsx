import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser, error, loading } = useSelector((state) => state.userSlice);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log("hello");
    dispatch(userLogin(formData));
  };

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("token", authUser?.token);
      toast.success("Login successfull");
      navigate("/home");
    }
    if (error) {
      toast.error(error);
    }
  }, [authUser, error, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full min-h-60 max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg md:text-2xl font-bold text-center text-gray-800 mb-6">
          Login to{" "}
          <span className="text-orange-600 italic">Abhishek's App</span>
        </h2>
        {loading ? (
          <div className="w-full h-40 flex justify-center items-center">
            <div className="w-6 h-6 border-2 border-t-0 border-green-800 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div>
            {/* Username Input */}
            <Input
              label="Username"
              placeholder="Enter your email"
              name="username"
              value={formData.username}
              onChange={handleChange}
              type="email"
            />

            {/* Password Input */}
            <Input
              label="Password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
            />

            {/* Submit Button */}
            <div className="w-full my-4">
              <Button
                title={"Sign In"}
                className={"w-full"}
                onclick={handleSubmit}
              />
            </div>

            {/* Additional Links */}
            <p className="mt-4 text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 italic underline">
                Sign Up
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signin;
