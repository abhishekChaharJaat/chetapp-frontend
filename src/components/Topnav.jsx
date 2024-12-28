import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/actions";
import toast from "react-hot-toast";
import profile from "../images/profile.webp";
const Topnav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.userSlice.authUser);
  const [showTooltip, setShowTooltip] = useState(false);

  const logout = () => {
    dispatch(userLogout());
    navigate("/");
    localStorage.clear("token");
    toast.success("Logout successfully");
  };

  return (
    <div>
      <nav className="bg-blue-950 shadow fixed top-0 left-0 right-0 z-10 h-[60px] md:h-[73px] px-2 md:px-5 flex items-center">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <Link to="/">
            <h1 className="text-sm md:text-xl font-bold  italic text-orange-500">
              Abhishek's App
            </h1>
          </Link>

          {/* Auth User Info */}
          <div className="relative flex items-center space-x-2 md:space-x-10">
            {authUser && (
              <div
                className="flex items-center space-x-2 relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <img
                  src={profile || authUser?.profilePhoto}
                  alt="Profile"
                  className="h-6 md:w-9 md:h-9 rounded-full border"
                />
                <span className="text-xs md:text-md text-white font-medium">
                  {authUser?.fullName}
                  {"  (You)"}
                </span>

                {/* Tooltip */}
                {showTooltip && (
                  <div className="absolute top-12 left-0 bg-white border border-gray-200 rounded-md shadow-md p-4 w-64 z-20">
                    <h2 className="font-bold text-lg text-gray-800">
                      {authUser?.fullName}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      <strong>Username:</strong> {authUser?.username}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Gender:</strong> {authUser?.gender}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Joined:</strong>{" "}
                      {new Date(authUser?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Logout Button */}
            <button
              className="px-2 md:px-4 py-1 text-xs md:py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:bg-gray-700"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Topnav;
