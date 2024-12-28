import React, { useEffect } from "react";
import Topnav from "./Topnav";
import { fetchAuthUser } from "../redux/actions";
import { useDispatch } from "react-redux";
import Sidebar from "./Sidebar";
import MessageBox from "./MessageBox";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuthUser());
  }, []);

  return (
    <div className="w-full h-screen bg-slate-100">
      <Topnav />
      <div className="flex">
        <Sidebar />
        <MessageBox />
      </div>
    </div>
  );
};

export default Home;
