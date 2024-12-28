import React, { useState, useEffect } from "react";

function ScreenSize({ screenSize, setScreenSize }) {
  useEffect(() => {
    // Function to update screen size
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {/* <h1>Responsive Screen Size</h1>
      <p>Current Width: {screenSize.width}px</p>
      <p>Current Height: {screenSize.height}px</p> */}
    </div>
  );
}

export default ScreenSize;
