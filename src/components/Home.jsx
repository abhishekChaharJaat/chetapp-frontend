import React, { useEffect, useState } from "react";
import Topnav from "./Topnav";
import { fetchAuthUser } from "../redux/actions";
import { useDispatch } from "react-redux";
import Sidebar from "./Sidebar";
import MessageBox from "./MessageBox";
import ScreenSize from "../hooks/ScreenSize";
const Home = () => {
  const dispatch = useDispatch();

  const [isVisble, setIsVisible] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    dispatch(fetchAuthUser());
  }, []);

  useEffect(() => {
    console.log(screenSize);
  }, [screenSize]);
  return (
    <>
      <ScreenSize screenSize={screenSize} setScreenSize={setScreenSize} />
      <div className="w-full h-screen bg-slate-100">
        <Topnav />
        <div className="flex">
          <Sidebar
            isVisble={isVisble}
            setIsVisible={setIsVisible}
            screenSize={screenSize}
          />
          <MessageBox
            isVisble={isVisble}
            setIsVisible={setIsVisible}
            screenSize={screenSize}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
